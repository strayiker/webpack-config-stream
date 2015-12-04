'use strict';

var path = require('path'),
    fallbackFs = require('fs'),
    _ = require('lodash'),
    gutil = require('gulp-util'),
    util = require('./util');

/**
 * @private
 * @function
 * @param {File} chunk
 * @param {Stats} stats
 * @returns {File[]}
 */
function getFiles(chunk, stats) {
    if (!util.isStats(stats)) {
        return [];
    }

    var compilation = stats.compilation,
        assets = compilation.assets || {},
        compiler = compilation.compiler,
        fs = util.isMemoryFs(compiler.outputFileSystem) ? compiler.outputFileSystem : fallbackFs;

    return _(assets).chain().keys().filter(function(key) {
        var asset = assets[key];

        return asset && asset.emitted === true;
    }).map(function(key) {
        var asset = assets[key],
            filename = asset.existsAt,
            base = path.resolve(filename, chunk.base),
            contents = fs.readFileSync(filename);

        return new gutil.File({
            base: base,
            path: filename,
            contents: contents
        });
    }).value();
}

/**
 * @private
 * @function
 * @param {Stats} stats
 * @returns {Stats[]}
 */
function toMultiStats(stats) {
    var multiStats = [];

    if (util.isStats(stats)) {
        multiStats = [stats];
    } else if (util.isMultiStats(stats)) {
        multiStats = stats.stats;
    }

    return multiStats;
}

/**
 * @private
 * @function
 * @param {File} chunk
 * @param {Stats} stats
 * @returns {File[]}
 */
function extractFiles(chunk, stats) {
    var multiStats = toMultiStats(stats);

    return _(multiStats).chain().map(function(x) {
        return getFiles(chunk, x);
    }).flatten().value();
}

/**
 * @private
 * @module webpack-config-stream/lib/extractFiles
 * @returns {extractFiles}
 */
module.exports = extractFiles;
