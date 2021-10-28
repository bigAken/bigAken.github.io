import Vue from 'vue'

// 自动导入组件
const componentCtx = require.context('./', true, /\.vue$|\.md/)
const mdCom = []
// 遍历出每个组件的路径
componentCtx.keys().forEach(fileName => {
	// 组件实例
	const component = componentCtx(fileName).default || componentCtx(fileName)
	// 截取路径作为组件名
	const reqComName = fileName.replace(/(.*\/)*([^.]+).*/gi, '$2')
	// md组件需要绑定一个data
	if (/\.md$/.test(fileName)) {
		component.data = function () {
			return {}
		}
		mdCom.push({ component, name: reqComName })
		component.name = reqComName
	}
	Vue.component(reqComName, component)
})
export const mdComponents = mdCom
