<template>
	<div class="wraper">
		<slot name="showSlot"></slot>
		<div class="hide-content" ref="content-box" :style="style">
			<slot name="hideContent"></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: 'ToggleContent',
	data() {
		return {}
	},
	props: {
		showMore: {
			type: Boolean,
			default: false
		},
		height: Number
	},
	computed: {
		style() {
			return {
				height: this.showMore ? `${this.$refs['content-box'].children[0].offsetHeight}px` : 0
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.content-box {
	width: 150px;
	font-size: 12px;
	line-height: 16px;
	color: #fff;
	background-color: #545c64;
	overflow: hidden;
	transition: 0.3s linear;
	.content {
		margin: 20px 20px;
	}
	h3 {
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 20px;
	}
}
.hide-content {
	overflow: hidden;
	transition: 0.3s linear;
}
</style>
