'use strict';

var through = require('through2'),
    IgnoreStrategy = require('./ignoreStrategy');

/**
 * Prevents writing of `webpack.config.js`. Can be piped.
 * @function
 * @alias ignoreStream
 * @param {IgnoreStrategy=} strategy
 * @returns {Stream}
 */
function ignoreStream(strategy) {
    if (!(strategy instanceof IgnoreStrategy)) {
        strategy = IgnoreStrategy.DEFAULT;
    }

    return through.obj(function(chunk, enc, cb) {
        function done(err, isIgnored) {
            if (!isIgnored) {
                cb(err, chunk);
            } else {
                cb(err);
            }
        }

        strategy.execute(this, chunk, done);
    });
}

/**
 * @module webpack-config-stream/lib/ignoreStream
 * @returns {ignoreStream}
 */
module.exports = ignoreStream;
