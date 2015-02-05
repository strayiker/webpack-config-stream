## gulp-webpack-build API docs

``` javascript
{"gitdown": "include", "file": "samples/gulpfile.js"}
```
### webpack.compile(options[, callback])

Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.run`. Re-emits all data passed from `webpack.run`. Can be piped.

#### options
Type: `Object`

Overrides existing properties of each `webpack.config.js` file.

Please see [configuration](http://webpack.github.io/docs/configuration.html#configuration-object-content).

##### options.isConfigFile(file)
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

##### options.useMemoryFs
Type: `Boolean`
Default: `false`

Uses [memory-fs](https://github.com/webpack/memory-fs) for `compiler.outputFileSystem`. Prevents to write emitted files to file system. `gulp.dest` can be used.

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

### webpack.closest

Finds closest `webpack.config.js` file. Needs to be used together with `webpack.watch`. Can be piped.

### webpack.watch(options, callback)

Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.watch`. Re-emits all data passed from `webpack.watch`. Can be piped.

#### options
Type: `Object`

Please see [configuration](http://webpack.github.io/docs/configuration.html#configuration-object-content).

#### options.watchDelay
Type: `Integer`

Please see [`watchDelay`](http://webpack.github.io/docs/configuration.html#watchdelay).

##### options.isConfigFile(file)
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

##### options.useMemoryFs
Type: `Boolean`
Default: `false`

Uses [memory-fs](https://github.com/webpack/memory-fs) for `compiler.outputFileSystem`. Prevents to write emitted files to file system. `gulp.dest` can be used.

#### callback(stream, err, stats)
Type: `Function`

Called when each `webpack.config.js` file is compiled. Will be passed `stream`, `err` and `stats` objects.

##### callback.stream
Type: `Stream`

Please see [vinyl-fs](https://github.com/wearefractal/vinyl-fs).

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

Alias for [webpack-config](http://mdreizin.github.io/webpack-config).
