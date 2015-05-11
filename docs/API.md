<a name="module_gulp-webpack-build"></a>
## gulp-webpack-build
**Example**  
`gulpfile.js`

``` javascript
'use strict';

var path = require('path'),
    gulp = require('gulp'),
    webpack = require('gulp-webpack-build');

var src = './src',
    dest = './dist',
    webpackOptions = {
        debug: true,
        devtool: '#source-map',
        watchDelay: 200
    },
    webpackConfig = {
        useMemoryFs: true,
        progress: true
    },
    CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;

gulp.task('webpack', [], function() {
    return gulp.src(path.join(src, '**', CONFIG_FILENAME), { base: path.resolve(src) })
        .pipe(webpack.configure(webpackConfig))
        .pipe(webpack.overrides(webpackOptions))
        .pipe(webpack.compile())
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
    gulp.watch(path.join(src, '**/*.*')).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src(event.path, { base: path.resolve(src) })
                .pipe(webpack.closest(CONFIG_FILENAME))
                .pipe(webpack.configure(webpackConfig))
                .pipe(webpack.overrides(webpackOptions))
                .pipe(webpack.watch(function(err, stats) {
                    gulp.src(this.path, { base: this.base })
                        .pipe(webpack.proxy(err, stats))
                        .pipe(webpack.format({
                            verbose: true,
                            version: false
                        }))
                        .pipe(gulp.dest(dest));
                }));
        }
    });
});

```

* [gulp-webpack-build](#module_gulp-webpack-build)
  * [.core](#module_gulp-webpack-build.core)
  * [.config](#module_gulp-webpack-build.config)
  * [.compile([callback])](#module_gulp-webpack-build.compile) ⇒ <code>Stream</code>
  * [.format(options)](#module_gulp-webpack-build.format) ⇒ <code>Stream</code>
  * [.failAfter(options)](#module_gulp-webpack-build.failAfter) ⇒ <code>Stream</code>
  * [.closest([basename])](#module_gulp-webpack-build.closest) ⇒ <code>Stream</code>
  * [.watch([callback])](#module_gulp-webpack-build.watch) ⇒ <code>Stream</code>
  * [.proxy(err, stats)](#module_gulp-webpack-build.proxy) ⇒ <code>Stream</code>
  * [.overrides(options)](#module_gulp-webpack-build.overrides) ⇒ <code>Stream</code>
  * [.configure(options)](#module_gulp-webpack-build.configure) ⇒ <code>Stream</code>
  * [.compilationCallback](#module_gulp-webpack-build.compilationCallback) : <code>function</code>

<a name="module_gulp-webpack-build.core"></a>
### gulp-webpack-build.core
Alias for [webpack](http://webpack.github.io/docs/node.js-api.html).

**Kind**: static property of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  
**Read only**: true  
**Properties**

| Type |
| --- |
| <code>webpack</code> | 

<a name="module_gulp-webpack-build.config"></a>
### gulp-webpack-build.config
Alias for [webpack-config](http://mdreizin.github.io/webpack-config).

**Kind**: static property of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  
**Read only**: true  
**Properties**

| Type |
| --- |
| <code>WebpackConfig</code> | 

<a name="module_gulp-webpack-build.compile"></a>
### gulp-webpack-build.compile([callback]) ⇒ <code>Stream</code>
Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.run` or `webpack.watch`. Re-emits all data passed from `webpack.run` or `webpack.watch`. Can be piped.
**Note**: Needs to be used after `webpack.configure` and `webpack.overrides`.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>compilationCallback</code> | The callback function. |

<a name="module_gulp-webpack-build.format"></a>
### gulp-webpack-build.format(options) ⇒ <code>Stream</code>
Writes formatted string of `stats` object and displays related `webpack.config.js` file path. Can be piped.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Options to pass to [`stats.toString`](http://webpack.github.io/docs/node.js-api.html#stats-tostring). |
| [options.verbose] | <code>Boolean</code> | <code>false</code> | Writes fully formatted version of `stats` object. |

<a name="module_gulp-webpack-build.failAfter"></a>
### gulp-webpack-build.failAfter(options) ⇒ <code>Stream</code>
Stops a task if some `stats` objects have some errors or warnings. Can be piped.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Options. |
| [options.errors] | <code>Boolean</code> | <code>false</code> | Fails build if some `stats` objects have some errors. |
| [options.warnings] | <code>Boolean</code> | <code>false</code> | Fails build if some `stats` objects have some warnings. |

<a name="module_gulp-webpack-build.closest"></a>
### gulp-webpack-build.closest([basename]) ⇒ <code>Stream</code>
For each file returned by `gulp.src()`, finds the closest `webpack.config.js` file (searching the directory as well as its ancestors). Can be piped.
**Note**: Needs to be used together with `webpack.watch`.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [basename] | <code>String</code> | <code>webpack.config.js</code> | The name of config file. |

<a name="module_gulp-webpack-build.watch"></a>
### gulp-webpack-build.watch([callback]) ⇒ <code>Stream</code>
Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.watch`. Re-emits all data passed from `webpack.watch`. Can be piped.
**Note**: Needs to be used after `webpack.configure` and `webpack.overrides`.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>compilationCallback</code> | The callback function. |

<a name="module_gulp-webpack-build.proxy"></a>
### gulp-webpack-build.proxy(err, stats) ⇒ <code>Stream</code>
Re-uses existing `err` and `stats` objects. Can be piped.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | Error. |
| stats | <code>Stats</code> | Please see [stats](http://webpack.github.io/docs/node.js-api.html#stats). |

<a name="module_gulp-webpack-build.overrides"></a>
### gulp-webpack-build.overrides(options) ⇒ <code>Stream</code>
Overrides existing properties of each `webpack.config.js` file. Can be piped.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Please see [configuration](http://webpack.github.io/docs/configuration.html#configuration-object-content). |

<a name="module_gulp-webpack-build.configure"></a>
### gulp-webpack-build.configure(options) ⇒ <code>Stream</code>
Helps to configure `webpack` compiler. Can be piped.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Options. |
| [options.useMemoryFs] | <code>Boolean</code> | <code>false</code> | Uses [memory-fs](https://github.com/webpack/memory-fs) for `compiler.outputFileSystem`. Prevents writing of emitted files to file system. `gulp.dest` can be used. `gulp.dest` is resolved relative to [output.path](https://github.com/webpack/docs/wiki/configuration#outputpath) if it is set; otherwise, it is resolved relative to [options.base](https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsbase) (by default, the path of `gulpfile.js`). |
| [options.progress] | <code>Boolean</code> | <code>false</code> | Adds ability to track compilation progress. |

<a name="module_gulp-webpack-build.compilationCallback"></a>
### gulp-webpack-build.compilationCallback : <code>function</code>
Called when `webpack.config.js` file is compiled. Will be passed `err` and `stats` objects.
**Note**: `this` is stream of `webpack.config.js` file.

**Kind**: static typedef of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  
**this**: <code>Stream</code>  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | Error. |
| stats | <code>Stats</code> | Please see [stats](http://webpack.github.io/docs/node.js-api.html#stats). |

