## Vue Router相关
### 介绍一下 keep-alive

keep-alive 是 Vue 内置的一个组件，可以缓存组件的状态，避免重复渲染，提高性能。
keep-alive 内置组件有 3 个属性

include：字符串或正则表达式，名称匹配的组件会被缓存。
exclude：字符串或正则表达式，名称匹配的组件不会被缓存。
max：缓存组件数量阈值

设置 keep-alive 的组件，会增加两个生命钩子（activated / deactivated）。
首次进入组件：beforeCreate -> created -> beforeMount -> mounted -> activated
离开组件触发 deactivated，因为组件缓存不销毁，所以不会触发 beforeDestroy 和 destroyed 生命钩子。再次进入组件后直接从 activated 生命钩子开始。

常见业务场景：在列表页的第 2 页进入详情页，详情页返回，依然停留在第 2 页，不重新渲染。但从其他页面进入列表页，还是需要重新渲染。

思路：vuex 使用数组存储列表页名字，列表页离开结合 beforeRouteLeave 钩子判断是否需要缓存，对全局数组进行更改。
在 router-view 标签位置如下使用

```Html
<template>
	<keep-alive :include="cacheRouting">
		<router-view></router-view>
	</keep-alive>
</template>
<script>
export default {
	computed: {
		cacheRouting() {
			return this.$store.state.cacheRouting
		}
	}
}
</script>
```

列表页如下使用

```Html
<template>
  <div></div>
</template>
<script>
export default {
  beforeRouteLeave(to, from, next) {
    if(to.name === '详情页') {
      // ... 向全局缓存路由数组添加列表页
      next()
    } else {
      // ... 向全局缓存路由数组删除列表页
      next()
    }
  }
}
</script>

```

### Vue-Router 配置 404 页面

\* 代表通配符，若放在任意路由前，会被先匹配，导致跳转到 404 页面，所以需将如下配置置于最后。

```js
{
  path: '*',
  name: '404'
  component: () => import('./404.vue')
}
```

### Vue-Router 有哪几种导航守卫

#### 全局前置守卫 router.beforeEach

在路由跳转前触发，可在执行 next 方法前做一些身份登录验证的逻辑。

```js
const router = new VueRouter({})

router.beforeEach((to, from, next) => {
 ...
 // 必须执行 next 方法来触发路由跳转
 next()
})
```

#### 全局解析守卫 router.beforeResolve

与 beforeEach 类似，也是路由跳转前触发，区别是还需在所有组件内守卫和异步路由组件被解析之后，也就是在组件内 beforeRouteEnter 之后被调用。

```js
const router = new VueRouter({})

router.beforeResolve((to, from, next) => {
  ...
  // 必须执行 next 方法来触发路由跳转
  next()
})
```

#### 全局后置钩子 router.afterEach

```js
router.afterEach((to, from) => {
	// ...
})
```

#### 路由独享守卫

可在路由配置上直接定义 beforeEnter

```js
const router = new VueRouter({
	routes: [
		{
			path: '/home',
			component: Home,
			beforeEnter: (to, from, next) => {}
		}
	]
})
```

#### 组件内的守卫

组件内可直接定义如下路由导航守卫

```js
const Foo = {
	template: `...`,
	beforeRouteEnter(to, from, next) {
		// 不能获取组件实例 this
		// 当守卫执行前，组件实例还没被创建
	},
	beforeRouteUpdate(to, from, next) {
		// 当前路由改变，但是组件被复用时调用
		// 可访问实例 this
	},
	beforeRouteLeave(to, from, next) {
		// 导航离开组件时被调用
	}
}
```

### Vue-Router 完整的导航解析流程

1. 导航被触发
2. 在失活的组件里调用 beforeRouteLeave 守卫
3. 调用全局 beforeEach 前置守卫
4. 重用的组件调用 beforeRouteUpdate 守卫（2.2+）
5. 路由配置调用 beforeEnter
6. 解析异步路由组件
7. 在被激活的组件里调用 beforeRouteEnter 守卫
8. 调用全局的 beforeResolve 守卫（2.5+）
9. 导航被确认
10. 调用全局的 afterEach
11. 触发 DOM 更新
12. 调用   beforeRouteEnter  守卫中传给  next  的回调函数，创建好的组件实例会作为回调函数的参数传入

### Vue-Router 路由有几种模式？说说他们的区别？

Vue-Router 有 3 种路由模式：hash、history、abstract。

#### hash 模式

Vue-Router 默认为 hash 模式，基于浏览器的 onhashchange 事件，地址变化时，通过 window.location.hash 获取地址上的 hash 值；根据 hash 值匹配 routes 对象对应的组件内容。
特点

- hash 值存在 URL 中，携带#，hash 值改变不会重载页面。
- hash 改变会触发 onhashchange 事件，可被浏览器记录，从而实现浏览器的前进后退。
- hash 传参基于 url，传递复杂参数会有体积限制。
- 兼容性好，支持低版本浏览器和 IE 浏览器。

案例代码，需在本地启用服务（http-server）访问, 已测试过，可直接 cv 体验。
实现原理

```Html
<div class="main">
  <a href="#/home">home</a>
  <a href="#/detail">detail</a>
  <div id="content"><span>暂无内容</span></div>
</div>
<script>
  const routers = [{
    path: '/',
    component: `<span>暂无内容</span>`
  },
  {
    path: '/home',
    component: `<span>我是Home页面</span>`
  }, {
    path: '/detail',
    component: `<span>我是Detail页面</span>`
  }]

  function Router(routers) {
    console.log('执行')
    this.routers = {}
    // 初始化生成 routers
    routers.forEach((router) => {
      this.routers[router.path] = () => {
        document.getElementById("content").innerHTML = router.component;
      }
    })
    this.updateView = function(e) {
      let hash = window.location.hash.slice(1) || '/'
      console.log('hash更新', hash, this.routers[hash])
      this.routers[hash] && this.routers[hash]()
    }
    // 路由加载触发视图更新
    window.addEventListener('load', this.updateView.bind(this))
    // 路由改变触发视图更新
    window.addEventListener('hashchange', this.updateView.bind(this))
  }
  // 实例化 hash 模式的 Router
  let router = new Router(routers)
</scrip

```

### history 模式

基于 HTML5 新增的 pushState 和 replaceState 实现在不刷新的情况下，操作浏览器的历史纪录。前者是新增历史记录，后者是直接替换历史记录。
特点

- URL 不携带#，利用 pushState 和 replaceState 完成 URL 跳转而无须重新加载页面。
- URL 更改会触发 http 请求。所以在服务端需增加一个覆盖所有情况的候选资源：若 URL-匹配不到任何静态资源，则应该返回同一个 index.html。这个页面就是 app 依赖的页面。
- 兼容性 IE10+

```nginx
// nginx 服务端配置
location / {
  try_files $uri $uri/ /index.html;
}
```

实现原理

```Html
<div class="main">
  <a href="javascript:;" path="/home">home</a>
  <a href="javascript:;" path="/detail">detail</a>
  <div id="content"><span>暂无内容</span></div>
</div>

<script>
const routers = [{
  path: '/home',
  component: `<span>我是Home页面</span>`
}, {
  path: '/detail',
  component: `<span>我是Detail页面</span>`
}, {
  path: '/',
  component: '<span>暂无内容</span>'
}]

function Router(routers) {
  this.routers = {}
  // 初始化生成 routers
  routers.forEach((router) => {
    this.routers[router.path] = () => {
      document.getElementById("content").innerHTML = router.component;
    }
  })
  const links = [...document.getElementsByTagName('a')]
  links.forEach(link => {
    link.addEventListener('click', () => {
      window.history.pushState({}, null, link.getAttribute('path'))
      this.updateView()
    })
  })
  this.updateView = function() {
    let url = window.location.pathname || '/'
    this.routers[url] && this.routers[url]()
  }
  // 路由加载触发视图更新
  window.addEventListener('load', this.updateView.bind(this))
  // 路由改变触发视图更新
  window.addEventListener('popstate', this.updateView.bind(this))
}
// 实例化 history 模式的 Router
const router = new Router(routers)
</script>

```

#### abstract 模式

支持所有 JS 运行模式，Vue-Router 自身会对环境做校验，如果发现没有浏览器 API，路由会自动强制进入 abstract 模式。在移动端原生环境也是使用 abstract 模式。

### Vue 路由传参方式

#### 方案一

```js
// 路由配置
{
  path: '/detail/:id',
  name: 'Detail',
  component: () => import('./Detail.vue')
}
// 路由跳转
let id = 1
this.$router.push({ path: '/detail/${id}'})
// 获取参数
this.$route.params.id

```

#### 方案二

方案二，URL 虽然不显示我们的传参，但是是可以在子组件获取参数的。当然也有问题：会存在刷新丢失参数。

若想不丢失，需和方案一路由配置一样。原因是第二种方式传参是上一个页面 push 函数中携带的，刷新没有 push 的动作。

```javascript
// 路由配置
{
  path: '/detail',
  name: 'Detail',
  component: () => import('./Detail.vue')
}
// 路由跳转
let id = 1
this.$router.push({ name: 'Detail', params: { id: id } })
// 获取参数
this.$route.params.id

```

#### 方案三

```js
// 路由配置
{
  path: '/detail',
  name: 'Detail',
  component: () => import('./Detail.vue')
}
// 路由跳转
let id = 1
this.$router.push({ name: 'Detail', query: { id: id } })
// 获取参数
this.$route.query.id


```
