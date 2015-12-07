'use strict';

var path = require('path'),
    through = require('through2'),
    tildify = require('tildify'),
    gutil = require('gulp-util'),
    CacheStrategy = require('./cacheStrategy'),
    DefaultCacheStrategy = require('./defaultCacheStrategy');

/**
 * @constant
 * @private
 * @type {String}
 */
var UP_TO_DATE_MESSAGE = 'Up-to-date webpack config';

/**
 * @constant
 * @private
 * @type {String}
 */
var OBSOLETE_MESSAGE = 'Obsolete webpack config';

/**
 * Helps to prevent compilation of `webpack.config.js` if nothing changes.
 * **Note**: Needs to be used before `webpack.run()` and `webpack.watch()`.
 * @function
 * @alias cacheStream
 * @param {CacheStrategy=} strategy
 * @returns {Stream}
 */
function cacheStream(strategy) {
    if (!(strategy instanceof CacheStrategy)) {
        strategy = DefaultCacheStrategy.INSTANCE;
    }

    return through.obj(function(chunk, enc, cb) {
        strategy.executeStart(this, chunk).then(function(isChanged) {
            var filename = path.resolve(chunk.path);

            if (isChanged === true) {
                gutil.log(OBSOLETE_MESSAGE, gutil.colors.magenta(tildify(filename)));

                cb(null, chunk);
            } else {
                gutil.log(UP_TO_DATE_MESSAGE, gutil.colors.magenta(tildify(filename)));

                cb();
            }
        });
    }, function(cb) {
        strategy.executeEnd().then(function() {
            cb();
        });
    });
}

/**
 * @module webpack-config-stream/lib/cacheStream
 * @returns {cacheStream}
 */
module.exports = cacheStream;
module.exports.UP_TO_DATE_MESSAGE = UP_TO_DATE_MESSAGE;
module.exports.OBSOLETE_MESSAGE = OBSOLETE_MESSAGE;
