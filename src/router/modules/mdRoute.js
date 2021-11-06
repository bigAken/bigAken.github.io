import { mdComponents } from '@/components/index.js'
const md = () => import(/* webpackChunkName: "JavaScriptRoute" */ '@/pages/jsPage/mdUse/index.vue')
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
const vueMdRoutes = childRoutes.filter(item => {
	return /^(vue)/i.test(item.name)
})
const jsMdRoutes = childRoutes.filter(item => {
	return /^(javascript)/i.test(item.name)
})
const cssMdRoutes = childRoutes.filter(item => {
	return /^(css)/i.test(item.name)
})
const reactMdRoutes = childRoutes.filter(item => {
	return /^(react)/i.test(item.name)
})
const otherMdRoutes = childRoutes.filter(item => {
	return /^(other)/i.test(item.name)
})
export default [
	{
		path: 'mdUse',
		name: 'mdUse',
		component: md,
		// meta: { requiresAuth: false, title: 'vue使用md文件' },
		meta: { requiresAuth: false, title: 'md相关文件' },
		children: [
			{
				path: 'vueMd',
				name: 'vueMd',
				meta: {
					title: 'vue相关Md文件'
				},
				children: [...vueMdRoutes]
			},
			{
				path: 'jsMd',
				name: 'jsMd',
				meta: {
					title: 'js相关md文件'
				},
				children: [...jsMdRoutes]
			},
			{
				path: 'cssMd',
				name: 'cssMd',
				meta: {
					title: 'css相关md文件'
				},
				children: [...cssMdRoutes]
			},
			{
				path: 'reactMd',
				name: 'reactMd',
				meta: {
					title: 'react相关md文件'
				},
				children: [...reactMdRoutes]
			},
			{
				path: 'otherMd',
				name: 'otherMd',
				meta: {
					title: '其他md'
				},
				children: [...otherMdRoutes]
			}
		]
	}
]

function test1() {
	var p = new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (window) {
				resolve({ status: 200, data: 1 })
			} else {
				reject({
					status: 500,
					data: null
				})
			}
		}, 1000)
	})
	return p
}
function test2() {
	var p = new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (window) {
				resolve({ status: 200, data: 1 })
			} else {
				reject({
					status: 500,
					data: null
				})
			}
		}, 1000)
	})
	return p
}
Promise.all([test1(), test2()]).then(function (results) {
	console.log('results', results)
})
