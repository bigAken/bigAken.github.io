import { mdComponents } from '@/components/index.js'
const md = () => import(/* webpackChunkName: "md" */ '@/pages/mdUse/index.vue')
const childRoutes = mdComponents.map(item => {
	return {
		...item,
		path: item.name,
		meta: {
			title: item.name
		}
	}
})
export default [
	{
		path: '/mdUse',
		name: 'mdUse',
		component: md,
		meta: { requiresAuth: false, title: 'vue使用md文件' },
		children: [...childRoutes]
	}
]
