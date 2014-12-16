'use strict';

var path = require('path'),
    q = require('q'),
    through = require('through2'),
    tildify = require('tildify'),
    MemoryFileSystem = require('memory-fs'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    WebpackConfig = require('webpack-config');

var PLUGIN_NAME = 'gulp-webpack-config',
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
  };

function buildConfig(file, options) {
    var webpackFile = path.resolve(file.path),
        webpackConfig = WebpackConfig.load(webpackFile);

    if (options.debug) {
        webpackConfig.merge({
            debug: true,
            devtool: '#source-map'
        });
    }

    webpackConfig.output = webpackConfig.output || {};

    if (!webpackConfig.output.path) {
        webpackConfig.output.path = path.dirname(webpackFile);
    }

    return webpackConfig;
}

function buildStats(statsOptions) {
    if (!statsOptions) { statsOptions = {}; }

    Object.keys(defaultStatsOptions).forEach(function(key) {
        if (typeof statsOptions[key] === 'undefined') {
            statsOptions[key] = defaultStatsOptions[key];
        }
    });

    return statsOptions;
}

function compileConfig(file, webpackConfig, statsOptions) {
    var compiler = webpack(webpackConfig),
        deferred = q.defer();

    compiler.run(function(err, stats) {
        gutil.log('Using config', gutil.colors.magenta(tildify(path.resolve(file.path))));

        if (err) {
            deferred.reject(err);
        } else {
            gutil.log(stats.toString(statsOptions));
        }
    });

    var ms = compiler.outputFileSystem = new MemoryFileSystem();

    compiler.plugin('after-emit', function(compilation, callback) {
        var assets = compilation.assets || {},
            files = Object.keys(assets).map(function(name) {
                var emitted = assets[name].emitted === true;

                if (emitted) {
                    var outputPath = ms.join(compiler.outputPath, name),
                        base = path.resolve(outputPath, file.base),
                        contents = ms.readFileSync(outputPath);

                    return new gutil.File({
                        base: base,
                        path: outputPath,
                        contents: contents
                    });
                }
            }).filter(function(file) {
                return typeof file !== 'undefined';
            });

        deferred.resolve(files);

        callback();
    });

    return deferred.promise;
}

module.exports = function(options) {
    if (!options) { options = {}; }

    var verbose = options.verbose === true,
        processIf = options.processIf || function(x) { return x.path.indexOf(CONFIG_FILENAME) >= 0; },
        compileIf = options.compileIf || function(x) { return x.gulp === true; },
        statsOptions = verbose ? { colors: true } : buildStats(options.stats);

    return through.obj(function(file, encoding, callback) {
        if (processIf(file)) {
            var webpackConfig = buildConfig(file, options);

            if (compileIf(webpackConfig)) {
                compileConfig(file, webpackConfig, statsOptions).then(function(files) {
                    files.forEach(function(file) {
                        this.push(file);
                    }.bind(this));

                    callback();
                }.bind(this)).catch(function(err) {
                    this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
                }.bind(this));
            } else {
                callback();
            }
        } else {
            callback();
        }
    });
};
module.exports.CONFIG_FILENAME = CONFIG_FILENAME;
