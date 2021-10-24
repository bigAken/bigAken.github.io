<template>
	<div>
		<h2>父组件</h2>
		<Son v-on="$listeners" v-bind="$attrs" />
	</div>
</template>
<script>
import Son from './Son'

export default {
	components: {
		Son
	},
	props: {
		text: {
			type: String,
			default: () => '默认'
		}
	},
	mounted() {
    console.log(this.$listeners) // {focus: ƒ}
		console.log('attrs', this.$attrs)
    
	}
}
</script>
