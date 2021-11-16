## babel 入门以及进阶

[刘小夕 不容错过的 Babel7 知识](https://juejin.cn/post/6844904008679686152)

## 介绍

Babel 是一个通用的多用途 JavaScript 编译器。通过 Babel 你可以使用（并创建）下一代的 JavaScript，以及下一代的 JavaScript 工具。

作为一种语言，JavaScript 在不断发展，新的标准／提案和新的特性层出不穷。 在得到广泛普及之前，Babel 能够让你提前（甚至数年）使用它们。

Babel 把用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本。 这一过程叫做“源码到源码”编译， 也被称为转换编译（transpiling，是一个自造合成词，即转换＋编译。以下也简称为转译）。

例如，Babel 能够将新的 ES2015 箭头函数语法：

```js
const square = n => n * n
```

转译为：

```js
const square = function square(n) {
	return n * n
}
```

不过 Babel 的用途并不止于此，它支持语法扩展，能支持像 React 所用的 JSX 语法，同时还支持用于静态类型检查的流式语法（Flow Syntax）。

更重要的是，Babel 的一切都是简单的插件，谁都可以创建自己的插件，利用 Babel 的全部威力去做任何事情。

再进一步，Babel 自身被分解成了数个核心模块，任何人都可以利用它们来创建下一代的 JavaScript 工具。

### babel 作用

Babel 能够做什么

- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的特性(@babel/polyfill 模块)
- 源码转换(codemods)

为了更清晰的了解每一步，首先创建一个新项目，例如 babelTemp(你爱取啥名取啥名)，使用 npm init -y 进行初始化，创建 src/index.js，文件内容如下（你也可以随便写点什么）:

```js
const fn = () => {
	console.log('a')
}
```

### babel 家族组成

#### 核心库 @babel/core

Babel 的核心功能包含在 @babel/core 模块中。看到 core 这个词了吧，意味着核心，没有它，在 babel 的世界里注定寸步难行。不安装 @babel/core，无法使用 babel 进行编译。

#### CLI 命令行工具 @babel/cli

babel 提供的命令行工具，主要是提供 babel 这个命令，适合安装在项目里。

@babel/node 提供了 babel-node 命令，但是 @babel/node 更适合全局安装，不适合安装在项目里。

```bash
npm install --save-dev @babel/core @babel/cli
```

现在你就可以在项目中使用 babel 进行编译啦（如果不安装 @babel/core，会报错噢）

将命令配置在 package.json 文件的 scripts 字段中,使用 npm run compiler 来执行编译，现在我们没有配置任何插件，编译前后的代码是完全一样的。

```json
"scripts": {
    "compiler": "babel src --out-dir lib --watch"
}
```

使用 npm run compiler 来执行编译，现在我们没有配置任何插件，编译前后的代码是完全一样的。

因为 Babel 虽然开箱即用，但是什么动作也不做，如果想要 Babel 做一些实际的工作，就需要为其添加插件(plugin)。

> 编译出来得文件你会发现没有任何改变，因为我们还没有配置 babel,下面会详细说到 babel 配置

通过 babel-register 也可以运行 Babel，这种方法只需要引入文件就可以运行 Babel，或许能更好地融入你的项目设置。

但请注意这种方法并不适合正式产品环境使用
首先安装 babel-register

```bash
$ npm install --save-dev babel-register
```

接着，在项目中创建 index.js 文件并添加如下代码

```js
require('babel-register')
```

```bash
node ./src/index.js
```

这样做可以把 Babel 注册到 Node 的模块系统中并开始编译其中 require 的所有文件

#### 插件

Babel 构建在插件之上，使用现有的或者自己编写的插件可以组成一个转换通道，Babel 的插件分为两种: 语法插件和转换插件。

1. 语法插件

这些插件只允许 Babel 解析（parse） 特定类型的语法（不是转换），可以在 AST 转换时使用，以支持解析新语法，例如：

```js
import * as babel from '@babel/core'
const code = babel.transformFromAstSync(ast, {
	//支持可选链
	plugins: ['@babel/plugin-proposal-optional-chaining'],
	babelrc: false
}).code
```

2. 转换插件

转换插件会启用相应的语法插件(因此不需要同时指定这两种插件)，这点很容易理解，如果不启用相应的语法插件，意味着无法解析，连解析都不能解析，又何谈转换呢？

插件的使用,在项目目录下新建 .babelrc 文件 (下文会具体介绍配置文件)，配置如下：

安装插件

```bash
yarn add @babel/plugin-transform-arrow-functions
```

插件的使用

```json
//.babelrc
{
	"plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

也可以指定插件的相对/绝对路径

```json
{
	"plugins": ["./node_modules/@babel/plugin-transform-arrow-functions"]
}
```

执行 npm run compiler，可以看到箭头函数已经被编译 OK， 内容如下:

```js
const fn = function () {
	console.log('a')
}
```

现在，我们仅支持转换箭头函数，如果想将其它的新的 JS 特性转换成低版本，需要使用其它对应的 plugin 。如果我们一个个配置的话，会非常繁琐，因为你可能需要配置几十个插件，这显然非常不便，那么有没有什么办法可以简化这个配置呢？

**有！预设！(感谢强大的 Babel)**

#### 预设

通过使用或创建一个 preset 即可轻松使用一组插件

##### 官方 Preset

babel 预设：

- babel-preset-es2015: 可以将 es6 的代码编译成 es5.
- babel-preset-es2016: 可以将 es7 的代码编译为 es6.
- babel-preset-es2017: 可以将 es8 的代码编译为 es7.
- babel-preset-latest: 支持现有所有 ECMAScript 版本的新特性

但是我们随着时间的推移，将来可能会有跟多的版本插件,比如 bebel-preset-es2018,.... 等等。因此 babel-preset-env 出现了，它的功能类似于 babel-preset-latest，它会根据目标环境选择不支持的新特性来转译

babel 7 官方预设

- @babel/preset-env
- @babel/preset-flow
- @babel/preset-react
- @babel/preset-typescript

简单介绍一下 @babel/preset-env
@babel/preset-env 主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill，在不进行任何配置的情况下，@babel/preset-env 所包含的插件将支持所有最新的 JS 特性(ES2015,ES2016 等，不包含 stage 阶段)，将其转换成 ES5 代码。例如，如果你的代码中使用了可选链(目前，仍在 stage 阶段)，那么只配置 @babel/preset-env，转换时会抛出错误，需要另外安装相应的插件。

```json
//.babelrc
{
	"presets": ["@babel/preset-env"]
}
```

需要说明的是，@babel/preset-env 会根据你配置的目标环境，生成插件列表来编译。对于基于浏览器或 Electron 的项目，官方推荐使用 .browserslistrc 文件来指定目标环境。默认情况下，如果你没有在 Babel 配置文件中(如 .babelrc)设置 targets 或 ignoreBrowserslistConfig，@babel/preset-env 会使用 browserslist 配置源。

如果你不是要兼容所有的浏览器和环境，推荐你指定目标环境，这样你的编译代码能够保持最小。

例如，.browserslistrc 仅包括浏览器市场份额超过 0.25％的用户所需的 polyfill 和代码转换（忽略没有安全更新的浏览器，如 IE10 和 BlackBerry）,配置如下:
更多配置参考[browserslist](https://github.com/browserslist/browserslist)

```
> 0.25%
not dead
```

.browserslistrc 的内容配置为:

```txt
last 2 Chrome versions
```

然后再执行 npm run compiler，你会发现箭头函数不会被编译成 ES5，因为 chrome 的最新 2 个版本都能够支持箭头函数。现在，我们将 .browserslistrc 仍然换成之前的配置。

> 注: 从 Babel v7 开始，所有针对标准提案阶段的功能所编写的预设(stage preset)都已被弃用，官方已经移除了 @babel/preset-stage-x 下面简单介绍一下 babel-preset-stage-x
> 关于 babel-preset-stage-x
> JavaScript 还有一些提案，正在积极通过 TC39（ECMAScript 标准背后的技术委员会）的流程成为标准的一>部分。
>
> 这个流程分为 5（0－4）个阶段。 随着提案得到越多的关注就越有可能被标准采纳，于是他们就继续通过各>个阶段，最终在阶段 4 被标准正式采纳。
>
> 以下是 4 个不同阶段的（打包的）预设：
>
> - babel-preset-stage-0
> - babel-preset-stage-1
> - babel-preset-stage-2
> - babel-preset-stage-3
>
> .babelrc 配置文
>
> ```json
> {
> 	"presets": ["es2015", "react", "stage-2"],
> 	"plugins": []
> }
> ```

我们修改下 src/index.js

const isHas = [1,2,3].includes(2);

const p = new Promise((resolve, reject) => {
resolve(100);
});

编译出来的结果为:

```js
'use strict'

var isHas = [1, 2, 3].includes(2)
var p = new Promise(function (resolve, reject) {
	resolve(100)
})
```

这个编译出来的代码在低版本浏览器中使用的话，显然是有问题的，因为低版本浏览器中数组实例上没有 includes 方法，也没有 Promise 构造函数。

这是为什么呢？因为语法转换只是将高版本的语法转换成低版本的，但是新的内置函数、实例方法无法转换。这时，就需要使用 polyfill 上场了，顾名思义，polyfill 的中文意思是垫片，所谓垫片就是垫平不同浏览器或者不同环境下的差异，让新的内置函数、实例方法等在低版本浏览器中也可以使用。

#### Polyfill

@babel-polyfill 模块包括 core-js 和一个自定义的 regenerator runtime 模块，可以模拟完整的 ES2015+ 环境（不包含第 4 阶段前的提议）。
这意味着可以使用诸如 Promise 和 WeakMap 之类的新的内置组件、 Array.from 或 Object.assign 之类的静态方法、Array.prototype.includes 之类的实例方法以及生成器函数(前提是使用了 @babel/plugin-transform-regenerator 插件)。为了添加这些功能，polyfill 将添加到全局范围和类似 String 这样的内置原型中(会对全局环境造成污染，后面我们会介绍不污染全局环境的方法)。
补充说明 (2020/01/07)：V7.4.0 版本开始，@babel/polyfill 已经被废弃(前端发展日新月异)，需单独安装 core-js 和 regenerator-runtime 模块。

首先，安装 @babel/polyfill 依赖:

```bash
npm install --save @babel/polyfill
```

注意：不使用 --save-dev，因为这是一个需要在源码之前运行的垫片。

我们需要将完整的 polyfill 在代码之前加载，修改我们的 src/index.js:

```js
import '@babel/polyfill'

const isHas = [1, 2, 3].includes(2)

const p = new Promise((resolve, reject) => {
	resolve(100)
})
```

@babel/polyfill 需要在其它代码之前引入，我们也可以在 webpack 中进行配置。

例如:

```js
entry: [require.resolve('./polyfills'), path.resolve('./index')]
```

polyfills.js 文件内容如下:

```js
//当然，还可能有一些其它的 polyfill，例如 stage 4之前的一些 polyfill
import '@babel/polyfill'
```

现在，我们的代码不管在低版本还是高版本浏览器(或 node 环境)中都能正常运行了。不过，很多时候，**我们未必需要完整的 @babel/polyfill**，这会导致我们最终构建出的包的体积增大，@babel/polyfill 的包大小为 89K (当前 @babel/polyfill 版本为 7.7.0)。

**我们更期望的是，如果我使用了某个新特性，再引入对应的 polyfill，避免引入无用的代码**

值得庆幸的是， Babel 已经考虑到了这一点。

@babel/preset-env 提供了一个 useBuiltIns 参数，设置值为 usage 时，就只会包含代码需要的 polyfill 。有一点需要注意：配置此参数的值为 usage ，必须要同时设置 corejs (如果不设置，会给出警告，默认使用的是"corejs": 2) ，注意: 这里仍然需要安装 @babel/polyfill(当前 @babel/polyfill 版本默认会安装 "corejs": 2):

首先说一下使用 core-js@3 的原因，core-js@2 分支中已经不会再添加新特性，新特性都会添加到 core-js@3。例如你使用了 Array.prototype.flat()，如果你使用的是 core-js@2，那么其不包含此新特性。为了可以使用更多的新特性，建议大家使用 core-js@3

安装依赖依赖：

```bash
npm install --save core-js@3
```

> [core-js (点击了解更多)](https://github.com/zloirock/core-js) : JavaScript 的模块化标准库，包含 Promise、Symbol、Iterator 和许多其他的特性，它可以让你仅加载必需的功能。

现在，修改 Babel 的配置文件如下:

```js
//.babelrc
const presets = [['@babel/env', { useBuiltIns: 'usage', corejs: 3 }]]
```

Babel 会检查所有代码，以便查找在目标环境中缺失的功能，然后仅仅把需要的 polyfill 包含进来。

例如，src/index.js 代码不变：

```js
const isHas = [1, 2, 3].includes(2)

const p = new Promise((resolve, reject) => {
	resolve(100)
})
```

我们看看编译出来的文件(lib/index):

```js
'use strict'
require('core-js/modules/es.array.includes')
require('core-js/modules/es.object.to-string')
require('core-js/modules/es.promise')
var isHas = [1, 2, 3].includes(2)
var p = new Promise(function (resolve, reject) {
	resolve(100)
})
```

同样的代码，我们用 webpack 构建一下(production 模式)，能看到最终的代码大小仅为: 20KB。而如果我们引入整个 @babel/polyfill 的话，构建出的包大小为：89KB

前面曾提到，在 useBuiltIns 参数值为 usage 时，仍然需要安装 @babel/polyfill，虽然我们上面的代码转换中看起来并没有使用到，但是，如果我们源码中使用到了 async/await，那么编译出来的代码需要 require("regenerator-runtime/runtime")，在 @babel/polyfill 的依赖中，当然啦，你也可以只安装 regenerator-runtime/runtime 取代安装 @babel/polyfill。

**下面我要说的内容，也许你已经知道，也许你还不知道，这都不重要，但是此刻起，你要知道了: Babel 会使用很小的辅助函数来实现类似 \_createClass 等公共方法。默认情况下，它将被添加(inject)到需要它的每个文件中**

假如，我们的 src/index.js 是这样的:

```js
class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
	getX() {
		return this.x
	}
}
let cp = new ColorPoint(25, 8)
```

编译出来的 lib/index.js，如下所示:

```js
'use strict'
require('core-js/modules/es.object.define-property')
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function')
	}
}
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i]
		descriptor.enumerable = descriptor.enumerable || false
		descriptor.configurable = true
		if ('value' in descriptor) descriptor.writable = true
		Object.defineProperty(target, descriptor.key, descriptor)
	}
}
function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps)
	if (staticProps) _defineProperties(Constructor, staticProps)
	return Constructor
}
var Point = /*#__PURE__*/ (function () {
	function Point(x, y) {
		_classCallCheck(this, Point)
		this.x = x
		this.y = y
	}
	_createClass(Point, [
		{
			key: 'getX',
			value: function getX() {
				return this.x
			}
		}
	])
	return Point
})()
var cp = new ColorPoint(25, 8)
```

看起来，似乎并没有什么问题，但是你想一下，如果你有 10 个文件中都使用了这个 class，是不是意味着 \_classCallCheck、\_defineProperties、\_createClass 这些方法被 inject 了 10 次。这显然会导致包体积增大，最关键的是，我们并不需要它 inject 多次。

这个时候，就是 @babel/plugin-transform-runtime 插件大显身手的时候了，使用 @babel/plugin-transform-runtime 插件，所有帮助程序都将引用模块 @babel/runtime，**这样就可以避免编译后的代码中出现重复的帮助程序，有效减少包体积**

#### @babel/plugin-transform-runtime

- 节省代码体积
- 避免变量全局污染

@babel/plugin-transform-runtime 是一个可以重复使用 Babel 注入的帮助程序，以节省代码大小的插件

> 注意：诸如 Array.prototype.flat() 等实例方法将不起作用，因为这需要修改现有的内置函数(可以使用 @babel/polyfill 来解决这个问题) ——> 对此需要说明的是如果你配置的是 corejs3， core-js@3 现在已经支持原型方法，同时不污染原型。

另外，@babel/plugin-transform-runtime 需要和 @babel/runtime 配合使用。

首先安装依赖，@babel/plugin-transform-runtime 通常仅在开发时使用，但是运行时最终代码需要依赖 @babel/runtime，所以 @babel/runtime 必须要作为生产依赖被安装，如下 :

```bash
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

除了前文所说的，@babel/plugin-transform-runtime 可以减少编译后代码的体积外，我们使用它还有一个好处，它可以为代码创建一个沙盒环境，如果使用 @babel/polyfill 及其提供的内置程序（例如 Promise ，Set 和 Map ），则它们将污染全局范围。虽然这对于应用程序或命令行工具可能是可以的，但是如果你的代码是要发布供他人使用的库，或者无法完全控制代码运行的环境，则将成为一个问题。

@babel/plugin-transform-runtime 会将这些内置别名作为 core-js 的别名，因此您可以无缝使用它们，而无需 polyfill

修改 .babelrc 的配置，如下:

```json
//.babelrc
{ "presets": [["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3 }]], "plugins": [["@babel/plugin-transform-runtime"]] }
```

重新编译 npm run compiler , 现在，编译出来的内容为(lib/index.js):

```js
'use strict'
var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')
var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'))
var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'))
var Point = /*#__PURE__*/ (function () {
	function Point(x, y) {
		;(0, _classCallCheck2.default)(this, Point)
		this.x = x
		this.y = y
	}
	;(0, _createClass2.default)(Point, [
		{
			key: 'getX',
			value: function getX() {
				return this.x
			}
		}
	])
	return Point
})()
var cp = new ColorPoint(25, 8)
```

可以看出，帮助函数现在不是直接被 inject 到代码中，而是从 @babel/runtime 中引入。前文说了使用 @babel/plugin-transform-runtime 可以避免全局污染，我们来看看是如何避免污染的。

修改 src/index.js 如下：

```js
let isHas = [1, 2, 3].includes(2)

new Promise((resolve, reject) => {
	resolve(100)
})
```

编译出来的代码如下(lib/index.js):

```js
'use strict'
require('core-js/modules/es.array.includes')
require('core-js/modules/es.object.to-string')
require('core-js/modules/es.promise')
var isHas = [1, 2, 3].includes(2)
new Promise(function (resolve, reject) {
	resolve(100)
})
```

Array.prototype 上新增了 includes 方法，并且新增了全局的 Promise 方法，污染了全局环境，这跟不使用 @babel/plugin-transform-runtime 没有区别嘛。

**如果我们希望 @babel/plugin-transform-runtime 不仅仅处理帮助函数，同时也能加载 polyfill 的话，我们需要给 @babel/plugin-transform-runtime 增加配置信息。**

首先新增依赖 @babel/runtime-corejs3:

```bash
npm install @babel/runtime-corejs3 --save
```

修改配置文件如下(移除了 @babel/preset-env 的 useBuiltIns 的配置，不然不就重复了嘛嘛嘛，不信的话，你用 async/await 编译下试试咯):

```json
{ "presets": [["@babel/preset-env"]], "plugins": [["@babel/plugin-transform-runtime", { "corejs": 3 }]] }
```

然后重新编译，看一下，编译出来的结果(lib/index.js):

```js
'use strict'
var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault')
var _promise = _interopRequireDefault(require('@babel/runtime-corejs3/core-js-stable/promise'))
var _includes = _interopRequireDefault(require('@babel/runtime-corejs3/core-js-stable/instance/includes'))
var _context
var isHas = (0, _includes.default)((_context = [1, 2, 3])).call(_context, 2)
new _promise.default(function (resolve, reject) {
	resolve(100)
})
```

可以看出，没有直接去修改 Array.prototype，或者是新增 Promise 方法，避免了全局污染。如果上面 @babel/plugin-transform-runtime 配置的 core-js 是 "2"，其中不包含实例的 polyfill 需要单独引入。

> 划重点：如果我们配置的 corejs 是 3 版本，那么不管是实例方法还是全局方法，都不会再污染全局环境。

看到这里，不知道大家有没有这样一个疑问？给 @babel/plugin-transform-runtime 配置 corejs 是如此的完美，既可以将帮助函数变成引用的形式，又可以动态引入 polyfill，并且不会污染全局环境。何必要给 @babel/preset-env 提供 useBuiltIns 功能呢，看起来似乎不需要呀。

带着这样的疑问，我新建了几个文件(内容简单且基本一致，使用了些新特性)，然后使用 webpack 构建，以下是我对比的数据:

| 序号 | .babelrc 配置                                                               | webpack mode production |
| ---- | --------------------------------------------------------------------------- | ----------------------- |
| 0    | 不使用 @babel/plugin-transform-runtime                                      | 36KB                    |
| 1    | 使用@babel/plugin-transform-runtime，并配置参数 corejs: 3。不会污染全局环境 | 37KB                    |
| 2    | 使用@babel/plugin-transform-runtime，不配置 corejs                          | 22KB                    |

### 插件/预设补充知识

#### 插件执行顺序

**插件的排列顺序很重要！！！**
如果两个转换插件都将处理“程序（Program）”的某个代码片段，则将根据转换插件或 preset 的排列顺序依次执行。

- 插件在 Presets 前运行。
- 插件顺序从前往后排列。
- Preset 顺序是颠倒的（从后往前）

例如:

```json
{
	"plugins": ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"]
}
```

先执行 @babel/plugin-proposal-class-properties，后执行 @babel/plugin-syntax-dynamic-import

```json
{
	"presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

preset 的执行顺序是颠倒的，先执行 @babel/preset-react， 后执行 @babel/preset-env

#### 插件的短名称

如果插件名称为 @babel/plugin-XXX，可以使用短名称@babel/XXX :

```json
{
	"plugins": [
		"@babel/transform-arrow-functions" //同 "@babel/plugin-transform-arrow-functions"
	]
}
```

如果插件名称为 babel-plugin-XXX，可以使用短名称 XXX，该规则同样适用于带有 scope 的插件:

```json
{
	"plugins": [
		"newPlugin", //同 "babel-plugin-newPlugin"
		"@scp/myPlugin" //同 "@scp/babel-plugin-myPlugin"
	]
}
```

#### 创建 Preset

可以简单的返回一个插件数组

```js
module.exports = function () {
	return {
		plugins: ['A', 'B', 'C']
	}
}
```

preset 中也可以包含其他的 preset，以及带有参数的插件。

```js
module.exports = function () {
	return {
		presets: [require('@babel/preset-env')],
		plugins: [
			[require('@babel/plugin-proposal-class-properties'), { loose: true }],
			require('@babel/plugin-proposal-object-rest-spread')
		]
	}
}
```

### 配置文件

Babel 支持多种格式的配置文件。这部分内容补充了解下即可，谁管你用哪种配置文件，只要你的配置是 OK 的就可以了(敷衍)~

所有的 Babel API 参数都可以被配置，但是如果该参数需要使用的 JS 代码，那么可能需要使用 JS 代码版的配置文件。

**根据使用场景可以选择不同的配置文件:**

如果希望以编程的方式创建配置文件或者希望编译 node_modules 目录下的模块：那么 babel.config.js 可以满足你的需求。

如果只是需要一个简单的并且中用于单个软件包的配置：那么 .babelrc 即可满足你的需求。

#### babel.config.js

在项目根目录下创建一个名为 babel.config.js 的文件。

```js
module.exports = function (api) {
	api.cache(true)
	const presets = []
	const plugins = []
	return { presets, plugins }
}
```

具体的配置可以查看：[babel.config.js 文档](https://www.babeljs.cn/docs/config-files#project-wide-configuration)

#### .babelrc

在项目根目录下创建一个名为 .babelrc 的文件：

```json
{
	"presets": [],
	"plugins": []
}
```

具体的配置可以参考 [.babelrc 文档](https://www.babeljs.cn/docs/config-files#file-relative-configuration)

#### package.json

```json
{
	"name": "my-package",
	"babel": {
		"presets": [],
		"plugins": []
	}
}
```

#### .babelrc.js

与 .babelrc 配置相同，但是可以使用 JS 编写。

```js
//可以在其中调用 Node.js 的API
const presets = []
const plugins = []

module.exports = { presets, plugins }
```

### babel-upgrade

[升级 6->7](https://github.com/babel/babel-upgrade)
在提到删除 stage-x 时候提过这个工具，它的目的是帮助用户自动化地从 babel 6 升级到 7。

这款升级工具的功能包括：(这里并不列出完整列表，只列出比较重要和常用的内容)

1. package.json

- 把依赖(和开发依赖)中所有的 babel-_ 替换为 @babel/_
- 把这些 @babel/\* 依赖的版本更新为最新版 (例如 ^7.0.0)
- 如果 scripts 中有使用 babel-node，自动添加 @babel/node 为开发依赖
- 如果有 babel 配置项，检查其中的 plugins 和 presets，把短名 (env) 替换为完整的名字 (@babel/preset-env)

2. .babelrc

- 检查其中的 plugins 和 presets，把短名 (env) 替换为完整的名字 (@babel/preset-env)
- 检查是否包含 preset-stage-x，如有替换为对应的插件并添加到 plugins

使用方式如下：

```bash
# 不安装到本地而是直接运行命令，npm 的新功能
npx babel-upgrade --write

# 或者常规方式
npm i babel-upgrade -g
babel-upgrade --write
```

### babel-loader

已经介绍过了 babel-cli。但一些大型的项目都会有构建工具 (如 webpack 或 rollup) 来进行代码构建和压缩 (uglify)。理论上来说，我们也可以对压缩后的代码进行 babel 处理，但那会非常慢。因此如果在 uglify 之前就加入 babel 处理，岂不完美？

所以就有了 babel 插入到构建工具内部这样的需求。以(我还算熟悉的) webpack 为例，webpack 有 loader 的概念，因此就出现了 babel-loader。

和 babel-cli 一样，babel-loader 也会读取 .babelrc 或者 package.json 中的 babel 段作为自己的配置，之后的内核处理也是相同。唯一比 babel-cli 复杂的是，它需要和 webpack 交互，因此需要在 webpack 这边进行配置。比较常见的如下：

```js
module: {
	rules: [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader'
		}
	]
}
```

如果想在这里传入 babel 的配置项，也可以把改成：

```js
// loader: 'babel-loader' 改成如下：
use: {
  loader: 'babel-loader',
  options: {
    // 配置项在这里
  }
}
```

### Babel 7.x

最近 babel 发布了 7.0。因为上面部分都是针对 6.x 编写的，所以我们关注一下 7.0 带来的变化(核心机制方面没有变化，插件，preset，解析转译生成这些都没有变化)

我只挑选一些和开发者关系比较大的列在这里，省略的多数是针对某一个 plugin 的改动。完整的列表可以参考官网。

#### preset 的变更：淘汰 es201x，删除 stage-x，强推 env (重点)

淘汰 es201x 的目的是把选择环境的工作交给 env 自动进行，而不需要开发者投入精力。凡是使用 es201x 的开发者，都应当使用 env 进行替换。但这里的淘汰 (原文 deprecated) 并不是删除，只是不推荐使用了，不好说 babel 8 就真的删了。

与之相比，stage-x 就没那么好运了，它们直接被删了。这是因为 babel 团队认为为这些 “不稳定的草案” 花费精力去更新 preset 相当浪费。stage-x 虽然删除了，但它包含的插件并没有删除(只是被更名了，可以看下面一节)，我们依然可以显式地声明这些插件来获得等价的效果。[完整列表](https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0#babelpreset-stage-0)

为了减少开发者替换配置文件的机械工作，babel 开发了一款 babel-upgrade 的[工具](https://github.com/babel/babel-upgrade)，它会检测 babel 配置中的 stage-x 并且替换成对应的 plugins。除此之外它还有其他功能，我们一会儿再详细看。(总之目的就是让你更加平滑地迁移到 babel 7)

npm package 名称的变化 (重点)
这是 babel 7 的一个重大变化，把所有 babel-_ 重命名为 @babel/_，例如：

1. babel-cli 变成了 @babel/cli。
2. babel-preset-env 变成了 @babel/preset-env。进一步，还可以省略 preset 而简写为 @babel/env。
3. babel-plugin-transform-arrow-functions 变成了 @babel/plugin-transform-arrow-functions。和 preset 一样，plugin 也可以省略，于是简写为 @babel/transform-arrow-functions

这个变化不单单应用于 package.json 的依赖中，包括 .babelrc 的配置 (plugins, presets) 也要这么写，为了保持一致。例如

```json
{
	"presets": [
		// "env" 变成 "@babel/preset-env"
		"@babel/preset-env"
	]
}
```

顺带提一句，上面提过的 babel 解析语法的内核 babylon 现在重命名为 @babel/parser，看起来是被收编了

上文提过的 stage-x 被删除了，它包含的插件虽然保留，但也被重命名了。babel 团队希望更明显地区分已经位于规范中的插件 (如 es2015 的 babel-plugin-transform-arrow-functions) 和仅仅位于草案中的插件 (如 stage-0 的 @babel/plugin-proposal-function-bind)。方式就是在名字中增加 proposal，所有包含在 stage-x 的转译插件都使用了这个前缀，语法插件不在其列

最后，如果插件名称中包含了规范名称 (-es2015-, -es3- 之类的)，一律删除。例如 babel-plugin-transform-es2015-classes 变成了 @babel/plugin-transform-classes。(这个插件我自己没有单独用过，惭愧)

参考链接

[babel 文档](https://www.babeljs.cn/docs/)

[babel 7 的使用的个人理解](https://www.jianshu.com/p/cbd48919a0cc)

[一口(很长的)气了解 babel](https://juejin.cn/post/6844903743121522701)

[core-js@3 带来的惊喜](https://www.cnblogs.com/sefaultment/p/11631314.html)
