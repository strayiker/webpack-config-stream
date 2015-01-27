'use strict';

var path = require('path'),
    through = require('through2'),
    tildify = require('tildify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    defaults = require('defaults'),
    WebpackConfig = require('webpack-config'),
    Compiler = require('./lib/compiler');

var PLUGIN_NAME = 'gulp-webpack-build',
    CONFIG_FILENAME = WebpackConfig.CONFIG_FILENAME,
    defaultStatsOptions = {
        colors: true,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: true,
        version: true,
        cached: false,
        cachedAssets: false,
        reasons: false,
        source: false,
        errorDetails: false
    },
    defaultVerboseStatsOptions = {
        colors: true,
        version: false
    };

function isFunction(value) {
    return typeof value === 'function';
}

function isUndefined(value) {
    return typeof value === 'undefined';
}

function isObject(value) {
    return value != null && typeof value === 'object';
}

function wrapError(err) {
    return new gutil.PluginError(PLUGIN_NAME, err);
}

function getFiles(stats) {
    var files = [];

    if (stats) {
        var compilation = stats.compilation,
            assets = compilation.assets || {},
            compiler = compilation.compiler,
            fs = compiler.outputFileSystem,
            file = compilation.options.file;

        return Object.keys(assets).map(function(name) {
            var emitted = assets[name].emitted === true;

            if (emitted) {
                var outputPath = fs.join(compiler.outputPath, name),
                    base = path.resolve(outputPath, file.base),
                    contents = fs.readFileSync(outputPath);

                return new gutil.File({
                    base: base,
                    path: outputPath,
                    contents: contents
                });
            }
        }).filter(function(file) {
            return !isUndefined(file);
        }).map(function(file) {
            file.stats = stats;

            return file;
        });
    }

    return files;
}

function compile(options) {
    if (!isObject(options)) { options = {}; }

    delete options.watch;

    return through.obj(function(chunk, enc, callback) {
        var compiler = new Compiler(options);

        var result = compiler.run(chunk, function(err, stats) {
            var files = getFiles(stats);

            files.forEach(function(file) {
                this.push(file);
            }, this);

            if (err) { this.emit('error', wrapError(err)); }

            callback(err);
        }.bind(this));

        if (!result) {
            callback();
        }
    });
}

function done(callback) {
    if (!isFunction(callback)) { callback = function() {}; }

    var cache = [];

    return through.obj(function(chunk, enc, cb) {
        var stats = chunk.stats;

        if (cache && cache.indexOf(stats) < 0) {
            cache.push(stats);

            callback(stats);
        }

        cb(null, chunk);
    }).once('end', function() {
        cache.splice(0, cache.length);
    });
}

function format(options) {
    if (!isObject(options)) { options = {}; }

    var cache = [],
        statsOptions = options.verbose === true ? defaults(options, defaultVerboseStatsOptions) : defaults(options, defaultStatsOptions);

    return through.obj(function(chunk, enc, callback) {
        var stats = chunk.stats;

        if (cache && cache.indexOf(stats) < 0) {
            var compilation = stats.compilation,
                filename = path.resolve(compilation.options.file.path);

            cache.push(stats);

            gutil.log('Compiling webpack config', gutil.colors.magenta(tildify(filename)));
            gutil.log('\n' + stats.toString(statsOptions));
        }

        callback(null, chunk);
    }).once('end', function() {
        cache.splice(0, cache.length);
    });
}

function failAfter(options) {
    var cache = [];

    return through.obj(function(chunk, enc, cb) {
        var stats = chunk.stats;

        if (stats && cache.indexOf(stats) < 0) {
            cache.push(stats);
        }

        cb(null, chunk);
    }).once('end', function() {
        var hasErrors = false,
            hasWarnings = false;

        if (options.errors === true) {
            hasErrors = cache.some(function(x) { return x.hasErrors(); });
        }

        if (options.warnings === true) {
            hasWarnings = cache.some(function(x) { return x.hasWarnings(); });
        }

        if (hasErrors || hasWarnings) {
            var err = new Error('Webpack cannot compile config');

            this.emit('error', wrapError(err));
        }

        cache.splice(0, cache.length);
    });
}

var watchers = {};

function watch(filename, options, globOptions, callback) {
    if (!isObject(options)) { options = {}; }
    if (isFunction(globOptions)) { callback = globOptions; }
    if (!isObject(globOptions)) { globOptions = {}; }
    if (!isFunction(callback)) { callback = function() {}; }

    options.watch = true;

    var src = WebpackConfig.closest(filename);

    gulp.src(src, globOptions)
        .pipe(through.obj(function(chunk, enc, cb) {
            if (!watchers[chunk.path]) {
                gutil.log('Watching webpack config', gutil.colors.magenta(tildify(src)));

                var compiler = new Compiler(options);

                watchers[chunk.path] = compiler.watch(chunk, function(err, stats) {
                    callback(err, stats);
                });
            }

            cb();
        }));
}

function proxy(err, stats) {
    return through.obj(function(chunk, enc, cb) {
        var files = getFiles(stats);

        files.forEach(function(file) {
            this.push(file);
        }, this);

        if (err) { this.emit('error', wrapError(err)); }

        cb(err);
    });
}

module.exports = {
    compile: compile,
    done: done,
    format: format,
    failAfter: failAfter,
    watch: watch,
    proxy: proxy,
    CONFIG_FILENAME: CONFIG_FILENAME
};
