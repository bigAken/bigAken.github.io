<template>
	<div class="atuo-deploy">
		1111
		<el-button type="primary" @click="sendSomething">主要按钮</el-button>
		<svg-icon icon-class="home"></svg-icon>
		<el-input v-model="tets" placeholder="" @blur="inputBlur" @change="inputOnchange"></el-input>
		<el-button type="primary" @click="sendToGithub">github</el-button>
		<testHooks @hook:mounted="doSomething"></testHooks>
	</div>
</template>
<script>
import axios from 'axios'
import testHooks from './testHooks'
export default {
	data: () => {
		return {
			tets: ''
		}
	},
	components: { testHooks },
	methods: {
		doSomething() {
			console.log('mouted')
		},
		inputBlur() {
			console.log(1111)
		},
		async inputOnchange() {
			console.log(2222)
			const res = await axios.get('http://localhost:3011/github/rate_limit')
			console.log('res', res)
		},
		sendToGithub() {},
		sendSomething() {
			axios('/api/home/menu0', {
				params: {
					id: 1,
					title: '我是请求后台接口，并向后台传递参数'
				}
			})
				.then(res => {
					console.log(res)
					console.log('写入成功！')
				})
				.catch(msg => {
					console.log('msg', msg)
					console.log('写入失败！')
				})
		}
	},
	async mounted() {
		setTimeout(() => {
			console.log('33333')
			axios.get('https://api.github.com/rate_limit').then(res => {
				console.log('res', res)
			})
		}, 200)
		setTimeout(() => {
			console.log('22222')
		}, 200)
	}
}
</script>
