'use strict';

var util = require('util'),
    _ = require('lodash'),
    CacheStore = require('./cacheStore'),
    CacheStrategy = require('./cacheStrategy');

/**
 * @private
 * @type {CacheStore}
 */
var CACHE = CacheStore.INSTANCE;

/**
 * @alias DefaultCacheStrategy
 * @class
 * @constructor
 * @implements {CacheStrategy}
 * @param {Object=} options
 * @param {String[]} [options.dependsOn=[]] - Array of `minimatch` {@link https://github.com/isaacs/minimatch#features patterns}.
 * Available macros:
 * `[filename]` - full path to `webpack.config.js`
 * `[dirname]` - directory of `webpack.config.js`
 */
function DefaultCacheStrategy(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    this.options = options;
}

util.inherits(DefaultCacheStrategy, CacheStrategy);

/**
 * @override
 */
DefaultCacheStrategy.prototype.executeStart = function(stream, chunk) {
    return CACHE.hasChanges(chunk.path, this.options.dependsOn);
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
