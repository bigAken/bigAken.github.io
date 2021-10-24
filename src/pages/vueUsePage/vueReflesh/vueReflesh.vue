<template>
	<!-- 刷新 -->
	<div>
		vue 组件局部刷新 其实就是数组把要刷新的组件取出来拿个变量保存 删除原数组上的这个数据 再push进去
	</div>
</template>
<script>
export default {
	name: 'vueReflesh',
	data() {
		return {
			activeName: 'second',
			tabList: [{}]
		}
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event)
		}
	}
}
</script>
