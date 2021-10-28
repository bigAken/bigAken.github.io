<template>
	<div class="frame">
		<Aside></Aside>
		<div class="right-content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import { loadLanguageAsync } from '@/i18n/i18n-setup'
import Aside from '@/layout/Aside'
export default {
	data() {
		return {}
	},
	components: {
		Aside
	},
	methods: {
		testStoreModule() {
			this.$store.commit('shop/changeTime')
		},
		testStore() {
			this.$store.commit('increment')
			console.log(this.$store.state.count)
		},
		too() {
			this.$router.push('/observerUse')
		},
		showMessage() {
			this.$message({
				message: this.$t('common.hello')
			})
		},
		changeLang() {
			const lang = this.$i18n.locale == 'zh' ? 'en' : 'zh'
			loadLanguageAsync(lang).then(() => {
				console.log(this.$t('common.hello'))
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.frame {
	display: flex;
	justify-content: flex-start;
	.right-content {
		padding-left: 15px;
		padding-top: 20px;
		box-sizing: border-box;
		flex-grow: 1;
		overflow: scroll;
	}
}
</style>
