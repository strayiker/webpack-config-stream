'use strict';

var crypto = require('crypto'),
    _ = require('lodash'),
    fs = require('fs-extra'),
    Promise = require('bluebird');

/**
 * @private
 * @function
 * @param {String} filename
 * @returns {Promise}
 */
function compute(filename) {
    return new Promise(function(resolve) {
        fs.readFile(filename, 'utf8', function(err, data) {
            var hash = crypto.createHash('sha256').update(data).digest('hex');

            resolve(hash);
        });
    });
}

/**
 * @private
 * @function
 * @param {...String} arguments
 * @returns {Promise}
 */
function getHash() {
    var files = _.flatten(_.toArray(arguments), true);

    return Promise.reduce(files, function(acc, filename) {
        return compute(filename).then(function(hash) {
            acc[filename] = hash;

            return acc;
        });
    }, {});
}

/**
 * @private
 * @module webpack-config-stream/lib/getHash
 * @returns {getHash}
 */
module.exports = getHash;
