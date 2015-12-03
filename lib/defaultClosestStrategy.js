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
 * @param {Object=} options
 * @param {String} [options.basename='webpack.config.js']
 */
function DefaultClosestStrategy(options) {
    ClosestStrategy.call(this, options);
}

util.inherits(DefaultClosestStrategy, ClosestStrategy);

/**
 * @function
 * @param {Stream} stream
 * @param {File} chunk
 * @returns {Promise}
 */
DefaultClosestStrategy.prototype.execute = function(stream, chunk) {
    var basename = this.options.basename;

    if (!_.isString(basename)) {
        basename = WebpackConfig.FILENAME;
    }

    var filename = path.join(path.dirname(chunk.path), basename),
        config = WebpackConfig.finder.closest(filename);

    return Promise.resolve(config);
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
