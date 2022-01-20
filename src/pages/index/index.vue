<template>
	<div class="atuo-deploy">
		<Component :is="'Readme'" />
	</div>
</template>
<script>
import Readme from '/README.md'
export default {
	data() {
		return {}
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
