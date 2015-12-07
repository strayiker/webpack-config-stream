'use strict';

var util = require('util'),
    path = require('path'),
    _ = require('lodash'),
    CacheStore = require('./cacheStore'),
    findFiles = require('./findFiles'),
    getHash = require('./getHash'),
    CacheStrategy = require('./cacheStrategy'),
    PatternResolver = require('./patternResolver');

/**
 * @private
 * @type {CacheStore}
 */
var CACHE = CacheStore.INSTANCE;

/**
 * @alias DefaultCacheStrategy
 * @class
 * @constructor
 * @extends {CacheStrategy}
 * @param {Object=} options
 * @param {String[]} [options.dependsOn=[]] - Array of `minimatch` {@link https://github.com/isaacs/minimatch#features patterns}.
 * Available macros:
 * - `[filename]` - full path to `webpack.config.js`
 * - `[dirname]` - directory of `webpack.config.js`
 */
function DefaultCacheStrategy(options) { // eslint-disable-line
    CacheStrategy.call(this, options);
}

util.inherits(DefaultCacheStrategy, CacheStrategy);

/**
 * @override
 */
DefaultCacheStrategy.prototype.executeStart = function(stream, chunk) {
    var filename = path.resolve(chunk.path),
        dirname = path.dirname(filename),
        patternResolver = new PatternResolver({
            filename: filename,
            dirname: dirname
        }),
        patterns = patternResolver.resolve(this.options.dependsOn);

    return CACHE.read().then(function(prevCaches) {
        return findFiles(patterns).then(function(files) {
            return getHash(files).then(function(currCaches) {
                var diff = [];

                _.forEach(currCaches, function(value, key) {
                    diff.push(prevCaches[key] !== currCaches[key]);
                });

                CACHE.set(currCaches);

                return _.some(diff, function(x) {
                    return x === true;
                });
            });
        });
    });
};

/**
 * @override
 */
DefaultCacheStrategy.prototype.executeEnd = function() {
    return CACHE.write();
};

/**
 * @private
 * @constant
 * @type {DefaultCacheStrategy}
 */
var INSTANCE = new DefaultCacheStrategy({
    dependsOn: [
        '[dirname]/**/*.*'
    ]
});

/**
 * @module webpack-config-stream/lib/defaultCacheStrategy
 * @returns {DefaultCacheStrategy}
 */
module.exports = DefaultCacheStrategy;
module.exports.INSTANCE = INSTANCE;
