import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Home from '@/layout/Home.vue'
import Mobile from '@/layout/Mobile.vue'

// 路由自动导入
const contexts = require.context('./modules', false, /\.js$/)
let autoImportRoute = []
contexts.keys().forEach(path => {
	if (path.includes('index.js')) return
	autoImportRoute = autoImportRoute.concat(contexts(path).default)
})

let isPc = true
if (
	navigator.userAgent.match(
		/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
	)
) {
	isPc = false
}
const routes = [
	{
		path: '/',
		component: isPc ? Home : Mobile,
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
console.log('autoImportRoute',autoImportRoute);
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
console.log('routes',routes);
export default new Router({
	mode: 'hash',
	routes
})
