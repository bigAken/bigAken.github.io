<template>
	<div>testHooks</div>
</template>
<script>
export default {
	data() {
		return {}
	},
	mounted() {
		const timer = setInterval(() => {
			console.log('11111mouted')
		}, 1000)
		this.$once('hook:beforeDestroy', () => {
			console.log('beforeDestroy')
			clearInterval(timer)
		})
	}
}
</script>