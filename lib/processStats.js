'use strict';

var util = require('./util'),
    extractFiles = require('./extractFiles');

/**
 * @constant
 * @private
 * @type {String}
 */
var STATS_DATA_FIELD_NAME = 'webpackStats';

/**
 * @constant
 * @private
 * @type {String}
 */
var STATS_FLAG_FIELD_NAME = 'isWebpackStats';

/**
 * @private
 * @alias processStats
 * @function
 * @param {File} chunk
 * @param {Stats} stats
 * @this Stream
 */
function processStats(chunk, stats) {
    var isStats = util.isStats(stats) || util.isMultiStats(stats);

    if (isStats) {
        var files = extractFiles(chunk, stats);

        files.forEach(function (file) {
            this.push(file);
        }, this);

        chunk[STATS_DATA_FIELD_NAME] = stats;
        chunk[STATS_FLAG_FIELD_NAME] = isStats;
    }
}

/**
 * @private
 * @module webpack-config-stream/lib/processStats
 * @returns {processStats}
 */
module.exports = processStats;
module.exports.STATS_DATA_FIELD_NAME = STATS_DATA_FIELD_NAME;
module.exports.STATS_FLAG_FIELD_NAME = STATS_FLAG_FIELD_NAME;
