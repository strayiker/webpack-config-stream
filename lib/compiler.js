'use strict';

var path = require('path'),
    webpack = require('webpack'),
    WebpackConfig = require('webpack-config'),
    MemoryFileSystem = require('memory-fs'),
    util = require('./util');

var compilers = {};

function Compiler(options) {
    if (!options) { options = {}; }

    this.options = options;
}

Compiler.prototype.loadConfig = function(file) {
    return Compiler.loadConfig(file, this.options);
};

Compiler.prototype.isConfigFile = function(file) {
    var isConfigFile = this.options.isConfigFile;

    if (!util.isFunction(isConfigFile)) { isConfigFile = Compiler.isConfigFile; }

    return isConfigFile(file);
};

Compiler.prototype.isConfigObject = function(config) {
    var isConfigObject = this.options.isConfigObject;

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

Compiler.prototype.compilerFor = function(file) {
    var compiler = this.getCompiler(file);

    if (!compiler) {
        var config = this.configFor(file);

        if (config) {
            compiler = webpack(config);

            this.setCompiler(file, compiler);
        }
    }

    if (compiler) {
        compiler.outputFileSystem = new MemoryFileSystem();
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
        var watchDelay = this.options.watchDelay || 200;

        watcher = compiler.watch(watchDelay, callback);
    }

    return util.isDefined(watcher);
};

Compiler.loadConfig = function(file, options) {
    if (!util.isObject(options)) { options = {}; }

    var filename = path.resolve(file.path),
        config = WebpackConfig.load(filename, false);

    config.file = file;

    config.output = config.output || {};

    if (!config.output.path) {
        config.output.path = path.dirname(filename);
    }

    config.merge(options);

    return config;
};

Compiler.isConfigFile = function(file) {
    return file && file.path.indexOf(WebpackConfig.CONFIG_FILENAME) >= 0;
};

Compiler.isConfigObject = function(config) {
    return util.isObject(config);
};

module.exports = Compiler;
