'use strict';

var path = require('path'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    WebpackConfig = require('webpack-config');

/**
 * @alias ClosestStrategy
 * @class
 * @constructor
 * @param {Object=} options
 * @param {String} [options.basename='webpack.config.js']
 */
function ClosestStrategy(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    this.options = options;
}

/**
 * @function
 * @param {Stream} stream
 * @param {File} chunk
 * @returns {Promise}
 */
ClosestStrategy.prototype.execute = function(stream, chunk) {
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
 * @type {ClosestStrategy}
 */
var DEFAULT = new ClosestStrategy();

/**
 * @module webpack-config-stream/lib/closestStrategy
 * @returns {ClosestStrategy}
 */
module.exports = ClosestStrategy;
module.exports.DEFAULT = DEFAULT;
