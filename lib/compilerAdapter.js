'use strict';

var _ = require('lodash'),
    CompilerCache = require('./compilerCache');

/**
 * Called when `webpack.config.js` file is compiled. Will be passed `err` and `stats` objects.
 * **Note**: `this` is stream of `webpack.config.js` file.
 * @private
 * @callback compilerCallback
 * @function
 * @param {Error} err
 * @param {Stats} stats
 * @this Stream
 */

/**
 * @constant
 * @private
 * @type {String}
 */
var WATCHER_FIELD_NAME = 'watcher';
var DEV_SERVER_FIELD_NAME = 'devserver';

/**
 * @alias CompilerAdapter
 * @class
 * @param {Object} compilerOptions
 * @param {Configuration=} webpackOptions
 * @constructor
 */
function CompilerAdapter(compilerOptions, webpackOptions) {
    this.compilerCache = new CompilerCache(compilerOptions, webpackOptions);
}

/**
 * Runs compiler
 * @param {File} file
 * @param {compilerCallback} callback
 * @returns {Compiler}
 */
CompilerAdapter.prototype.run = function(file, callback) {
    if (!_.isFunction(callback)) {
        throw new Error('callback is required');
    }

    var compiler = this.compilerCache.getOrCreate(file);

    if (compiler) {
        compiler.run(callback);
    }

    return compiler;
};

/**
 * Runs compiler in `watch` mode
 * @param {File} file
 * @param {compilerCallback} callback
 * @returns {Compiler}
 */
CompilerAdapter.prototype.watch = function(file, callback) {
    if (!_.isFunction(callback)) {
        throw new Error('callback is required');
    }

    var compiler = this.compilerCache.getOrCreate(file),
        watcher;

    if (compiler) {
        var watchOptions = compiler.options && compiler.watchOptions || {};

        watcher = compiler[WATCHER_FIELD_NAME];

        if (watcher) {
            watcher.close(function() {});

            compiler = this.compilerCache.create(file);
        }

        watcher = compiler.watch(watchOptions, callback);

        if (watcher) {
            compiler[WATCHER_FIELD_NAME] = watcher;

            this.compilerCache.put(file.path, compiler);
        }
    }

    return watcher;
};

/**
 * Runs dev server
 * @param {File} file
 * @param {compilerCallback} callback
 * @returns {Compiler}
 */
CompilerAdapter.prototype.dev = function(file, callback) {
    if (!_.isFunction(callback)) {
        throw new Error('callback is required');
    }

    var compiler = this.compilerCache.getOrCreate(file),
        server;

    if (!compiler) {
        return server;
    }

    var options = compiler.options && compiler.options.devServer || {};

    server = compiler[DEV_SERVER_FIELD_NAME];

    if (!server && options) {
        server = new WebpackDevServer(compiler, options);
        server.listen(options.port, options.host, function(err) {
            callback(err);
        });
        compiler[DEV_SERVER_FIELD_NAME] = server;
    }

    return server;
};

/**
 * @module webpack-config-stream/lib/compilerAdapter
 * @returns {CompilerAdapter}
 */
module.exports = CompilerAdapter;
