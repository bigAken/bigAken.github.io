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
	modules: { ...storeModules }
})

export default store
