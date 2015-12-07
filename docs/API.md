## Modules
<dl>
<dt><a href="#module_webpack-config-stream">webpack-config-stream</a> ⇒ <code><a href="#index">index</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/cacheStrategy">webpack-config-stream/lib/cacheStrategy</a> ⇒ <code><a href="#CacheStrategy">CacheStrategy</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/cacheStream">webpack-config-stream/lib/cacheStream</a> ⇒ <code><a href="#cacheStream">cacheStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/closestStrategy">webpack-config-stream/lib/closestStrategy</a> ⇒ <code><a href="#ClosestStrategy">ClosestStrategy</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/closestStream">webpack-config-stream/lib/closestStream</a> ⇒ <code><a href="#closestStream">closestStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/compilerAdapter">webpack-config-stream/lib/compilerAdapter</a> ⇒ <code><a href="#CompilerAdapter">CompilerAdapter</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/defaultCacheStrategy">webpack-config-stream/lib/defaultCacheStrategy</a> ⇒ <code><a href="#DefaultCacheStrategy">DefaultCacheStrategy</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/defaultClosestStrategy">webpack-config-stream/lib/defaultClosestStrategy</a> ⇒ <code><a href="#DefaultClosestStrategy">DefaultClosestStrategy</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/defaultIgnoreStrategy">webpack-config-stream/lib/defaultIgnoreStrategy</a> ⇒ <code><a href="#DefaultIgnoreStrategy">DefaultIgnoreStrategy</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/failAfterStream">webpack-config-stream/lib/failAfterStream</a> ⇒ <code><a href="#failAfterStream">failAfterStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/formatStream">webpack-config-stream/lib/formatStream</a> ⇒ <code><a href="#formatStream">formatStream</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/ignoreStrategy">webpack-config-stream/lib/ignoreStrategy</a> ⇒ <code><a href="#IgnoreStrategy">IgnoreStrategy</a></code></dt>
<dd></dd>
<dt><a href="#module_webpack-config-stream/lib/ignoreStream">webpack-config-stream/lib/ignoreStream</a> ⇒ <code><a href="#ignoreStream">ignoreStream</a></code></dt>
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
## Classes
<dl>
<dt><a href="#CacheStrategy">CacheStrategy</a></dt>
<dd></dd>
<dt><a href="#ClosestStrategy">ClosestStrategy</a></dt>
<dd></dd>
<dt><a href="#CompilerAdapter">CompilerAdapter</a></dt>
<dd></dd>
<dt><a href="#DefaultCacheStrategy">DefaultCacheStrategy</a> ⇐ <code><a href="#CacheStrategy">CacheStrategy</a></code></dt>
<dd></dd>
<dt><a href="#DefaultClosestStrategy">DefaultClosestStrategy</a> ⇐ <code><a href="#ClosestStrategy">ClosestStrategy</a></code></dt>
<dd></dd>
<dt><a href="#DefaultIgnoreStrategy">DefaultIgnoreStrategy</a> ⇐ <code><a href="#IgnoreStrategy">IgnoreStrategy</a></code></dt>
<dd></dd>
<dt><a href="#IgnoreStrategy">IgnoreStrategy</a></dt>
<dd></dd>
<dt><a href="#PatternResolver">PatternResolver</a></dt>
<dd></dd>
</dl>
## Members
<dl>
<dt><a href="#index">index</a></dt>
<dd></dd>
</dl>
## Functions
<dl>
<dt><a href="#cacheStream">cacheStream([strategy])</a> ⇒ <code>Stream</code></dt>
<dd><p>Helps to prevent compilation of <code>webpack.config.js</code> if nothing changes.
<strong>Note</strong>: Needs to be used before <code>webpack.run()</code> and <code>webpack.watch()</code>.</p>
</dd>
<dt><a href="#closestStream">closestStream([strategy])</a> ⇒ <code>Stream</code></dt>
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
<dt><a href="#ignoreStream">ignoreStream([strategy])</a> ⇒ <code>Stream</code></dt>
<dd><p>Prevents writing of <code>webpack.config.js</code>. Can be piped.</p>
</dd>
<dt><a href="#initStream">initStream([options])</a> ⇒ <code>Stream</code></dt>
<dd><p>Helps to init <code>webpack</code> compiler. Can be piped.</p>
</dd>
<dt><a href="#propsStream">propsStream([options])</a> ⇒ <code>Stream</code></dt>
<dd><p>Overrides existing properties of each <code>webpack.config.js</code> file. Can be piped.</p>
</dd>
<dt><a href="#proxyStream">proxyStream([err], [stats])</a> ⇒ <code>Stream</code></dt>
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
<a name="module_webpack-config-stream/lib/cacheStrategy"></a>
## webpack-config-stream/lib/cacheStrategy ⇒ <code>[CacheStrategy](#CacheStrategy)</code>
<a name="module_webpack-config-stream/lib/cacheStream"></a>
## webpack-config-stream/lib/cacheStream ⇒ <code>[cacheStream](#cacheStream)</code>
<a name="module_webpack-config-stream/lib/closestStrategy"></a>
## webpack-config-stream/lib/closestStrategy ⇒ <code>[ClosestStrategy](#ClosestStrategy)</code>
<a name="module_webpack-config-stream/lib/closestStream"></a>
## webpack-config-stream/lib/closestStream ⇒ <code>[closestStream](#closestStream)</code>
<a name="module_webpack-config-stream/lib/compilerAdapter"></a>
## webpack-config-stream/lib/compilerAdapter ⇒ <code>[CompilerAdapter](#CompilerAdapter)</code>
<a name="module_webpack-config-stream/lib/defaultCacheStrategy"></a>
## webpack-config-stream/lib/defaultCacheStrategy ⇒ <code>[DefaultCacheStrategy](#DefaultCacheStrategy)</code>
<a name="module_webpack-config-stream/lib/defaultClosestStrategy"></a>
## webpack-config-stream/lib/defaultClosestStrategy ⇒ <code>[DefaultClosestStrategy](#DefaultClosestStrategy)</code>
<a name="module_webpack-config-stream/lib/defaultIgnoreStrategy"></a>
## webpack-config-stream/lib/defaultIgnoreStrategy ⇒ <code>[DefaultIgnoreStrategy](#DefaultIgnoreStrategy)</code>
<a name="module_webpack-config-stream/lib/failAfterStream"></a>
## webpack-config-stream/lib/failAfterStream ⇒ <code>[failAfterStream](#failAfterStream)</code>
<a name="module_webpack-config-stream/lib/formatStream"></a>
## webpack-config-stream/lib/formatStream ⇒ <code>[formatStream](#formatStream)</code>
<a name="module_webpack-config-stream/lib/ignoreStrategy"></a>
## webpack-config-stream/lib/ignoreStrategy ⇒ <code>[IgnoreStrategy](#IgnoreStrategy)</code>
<a name="module_webpack-config-stream/lib/ignoreStream"></a>
## webpack-config-stream/lib/ignoreStream ⇒ <code>[ignoreStream](#ignoreStream)</code>
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
<a name="CacheStrategy"></a>
## CacheStrategy
**Kind**: global class  

* [CacheStrategy](#CacheStrategy)
  * [new CacheStrategy([options])](#new_CacheStrategy_new)
  * *[.executeStart(stream, chunk)](#CacheStrategy+executeStart) ⇒ <code>Promise</code>*
  * *[.executeEnd()](#CacheStrategy+executeEnd) ⇒ <code>Promise</code>*

<a name="new_CacheStrategy_new"></a>
### new CacheStrategy([options])

| Param | Type |
| --- | --- |
| [options] | <code>Object</code> | 

<a name="CacheStrategy+executeStart"></a>
### *cacheStrategy.executeStart(stream, chunk) ⇒ <code>Promise</code>*
**Kind**: instance abstract method of <code>[CacheStrategy](#CacheStrategy)</code>  

| Param | Type |
| --- | --- |
| stream | <code>Stream</code> | 
| chunk | <code>File</code> | 

<a name="CacheStrategy+executeEnd"></a>
### *cacheStrategy.executeEnd() ⇒ <code>Promise</code>*
**Kind**: instance abstract method of <code>[CacheStrategy](#CacheStrategy)</code>  
<a name="ClosestStrategy"></a>
## ClosestStrategy
**Kind**: global class  

* [ClosestStrategy](#ClosestStrategy)
  * [new ClosestStrategy([options])](#new_ClosestStrategy_new)
  * *[.execute(stream, chunk)](#ClosestStrategy+execute) ⇒ <code>Promise</code>*

<a name="new_ClosestStrategy_new"></a>
### new ClosestStrategy([options])

| Param | Type |
| --- | --- |
| [options] | <code>Object</code> | 

<a name="ClosestStrategy+execute"></a>
### *closestStrategy.execute(stream, chunk) ⇒ <code>Promise</code>*
**Kind**: instance abstract method of <code>[ClosestStrategy](#ClosestStrategy)</code>  

| Param | Type |
| --- | --- |
| stream | <code>Stream</code> | 
| chunk | <code>File</code> | 

<a name="CompilerAdapter"></a>
## CompilerAdapter
**Kind**: global class  

* [CompilerAdapter](#CompilerAdapter)
  * [new CompilerAdapter(compilerOptions, [webpackOptions])](#new_CompilerAdapter_new)
  * [.run(file, callback)](#CompilerAdapter+run) ⇒ <code>Compiler</code>
  * [.watch(file, callback)](#CompilerAdapter+watch) ⇒ <code>Compiler</code>

<a name="new_CompilerAdapter_new"></a>
### new CompilerAdapter(compilerOptions, [webpackOptions])

| Param | Type |
| --- | --- |
| compilerOptions | <code>Object</code> | 
| [webpackOptions] | <code>Configuration</code> | 

<a name="CompilerAdapter+run"></a>
### compilerAdapter.run(file, callback) ⇒ <code>Compiler</code>
Runs compiler

**Kind**: instance method of <code>[CompilerAdapter](#CompilerAdapter)</code>  

| Param | Type |
| --- | --- |
| file | <code>File</code> | 
| callback | <code>compilerCallback</code> | 

<a name="CompilerAdapter+watch"></a>
### compilerAdapter.watch(file, callback) ⇒ <code>Compiler</code>
Runs compiler in `watch` mode

**Kind**: instance method of <code>[CompilerAdapter](#CompilerAdapter)</code>  

| Param | Type |
| --- | --- |
| file | <code>File</code> | 
| callback | <code>compilerCallback</code> | 

<a name="DefaultCacheStrategy"></a>
## DefaultCacheStrategy ⇐ <code>[CacheStrategy](#CacheStrategy)</code>
**Kind**: global class  
**Extends:** <code>[CacheStrategy](#CacheStrategy)</code>  

* [DefaultCacheStrategy](#DefaultCacheStrategy) ⇐ <code>[CacheStrategy](#CacheStrategy)</code>
  * [new DefaultCacheStrategy([options])](#new_DefaultCacheStrategy_new)
  * [.executeStart(stream, chunk)](#CacheStrategy+executeStart) ⇒ <code>Promise</code>
  * [.executeEnd()](#CacheStrategy+executeEnd) ⇒ <code>Promise</code>

<a name="new_DefaultCacheStrategy_new"></a>
### new DefaultCacheStrategy([options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.dependsOn] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Array of `minimatch` [patterns](https://github.com/isaacs/minimatch#features). Available macros: - `[filename]` - full path to `webpack.config.js` - `[dirname]` - directory of `webpack.config.js` |

<a name="CacheStrategy+executeStart"></a>
### defaultCacheStrategy.executeStart(stream, chunk) ⇒ <code>Promise</code>
**Kind**: instance method of <code>[DefaultCacheStrategy](#DefaultCacheStrategy)</code>  
**Overrides:** <code>[executeStart](#CacheStrategy+executeStart)</code>  

| Param | Type |
| --- | --- |
| stream | <code>Stream</code> | 
| chunk | <code>File</code> | 

<a name="CacheStrategy+executeEnd"></a>
### defaultCacheStrategy.executeEnd() ⇒ <code>Promise</code>
**Kind**: instance method of <code>[DefaultCacheStrategy](#DefaultCacheStrategy)</code>  
**Overrides:** <code>[executeEnd](#CacheStrategy+executeEnd)</code>  
<a name="DefaultClosestStrategy"></a>
## DefaultClosestStrategy ⇐ <code>[ClosestStrategy](#ClosestStrategy)</code>
**Kind**: global class  
**Extends:** <code>[ClosestStrategy](#ClosestStrategy)</code>  

* [DefaultClosestStrategy](#DefaultClosestStrategy) ⇐ <code>[ClosestStrategy](#ClosestStrategy)</code>
  * [new DefaultClosestStrategy([options])](#new_DefaultClosestStrategy_new)
  * [.execute(stream, chunk)](#ClosestStrategy+execute) ⇒ <code>Promise</code>

<a name="new_DefaultClosestStrategy_new"></a>
### new DefaultClosestStrategy([options])

| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Object</code> |  | 
| [options.basename] | <code>String</code> | <code>&#x27;webpack.config.js&#x27;</code> | 

<a name="ClosestStrategy+execute"></a>
### defaultClosestStrategy.execute(stream, chunk) ⇒ <code>Promise</code>
**Kind**: instance method of <code>[DefaultClosestStrategy](#DefaultClosestStrategy)</code>  
**Overrides:** <code>[execute](#ClosestStrategy+execute)</code>  

| Param | Type |
| --- | --- |
| stream | <code>Stream</code> | 
| chunk | <code>File</code> | 

<a name="DefaultIgnoreStrategy"></a>
## DefaultIgnoreStrategy ⇐ <code>[IgnoreStrategy](#IgnoreStrategy)</code>
**Kind**: global class  
**Extends:** <code>[IgnoreStrategy](#IgnoreStrategy)</code>  

* [DefaultIgnoreStrategy](#DefaultIgnoreStrategy) ⇐ <code>[IgnoreStrategy](#IgnoreStrategy)</code>
  * [new DefaultIgnoreStrategy([options])](#new_DefaultIgnoreStrategy_new)
  * [.execute(stream, chunk)](#IgnoreStrategy+execute) ⇒ <code>Promise</code>

<a name="new_DefaultIgnoreStrategy_new"></a>
### new DefaultIgnoreStrategy([options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.pattern] | <code>String</code> | <code>&#x27;webpack.config.js&#x27;</code> | `minimatch` [pattern](https://github.com/isaacs/minimatch#features). |

<a name="IgnoreStrategy+execute"></a>
### defaultIgnoreStrategy.execute(stream, chunk) ⇒ <code>Promise</code>
**Kind**: instance method of <code>[DefaultIgnoreStrategy](#DefaultIgnoreStrategy)</code>  
**Overrides:** <code>[execute](#IgnoreStrategy+execute)</code>  

| Param | Type |
| --- | --- |
| stream | <code>Stream</code> | 
| chunk | <code>File</code> | 

<a name="IgnoreStrategy"></a>
## IgnoreStrategy
**Kind**: global class  

* [IgnoreStrategy](#IgnoreStrategy)
  * [new IgnoreStrategy([options])](#new_IgnoreStrategy_new)
  * *[.execute(stream, chunk)](#IgnoreStrategy+execute) ⇒ <code>Promise</code>*

<a name="new_IgnoreStrategy_new"></a>
### new IgnoreStrategy([options])

| Param | Type |
| --- | --- |
| [options] | <code>Object</code> | 

<a name="IgnoreStrategy+execute"></a>
### *ignoreStrategy.execute(stream, chunk) ⇒ <code>Promise</code>*
**Kind**: instance abstract method of <code>[IgnoreStrategy](#IgnoreStrategy)</code>  

| Param | Type |
| --- | --- |
| stream | <code>Stream</code> | 
| chunk | <code>File</code> | 

<a name="PatternResolver"></a>
## PatternResolver
**Kind**: global class  

* [PatternResolver](#PatternResolver)
  * [new PatternResolver(environment)](#new_PatternResolver_new)
  * [.resolve(dependsOn)](#PatternResolver+resolve) ⇒ <code>Array.&lt;String&gt;</code>

<a name="new_PatternResolver_new"></a>
### new PatternResolver(environment)

| Param | Type |
| --- | --- |
| environment | <code>Object</code> | 

<a name="PatternResolver+resolve"></a>
### patternResolver.resolve(dependsOn) ⇒ <code>Array.&lt;String&gt;</code>
Resolves `dependsOn` patterns

**Kind**: instance method of <code>[PatternResolver](#PatternResolver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| dependsOn | <code>Array.&lt;String&gt;</code> | Array of `minimatch` [patterns](https://github.com/isaacs/minimatch#features). |

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
  * [.ignore](#index.ignore)
  * [.cache](#index.cache)
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

<a name="index.ignore"></a>
### index.ignore
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>[ignoreStream](#ignoreStream)</code> | 

<a name="index.cache"></a>
### index.cache
**Kind**: static property of <code>[index](#index)</code>  
**Properties**

| Type |
| --- |
| <code>[cacheStream](#cacheStream)</code> | 

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

<a name="cacheStream"></a>
## cacheStream([strategy]) ⇒ <code>Stream</code>
Helps to prevent compilation of `webpack.config.js` if nothing changes.
**Note**: Needs to be used before `webpack.run()` and `webpack.watch()`.

**Kind**: global function  

| Param | Type |
| --- | --- |
| [strategy] | <code>[CacheStrategy](#CacheStrategy)</code> | 

<a name="closestStream"></a>
## closestStream([strategy]) ⇒ <code>Stream</code>
For each file returned by `gulp.src()`, finds the closest `webpack.config.js` file (searching the directory as well as its ancestors). Can be piped.
**Note**: Needs to be used together with `webpack.watch()`.
**Note**: Needs to make sure that yor webpack config returns `module.exports = { filename: __filename };`.

**Kind**: global function  

| Param | Type |
| --- | --- |
| [strategy] | <code>[ClosestStrategy](#ClosestStrategy)</code> | 

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

<a name="ignoreStream"></a>
## ignoreStream([strategy]) ⇒ <code>Stream</code>
Prevents writing of `webpack.config.js`. Can be piped.

**Kind**: global function  

| Param | Type |
| --- | --- |
| [strategy] | <code>[IgnoreStrategy](#IgnoreStrategy)</code> | 

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
## proxyStream([err], [stats]) ⇒ <code>Stream</code>
Re-uses existing `err` and `stats` objects. Can be piped.

**Kind**: global function  

| Param | Type |
| --- | --- |
| [err] | <code>Error</code> | 
| [stats] | <code>Stats</code> | 

<a name="runStream"></a>
## runStream([callback]) ⇒ <code>Stream</code>
Accepts `webpack.config.js` files via `gulp.src()`, then compiles via `webpack.run()`. Re-emits all data passed from `webpack.run()`. Can be piped.
**Note**: Needs to be used after `webpack.init()` and `webpack.props()`.

**Kind**: global function  

| Param | Type |
| --- | --- |
| [callback] | <code>compilationCallback</code> | 

<a name="watchStream"></a>
## watchStream([callback]) ⇒ <code>Stream</code>
Accepts `webpack.config.js` files via `gulp.src()`, then compiles via `webpack.watch()`. Re-emits all data passed from `webpack.watch()`. Can be piped.
**Note**: Needs to be used after `webpack.init()` and `webpack.props()`.

**Kind**: global function  

| Param | Type |
| --- | --- |
| [callback] | <code>compilationCallback</code> | 

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
