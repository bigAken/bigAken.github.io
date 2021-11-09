### vue 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。

为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。例如：

```javascript
Vue.component('async-example', function (resolve, reject) {
	setTimeout(function () {
		// 向 `resolve` 回调传递组件定义
		resolve({
			template: '<div>I am async!</div>'
		})
	}, 1000)
})
```

如你所见，这个工厂函数会收到一个 resolve 回调，这个回调函数会在你从服务器得到组件定义的时候被调用。

你也可以调用 reject(reason) 来表示加载失败。这里的 setTimeout 是为了演示用的，如何获取组件取决于你自己。

一个推荐的做法是将异步组件和 webpack 的 code-splitting 功能一起配合使用：

```javascript
Vue.component('async-webpack-example', function (resolve) {
	// 这个特殊的 `require` 语法将会告诉 webpack
	// 自动将你的构建代码切割成多个包，这些包
	// 会通过 Ajax 请求加载
	require(['./my-async-component'], resolve)
})
```

你也可以在工厂函数中返回一个 Promise，所以把 webpack 2 和 ES2015 语法加在一起，我们可以写成这样：

```javascript
Vue.component(
	'async-webpack-example',
	// 这个 `import` 函数会返回一个 `Promise` 对象。
	() => import('./my-async-component')
)
```

当使用局部注册组件的时候，你也可以直接提供一个返回 Promise 的函数：

```javascript
new Vue({
	// ...
	components: {
		'my-component': () => import('./my-async-component')
	}
})
```
如果你想实现异步加载组件的功能，提高首屏显示速度，那么可以使用上面例子中的定义组件的方法，也就是：箭头函数+import语句