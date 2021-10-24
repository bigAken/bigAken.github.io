<template>
	<div id="frame">
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<Aside></Aside>
				<el-main>
					<div class="router-container">
						<router-view></router-view>
					</div>
				</el-main>
			</el-container>
		</el-container>
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
.el-header {
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	line-height: 60px;
}
.el-main {
	height: calc(100vh - 60px);
	padding-right: 0;
	padding-bottom: 0;
	background-color: #fafafa;
}
.router-container{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	background-color: #fff;
}
</style>
