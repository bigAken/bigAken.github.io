const md = () => import(/* webpackChunkName: "md" */ '@/pages/mdUse/index.vue')
export default [
	{
		path: '/mdUse',
		name: 'mdUse',
		component: md,
		meta: { requiresAuth: false, title: 'vue使用md文件' }
	}
]
