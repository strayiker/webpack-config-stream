'use strict';

var _ = require('lodash'),
    through = require('through2'),
    tildify = require('tildify'),
    gutil = require('gulp-util'),
    CompilerAdapter = require('./compilerAdapter'),
    initStream = require('./initStream'),
    propsStream = require('./propsStream');
    processStats = require('./processStats');

/**
 * @constant
 * @private
 * @type {String}
 */
var MESSAGE = 'Waiting changes for webpack config';

/**
 * Accepts `webpack.config.js` files via `gulp.src()`, then run dev server. Re-emits all data passed from `webpack.dev()`. Can be piped.
 * **Note**: Needs to be used after `webpack.init()` and `webpack.props()`.
 * @function
 * @alias devStream
 * @param {compilationCallback=} callback
 * @returns {Stream}
 */
function devStream(callback) {
    if (!_.isFunction(callback)) {
        callback = function() {};
    }

    return through.obj(function(chunk, enc, cb) {
        var webpackOptions = chunk[propsStream.FIELD_NAME] || {},
            compilerOptions = chunk[initStream.FIELD_NAME] || {},
            adapter = new CompilerAdapter(compilerOptions, webpackOptions);

        gutil.log(MESSAGE, gutil.colors.magenta(tildify(chunk.path)));

        var server = adapter.dev(chunk, _.bind(function(err, stats) {
            processStats.call(this, chunk, stats);

            if (_.isError(err)) {
                this.emit('error', wrapError(err));
            }

            cb(null, chunk);
            callback.apply(chunk, [err, stats]);
        }, this));

        if (_.isUndefined(server)) {
            cb();
        }
    });
}

/**
 * @module webpack-config-stream/lib/devStream
 * @returns {devStream}
 */
module.exports = devStream;
module.exports.MESSAGE = MESSAGE;
