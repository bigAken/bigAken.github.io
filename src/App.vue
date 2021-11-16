<template>
	<router-view></router-view>
</template>
<script>
export default {
	name: 'App',
	components: {},
	methods: {},
	data() {
		return {
			id: 'test',
			obj: {
				[this.id]: null
			}
		}
	},
	mounted() {
		console.log(this.obj)
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
