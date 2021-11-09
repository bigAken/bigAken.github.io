### 路由的 props 属性

一般在组件内使用路由参数，大多数人会这样做：

```javascript
export default {
	methods: {
		getParamsId() {
			return this.$route.params.id
		}
	}
}
```

在组件中使用 $route 会使它与路由系统形成高度耦合，从而使组件只能在使用了路由功能的项目内，或某些特定的 URL 上使用，限制了其灵活性。

> 试想一下，如果你的组件被人拿去复用了，但是那个人并没有使用路由系统，而是通过别的方式传递 id 参数，那么他该怎么办？

#### 正确的做法是通过 props 解耦！

- 首先，为组件定义一个叫做 id 的 prop：

```javascript
export default {
	props: ['id'],
	methods: {
		getParamsId() {
			return this.id
		}
	}
}
```

`如果组件没有对应路由，那么这个id也可以通过父组件向子组件传值的方式使用。`
`如果使用了路由，可以通过路由的prop属性，传递id的值：`
将路由的 props 属性设置为 true 后，组件内可通过 props 接收到 params 参数

```javascript
const router = new VueRouter({
	routes: [
		{
			path: '/user/:id',
			component: User,
			props: true
		}
	]
})
```

另外，你还可以通过函数模式来返回 props

```javascript
const router = new VueRouter({
	routes: [
		{
			path: '/user/:id',
			component: User,
			props: route => ({
				id: route.query.id
			})
		}
	]
})
```
