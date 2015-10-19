## Modules
<dl>
<dt><a href="#module_webpack-config-stream">webpack-config-stream</a> ⇒ <code><a href="#index">index</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/closestStream">webpack-config-stream/lib/closestStream</a> ⇒ <code><a href="#closestStream">closestStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/failAfterStream">webpack-config-stream/lib/failAfterStream</a> ⇒ <code><a href="#failAfterStream">failAfterStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/formatStream">webpack-config-stream/lib/formatStream</a> ⇒ <code><a href="#formatStream">formatStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/initStream">webpack-config-stream/lib/initStream</a> ⇒ <code><a href="#initStream">initStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/propsStream">webpack-config-stream/lib/propsStream</a> ⇒ <code><a href="#propsStream">propsStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/proxyStream">webpack-config-stream/lib/proxyStream</a> ⇒ <code><a href="#proxyStream">proxyStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/runStream">webpack-config-stream/lib/runStream</a> ⇒ <code><a href="#runStream">runStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/watchStream">webpack-config-stream/lib/watchStream</a> ⇒ <code><a href="#watchStream">watchStream</a></code></dt>
<dd></dd>
</dl>
## Members
<dl>
<dt><a href="#index">index</a></dt>
<dd></dd>
</dl>
## Functions
<dl>
<dt><a href="#closestStream">closestStream([basename])</a> ⇒ <code>Stream</code></dt>
<dd><p>For each file returned by <code>gulp.src()</code>, finds the closest <code>webpack.config.js</code> file (searching the directory as well as its ancestors). Can be piped.
<strong>Note</strong>: Needs to be used together with <code>webpack.watch()</code>.
<strong>Note</strong>: Needs to make sure that yor webpack config returns <code>module.exports = { filename: __filename };</code>.</p>
</dd>
<dt><a href="#failAfterStream">failAfterStream([options])</a> ⇒ <code>Stream</code></dt>
<dd><p>Stops a task if some <code>stats</code> objects have some errors or warnings. Can be piped.</p>
</dd>
<dt><a href="#formatStream">formatStream([options])</a> ⇒ <code>Stream</code></dt>
<dd><p>Writes formatted string of <code>stats</code> object and displays related <code>webpack.config.js</code> file path. Can be piped.</p>
</dd>
<dt><a href="#initStream">initStream([options])</a> ⇒ <code>Stream</code></dt>
<dd><p>Helps to init <code>webpack</code> compiler. Can be piped.</p>
</dd>
<dt><a href="#propsStream">propsStream([options])</a> ⇒ <code>Stream</code></dt>
<dd><p>Overrides existing properties of each <code>webpack.config.js</code> file. Can be piped.</p>
</dd>
<dt><a href="#proxyStream">proxyStream(err, [stats])</a> ⇒ <code>Stream</code></dt>
<dd><p>Re-uses existing <code>err</code> and <code>stats</code> objects. Can be piped.</p>
</dd>
<dt><a href="#runStream">runStream([callback])</a> ⇒ <code>Stream</code></dt>
<dd><p>Accepts <code>webpack.config.js</code> files via <code>gulp.src()</code>, then compiles via <code>webpack.run()</code>. Re-emits all data passed from <code>webpack.run()</code>. Can be piped.
<strong>Note</strong>: Needs to be used after <code>webpack.init()</code> and <code>webpack.props()</code>.</p>
</dd>
<dt><a href="#watchStream">watchStream([callback])</a> ⇒ <code>Stream</code></dt>
<dd><p>Accepts <code>webpack.config.js</code> files via <code>gulp.src()</code>, then compiles via <code>webpack.watch()</code>. Re-emits all data passed from <code>webpack.watch()</code>. Can be piped.
<strong>Note</strong>: Needs to be used after <code>webpack.init()</code> and <code>webpack.props()</code>.</p>
</dd>
</dl>
## Typedefs
<dl>
<dt><a href="#compilationCallback">compilationCallback</a> : <code>function</code></dt>
<dd><p>Called when <code>webpack.config.js</code> file is compiled. Will be passed <code>err</code> and <code>stats</code> objects.
<strong>Note</strong>: <code>this</code> is stream of <code>webpack.config.js</code> file.</p>
</dd>
</dl>
## External
<dl>
<dt><a href="#external_Error">Error</a> : <code>Error</code></dt>
<dd><p>Error</p>
</dd>
<dt><a href="#external_Stats">Stats</a> : <code>Object</code></dt>
<dd><p>Stats</p>
</dd>
<dt><a href="#external_Configuration">Configuration</a></dt>
<dd><p>Configuration</p>
</dd>
<dt><a href="#external_Webpack">Webpack</a></dt>
<dd><p>Webpack</p>
</dd>
<dt><a href="#external_WebpackConfig">WebpackConfig</a></dt>
<dd><p>WebpackConfig</p>
</dd>
<dt><a href="#external_Stream">Stream</a></dt>
<dd><p>Stream</p>
</dd>
<dt><a href="#external_File">File</a></dt>
<dd><p>File</p>
</dd>
<dt><a href="#external_Compiler">Compiler</a></dt>
<dd><p>Compiler</p>
</dd>
</dl>
<a name="module_webpack-config-stream"></a>
## webpack-config-stream ⇒ <code>[index](#index)</code>
<a name="module_webpack-config-stream/lib/closestStream"></a>
## webpack-config-stream/lib/closestStream ⇒ <code>[closestStream](#closestStream)</code>
<a name="module_webpack-config-stream/lib/failAfterStream"></a>
## webpack-config-stream/lib/failAfterStream ⇒ <code>[failAfterStream](#failAfterStream)</code>
<a name="module_webpack-config-stream/lib/formatStream"></a>
## webpack-config-stream/lib/formatStream ⇒ <code>[formatStream](#formatStream)</code>
<a name="module_webpack-config-stream/lib/initStream"></a>
## webpack-config-stream/lib/initStream ⇒ <code>[initStream](#initStream)</code>
<a name="module_webpack-config-stream/lib/propsStream"></a>
## webpack-config-stream/lib/propsStream ⇒ <code>[propsStream](#propsStream)</code>
<a name="module_webpack-config-stream/lib/proxyStream"></a>
## webpack-config-stream/lib/proxyStream ⇒ <code>[proxyStream](#proxyStream)</code>
<a name="module_webpack-config-stream/lib/runStream"></a>
## webpack-config-stream/lib/runStream ⇒ <code>[runStream](#runStream)</code>
<a name="module_webpack-config-stream/lib/watchStream"></a>
## webpack-config-stream/lib/watchStream ⇒ <code>[watchStream](#watchStream)</code>
<a name="index"></a>
## index
**Kind**: global variable  

* [index](#index)
  * [.run](#index.run)
  * [.format](#index.format)
  * [.failAfter](#index.failAfter)
  * [.closest](#index.closest)
  * [.watch](#index.watch)
  * [.proxy](#index.proxy)
  * [.props](#index.props)
  * [.init](#index.init)
  * [.webpack](#index.webpack)
  * [.Config](#index.Config)

<a name="index.run"></a>
### index.run
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>[runStream](#runStream)</code> | 

<a name="index.format"></a>
### index.format
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>[formatStream](#formatStream)</code> | 

<a name="index.failAfter"></a>
### index.failAfter
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>[failAfterStream](#failAfterStream)</code> | 

<a name="index.closest"></a>
### index.closest
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>[closestStream](#closestStream)</code> | 

<a name="index.watch"></a>
### index.watch
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>[watchStream](#watchStream)</code> | 

<a name="index.proxy"></a>
### index.proxy
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>[proxyStream](#proxyStream)</code> | 

<a name="index.props"></a>
### index.props
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>[propsStream](#propsStream)</code> | 

<a name="index.init"></a>
### index.init
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>[initStream](#initStream)</code> | 

<a name="index.webpack"></a>
### index.webpack
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>Webpack</code> | 

<a name="index.Config"></a>
### index.Config
**Kind**: static property of <code>[index](#index)</code>  
**Read only**: true  
**Properties**

| Type |
| --- |
| <code>WebpackConfig</code> | 

<a name="closestStream"></a>
## closestStream([basename]) ⇒ <code>Stream</code>
For each file returned by `gulp.src()`, finds the closest `webpack.config.js` file (searching the directory as well as its ancestors). Can be piped.
**Note**: Needs to be used together with `webpack.watch()`.
**Note**: Needs to make sure that yor webpack config returns `module.exports = { filename: __filename };`.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [basename] | <code>String</code> | <code>&#x27;webpack.config.js&#x27;</code> | The name of config file. |

<a name="failAfterStream"></a>
## failAfterStream([options]) ⇒ <code>Stream</code>
Stops a task if some `stats` objects have some errors or warnings. Can be piped.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | Options. |
| [options.errors] | <code>Boolean</code> | <code>false</code> | Fails build if some `stats` objects have some errors. |
| [options.warnings] | <code>Boolean</code> | <code>false</code> | Fails build if some `stats` objects have some warnings. |

<a name="formatStream"></a>
## formatStream([options]) ⇒ <code>Stream</code>
Writes formatted string of `stats` object and displays related `webpack.config.js` file path. Can be piped.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | Options to pass to [`stats.toString()`](http://webpack.github.io/docs/node.js-api.html#stats-tostring). |
| [options.verbose] | <code>Boolean</code> | <code>false</code> | Writes fully formatted version of `stats` object. |

<a name="initStream"></a>
## initStream([options]) ⇒ <code>Stream</code>
Helps to init `webpack` compiler. Can be piped.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.useMemoryFs] | <code>Boolean</code> | <code>false</code> | Uses [memory-fs](https://github.com/webpack/memory-fs) for `compiler.outputFileSystem`. Prevents writing of emitted files to file system. `gulp.dest()` can be used. `gulp.dest()` is resolved relative to [output.path](https://github.com/webpack/docs/wiki/configuration#outputpath) if it is set; otherwise, it is resolved relative to [options.base](https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsbase) (by default, the path of `gulpfile.js`). |
| [options.progress] | <code>Boolean</code> | <code>false</code> | Adds ability to track compilation progress. |

<a name="propsStream"></a>
## propsStream([options]) ⇒ <code>Stream</code>
Overrides existing properties of each `webpack.config.js` file. Can be piped.

**Kind**: global function  

| Param | Type |
| --- | --- |
| [options] | <code>Configuration</code> | 

<a name="proxyStream"></a>
## proxyStream(err, [stats]) ⇒ <code>Stream</code>
Re-uses existing `err` and `stats` objects. Can be piped.

**Kind**: global function  

| Param | Type |
| --- | --- |
| err | <code>Error</code> | 
| [stats] | <code>Stats</code> | 

<a name="runStream"></a>
## runStream([callback]) ⇒ <code>Stream</code>
Accepts `webpack.config.js` files via `gulp.src()`, then compiles via `webpack.run()`. Re-emits all data passed from `webpack.run()`. Can be piped.
**Note**: Needs to be used after `webpack.init()` and `webpack.props()`.

**Kind**: global function  

| Param | Type |
| --- | --- |
| [callback] | <code>[compilationCallback](#compilationCallback)</code> | 

<a name="watchStream"></a>
## watchStream([callback]) ⇒ <code>Stream</code>
Accepts `webpack.config.js` files via `gulp.src()`, then compiles via `webpack.watch()`. Re-emits all data passed from `webpack.watch()`. Can be piped.
**Note**: Needs to be used after `webpack.init()` and `webpack.props()`.

**Kind**: global function  

| Param | Type |
| --- | --- |
| [callback] | <code>[compilationCallback](#compilationCallback)</code> | 

<a name="compilationCallback"></a>
## compilationCallback : <code>function</code>
Called when `webpack.config.js` file is compiled. Will be passed `err` and `stats` objects.
**Note**: `this` is stream of `webpack.config.js` file.

**Kind**: global typedef  
**this**: <code>Stream</code>  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | Error. |
| stats | <code>Stats</code> | Stats. |

<a name="external_Error"></a>
## Error : <code>Error</code>
Error

**Kind**: global external  
**See**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)  
<a name="external_Stats"></a>
## Stats : <code>Object</code>
Stats

**Kind**: global external  
**See**: [https://webpack.github.io/docs/node.js-api.html#stats](https://webpack.github.io/docs/node.js-api.html#stats)  
<a name="external_Configuration"></a>
## Configuration
Configuration

**Kind**: global external  
**See**: [https://webpack.github.io/docs/configuration.html#configuration-object-content](https://webpack.github.io/docs/configuration.html#configuration-object-content)  
<a name="external_Webpack"></a>
## Webpack
Webpack

**Kind**: global external  
**See**: [webpack](https://webpack.github.io/docs/node.js-api.html)  
<a name="external_WebpackConfig"></a>
## WebpackConfig
WebpackConfig

**Kind**: global external  
**See**: [webpack-config](https://mdreizin.github.io/webpack-config)  
<a name="external_Stream"></a>
## Stream
Stream

**Kind**: global external  
**See**: [through2](https://github.com/rvagg/through2)  
<a name="external_File"></a>
## File
File

**Kind**: global external  
**See**: [vinyl](https://github.com/gulpjs/vinyl)  
<a name="external_Compiler"></a>
## Compiler
Compiler

**Kind**: global external  
**See**: [compiler](https://github.com/webpack/webpack/blob/master/lib/Compiler.js)  
