const shop = {
	namespaced: true,
	state: {
		crateTime: '11111'
	},
	mutations: {
		changeTime(state) {
			// 这里的 `state` 对象是模块的局部状态
			state.crateTime = `${new Date().getHours()} + ${new Date().getMinutes()} + ${new Date().getSeconds()}`
		}
	},

	getters: {
		dateNow(state) {
			return `现在是${state.crateTime}`
		}
	}
}
export default shop
