# 关于 Vue 的相关知识

收集简短一些 vue 相关的东西
[![Juejin](https://img.shields.io/badge/参考掘金-花哨-blue)](https://juejin.cn/post/7023197006998978597#heading-64)
[![图标](https://img.shields.io/badge/图标-生成-yellow)](https://shields.io)

### MVVM 的理解

MVVM 是 Model-View-ViewModel 的缩写。Model 代表数据层，可定义修改数据、编写业务逻辑。View 代表视图层，负责将数据渲染成页面。ViewModel 负责监听数据层数据变化，控制视图层行为交互，简单讲，就是同步数据层和视图层的对象。ViewModel 通过双向绑定把 View 和 Model 层连接起来，且同步工作无需人为干涉，使开发人员只关注业务逻辑，无需频繁操作 DOM，不需关注数据状态的同步问题。
![](image/VueUseMd/1635473838853.png)

### 如何实现 v-model

v-model 指令用于实现 input、select 等表单元素的双向绑定，是个语法糖。
原生 input 元素若是 text/textarea 类型，使用 value 属性和 input 事件。
原生 input 元素若是 radio/checkbox 类型，使用 checked 属性和 change 事件。
原生 select 元素，使用 value 属性和 change 事件。
input 元素上使用 v-model 等价于

```Html
<input :value="message" @input="message = $event.target.value" />
```

### 如何理解 Vue 单向数据流 props

我们经常说 Vue 的双向绑定，其实是在单向绑定的基础上给元素添加 input/change 事件，来动态修改视图。Vue 组件间传递数据仍然是单项的，即父组件传递到子组件。子组件内部可以定义依赖 props 中的值，但无权修改父组件传递的数据，这样做防止子组件意外变更父组件的状态，导致应用数据流向难以理解。

> 如果在子组件内部直接更改 prop，会遇到警告处理。

#### 2 种定义依赖 props 中的值

- 通过 data 定义属性并将 prop 作为初始值。

```javascript
<script>
export default {
 props: ['initialNumber'],
 data() {
   return {
     number: this.initailNumber
   }
 }
}
</script>
```

- 用 computed 计算属性去定义依赖 prop 的值。若页面会更改当前值，得分 get 和 set 方法。

```javascript
<script>
export default {
 props: ['size'],
 computed: {
   normalizedSize() {
     return this.size.trim().toLowerCase()
   }
 }
}
</sciprt>
```

### 关于 Vue.observable 的了解

Vue.observable 可使对象可响应。返回的对象可直接用于渲染函数和计算属性内，并且在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器。

> 适用的场景：在项目中没有大量的非父子组件通信时，可以使用 Vue.observable 去替代 eventBus 和 vuex 方案。
> 用法如下

```javascript
// store.js
import Vue from 'vue'
export const state = Vue.observable({
  count: 1
})
export const mutations = {
  setCount(count) {
    state.count = count
  }
}

// vue 文件
<template>
  <div>{{ count }}</div>
</template>
<script>
import { state, mutation } from './store.js'
export default {
  computed: {
    count() {
      return state.count
    }
  }
}
</script>
```

### Vue.directive 有写过么，应用场景有哪些？

Vue.directive 可以注册全局指令和局部指令。

指令定义函数提供如下钩子函数

- bind：指令第一次绑定到元素时调用（只调用一次）
- inserted: 被绑定元素插入父节点时使用（父节点存在即可调用）
- update：被绑定元素所在模板更新时调用，不论绑定值是否变化。通过比较更新前后的绑定值。
- componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
- unbind: 只调用一次，指令与元素解绑时调用。
  我项目中有涉及 一键 copy、权限控制 都可以用指令的方式控制，目的就是简化我们的工作量

### 组件中的 data 为什么是个函数

在 vue 中，对于组件有一个很明显的特性是在于它是可以被复用的，组件是可以被复用的，那么注册了一个组件本质上就是创建了一个组件构造器的引用，而真正当我们使用组件的时候才会去将组件实例化，

```javascript
// 创建一个组件
class Component {}
const component1 = new Component()
const component2 = new Component()
const data = {
	a: 1,
	b: 2
}
component1.data = data
component2.data = data
component1.data.b = 3
console.log(component1.data.b) // 3
console.log(component2.data.b) // 3
```

通过上面代码可以得知实例化的 component1 和 component2 确是共享同样的 data 对象，所以当你修改 component1 的 data 中的一个属性的时候，component2 中的 data 也会发生改变，这明显不是我们想要的效果。

> 这跟 vue 组件复用，并且里面 data 是独立得相违背 当我们的 data 是一个函数的时候，每一个实例的 data 属性都是独立的，不会相互影响了。于是把 data 改成 function

```javascript
class Component {}
const component1 = new Component()
const component2 = new Component()
// 改造成function形式类似于vue组件的data
const data = function () {
	return {
		a: 1,
		b: 2
	}
}
component1.data = data()
component2.data = data()
component1.data.b = 3
console.log(component1.data.b) // 3
console.log(component2.data.b) // 2
```

### Vue 父组件和子组件生命周期执行顺序

#### 加载渲染过程

父先创建，才能有子；子创建完成，父才完整。
顺序：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

#### 子组件更新过程

- 子组件更新 影响到 父组件的情况。
  顺序：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
- 子组件更新 不影响到 父组件的情况。
  顺序：子 beforeUpdate -> 子 updated

#### 父组件更新过程

- 父组件更新 影响到 子组件的情况。
  顺序：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
- 父组件更新 不影响到 子组件的情况
  顺序：父 beforeUpdate -> 父 updated

#### 销毁过程

顺序：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### $nextTick()

因为 $nextTick() 返回一个 Promise 对象，所以你可以使用新的 ES2017 async/await 语法完成相同的事情：

```javascript
methods: {
  updateMessage: async function () {
    this.message = '已更新'
      //在这里可以看出，message并没有立刻被执行
      //要理解页面刷新和代码执行速度的差别
      //通常我们在页面上立刻就能看到结果，那是因为一轮队列执行其实很快，感觉不出DOM刷新的过程和所耗费的时间
      //但对于代码的执行，属于即刻级别，DOM没更新就是没更新，就是会有问题
    console.log(this.$el.textContent) // => '未更新'

    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```

### vue 使用展示 md 文件

```text
npm i vue-markdown-loader -D
npm i  vue-loader vue-template-compiler -D
# 样式
npm i github-markdown-css -D
npm i highlight.js -D
```

##### 在 vue.config.js 中配置

```javascript
config.module
	.rule('md')
	.test(/\.md/)
	.use('vue-loader')
	.loader('vue-loader')
	.end()
	.use('vue-markdown-loader')
	.loader('vue-markdown-loader/lib/markdown-compiler')
	.options({
		raw: true
	})
```

##### 具体使用方法

```Html
<template>
	<!-- class markdown-body 必须加，否则标签样式会出现问题 -->
  <div class="markdown-body">
    <markdown />
  </div>
</template>
<script>
// 引入 markdown 文件，引入后是一个组件，需要在 components 中注册
import markdown from 'xxxx.md'
// 代码高亮
import 'highlight.js/styles/github.css'
// 其他元素使用 github 的样式
import 'github-markdown-css'
export default {
  components: {
    markdown
  }
}
</script>
```

### watch 同时执行多个方法

```javascript
watch: {
    // 你可以传入回调数组，它们会被逐一调用
    a: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
  }
```

### 批量导入组件

如果你恰好使用了 webpack (或在内部使用了 webpack 的 Vue CLI 3+)，那么就可以使用  require.context  方法批量导入这些组件，然后将它们注册为全局组件，这样就可以在任何地方直接使用它们了，再也不用为导入的事情烦恼了！

```javascript
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
	// 其组件目录的相对路径
	'./components',
	// 是否查询其子目录
	false,
	// 匹配基础组件文件名的正则表达式
	/Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
	// 获取组件的配置，也就是具体内容，具体定义，组件的本身代码
	const componentConfig = requireComponent(fileName)

	// 获取组件的 PascalCase 命名，用来规范化组件名
	const componentName = upperFirst(
		camelCase(
			// 获取和目录深度无关的文件名
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	)

	// 全局注册组件
	Vue.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)
})
```

### vue 相当于 v-model 的修饰符.sync

下面是 elementUI 的示例，内部组件可以该表

```Html
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
```

### 关于 mixin 的理解，有什么应用场景

> 定义：mixin（混入），提供了一种非常灵活的方式，来分发 Vue 组件中可复用的功能

mixin 混入分全局混入和局部混入，本质是 JS 对象，如 data、components、computed、methods 等。

全局混入不推荐使用，会影响后续每个 Vue 实例的创建。局部混入可提取组件间相同的代码，进行逻辑复用。

适用场景：如多个页面具备相同的悬浮定位浮窗，可尝试用 mixin 封装。

```js
// customFloatDialog.js
export const customFloatDialog = {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    toggleShow() {
      this.visible = !this.visible
    }
  }
}
</script>

//需要引入的组件
<template>
  <div></div>
</template>
<script>
import { customFloatDialog } from './customFloatDialog.js'
export default {
  mixins: [customFloatDialog],
}
</script>
```

### Vue 组件间通讯方式

#### 父子组件通讯

- props 与 $emit
- \$parent 与 \$children

#### 隔代组件通讯

- \$attrs 与 \$listeners
- provide 和 inject

#### 父子、兄弟、隔代组件通讯

- EventBus
- observal
- Vuex

### 常用的修饰符

#### 表单修饰符

- lazy: 失去焦点后同步信息
- trim: 自动过滤首尾空格
- number: 输入值转为数值类型
- native：绑定一个原生的事件

#### 事件修饰符

- stop：阻止冒泡
- prevent：阻止默认行为
- self：仅绑定元素自身触发
- once：只触发一次

#### 鼠标按钮修饰符

- left：鼠标左键
- right：鼠标右键
- middle：鼠标中间键

### Vue 性能优化

- 非响应式数据通过 Object.freeze 冻结数据
- 嵌套层级不要过深
- computed 和 watch 区别使用
- v-if 和 v-show 区别使用
- v-for 避免和 v-if 一起使用，且绑定 key 值要唯一
- 列表数据过多采用分页或者虚拟列表
- 组件销毁后清除定时器和事件
- 图片懒加载
- 路由懒加载
- 防抖、节流
- 按需引入外部库
- keep-alive 缓存使用
- 服务端渲染和预渲染
