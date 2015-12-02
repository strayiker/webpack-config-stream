'use strict';

var path = require('path'),
    _ = require('lodash'),
    WebpackConfig = require('webpack-config');

/**
 * @callback closestCallback
 * @type {Function}
 * @param {Error} err
 * @param {WebpackConfig} config
 */

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
 * @param {closestCallback} callback
 */
ClosestStrategy.prototype.execute = function(stream, chunk, callback) {
    var basename = this.options.basename;

    if (!_.isString(basename)) {
        basename = WebpackConfig.FILENAME;
    }

    var filename = path.join(path.dirname(chunk.path), basename),
        config = WebpackConfig.finder.closest(filename);

    callback(null, config);
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
