'use strict';

var _ = require('lodash'),
    through = require('through2'),
    wrapError = require('./wrapError'),
    processStats = require('./processStats'),
    util = require('./util');

/**
 * @constant
 * @private
 * @type {String}
 */
var MESSAGE = 'Cannot compile webpack config';

/**
 * Stops a task if some `stats` objects have some errors or warnings. Can be piped.
 * @function
 * @alias failAfterStream
 * @param {Object=} options - Options.
 * @param {Boolean} [options.errors=false] - Fails build if some `stats` objects have some errors.
 * @param {Boolean} [options.warnings=false] - Fails build if some `stats` objects have some warnings.
 * @returns {Stream}
 */
function failAfterStream(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    var cache = {};

    return through.obj(function(chunk, enc, cb) {
        var stats = chunk[processStats.STATS_FIELD_NAME],
            isStats = util.isStats(stats) || util.isMultiStats(stats);

        if (isStats && _.isUndefined(cache[stats.hash])) {
            cache[stats.hash] = stats;
        }

        cb(null, chunk);
    }).once('end', function() {
        var hasErrors = false,
            hasWarnings = false;

        if (options.errors === true) {
            hasErrors = _(cache).chain().values().some(function(x) {
                return x.hasErrors();
            }).value();
        }

        if (options.warnings === true) {
            hasWarnings = _(cache).chain().values().some(function(x) {
                return x.hasWarnings();
            }).value();
        }

        if (hasErrors || hasWarnings) {
            var err = new Error(MESSAGE);

            this.emit('error', wrapError(err));
        }

        cache = null;
    });
}

/**
 * @module webpack-config-stream/lib/failAfterStream
 * @returns {failAfterStream}
 */
module.exports = failAfterStream;
module.exports.MESSAGE = MESSAGE;
