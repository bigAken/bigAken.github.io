import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)
import Home from '@/pages/home.vue'

// 路由自动导入
const contexts = require.context('./modules', false, /\.js$/)
let autoImportRoute = []
contexts.keys().forEach(path => {
	if (path.includes('index.js')) return
	autoImportRoute = autoImportRoute.concat(contexts(path).default)
})

// console.log('autoImportRoute', autoImportRoute)

const routes = [
	{
		path: '/',
		component: Home,
		redirect: {
			path: '/index'
		},
		meta: {
			title: '主页'
		},
		children: [
			{
				path: '/index',
				name: 'home',
				component: () => import(/* webpackChunkName: "home" */ '@/pages/index/index.vue'),
				meta: {
					requiresAuth: false,
					title: '首页'
				}
			},
			...autoImportRoute
		]
	}
]

function getMenuList(routes) {
	const tempMenu = routes.map(item => {
		const tempRoute = Object.keys(item).reduce((res, key) => {
			key !== 'component' && (res[key] = item[key])
			return res
		}, {})
		if (
			Object.prototype.hasOwnProperty.call(item, 'children') &&
			Array.isArray(item['children']) &&
			item['children'].length > 0
		) {
			const children = getMenuList(item['children']).map(child => {
				child.fullPath = `${item.path}/${child.path}`
				return child
			})
			tempRoute['children'] = children
		}
		return tempRoute
	})
	return tempMenu
}

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
console.log('object', getMenuList(routes[0].children))
export const menuList = getMenuList(routes[0].children)

export default new Router({
	routes
})
