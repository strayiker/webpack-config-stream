'use strict';

var _ = require('lodash');

/**
 * @alias ClosestStrategy
 * @class
 * @constructor
 * @param {Object=} options
 */
function ClosestStrategy(options) {
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
ClosestStrategy.prototype.execute = function(stream, chunk) {}; // eslint-disable-line

/**
 * @module webpack-config-stream/lib/closestStrategy
 * @returns {ClosestStrategy}
 */
module.exports = ClosestStrategy;
