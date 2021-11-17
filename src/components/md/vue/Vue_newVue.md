### new Vue()初始化过程

new Vue() new 关键字在 js 中是实例化一个对象，在本质上 Vue 是一个类，在 js 中 通过 Function 来实现

```js
// src/core/instance/index.js

new Vue() //会执行this._init()方法
function Vue(options) {
	if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
		warn('Vue is a constructor and should be called with the `new` keyword')
	}
	this._init(options)
}
```

init 方法

```js
Vue.prototype._init = function (options?: Object) {
	const vm: Component = this
	// a uid
	vm._uid = uid++

	let startTag, endTag
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
		startTag = `vue-perf-start:${vm._uid}`
		endTag = `vue-perf-end:${vm._uid}`
		mark(startTag)
	}

	// a flag to avoid this being observed
	vm._isVue = true
	// merge options
	if (options && options._isComponent) {
		// optimize internal component instantiation
		// since dynamic options merging is pretty slow, and none of the
		// internal component options needs special treatment.
		initInternalComponent(vm, options)
	} else {
		vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm)
	}
	/* istanbul ignore else */
	if (process.env.NODE_ENV !== 'production') {
		initProxy(vm)
	} else {
		vm._renderProxy = vm
	}
	// expose real self
	vm._self = vm
	initLifecycle(vm)
	initEvents(vm)
	initRender(vm)
	callHook(vm, 'beforeCreate')
	initInjections(vm) // resolve injections before data/props
	initState(vm)
	initProvide(vm) // resolve provide after data/props
	callHook(vm, 'created')

	/* istanbul ignore if */
	if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
		vm._name = formatComponentName(vm, false)
		mark(endTag)
		measure(`vue ${vm._name} init`, startTag, endTag)
	}

	if (vm.$options.el) {
		vm.$mount(vm.$options.el)
	}
}
```

例子

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const el = new Vue({
	router,
	store,
	render: h => h(App)
})
el.$mount('#app')
```
