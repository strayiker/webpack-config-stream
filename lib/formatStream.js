'use strict';

var path = require('path'),
    _ = require('lodash'),
    tildify = require('tildify'),
    through = require('through2'),
    gutil = require('gulp-util'),
    DEFAULT_VERBOSE_STATS_OPTIONS = require('./defaultVerboseStatsOptions'),
    DEFAULT_STATS_OPTIONS = require('./defaultStatsOptions'),
    processStats = require('./processStats'),
    util = require('./util');

/**
 * @constant
 * @private
 * @type {String}
 */
var MESSAGE = 'Stats for webpack config';

/**
 * Writes formatted string of `stats` object and displays related `webpack.config.js` file path. Can be piped.
 * @function
 * @alias formatStream
 * @param {Object=} options - Options to pass to {@link http://webpack.github.io/docs/node.js-api.html#stats-tostring `stats.toString()`}.
 * @param {Boolean} [options.verbose=false] - Writes fully formatted version of `stats` object.
 * @returns {Stream}
 */
function formatStream(options) {
    if (!_.isObject(options)) {
        options = {};
    }

    var cache = {},
        statsOptions = options.verbose === true ? _.defaults(options, DEFAULT_VERBOSE_STATS_OPTIONS) : _.defaults(options, DEFAULT_STATS_OPTIONS);

    if (!gutil.colors.supportsColor) {
        statsOptions.colors = false;
    }

    return through.obj(function(chunk, enc, callback) {
        var stats = chunk[processStats.STATS_FIELD_NAME],
            isStats = util.isStats(stats) || util.isMultiStats(stats);

        if (isStats && _.isUndefined(cache[stats.hash])) {
            var filename = path.resolve(chunk[processStats.CONFIG_FIELD_NAME].path);

            cache[stats.hash] = stats;

            gutil.log(MESSAGE, gutil.colors.magenta(tildify(filename)));
            gutil.log('\n' + stats.toString(statsOptions));
        }

        callback(null, chunk);
    }).once('end', function() {
        cache = null;
    });
}

/**
 * @module webpack-config-stream/lib/formatStream
 * @returns {formatStream}
 */
module.exports = formatStream;
module.exports.MESSAGE = MESSAGE;
