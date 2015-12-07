'use strict';

var glob = require('glob'),
    _ = require('lodash'),
    Promise = require('bluebird');

/**
 * @private
 * @function
 * @param {String} pattern - `minimatch` {@link https://github.com/isaacs/minimatch#features pattern}.
 * @returns {Promise}
 */
function match(pattern) {
    return new Promise(function(resolve, reject) {
        glob(pattern, {
            cache: true,
            dot: false,
            silent: true
        }, function(err, files) {
            if (_.isError(err)) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

/**
 * @private
 * @function
 * @param {...String} arguments
 * @returns {Promise}
 */
function findFiles() {
    var patterns = _.flatten(_.toArray(arguments), true);

    return Promise.reduce(patterns, function(acc, pattern) {
        return match(pattern).then(function(files) {
            acc = acc.concat(files);

            return acc;
        });
    }, []);
}

/**
 * @private
 * @module webpack-config-stream/lib/findFiles
 * @returns {findFiles}
 */
module.exports = findFiles;
