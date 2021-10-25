/**
 *
 * html 相关路由
 *
 */
const htmlIndex = () => import(/* webpackChunkName: "html" */ '@/pages/html/htmlIndex.vue')
const domBase = () => import(/* webpackChunkName: "html" */ '@/pages/html/domBase/domBase.vue')

export default [
	{
		path: 'html',
		component: htmlIndex,
		redirect: {
			path: '/html/domBase'
		},
		meta: {
			title: 'html相关'
		},
		children: [
			{
				path: 'domBase',
				name: 'domBase',
				component: domBase,
				meta: { requiresAuth: false, title: 'dom操作' }
			}
		]
	}
]
