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
		count: 0,
		menuList
	},
	mutations: {
		increment(state) {
			state.count++
		}
	},
	getters: {
		asideMenu(state) {
			// console.log('this.$store.state.menuLis', this.$store.state.menuList)
			const temp = state.menuList.map(item => {
				item.label = item.meta.title
				if (Array.isArray(item.children) && item.children.length) {
					item.children = item.children.map(child => ({ ...child, label: child.meta.title }))
				}
				return item
			})
			console.log('temp', temp)
			return temp
		},
	},
	modules: { ...storeModules }
})

export default store
