/**
 *
 * js使用技巧相关路由
 *
 */

const promiseToUse = () => import(/* webpackChunkName: "jsRoute" */ '@/pages/jsPage/promiseToUse.vue')

export default [
	{
		path: '/promiseToUse',
		name: 'promiseToUse',
		component: promiseToUse,
		meta: { requiresAuth: false, title: 'promise技巧' }
	}
]
