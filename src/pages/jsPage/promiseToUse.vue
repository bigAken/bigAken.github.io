<template>
	<!-- 面试题目 -->
	<div>
		<h2>按顺序执行promise 实际上是promise串行</h2>
		<el-button @click="handlerPromise" type="primary" :loading="loadingSec">reduce配合promise</el-button>
		<h2>使用Promise实现红绿灯交替重复亮 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？</h2>
		<el-button @click="step" type="primary" :loading="loading">执行红绿的</el-button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			loading: false,
			loadingSec: false
		}
	},
	methods: {
		// 按顺序执行promise 实际上是promise串行
		handlerPromise() {
			this.loadingSec = true
			const arr = [1, 2, 3]
			arr.reduce((p, x) => {
				return p.then(() => {
					return new Promise(r => {
						setTimeout(() => {
							r(console.log(x))
							this.loadingSec = x === arr.length - 1
						}, 1500)
					})
				})
			}, Promise.resolve())
		},
		// 使用Promise实现红绿灯交替重复亮 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？
		red() {
			console.log('red')
		},
		green() {
			console.log('green')
		},
		yellow() {
			console.log('yellow')
		},
		light(timer, cb) {
			return new Promise(resolve => {
				setTimeout(() => {
					cb()
					resolve()
				}, timer)
			})
		},
		step() {
			this.loading = true
			this.light(1000, this.red)
				.then(() => {
					return this.light(1000, this.green)
				})
				.then(() => {
					this.loading = false
					return this.light(1000, this.yellow)
				})
			// .then(() => {
			// 	return this.step()
			// })
		}
	},
	mounted() {
		this.handlerPromise()
		this.step()
	}
}
</script>
