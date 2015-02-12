'use strict';

var path = require('path'),
    webpack = require('webpack'),
    ProgressPlugin = require('webpack/lib/ProgressPlugin'),
    WebpackConfig = require('webpack-config'),
    MemoryFs = require('memory-fs'),
    util = require('./util');

var compilers = {},
    сompilerOptionsKeys = ['isConfigFile', 'isConfigObject', 'useMemoryFs', 'progress'];

function Compiler(options) {
    if (!util.isObject(options)) { options = {}; }

    this.сompilerOptions = util.pick(options, сompilerOptionsKeys);
    this.webpackOptions = util.omit(options, сompilerOptionsKeys);
}

Compiler.prototype.loadConfig = function(file) {
    return Compiler.loadConfig(file, this.webpackOptions);
};

Compiler.prototype.isConfigFile = function(file) {
    var isConfigFile = this.сompilerOptions.isConfigFile;

    if (!util.isFunction(isConfigFile)) { isConfigFile = Compiler.isConfigFile; }

    return isConfigFile(file);
};

Compiler.prototype.isConfigObject = function(config) {
    var isConfigObject = this.сompilerOptions.isConfigObject;

    if (!util.isFunction(isConfigObject)) { isConfigObject = Compiler.isConfigObject; }

    return isConfigObject(config);
};

Compiler.prototype.getCompiler = function(file) {
    var filename = path.resolve(file.path);

    return compilers[filename];
};

Compiler.prototype.setCompiler = function(file, compiler) {
    var filename = path.resolve(file.path);

    compilers[filename] = compiler;

    return compiler;
};

Compiler.prototype.configFor = function(file) {
    var result;

    if (this.isConfigFile(file)) {
        var config = this.loadConfig(file);

        if (this.isConfigObject(config)) {
            result = config;
        }
    }

    return result;
};

Compiler.prototype.createCompiler = function(file) {
    var config = this.configFor(file);

    return config && webpack(config);
};

Compiler.prototype.compilerFor = function(file) {
    var compiler = this.getCompiler(file);

    if (!compiler) {
        compiler = this.createCompiler(file);

        if (compiler) {
            this.setCompiler(file, compiler);
        }
    }

    if (compiler) {
        var useMemoryFs = this.сompilerOptions.useMemoryFs === true,
            withProgress = util.isFunction(this.сompilerOptions.progress);

        if (useMemoryFs) {
            compiler.outputFileSystem = new MemoryFs();
        }

        if (withProgress) {
            var progress = this.сompilerOptions.progress;

            compiler.apply(new ProgressPlugin(function(p, msg) {
                progress.call(compiler, p, msg);
            }));
        }
    }

    return compiler;
};

Compiler.prototype.run = function(file, callback) {
    if (!util.isFunction(callback)) { callback = function() {}; }

    var compiler = this.compilerFor(file);

    if (compiler) {
        compiler.run(callback);
    }

    return util.isDefined(compiler);
};

Compiler.prototype.watch = function(file, callback) {
    if (!util.isFunction(callback)) { callback = function() {}; }

    var compiler = this.compilerFor(file),
        watcher;

    if (compiler) {
        var watchDelay = compiler.options.watchDelay || 200;

        watcher = compiler.watch(watchDelay, callback);
    }

    return util.isDefined(watcher);
};

Compiler.loadConfig = function(file, options) {
    if (!util.isObject(options)) { options = {}; }

    var filename = path.resolve(file.path),
        config = WebpackConfig.load(filename, false);

    config.merge(options);

    config.config = {
        filename: filename
    };

    var hasOutputPath = config.output && util.isDefined(config.output.path);

    if (!hasOutputPath) {
        config.output.path = path.dirname(filename);
    }

    return config;
};

Compiler.isConfigFile = function(file) {
    return file && file.path.indexOf(WebpackConfig.CONFIG_FILENAME) >= 0;
};

Compiler.isConfigObject = function(config) {
    return util.isObject(config);
};

module.exports = Compiler;
