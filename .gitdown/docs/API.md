## gulp-webpack-build API docs

``` javascript
{"gitdown": "include", "file": "samples/gulpfile.js"}
```

### webpack.configure(options)

Helps to configure `webpack` compiler. Can be piped.

#### options
Type: `Object`

##### options.useMemoryFs
Type: `Boolean`
Default: `false`

Uses [memory-fs](https://github.com/webpack/memory-fs) for `compiler.outputFileSystem`. Prevents writing of emitted files to file system. `gulp.dest` can be used.
`gulp.dest` is resolved relative to [output.path](https://github.com/webpack/docs/wiki/configuration#outputpath) if it is set; otherwise, it is resolved relative to [options.base](https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsbase) (by default, the path of `gulpfile.js`).

##### options.progress
Type: `Boolean`
Default: `false`

Adds ability to track compilation progress.

### webpack.overrides(options)

Overrides existing properties of each `webpack.config.js` file. Can be piped.

#### options
Type: `Object`

Please see [configuration](http://webpack.github.io/docs/configuration.html#configuration-object-content).

### webpack.compile(callback)

Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.run`. Re-emits all data passed from `webpack.run`. Can be piped.

**Note**: Needs to be used after `webpack.configure` and `webpack.overrides`.

#### callback(err, stats)
Type: `Function`

Called when each `webpack.config.js` file is compiled. Will be passed `err` and `stats` objects.

##### callback execution context (`this`)
Type: `Stream`

Original reference to `gulp.src(path.join(path.join(src, '**', CONFIG_FILENAME)), { base: path.resolve(src) })`.

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

### webpack.closest([basename])

For each file returned by `gulp.src()`, finds the closest `webpack.config.js` file (searching the directory as well as its ancestors). Can be piped.

**Note**: Needs to be used together with `webpack.watch`.

#### basename
Type: `String`
Default: `webpack.config.js`

The name of config file.

### webpack.watch(callback)

Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.watch`. Re-emits all data passed from `webpack.watch`. Can be piped.

**Note**: Needs to be used after `webpack.configure` and `webpack.overrides`.

#### callback(err, stats)
Type: `Function`

Called when each `webpack.config.js` file is compiled. Will be passed `err` and `stats` objects.

##### callback execution context (`this`)
Type: `Stream`

Original reference to `gulp.src(event.path, { base: path.resolve(src) })`.

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
