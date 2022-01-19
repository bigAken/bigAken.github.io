<template>
	<div class="atuo-deploy">
		<Component :is="'Readme'" />
		<el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
	</div>
</template>
<script>
import Readme from '/README.md'
export default {
	data() {
		return {
			num: 1
		}
	},
	components: {
		Readme
	},
	methods: {
		handleChange(value) {
			console.log(value)
		}
	}
}
</script>
