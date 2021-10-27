import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Home from '@/layout/Home.vue'

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

function getMenuList(routes, parent = { fullPath: '', path: '' }) {
	const tempMenu = routes.map(item => {
		item.fullPath = `${parent.fullPath || parent.path}${item.path.includes('/') ? '' : '/'}${item.path}`
		if (Array.isArray(item['children']) && item['children'].length > 0) {
			item['children'] = getMenuList(item['children'], item)
			return item
		}
		return item
	})
	return tempMenu
}

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
export const menuList = getMenuList(routes[0].children)

export default new Router({
	mode: 'history',
	routes
})
