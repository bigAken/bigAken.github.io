<template>
	<div class="atuo-deploy">
		<Component :is="'Readme'" />
	</div>
</template>
<script>
import Readme from '/README.md'
export default {
	components: {
		Readme
	}
}
</script>
