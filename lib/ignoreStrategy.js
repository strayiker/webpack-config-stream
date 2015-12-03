'use strict';

var path = require('path'),
    _ = require('lodash'),
    WebpackConfig = require('webpack-config'),
    Promise = require('bluebird'),
    minimatch = require('minimatch');

/**
 * @alias IgnoreStrategy
 * @class
 * @constructor
 * @param {Object=} options
 * @param {String} [options.pattern='webpack.config.js'] - `minimatch` {@link https://github.com/isaacs/minimatch#features pattern}.
 */
function IgnoreStrategy(options) {
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
IgnoreStrategy.prototype.execute = function(stream, chunk) {
    var pattern = this.options.pattern;

    if (!_.isString(pattern)) {
        pattern = WebpackConfig.FILENAME;
    }

    var isIgnored = minimatch(path.resolve(chunk.path), pattern, {
        matchBase: true
    });

    return Promise.resolve(isIgnored);
};

/**
 * @private
 * @constant
 * @type {IgnoreStrategy}
 */
var DEFAULT = new IgnoreStrategy();

/**
 * @module webpack-config-stream/lib/ignoreStrategy
 * @returns {IgnoreStrategy}
 */
module.exports = IgnoreStrategy;
module.exports.DEFAULT = DEFAULT;
