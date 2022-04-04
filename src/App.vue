<template>
	<div>
		<router-view></router-view>
		<button @click="setSome">12312</button>
	</div>
</template>
<script>
export default {
	name: 'App',
	components: {},
	methods: {
		setSome() {
			console.log(132123);
			sessionStorage.setItem('test',Math.random())
		}
	},
	data() {
		return {
			id: 'test',
			obj: {
				[this.id]: null
			}
		}
	},
	mounted() {
		window.addEventListener('storage', e => {
			console.log('storage值发生变化后触发:', e)
		})
	}
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
