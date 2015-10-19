'use strict';

var path = require('path'),
    tildify = require('tildify'),
    gutil = require('gulp-util');

/**
 * @constant
 * @private
 * @type {String}
 */
var MESSAGE = 'Progress for webpack config';

/**
 * @private
 * @alias progressCallback
 * @function
 * @param {File} chunk
 * @param {Number} p
 * @param {String} msg
 */
function progressCallback(chunk, p, msg) {
    var percentage = Math.floor(p * 100) + '%';

    if (p === 0) {
        var filename = path.resolve(chunk.path);

        gutil.log(MESSAGE, gutil.colors.magenta(tildify(filename)));
    }

    gutil.log(percentage, gutil.colors.grey(msg));
}

/**
 * @private
 * @module webpack-config-stream/lib/progressCallback
 * @returns {progressCallback}
 */
module.exports = progressCallback;
module.exports.MESSAGE = MESSAGE;
