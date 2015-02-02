<!--
This file has been generated using Gitdown (https://github.com/gajus/gitdown).
Direct edits to this will be be overwritten. Look for Gitdown markup file under ./.gitdown/ path.
-->
## gulp-webpack-build API docs

``` javascript
'use strict';

var path = require('path'),
    gulp = require('gulp'),
    webpack = require('gulp-webpack-build');

var src = './src/**/',
    dest = './dist',
    webpackOptions = {
        debug: true,
        devtool: '#source-map',
        isConfigFile: function(file) {
            return file && file.path.indexOf(webpack.config.CONFIG_FILENAME) >= 0;
        },
        isConfigObject: function(config) {
            return config && !config.ignore;
        }
    };

gulp.task('webpack', [], function() {
    return gulp.src(src + webpack.config.CONFIG_FILENAME)
        .pipe(webpack.compile(webpackOptions))
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    gulp.watch(src + '*.js').on('change', function(event) {
        if (event.type === 'changed') {
            webpack.watch(event.path, webpackOptions, { base: path.resolve(event.path) }, function(err, stats) {
                gulp.src(event.path)
                    .pipe(webpack.proxy(err, stats))
                    .pipe(webpack.format({
                        verbose: true,
                        version: false
                    }))
                    .pipe(gulp.dest(dest));
            });
        }
    });
});

```
### webpack.compile(options[, callback])

Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.run`. Re-emits all data passed from `webpack.run`. Can be piped.

#### options
Type: `Object`

Overrides existing properties of each `webpack.config.js` file.

Please see [configuration](http://webpack.github.io/docs/configuration.html#configuration-object-content).

##### options.isConfig(file)
Type: `Function`

By default this plugin uses the following function to filter `webpack.config.js` [`files`](https://github.com/wearefractal/vinyl):

```
function isConfigFile(file) {
    return file && file.path.indexOf(WebpackConfig.CONFIG_FILENAME) >= 0;
}
```

Uses a new `Function` to override this behavior.

##### options.isConfigObject(config)
Type: `Function`

By default this plugin uses the following function to filter webpack [`configuration`](http://webpack.github.io/docs/configuration.html#configuration-object-content) objects:

```
function isConfigObject(config) {
    return config != null && typeof config === 'object';
}
```

Uses a new `Function` to override this behavior.

#### callback(err, stats)
Type: `Function`

Called when each `webpack.config.js` file is compiled. Will be passed `err` and `stats` objects.

##### callback.err
Type: `Error`

##### callback.stats
Type: `Object`

Please see [stats](http://webpack.github.io/docs/node.js-api.html#stats).

### webpack.format(options)

Writes formatted string of `stats` object and displays related `webpack.config.js` file path. Can be piped.

#### options
Type: `Object`

Options to pass to [`stats.toString`](http://webpack.github.io/docs/node.js-api.html#stats-tostring).

#### options.verbose
Type: `Boolean`
Default: `false`

Writes fully formatted version of `stats` object.

### webpack.failAfter(options)

Stops a task if some `stats` objects have some errors or warnings. Can be piped.

#### options
Type: `Object`

#### options.errors
Type: `Boolean`
Default: `false`

Fails build if some `stats` objects have some errors.

#### options.warnings
Type: `Boolean`
Default: `false`

Fails build if some `stats` objects have some warnings.

### webpack.watch(filename, options[, globOptions], callback)

Starts watching `filename` for changes via `webpack.watch` and re-emits all data passed from `webpack.watch`.

#### filename
Type: `String`

Used to find closest `webpack.config.js` file.

#### options
Type: `Object`

Please see [configuration](http://webpack.github.io/docs/configuration.html#configuration-object-content).

#### options.watchDelay
Type: `Integer`

Please see [`watchDelay`](http://webpack.github.io/docs/configuration.html#watchdelay).

##### options.isConfig(file)
Type: `Function`

By default this plugin uses the following function to filter `webpack.config.js` [`files`](https://github.com/wearefractal/vinyl):

```
function isConfigFile(file) {
    return file && file.path.indexOf(WebpackConfig.CONFIG_FILENAME) >= 0;
}
```

Uses a new `Function` to override this behavior.

##### options.isConfigObject(config)
Type: `Function`

By default this plugin uses the following function to filter webpack [`configuration`](http://webpack.github.io/docs/configuration.html#configuration-object-content) objects:

```
function isConfigObject(config) {
    return config != null && typeof config === 'object';
}
```

Uses a new `Function` to override this behavior.

#### globOptions
Type: `Object`

Options to pass to [node-glob](https://github.com/isaacs/node-glob) through [glob-stream](https://github.com/wearefractal/glob-stream).

#### callback(err, stats)
Type: `Function`

Called when each `webpack.config.js` file is compiled. Will be passed `err` and `stats` objects.

##### callback.err
Type: `Error`

##### callback.stats
Type: `Object`

Pleas see [stats](http://webpack.github.io/docs/node.js-api.html#stats).

### webpack.proxy(err, stats)

Re-uses existing `err` and `stats` objects. Can be piped.

#### err
Type: `Error`

#### stats
Type: `Object`

Please see [stats](http://webpack.github.io/docs/node.js-api.html#stats).

### webpack.core

Read-only property.

Alias for [webpack](http://webpack.github.io/docs/node.js-api.html).

### webpack.config

Read-only property.

Alias for [webpack-config](http://mdreizin.github.io/webpack-config). Read-only.
