<template>
	<!-- $attrs 和 $listen 的使用 -->
	<!-- https://www.cnblogs.com/jin-zhe/p/13099416.html -->
	<div>
		<p>最顶级组件</p>
		<Father :text="'测试'" :name="'xiaoming'" :age="18" @focus="focus"></Father>
	</div>
</template>
<script>
import Father from './Father'

export default {
	name: 'listenAttrs',
	components: {
		Father
	},
	methods: {
		focus(value) {
			console.log('value', value)
		}
	}
}
</script>
