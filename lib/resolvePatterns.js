'use strict';

var path = require('path'),
    _ = require('lodash'),
    InMemoryConfigEnvironment = require('webpack-config/lib/inMemoryConfigEnvironment'),
    DefaultConfigNameResolver = require('webpack-config/lib/defaultConfigNameResolver'),
    DefaultConfigPathResolver = require('webpack-config/lib/defaultConfigPathResolver');

/**
 * @private
 * @function
 * @param {String} filename
 * @param {String[]} patterns
 * @returns {String[]}
 */
function resolvePatterns(filename, patterns) {
    var configEnvironment = new InMemoryConfigEnvironment();

    configEnvironment.setAll({
        filename: filename,
        dirname: path.dirname(filename)
    });

    var configNameResolver = new DefaultConfigNameResolver(configEnvironment),
        configPathResolver = new DefaultConfigPathResolver(configNameResolver);

    return _.map(patterns, configPathResolver.resolvePath, configPathResolver);
}

/**
 * @private
 * @module webpack-config-stream/lib/resolvePatterns
 * @returns {resolvePatterns}
 */
module.exports = resolvePatterns;
