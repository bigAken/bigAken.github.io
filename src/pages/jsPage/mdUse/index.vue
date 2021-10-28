<template>
	<div class="markdown-body" :is="$route.name"></div>
</template>
<script>
import { mdComponents } from '@/components/index.js'
export default {
	data() {
		return {
			mdComponents
		}
	}
}
</script>
