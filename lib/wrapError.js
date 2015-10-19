'use strict';

var gutil = require('gulp-util');

/**
 * @private
 * @constant
 * @type {String}
 */
var PLUGIN_NAME = 'webpack-config-stream';

/**
 * @private
 * @function
 * @alias wrapError
 * @param {Error} err
 * @returns {Error}
 */
function wrapError(err) {
    return new gutil.PluginError(PLUGIN_NAME, err);
}

/**
 * @private
 * @module webpack-config-stream/lib/wrapError
 */
module.exports = wrapError;
