import Vue from 'vue'
import mdConfigName from '../plugins/mdConfigName/index'

// 自动导入组件
const componentCtx = require.context('./', true, /\.vue$|\.md/)
const mdCom = []
// 遍历出每个组件的路径
componentCtx.keys().forEach(fileName => {
	// 组件实例
	const component = componentCtx(fileName).default || componentCtx(fileName)
	// 截取路径作为组件名
	const reqComName = fileName.replace(/(.*\/)*([^.]+).*/gi, '$2')
	const temp = reqComName.split('_')

	// md组件需要绑定一个data
	if (/\.md$/.test(fileName)) {
		component.data = function () {
			return {}
		}
		mdCom.push({ component, name: temp[1] || temp[0], title: mdConfigName[temp[1]] || temp[2] || temp[0], fileName: reqComName, path: temp[1] || temp[0], })
		component.name = temp[1]
		component.path = temp[1]
	}
	Vue.component(temp[1] || temp[0], component)
})
export const mdComponents = mdCom
