<template>
	<div class="aside-container">
		<div class="top-user"></div>
		<h2 class="user-name">aken</h2>
		<el-button type="text">文章总数：{{ totalCount.length }}</el-button>
		<div class="catalog">
			<el-tree
				ref="leftTree"
				:data="asideMenu"
				node-key="fullPath"
				highlight-current
				default-expand-all
				:props="defaultProps"
				:current-node-key="currentNodeKey"
				:default-expanded-keys="[currentNodeKey]"
				@node-click="handleNodeClick"
			></el-tree>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		}
	},
	computed: {
		asideMenu() {
			return this.$store.getters.asideMenu
		},
		totalCount() {
			const tempArr = this.$store.getters.asideMenu.reduce((arr, item) => {
				item.children && arr.push(...item.children)
				return arr
			}, [])
			return tempArr
		},
		currentNodeKey() {
			return this.$route.fullPath
		}
	},
	methods: {
		handleNodeClick(data) {
			console.log('data', data)
			if (Array.isArray(data.children)) {
				return
			}
			const path = data.fullPath || data.path
			this.$router.push({ path: path.startsWith('/') ? path : `/${path}` })
		}
	},
	mounted() {
		console.log('this.currentNodeKey', this.currentNodeKey)
		this.$nextTick(() => {
			this.$refs.leftTree.setCurrentKey(this.currentNodeKey)
		})
	}
}
</script>
<style lang="scss" scoped>
.aside-container {
	min-width: 150px;
	max-width: 300px;
	height: 100vh;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	border-right: 1px solid #e0e0e0;
	transition: all 0.5s;
	.top-user {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		margin: 20px auto 0;
		border-radius: 50%;
		border: 1px solid rgb(236, 236, 236);
		background-color: pink;
		background-image: url(../../avatar.png);
		background-size: contain;
	}
	.user-name{
		text-align: center;
		margin-top: 5px;
	}
	.catalog {
		width: 100%;
		flex-grow: 1;
		margin-top: 20px;
		padding-bottom: 20px;
		box-sizing: border-box;
		overflow: scroll;
		&::-webkit-scrollbar {
			width: 0px;
			height: 1px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: #e0e0e0;
			border-radius: 3px;
		}
	}
}
</style>
