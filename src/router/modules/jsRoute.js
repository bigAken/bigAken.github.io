/**
 *
 * js使用技巧相关路由
 *
 */

const promiseToUse = () => import(/* webpackChunkName: "JavaScriptRoute" */ '@/pages/jsPage/promiseToUse.vue')
const fileDownload = () => import(/* webpackChunkName: "JavaScriptRoute" */ '@/pages/jsPage/fileDownload.vue')
const index = () => import(/* webpackChunkName: "JavaScriptRoute" */ '@/pages/jsPage/index.vue')
const md = () => import(/* webpackChunkName: "JavaScriptRoute" */ '@/pages/jsPage/mdUse/index.vue')
import { mdComponents } from '@/components/index.js'

const childRoutes = mdComponents.map(item => {
	return {
		...item,
		path: item.name,
		label: item.name,
		meta: {
			title: item.name
		}
	}
})
// console.log('childRoutes', childRoutes)
export default [
	{
		path: 'JavaScript',
		name: 'JavaScript',
		component: index,
		meta: { requiresAuth: false, title: 'JavaScript' },
		children: [
			{
				path: 'promiseToUse',
				component: promiseToUse,
				meta: {
					title: 'promise技巧'
				}
			},
			{
				path: 'fileDownload',
				component: fileDownload,
				meta: {
					title: '文件下载'
				}
			},
			{
				path: 'mdUse',
				name: 'mdUse',
				component: md,
				// meta: { requiresAuth: false, title: 'vue使用md文件' },
				meta: { requiresAuth: false, title: 'md文件' },
				children: [childRoutes[0]]
			}
		]
	}
]
