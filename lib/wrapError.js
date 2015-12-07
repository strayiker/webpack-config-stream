'use strict';

var gutil = require('gulp-util'),
    PLUGIN_NAME = require('./pluginName');

/**
 * @private
 * @function
 * @alias wrapError
 * @param {String|Error} message
 * @param {Object} options
 * @returns {Error}
 */
function wrapError(message, options) {
    return new gutil.PluginError(PLUGIN_NAME, message, options);
}

/**
 * @private
 * @module webpack-config-stream/lib/wrapError
 */
module.exports = wrapError;
