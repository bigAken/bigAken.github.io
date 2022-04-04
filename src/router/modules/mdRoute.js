import { mdComponents } from '@/components/index.js'
const md = () => import(/* webpackChunkName: "JavaScriptRoute" */ '@/pages/jsPage/mdUse/index.vue')
const childRoutes = mdComponents.map(item => {
	return {
		...item,
		path: item.name,
		label: item.title,
		meta: {
			title: item.title
		}
	}
})
const vueMdRoutes = childRoutes.filter(item => {
	return /^(vue)/i.test(item.fileName)
})
const jsMdRoutes = childRoutes.filter(item => {
	return /^(javascript)/i.test(item.fileName)
})
const cssMdRoutes = childRoutes.filter(item => {
	return /^(css)/i.test(item.fileName)
})
const reactMdRoutes = childRoutes.filter(item => {
	return /^(react)/i.test(item.fileName)
})
console.log('reactMdRoutes', reactMdRoutes);
const otherMdRoutes = childRoutes.filter(item => {
	return /^(other)/i.test(item.fileName)
})
const typescriptMdRoutes = childRoutes.filter(item => {
	return /^(typescript)/i.test(item.fileName)
})
const miniProMdRoutes = childRoutes.filter(item => {
	return /^(miniPro)/i.test(item.fileName)
})
const htmlMdRoutes = childRoutes.filter(item => {
	return /^(html)/i.test(item.fileName)
})
export default [

	{
		path: 'vueMd',
		name: 'vueMd',
		component: md,
		meta: {
			title: 'vue相关Md文件'
		},
		children: [...vueMdRoutes]
	},
	{
		path: 'jsMd',
		name: 'jsMd',
		component: md,
		meta: {
			title: 'js相关md文件'
		},
		children: [...jsMdRoutes]
	},
	{
		path: 'tsMd',
		name: 'tsMd',
		component: md,
		meta: {
			title: 'ts相关md文件'
		},
		children: [...typescriptMdRoutes]
	},
	{
		path: 'cssMd',
		name: 'cssMd',
		component: md,
		meta: {
			title: 'css相关md文件'
		},
		children: [...cssMdRoutes]
	},
	{
		path: 'htmlMd',
		name: 'htmlMd',
		component: md,
		meta: {
			title: 'html相关md文件'
		},
		children: [...htmlMdRoutes]
	},
	{
		path: 'miniProMd',
		name: 'miniProMd',
		component: md,
		meta: {
			title: '微信小程序相关md文件'
		},
		children: [...miniProMdRoutes]
	},
	{
		path: 'reactMd',
		name: 'reactMd',
		component: md,
		meta: {
			title: 'react相关md文件'
		},
		children: [...reactMdRoutes]
	},
	{
		path: 'otherMd',
		name: 'otherMd',
		component: md,
		meta: {
			title: '其他md'
		},
		children: [...otherMdRoutes]
	}
]

