'use strict';

var path = require('path'),
    fs = require('fs'),
    through = require('through2'),
    tildify = require('tildify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    defaults = require('defaults'),
    webpack = require('webpack'),
    WebpackConfig = require('webpack-config'),
    CompilerAdapter = require('./lib/compilerAdapter'),
    util = require('./lib/util');

var PLUGIN_NAME = 'gulp-webpack-build',
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

function wrapError(err) {
    return new gutil.PluginError(PLUGIN_NAME, err);
}

function getOutputFs(outputFs) {
    return !util.isMemoryFs(outputFs) ? fs : outputFs;
}

function getFiles(chunk, stats) {
    if (!util.isStats(stats)) { return []; }

    var compilation = stats.compilation,
        assets = compilation.assets || {},
        compiler = compilation.compiler,
        outputFs = getOutputFs(compiler.outputFileSystem);

    return Object.keys(assets).filter(function(name) {
        var asset = assets[name];

        return asset && asset.emitted === true;
    }).map(function(name) {
        var asset = assets[name],
            filename = asset.existsAt,
            base = path.resolve(filename, chunk.base),
            contents = outputFs.readFileSync(filename),
            file = new gutil.File({
                base: base,
                path: filename,
                contents: contents
            });

        file.stats = stats;

        return file;
    });
}

function processStats(chunk, stats) {
    if (!util.isStats(stats)) { return; }

    var files = getFiles(chunk, stats);

    if (files.length > 0) {
        files.forEach(function(file) {
            this.push(file);
        }, this);
    } else {
        chunk.stats = stats;

        this.push(chunk);
    }
}

function progressCallback(p, msg) {
    var percentage = Math.floor(p * 100) + '%';

    if (p === 0) {
        var filename = path.resolve(this.options.config.filename);

        gutil.log('Progress for webpack config', gutil.colors.magenta(tildify(filename)));
    }

    gutil.log(percentage, gutil.colors.grey(msg));
}

function getWebpackOptions(chunk, watch) {
    var options = chunk.webpackOptions || {};

    if (watch === false) {
        delete options.watch;
    }

    return options;
}

function getCompilerOptions(chunk) {
    var options = chunk.compilerOptions || {};

    if (options.progress === true) {
        options.progress = progressCallback;
    }

    return options;
}

function compile(callback) {
    if (!util.isFunction(callback)) { callback = function() {}; }

    return through.obj(function(chunk, enc, cb) {
        var webpackOptions = getWebpackOptions(chunk, false),
            compilerOptions = getCompilerOptions(chunk),
            adapter = new CompilerAdapter(webpackOptions, compilerOptions);

        var compiler = adapter.run(chunk, function(err, stats) {
            processStats.call(this, chunk, stats);

            if (err) { this.emit('error', wrapError(err)); }

            cb(err);
            callback.apply(chunk, [err, stats]);
        }.bind(this));

        if (util.isUndefined(compiler)) {
            cb();
        }
    });
}

function format(options) {
    if (!util.isObject(options)) { options = {}; }

    var cache = [],
        statsOptions = options.verbose === true ? defaults(options, defaultVerboseStatsOptions) : defaults(options, defaultStatsOptions);

    if (!gutil.colors.supportsColor) {
        statsOptions.colors = false;
    }

    return through.obj(function(chunk, enc, callback) {
        var stats = chunk.stats;

        if (util.isStats(stats) && cache.indexOf(stats) < 0) {
            var compilation = stats.compilation,
                filename = path.resolve(compilation.options.config.filename);

            cache.push(stats);

            gutil.log('Stats for webpack config', gutil.colors.magenta(tildify(filename)));
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

        if (util.isStats(stats) && cache.indexOf(stats) < 0) {
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

function closest(basename) {
    return through.obj(function(chunk, enc, cb) {
        var filename = WebpackConfig.closest(chunk.path, basename);

        if (filename) {
            this.push(new gutil.File({
                path: filename,
                base: chunk.base
            }));
        }

        cb();
    });
}

var watchers = {};

function watch(callback) {
    if (!util.isFunction(callback)) { callback = function() {}; }

    return through.obj(function(chunk, enc, cb) {
        var stat = fs.statSync(chunk.path),
            watcher = watchers[chunk.path],
            isDirty = watcher && watcher.compiler.options.config.modifiedTime < stat.mtime;

        if (isDirty === true) {
            delete watchers[chunk.path];
        }

        if (!watchers[chunk.path]) {
            gutil.log('Waiting changes for webpack config', gutil.colors.magenta(tildify(chunk.path)));

            var webpackOptions = getWebpackOptions(chunk, false),
                compilerOptions = getCompilerOptions(chunk),
                adapter = new CompilerAdapter(webpackOptions, compilerOptions);

            watcher = adapter.watch(chunk, function(err, stats) {
                callback.apply(chunk, [err, stats]);
            });

            if (watcher) {
                watcher.compiler.options.config.modifiedTime = stat.mtime;

                watchers[chunk.path] = watcher;
            }
        }

        cb();
    });
}

function proxy(err, stats) {
    return through.obj(function(chunk, enc, cb) {
        processStats.call(this, chunk, stats);

        if (err) { this.emit('error', wrapError(err)); }

        cb(err);
    });
}

function overrides(options) {
    if (!util.isObject(options)) { options = {}; }

    return through.obj(function(chunk, enc, cb) {
        chunk.webpackOptions = options;

        cb(null, chunk);
    });
}

function configure(options) {
    if (!util.isObject(options)) { options = {}; }

    return through.obj(function(chunk, enc, cb) {
        chunk.compilerOptions = options;

        cb(null, chunk);
    });
}

module.exports = {
    compile: compile,
    format: format,
    failAfter: failAfter,
    closest: closest,
    watch: watch,
    proxy: proxy,
    overrides: overrides,
    configure: configure,
    core: webpack,
    config: WebpackConfig
};
