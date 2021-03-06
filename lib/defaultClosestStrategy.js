'use strict';

var util = require('util'),
    path = require('path'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    WebpackConfig = require('webpack-config'),
    ClosestStrategy = require('./closestStrategy');

/**
 * @alias DefaultClosestStrategy
 * @class
 * @constructor
 * @implements {ClosestStrategy}
 * @param {Object=} options
 * @param {String} [options.basename='webpack.config.js']
 */
function DefaultClosestStrategy(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    this.options = options;
}

util.inherits(DefaultClosestStrategy, ClosestStrategy);

/**
 * @override
 */
DefaultClosestStrategy.prototype.execute = function(stream, chunk) {
    return Promise.resolve(this.findConfig(chunk.path));
};

/**
 * @private
 * @param {String} filename
 * @returns {Config}
 */
DefaultClosestStrategy.prototype.findConfig = function(filename) {
    var basename = this.options.basename;

    if (!_.isString(basename)) {
        basename = WebpackConfig.FILENAME;
    }

    return WebpackConfig.finder.findClosestConfig(path.join(path.dirname(filename), basename));
};

/**
 * @private
 * @constant
 * @type {DefaultClosestStrategy}
 */
var INSTANCE = new DefaultClosestStrategy();

/**
 * @module webpack-config-stream/lib/defaultClosestStrategy
 * @returns {DefaultClosestStrategy}
 */
module.exports = DefaultClosestStrategy;
module.exports.INSTANCE = INSTANCE;
