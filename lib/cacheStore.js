'use strict';

var path = require('path'),
    _ = require('lodash'),
    fs = require('fs-extra'),
    Promise = require('bluebird'),
    PLUGIN_NAME = require('./pluginName'),
    findFiles = require('./findFiles'),
    getHash = require('./getHash'),
    PatternResolver = require('./patternResolver');

var FILENAME = '.' + PLUGIN_NAME;

/**
 * @private
 * @alias CacheStore
 * @class
 * @constructor
 * @param {String=} filename
 */
function CacheStore(filename) {
    this.filename = path.resolve(filename);
    this.currCaches = {};
    this.prevCaches = {};
}

/**
 * Reads `caches` from `filename`
 * @returns {Promise}
 */
CacheStore.prototype.read = function() {
    var promise;

    if (!_.isEmpty(this.currCaches)) {
        promise = Promise.resolve(this.currCaches);
    } else {
        promise = new Promise(_.bind(function(resolve) {
            fs.readJson(this.filename, {
                'throws': false
            }, function(err, obj) {
                resolve(obj);
            });
        }, this)).then(_.bind(function(caches) {
            if (!_.isObject(caches)) {
                caches = {};
            }

            this.currCaches = caches;

            this.set(caches);

            return this.currCaches;
        }, this));
    }

    return promise;
};

/**
 * Updates `prevCaches`
 * @param {Object} caches
 * @returns {Object}
 */
CacheStore.prototype.set = function(caches) {
    if (!_.isObject(caches)) {
        caches = {};
    }

    _.merge(this.prevCaches, caches);
};

/**
 * Writes `caches` to `filename`
 * @returns {Promise}
 */
CacheStore.prototype.write = function() {
    return new Promise(_.bind(function(resolve, reject) {
        fs.writeJson(this.filename, this.prevCaches, {
            spaces: null
        }, function(err) {
            if (_.isError(err)) {
                reject(err);
            } else {
                resolve();
            }
        });
    }, this));
};

/**
 * Has `filename` any changes?
 * @param {String} filename
 * @param {String[]} dependsOn
 * @returns {Promise}
 */
CacheStore.prototype.hasChanges = function(filename, dependsOn) {
    filename = path.resolve(filename);

    var dirname = path.dirname(filename),
        patternResolver = new PatternResolver({
            filename: filename,
            dirname: dirname
        }),
        patterns = patternResolver.resolve(dependsOn);

    return this.read().then(_.bind(function(prevCaches) {
        return findFiles(patterns).then(_.bind(function(files) {
            return getHash(files).then(_.bind(function(currCaches) {
                var diff = [];

                _.forEach(currCaches, function(value, key) {
                    diff.push(prevCaches[key] !== currCaches[key]);
                });

                this.set(currCaches);

                return _.some(diff, function(x) {
                    return x === true;
                });
            }, this));
        }, this));
    }, this));
};

/**
 * @constant
 * @private
 * @type {CacheStore}
 */
var INSTANCE = new CacheStore(path.join(process.cwd(), FILENAME));

/**
 * @private
 * @module webpack-config-stream/lib/cacheStore
 * @returns {CacheStore}
 */
module.exports = CacheStore;
module.exports.INSTANCE = INSTANCE;
