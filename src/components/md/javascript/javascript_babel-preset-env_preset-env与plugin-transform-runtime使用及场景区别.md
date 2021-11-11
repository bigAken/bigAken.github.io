### @babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别

@babel/preset-env 和 @babel/plugin-transform-runtime 都具有转换语法的能力， 并且都能实现按需 polyfill ,但是网上又找不到比较明确的答案， 趁这次尝试 roullp 的时候试了试

如果我们什么都不做， 没有为 babel 编写参数及配置， 那 babel 并没有那么大的威力， 它什么都不会做， 正是因为各个预设插件的灵活组合、赋能， 让 babel 充满魅力， 创造奇迹

> 初始化 yarn init -y 安装 Babel-cli @babel/preset-env

#### @babel/preset-env

这是一个我们很常用的预设， 几乎所有的教程和框架里都会让你配置它， 它的出现取代了 preset-es20\*\* 系列的 babel 预设， 你再也不需要繁杂的兼容配置了。 每出一个新提案就加一个？ 太蠢了。

有了它， 我们就可以拥有全部， 并且！ 它还可以做到按需加载我们需要的 polyfill。 就是这么神奇。
但是吧， 它也不是那么自动化的， 如果你要是不会配置，很有可能就没有用起它的功能

不管怎么养， 首先试一下，眼见为实

首先创建一个 index.js,内容如下， 很简单

```js
function test() {
	new Promise()
}
test()
const arr = [1, 2, 3, 4].map(item => item * item)
console.log(arr)
```

然后我们在根目录下创建一个 .babelrc 文件, 帮我们刚刚说的预设加进去

```json
{
	"presets": [["@babel/preset-env"]]
}
```

然后我我们打包一下（这里我用的是 roullup）看一下产出的结果
![](./image/4654867.png)

我们可以看到， 它 babel 帮我们做了这几件事情:

- 转换箭头函数
- const 变为 var

奇怪， 为什么 babel 不帮我们转换 map ? 还有 promise 这些也都是 es6 的特性呀

嗯～，会不会是我们的目标浏览器不对， babel 觉得不需要转换了， 会不会是这样， 那我们加一个 .browserslistrc 试一下

> .browserslistrc 主要用来设定 babel 编译成要适配的浏览器环境的代码

那就。让我们在根目录下创建一个 .browserslistrc

```
> 1%
last 10 versions
not ie <= 8>
```

好。现在让我们再打包一次.

![](./image/c5b765119.png)

咦， 没什么效果。 跟刚刚一样啊。 说明不是目标浏览器配置的问题， 是 babel 做不了这个事。

因为默认 @babel/preset-env 只会转换语法，也就是我们看到的箭头函数、const 一类。
如果进一步需要转换内置对象、实例方法，那就得用 polyfill, 这就需要你做一点配置了,

这里有一个至关重要的参数 "useBuiltIns"，他是控制 @babel/preset-env 使用何种方式帮我们导入 polyfill 的核心， 它有三个值可以选

##### entry

这是一种入口导入方式, 只要我们在打包配置入口 或者 文件入口写入 import "core-js" 这样一串代码， babel 就会替我们根据当前你所配置的目标浏览器(browserslist)来引入所需要的 polyfill 。

像这样， 我们在 index.js 文件中加入试一下 core-js

```js
// src/index.js
import 'core-js'
function test() {
	new Promise()
}
test()
const arr = [1, 2, 3, 4].map(item => item * item)
console.log(arr)
```

babel 配置如下

```js
[
  "presets": [
    ["@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

当前 .browserslistrc 文件(更改目标浏览器为 Chrome 是为了此处演示更直观，简洁)， 我们只要求兼容 chrome 50 版本以上即可（当下最新版本为 78）

```
Chrome > 50
```

那打包后如何呢？
![](./image/45646547.png)

恐怖如斯啊，babel 把我们填写的 import "core-js"替换掉， 转而导入了一大片的 polyfill， 而且都是一些我没有用到的东西。

那我们提升一下目标浏览器呢？ 它还会导入这么多吗？
此时， 我们把目标浏览器调整为比较接近最新版本的 75(当下最新版本为 78)

```
// .browserslistrc
Chrome > 75
```

此刻打包后引入的 polyfill 明显少了好多。

![](./image/6c07832d.png)

但同样是我们没用过的。
这也就是印证了上面所说的， 当 useBuiltIns 的值为 entry 时， @babel/preset-env 会按照你所设置的目标浏览器在入口处来引入所需的 polyfill,
不管你需不需要。

如此，我们可以知道， useBuiltIns = entry 的优点是覆盖面积就比较广， 一股脑全部搞定， **但是缺点就是打出来的包就大了多了很多没有用到的 polyfill, 并且还会污染全局**

##### useage

这个就比较神奇了， useBuiltIns = useage 时，会参考目标浏览器（browserslist） 和 代码中所使用到的特性来按需加入 polyfill

当然， 使用 useBuiltIns = useage, 还需要填写另一个参数 corejs 的版本号

> core-js 支持两个版本， 2 或 3， 很多新特性已经不会加入到 2 里面了， 比如: flat 等等最新的方法， 2 这个版本里面都是没有的， 所以建议大家用 3

此时的 .babelrc

```json
{
	"presets": [
		[
			"@babel/preset-env",
			{
				"useBuiltIns": "usage",
				"corejs": 3
			}
		]
	]
}
```

此时的 index.js

```js
function test() {
	new Promise()
}
test()
const arr = [1, 2, 3, 4].map(item => item * item)
const hasNumber = num => [4, 5, 6, 7, 8].includes(num)
console.log(arr)
console.log(hasNumber(2))
```

此时的 .browserslistrc

```
> 1%
last 10 versions
not ie <= 8
```

打包后:
![](./image/56b8cd2c5739.png)

nice ,够神奇， 我们用的几个新特性真的通通都加上了

这种方式打包体积不大，但是如果我们排除 node_modules/目录，遇上没有经过转译的第三方包，就检测不到第三方包内部的 ‘hello‘.includes(‘h‘)这种句法，这时候我们就会遇到 bug

##### false

剩下最后一个 useBuiltIns = false , 那就简单了， 这也是默认值 ， 使用这个值时不引入 polyfill

#### @babel/runtime

这种方式会借助 helper function 来实现特性的兼容，
并且利用 @babel/plugin-transform-runtime 插件还能以沙箱垫片的方式防止污染全局， 并抽离公共的 helper function , 以节省代码的冗余

也就是说 @babel/runtime 是一个核心， 一种实现方式， **而 @babel/plugin-transform-runtime 就是一个管家， 负责更好的重复使用 @babel/runtime**

@babel/plugin-transform-runtime 插件也有一个 corejs 参数需要填写

> 版本 2 不支持内置对象 ， 但自从 Babel 7.4.0 之后，拥有了 @babel/runtime-corejs3 ， 我们可以放心使用 corejs: 3 对实例方法做支持

当前的 .babelrc

```json
{
	"presets": [["@babel/preset-env"]],
	"plugins": [
		[
			"@babel/plugin-transform-runtime",
			{
				"corejs": 3
			}
		]
	]
}
```

当前的 index.js

```js
function test() {
	new Promise()
}
test()
const arr = [1, 2, 3, 4].map(item => item * item)
const hasNumber = num => [4, 5, 6, 7, 8].includes(num)
console.log(arr)
console.log(hasNumber(2))
```

打包后如下:
![](./image/5fcacbb5e77.png)

我们看到使用 @babel/plugin-transform-runtime 编译后的代码和之前的 @babel/preset-env 编译结果大不一样了，
它使用了帮助函数, 并且赋予了别名 ， 抽出为公共方法， 实现复用。 比如它用了 \_Promise 代替了 new Promise ， 从而避免了创建全局对象

上面两种方式一起用会怎么样

#### useage 和 @babel/runtime

useage 和 @babel/runtime 同时使用的情况下比较智能， 并没有引入重复的 polyfill

> 个人分析原因应该是： babel 的 plugin 比 prset 要先执行， 所以 preset-env 得到了 @babel/runtime 使用帮助函数包装后的代码，而 useage 又是检测代码使用哪些新特性来判断的， 所以它拿到手的只是一堆 帮助函数， 自然没有效果了

当前 index.js

```js
function test() {
	new Promise()
}
test()
const arr = [1, 2, 3, 4].map(item => item * item)
const hasNumber = num => [4, 5, 6, 7, 8].includes(num)
const hasNumber2 = num => [4, 5, 6, 7, 8, 9].includes(num)
console.log(arr)
console.log(hasNumber(2))
console.log(hasNumber2(3))
```

当前 .babelrc

```json
{
	"presets": [
		[
			"@babel/preset-env",
			{
				"useBuiltIns": "usage",
				"corejs": 3
			}
		]
	],
	"plugins": [
		[
			"@babel/plugin-transform-runtime",
			{
				"corejs": 3
			}
		]
	]
}
```

打包结果:

![](./image/bbbdcab.png)

#### entry 和 @babel/runtime

跟 useage 的情况不一样， entry 模式下， 在经过 @babel/runtime 处理后不但有了各种帮助函数还引入了许多 polyfill， 这就会导致打包体积无情的增大

> 个人分析: entry 模式下遭遇到入口的 import "core-js" 及就立即替换为当前目标浏览器下所需的所有 polyfill, 所以也就跟 @babel/runtime 互不冲突了， 导致了重复引入代码的问题， 所以这两种方式千万不要一起使用， 二选一即可

实现过程如下:

当前 index.js:

```js
import 'core-js'
function test() {
	new Promise()
}
test()
const arr = [1, 2, 3, 4].map(item => item * item)
const hasNumber = num => [4, 5, 6, 7, 8].includes(num)
const hasNumber2 = num => [4, 5, 6, 7, 8, 9].includes(num)
console.log(arr)
console.log(hasNumber(2))
console.log(hasNumber2(3))
```

当前 .babelrc

```json
{
	"presets": [
		[
			"@babel/preset-env",
			{
				"useBuiltIns": "entry"
			}
		]
	],
	"plugins": [
		[
			"@babel/plugin-transform-runtime",
			{
				"corejs": 3
			}
		]
	]
}
```

当前 .browserslistrc 的目标版本(为了减少打包后的文件行数为又改为 chrome 了， 懂那个意思就行)

```
Chrome > 70
```

打包结果:
![](image/123132-33.png)

#### 总结

1. @babel/preset-env 拥有根据 useBuiltIns 参数的多种 polyfill 实现，优点是覆盖面比较全（entry）， 缺点是会污染全局， 推荐在业务项目中使用

- entry 的覆盖面积全， 但是打包体积自然就大，
- useage 可以按需引入 polyfill, 打包体积就小， **但如果打包忽略 node_modules 时如果第三方包未转译则会出现兼容问题**

```json
{
	"presets": [
		[
			"@babel/preset-env",
			{
				"useBuiltIns": "usage",
				"corejs": 3
			}
		]
	]
}
```

2. @babel/runtime 在 babel 7.4 之后大放异彩， 利用 corejs 3 也实现了各种内置对象的支持， 并且依靠 @babel/plugin-transform-runtime 的能力，沙箱垫片和代码复用， 避免帮助函数重复 inject 过多的问题， 该方式的优点是不会污染全局， 适合在类库开发中使用

```json
{
	"presets": [["@babel/preset-env"]],
	"plugins": [
		[
			"@babel/plugin-transform-runtime",
			{
				"corejs": 3
			}
		]
	]
}
```

**上面 1， 2 两种方式取其一即可， 同时使用没有意义, 还可能造成重复的 polyfill 文件**
