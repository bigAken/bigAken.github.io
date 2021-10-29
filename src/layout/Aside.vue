<template>
	<div class="aside-container">
		<div class="top-user"></div>
		<div class="catalog">
			<el-tree
				ref="leftTree"
				:data="asideMenu"
				node-key="fullPath"
				highlight-current
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
			// console.log('this.$store.state.menuLis', this.$store.state.menuList)
			const temp = this.$store.state.menuList.map(item => {
				item.label = item.meta.title
				if (Array.isArray(item.children) && item.children.length) {
					item.children = item.children.map(child => ({ ...child, label: child.meta.title }))
				}
				return item
			})
			console.log('temp', temp)
			return temp
		},
		currentNodeKey() {
			return this.$route.fullPath
		}
	},
	methods: {
		handleNodeClick(data, node) {
			console.log('node', node)
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
