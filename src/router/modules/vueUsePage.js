/**
 *
 * vue使用案例相关路由
 *
 */

const observerUse = () => import(/* webpackChunkName: "vueUse" */ '@/pages/vueUsePage/observerUse/observerUse.vue')
const componentV_model = () => import(/* webpackChunkName: "vueUse" */ '@/pages/vueUsePage/componentV_model/componentV_model.vue')
const listenAttrs = () => import(/* webpackChunkName: "vueUse" */ '@/pages/vueUsePage/listenAttrs/$listen$attrs.vue')
const vueReflesh = () => import(/* webpackChunkName: "vueUse" */ '@/pages/vueUsePage/vueReflesh/vueReflesh.vue')
const vueUseIndex = () => import(/* webpackChunkName: "vueUse" */ '@/pages/vueUsePage/vueUseIndex.vue')

export default [
	{
		path: 'vueUse',
		name: 'vueUseIndex',
		redirect: {
			path: '/vueUse/observerUse'
		},
		component: vueUseIndex,
		meta: { requiresAuth: false, title: 'Vue高级用法' },
		children: [
			{
				path: 'observerUse',
				name: 'observerUse',
				component: observerUse,
				meta: { requiresAuth: false, title: 'vue子孙传参' }
			},
			{
				path: 'componentV_model',
				name: 'componentV_model',
				component: componentV_model,
				meta: { requiresAuth: false, title: '组件v-model' }
			},
			{
				path: 'listenAttrs',
				name: 'listenAttrs',
				component: listenAttrs,
				meta: { requiresAuth: false, title: 'listenAttrs使用' }
			},
			{
				path: 'vueReflesh',
				name: 'vueReflesh',
				component: vueReflesh,
				meta: { requiresAuth: false, title: '组件局部刷新' }
			}
		]
	}
]
