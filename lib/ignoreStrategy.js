'use strict';

var _ = require('lodash'),
    Promise = require('bluebird');

/**
 * @alias IgnoreStrategy
 * @class
 * @constructor
 * @param {Object=} options
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
IgnoreStrategy.prototype.execute = function(stream, chunk) { // eslint-disable-line
    return Promise.resolve(false);
};

/**
 * @module webpack-config-stream/lib/ignoreStrategy
 * @returns {IgnoreStrategy}
 */
module.exports = IgnoreStrategy;
