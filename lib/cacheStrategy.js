'use strict';

var _ = require('lodash');

/**
 * @alias CacheStrategy
 * @class
 * @constructor
 * @param {Object=} options
 */
function CacheStrategy(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    this.options = options;
}

/**
 * @abstract
 * @param {Stream} stream
 * @param {File} chunk
 * @returns {Promise}
 */
CacheStrategy.prototype.executeStart = function(stream, chunk) {}; // eslint-disable-line

/**
 * @abstract
 * @returns {Promise}
 */
CacheStrategy.prototype.executeEnd = function() {};

/**
 * @module webpack-config-stream/lib/cacheStrategy
 * @returns {CacheStrategy}
 */
module.exports = CacheStrategy;
