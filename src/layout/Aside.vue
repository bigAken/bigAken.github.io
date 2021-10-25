<template>
	<div class="aside-container">
		<div class="top-user"></div>
		<div class="catalog">
			<el-tree
				:data="asideMenu"
				node-key="fullPath"
				highlight-current
				:props="defaultProps"
				:current-node-key="currentNodeKey"
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
			const temp = this.$store.state.menuList.map(item => {
				item.label = item.meta.title
				if (Array.isArray(item.children) && item.children.length) {
					item.children = item.children.map(child => ({ ...child, label: child.meta.title }))
				}
				return item
			})
			return temp
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
			console.log('path', path)
			this.$router.push({ path: path.startsWith('/') ? path : `/${path}` })
		}
	}
}
</script>
<style lang="scss" scoped>
.aside-container {
	width: 150px;
	height: 100vh;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	border-right: 1px solid #e0e0e0;
	.top-user {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		margin: 20px auto 0;
		border-radius: 50%;
		border: 1px solid #ccc;
		background-color: pink;
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
