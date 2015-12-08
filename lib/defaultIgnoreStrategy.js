'use strict';

var util = require('util'),
    path = require('path'),
    _ = require('lodash'),
    WebpackConfig = require('webpack-config'),
    Promise = require('bluebird'),
    minimatch = require('minimatch'),
    IgnoreStrategy = require('./ignoreStrategy');

/**
 * @alias DefaultIgnoreStrategy
 * @class
 * @constructor
 * @implements {IgnoreStrategy}
 * @param {Object=} options
 * @param {String} [options.pattern='webpack.config.js'] - `minimatch` {@link https://github.com/isaacs/minimatch#features pattern}.
 */
function DefaultIgnoreStrategy(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    this.options = options;
}

util.inherits(DefaultIgnoreStrategy, IgnoreStrategy);

/**
 * @override
 */
DefaultIgnoreStrategy.prototype.execute = function(stream, chunk) {
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
 * @type {DefaultIgnoreStrategy}
 */
var INSTANCE = new DefaultIgnoreStrategy();

/**
 * @module webpack-config-stream/lib/defaultIgnoreStrategy
 * @returns {DefaultIgnoreStrategy}
 */
module.exports = DefaultIgnoreStrategy;
module.exports.INSTANCE = INSTANCE;
