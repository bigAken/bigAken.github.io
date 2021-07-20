/**
 *
 * css 相关路由
 *
 */
const elementIndex = () => import(/* webpackChunkName: "elementUse" */ '@/pages/element/elementIndex.vue')
const table = () => import(/* webpackChunkName: "elementUse" */ '@/pages/element/table/index.vue')
export default [
	{
		path: '/element',
		component: elementIndex,
		redirect: {
			path: '/element/table'
		},
		meta: {
			title: 'element相关'
		},
		children: [
			{
				path: 'table',
				name: 'table',
				component: table,
				meta: { requiresAuth: false, title: '表格优化' }
			}
		]
	}
]
