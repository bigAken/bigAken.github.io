<template>
	<div class="top-box">
		<!-- https://blog.csdn.net/liub37/article/details/83382205 -->
		<!-- https://www.jianshu.com/p/3dbbbc7a259c -->
		<!-- https://www.cnblogs.com/zhiying/p/11323082.html -->
		<!-- 组件v-model使用 -->
		<!-- 子组件如何使用修改父组件传递过来的值 以及基本数据类型在子组件如何使用
						子组件通过把父组件传递的值作为默认值直接赋值在data里面（引用类型需要深拷贝）
						使用.sync修饰符可以通过this.$emit('update:***', false)更新父组件的数据
		-->
		<p>keywords的值是{{ keywords }}</p>
		<p style="margin-bottom:100px;">ObjectData的值事{{ ObjectData.lang }}</p>
		<el-button type="primary" @click="visible = true">显示或者隐藏</el-button>
		<visiblleDemo
			:visible.sync="visible"
			v-model="keywords"
			:ObjectData="ObjectData"
			@updateObjectData="updateObjectData"
		></visiblleDemo>
	</div>
</template>
<script>
import visiblleDemo from './component/visiblleDemo.vue'
export default {
	name: 'componentV_model',
	data() {
		return {
			visible: false,
			keywords: '11111',
			ObjectData: {
				lang: 'en'
			}
		}
	},
	components: {
		visiblleDemo
	},
	computed: {},
	methods: {
		updateObjectData(val) {
			console.log('val', val)
			this.ObjectData = Object.assign({}, val)
		}
	}
}
</script>
<style lang="scss" scoped>
.top-box {
	display: grid;
	place-items: center;
}
</style>
