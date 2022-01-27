<template>
	<div class="mobile-index">
		<el-dropdown class="mobile-top" :hide-on-click="false" size="mini" @command="dropdownMenuClick">
			<span class="el-dropdown-link">
				文章列表
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item :command="item.name" v-for="item in mdList" :key="item.name">
					{{ item.label }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<div class="mobile-main">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
export default {
	components: {},
	computed: {
		mdList() {
			if (this.mdTree) {
				return this.mdTree.children.reduce((mdList, child) => {
					mdList.push(...child.children)
					return mdList
				}, [])
			}
			return []
		},
		mdTree() {
			return this.$store.getters.asideMenu.find(tree => tree.name === 'mdUse')
		},
		isIndex() {
			return this.$route.name !== 'home'
		}
	},
	watch: {
		asideMenu: {
			handler() {
				console.log(111111, this.asideMenu)
				console.log(this.$route)
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		dropdownMenuClick(command) {
			const mdItem = this.mdList.find(md => md.name === command)
			if (mdItem) {
				const { fullPath } = mdItem
				this.$router.push(fullPath)
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.mobile-index {
	position: relative;
	padding: 40px 15px 0;
	box-sizing: border-box;
	.mobile-top {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #ccc;
		background-color: #fff;
	}
	.mobile-main{
		margin-top: 15px;
	}
}
.el-dropdown-menu {
	height: 50vh;
	overflow: scroll;
}
</style>
