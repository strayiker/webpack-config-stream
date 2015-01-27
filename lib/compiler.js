'use strict';

var path = require('path'),
    webpack = require('webpack'),
    WebpackConfig = require('webpack-config'),
    MemoryFileSystem = require('memory-fs'),
    utils = require('./utils');

var compilers = {};

function Compiler(options) {
    if (!options) { options = {}; }

    this.options = options;
}

Compiler.prototype.loadConfig = function(file) {
    return Compiler.loadConfig(file, this.options);
};

Compiler.prototype.isConfig = function(file) {
    return file && file.path.indexOf(WebpackConfig.CONFIG_FILENAME) >= 0;
};

Compiler.prototype.isCompilable = function(config) {
    return config && config.gulp === true;
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

    if (this.isConfig(file)) {
        var config = this.loadConfig(file);

        if (this.isCompilable(config)) {
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
    if (!utils.isFunction(callback)) { callback = function() {}; }

    var compiler = this.compilerFor(file);

    if (compiler) {
        compiler.run(callback);
    }

    return utils.isDefined(compiler);
};

Compiler.prototype.watch = function(file, callback) {
    if (!utils.isFunction(callback)) { callback = function() {}; }

    var compiler = this.compilerFor(file),
        watcher;

    if (compiler) {
        var watchDelay = this.options.watchDelay || 200;

        watcher = compiler.watch(watchDelay, callback);
    }

    return utils.isDefined(watcher);
};

Compiler.loadConfig = function(file, options) {
    if (!utils.isObject(options)) { options = {}; }

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

module.exports = Compiler;
