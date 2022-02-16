import Vue from 'vue'
import Vuex from 'vuex'
import { menuList } from '@/router/router.js'

Vue.use(Vuex)

const context = require.context('./modules', true, /\.js$/)

const storeModules = context.keys().reduce((tempModules, path) => {
	const key = path.replace(/^(\.)|(.js)/g, '').split('/')[1]
	tempModules[key] = context(path).default
	return tempModules
}, {})

const store = new Vuex.Store({
	namespaced: true,
	state: {
		menuList
	},
	mutations: {

	},
	getters: {
		asideMenu(state) {
			const list = state.menuList.reduce((list, menu) => {
				if (Array.isArray(menu.children)) {
					const temp = menu.children.map(item => {
						const { fileName, fullPath, label, meta, name, path, title } = item
						return { fileName, fullPath, label, meta, name, path, title }
					})
					return list = [...list, ...temp]
				}
				return list
			}, [])
			return list
		},
	},
	modules: { ...storeModules }
})

export default store
