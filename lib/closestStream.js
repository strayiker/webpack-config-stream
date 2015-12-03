'use strict';

var gutil = require('gulp-util'),
    _ = require('lodash'),
    through = require('through2'),
    ClosestStrategy = require('./closestStrategy'),
    DefaultClosestStrategy = require('./defaultClosestStrategy');

/**
 * For each file returned by `gulp.src()`, finds the closest `webpack.config.js` file (searching the directory as well as its ancestors). Can be piped.
 * **Note**: Needs to be used together with `webpack.watch()`.
 * **Note**: Needs to make sure that yor webpack config returns `module.exports = { filename: __filename };`.
 * @function
 * @alias closestStream
 * @param {ClosestStrategy=} strategy
 * @returns {Stream}
 */
function closestStream(strategy) {
    if (!(strategy instanceof ClosestStrategy)) {
        strategy = DefaultClosestStrategy.INSTANCE;
    }

    return through.obj(function(chunk, enc, cb) {
        strategy.execute(this, chunk).then(_.bind(function(config) {
            if (!_.isNull(config)) {
                this.push(new gutil.File({
                    path: config.filename,
                    base: chunk.base
                }));
            }
        }, this)).finally(cb);
    });
}

/**
 * @module webpack-config-stream/lib/closestStream
 * @returns {closestStream}
 */
module.exports = closestStream;
