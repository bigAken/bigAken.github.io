<template>
	<div>
		<el-button type="primary" @click="sendSomething">主要按钮</el-button>
		<svg-icon icon-class="home"></svg-icon>
		<el-button type="primary" @click="sendToGithub">github</el-button>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	methods: {
		sendToGithub(){
			axios.get('http://localhost:3011/github/rate_limit',{token:1111}).then(res=>{
				console.log('res',res)
			})

		},
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
	}
}
</script>
