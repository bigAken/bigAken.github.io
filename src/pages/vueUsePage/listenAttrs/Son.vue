<!--孙子组件-->
<template>
	<div>
		<h2>子组件</h2>
		<el-button type="primary" @click="submitToTop">点击我</el-button>
	</div>
</template>
<script>
export default {
	props: {
		name: {
			type: String,
			default: ''
		},
		age: {
			type: Number,
			default: 0
		}
	},
	methods: {
		submitToTop() {
			this.$emit('focus', 1111)
		}
	},
	mounted() {}
}
</script>
