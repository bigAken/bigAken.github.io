/**
 *
 * js使用技巧相关路由
 *
 */

const promiseToUse = () => import(/* webpackChunkName: "JavaScriptRoute" */ '@/pages/jsPage/promiseToUse.vue')
const fileDownload = () => import(/* webpackChunkName: "JavaScriptRoute" */ '@/pages/jsPage/fileDownload.vue')
const index = () => import(/* webpackChunkName: "JavaScriptRoute" */ '@/pages/jsPage/index.vue')

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
			}
		]
	}
]
