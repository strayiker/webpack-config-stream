'use strict';

var path = require('path'),
    _ = require('lodash');

/**
 * @class
 * @alias PatternResolver
 * @param {Object} environment
 * @constructor
 */
function PatternResolver(environment) {
    this.environment = environment;
    this.patterns = {};
}

/**
 * Resolves `dependsOn` patterns
 * @param {String[]} dependsOn - Array of `minimatch` {@link https://github.com/isaacs/minimatch#features patterns}.
 * @returns {String[]}
 */
PatternResolver.prototype.resolve = function(dependsOn) {
    if (!_.isArray(dependsOn)) {
        dependsOn = [];
    }

    var patterns = [].concat(dependsOn);

    _.forEach(patterns, function(filename, index) {
        _.forEach(this.environment, function(value, key) {
            var pattern = this.patterns[key];

            if (!pattern) {
                pattern = new RegExp(_.escapeRegExp('[' + key + ']'));

                this.patterns[key] = pattern;
            }

            filename = filename.replace(pattern, value);
        }, this);

        patterns[index] = path.resolve(filename);
    }, this);

    return patterns;
};

/**
 * @private
 * @module webpack-config-stream/lib/patternResolver
 * @returns {PatternResolver}
 */
module.exports = PatternResolver;
