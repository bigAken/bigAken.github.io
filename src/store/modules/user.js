const user = {
	namespaced: true,
	state: {
		random: ''
	},
	mutations: {
		increment(state) {
			// 这里的 `state` 对象是模块的局部状态
			state.random = parseInt(Math.random() * 1000)
		}
	},

	getters: {
		doubleRadom(state) {
			return state.random * 2
		}
	}
}
export default user
