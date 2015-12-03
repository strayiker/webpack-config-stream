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
        strategy.execute(this, chunk).then(function(isIgnored) {
            if (!isIgnored) {
                cb(null, chunk);
            } else {
                cb(null);
            }
        });
    });
}

/**
 * @module webpack-config-stream/lib/ignoreStream
 * @returns {ignoreStream}
 */
module.exports = ignoreStream;
