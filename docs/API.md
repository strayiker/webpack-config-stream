## Modules
<dl>
<dt><a href="#module_gulp-webpack-build">gulp-webpack-build</a></dt>
<dd></dd>
</dl>
## External
<dl>
<dt><a href="#external_Error">Error</a></dt>
<dd><p>Error</p>
</dd>
<dt><a href="#external_Stats">Stats</a></dt>
<dd><p>Stats</p>
</dd>
<dt><a href="#external_Configuration">Configuration</a></dt>
<dd><p>Configuration</p>
</dd>
</dl>
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
        .pipe(webpack.init(webpackConfig))
        .pipe(webpack.props(webpackOptions))
        .pipe(webpack.run())
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
                .pipe(webpack.init(webpackConfig))
                .pipe(webpack.props(webpackOptions))
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
  * ~~[.compile](#module_gulp-webpack-build.compile)~~
  * ~~[.overrides](#module_gulp-webpack-build.overrides)~~
  * ~~[.configure](#module_gulp-webpack-build.configure)~~
  * [.run([callback])](#module_gulp-webpack-build.run) ⇒ <code>Stream</code>
  * [.format([options])](#module_gulp-webpack-build.format) ⇒ <code>Stream</code>
  * [.failAfter([options])](#module_gulp-webpack-build.failAfter) ⇒ <code>Stream</code>
  * [.closest([basename])](#module_gulp-webpack-build.closest) ⇒ <code>Stream</code>
  * [.watch([callback])](#module_gulp-webpack-build.watch) ⇒ <code>Stream</code>
  * [.proxy(err, stats)](#module_gulp-webpack-build.proxy) ⇒ <code>Stream</code>
  * [.props([options])](#module_gulp-webpack-build.props) ⇒ <code>Stream</code>
  * [.init([options])](#module_gulp-webpack-build.init) ⇒ <code>Stream</code>
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
### ~~gulp-webpack-build.compile~~
***Deprecated***

**Kind**: static property of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  
<a name="module_gulp-webpack-build.overrides"></a>
### ~~gulp-webpack-build.overrides~~
***Deprecated***

**Kind**: static property of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  
<a name="module_gulp-webpack-build.configure"></a>
### ~~gulp-webpack-build.configure~~
***Deprecated***

**Kind**: static property of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  
<a name="module_gulp-webpack-build.run"></a>
### gulp-webpack-build.run([callback]) ⇒ <code>Stream</code>
Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.run`. Re-emits all data passed from `webpack.run`. Can be piped.
**Note**: Needs to be used after `webpack.init` and `webpack.props`.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>compilationCallback</code> | The callback function. |

<a name="module_gulp-webpack-build.format"></a>
### gulp-webpack-build.format([options]) ⇒ <code>Stream</code>
Writes formatted string of `stats` object and displays related `webpack.config.js` file path. Can be piped.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | Options to pass to [`stats.toString`](http://webpack.github.io/docs/node.js-api.html#stats-tostring). |
| [options.verbose] | <code>Boolean</code> | <code>false</code> | Writes fully formatted version of `stats` object. |

<a name="module_gulp-webpack-build.failAfter"></a>
### gulp-webpack-build.failAfter([options]) ⇒ <code>Stream</code>
Stops a task if some `stats` objects have some errors or warnings. Can be piped.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | Options. |
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
**Note**: Needs to be used after `webpack.init` and `webpack.props`.

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
| stats | <code>Stats</code> | Stats. |

<a name="module_gulp-webpack-build.props"></a>
### gulp-webpack-build.props([options]) ⇒ <code>Stream</code>
Overrides existing properties of each `webpack.config.js` file. Can be piped.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Configuration</code> | Options. |

<a name="module_gulp-webpack-build.init"></a>
### gulp-webpack-build.init([options]) ⇒ <code>Stream</code>
Helps to init `webpack` compiler. Can be piped.

**Kind**: static method of <code>[gulp-webpack-build](#module_gulp-webpack-build)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | Options. |
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
| stats | <code>Stats</code> | Stats. |

<a name="external_Error"></a>
## Error
Error

**Kind**: global external  
**See**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)  
<a name="external_Stats"></a>
## Stats
Stats

**Kind**: global external  
**See**: [http://webpack.github.io/docs/node.js-api.html#stats](http://webpack.github.io/docs/node.js-api.html#stats)  
<a name="external_Configuration"></a>
## Configuration
Configuration

**Kind**: global external  
**See**: [http://webpack.github.io/docs/configuration.html#configuration-object-content](http://webpack.github.io/docs/configuration.html#configuration-object-content)  
