## gulp-webpack-build API docs

``` javascript
var webpack = require('gulp-webpack-build');
```

### webpack.compile(options[, callback])

Filters all files to find `webpack.config.js` files, then compiles via `webpack.run`. Re-emits all data passed from `webpack.run`. Can be piped.

#### options
Type: `Object`

Overrides existing properties of each `webpack.config.js` file.

Please see [configuration](http://webpack.github.io/docs/configuration.html#configuration-object-content).

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

Alias for [webpack](http://webpack.github.io/docs/node.js-api.html).

### webpack.config

Alias for [webpack-config](http://mdreizin.github.io/webpack-config).
