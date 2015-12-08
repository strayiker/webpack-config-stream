'use strict';

/**
 * @alias ClosestStrategy
 * @interface
 */
function ClosestStrategy() {}

/**
 * @abstract
 * @param {Stream} stream
 * @param {File} chunk
 * @returns {Promise}
 */
ClosestStrategy.prototype.execute = function(stream, chunk) {}; // eslint-disable-line

/**
 * @module webpack-config-stream/lib/closestStrategy
 * @returns {ClosestStrategy}
 */
module.exports = ClosestStrategy;
