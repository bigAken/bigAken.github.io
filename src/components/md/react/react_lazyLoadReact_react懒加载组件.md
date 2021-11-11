### react 组件懒加载

在使用 Create React App 创建的 React 项目，通常会通过 import 引用所需的组件(如 import HelloWorld from './HelloWorld')，**当项目打包成生产环境代码时，通过这种方式引用的 js 文件都会被打包到一起**。

当前端项目代码量足够大时，这意味最终打包出来的 index.js 代码量也将会非常大，这明显不利于实现页面的秒加载。

遇到这种场景，懒加载就提供了解决方案。懒加载的根本就是代码分割，**它可以将不需要在首屏显示的组件代码独立分割成一个文件**，在适当的时候(如经过用户交互后)，再把这类组件动态加载出来。

#### React 实现懒加载有两种方式

##### import().then()

```js
import('./math').then(math => {
	console.log(math.add(16, 26))
})
```

以上面代码为例，用方式实现懒加载，在打包时会将 import 的内容即 math.js 独立打包成一个文件，实现与主程序的代码分割。

```jsx
import React, { Component } from 'react'

const asyncComponent = importComponent => {
	return class extends Component {
		constructor() {
			super()
			this.state = {
				component: null
			}
		}
		componentDidMount() {
			importComponent().then(cmp => {
				this.setState({ component: cmp.default })
			})
		}
		render() {
			const C = this.state.component
			return C ? <C {...this.props} /> : null
		}
	}
}

export default asyncComponent
```

在实际应用中，常常会封装成一个动态加载的高阶组件 asyncComponent：

asyncComponent 应用于路由的懒加载实现：

```jsx
<Switch>
	<Route exact path="/" component={AsyncComponent(() => import('./routes/Home'))}></Route>
	<Route path="/about" component={AsyncComponent(() => import('./routes/About'))}></Route>
</Switch>
```

##### React.lazy

React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件。React.lazy 通常与 React.Suspense 配合使用

```jsx
import React, { lazy, Suspense } from 'react'

const CompA = lazy(() => import('./CompA'))
class Test extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const visible = false
		return (
			<div>
				{visible ? (
					<Suspense fallback={<div>Loading...</div>}>
						<CompA />
					</Suspense>
				) : null}
			</div>
		)
	}
}

export default Test
```

在上述代码中，组件 CompA 不会被马上加载进来，只有当 visible 为 true 时，才会被动态加载进来。

当项目打包时，与第一种方式相同，CompA.js 会被独立打包出来，打包出来的文件会通过动态加载的方式引用到项目中。

React.lazy 应用于路由懒加载实现：

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

const Home = lazy(() => import('./routes/Home'))
const About = lazy(() => import('./routes/About'))

const App = () => (
	<Router>
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
			</Switch>
		</Suspense>
	</Router>
)
```
