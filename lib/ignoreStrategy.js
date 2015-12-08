'use strict';

/**
 * @alias IgnoreStrategy
 * @interface
 */
function IgnoreStrategy() {}

/**
 * @abstract
 * @param {Stream} stream
 * @param {File} chunk
 * @returns {Promise}
 */
IgnoreStrategy.prototype.execute = function(stream, chunk) {}; // eslint-disable-line

/**
 * @module webpack-config-stream/lib/ignoreStrategy
 * @returns {IgnoreStrategy}
 */
module.exports = IgnoreStrategy;
