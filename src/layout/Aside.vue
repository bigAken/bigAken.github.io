<template>
	<el-aside class="aside" :style="style">
		<el-menu
			router
			:default-active="defaultActive"
			class="el-menu-vertical-demo"
			background-color="#2e3740"
			text-color="#fff"
			active-text-color="#ffd04b"
			@close="handleClose"
			:collapse="isCollapse"
		>
			<template v-for="(item, index) in asideMenu">
				<template v-if="item.children">
					<el-submenu :index="item.path" :key="index">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>{{ item.meta.title }}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item :index="sec.fullPath" v-for="(sec, secInd) in item.children" :key="`${index}-${secInd}`">
								{{ sec.meta.title }}
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.path" :key="index">
						<i class="el-icon-location"></i>
						{{ item.meta.title }}
					</el-menu-item>
				</template>
			</template>
		</el-menu>
		<div class="collapse-btn">
			<span class="el-icon-star-off" @click="isCollapse = !isCollapse"></span>
		</div>
	</el-aside>
</template>
<script>
export default {
	data() {
		return {
			isCollapse: false
		}
	},
	computed: {
		style() {
			return this.isCollapse ? { width: '65px' } : { width: '180px' }
		},
		asideMenu() {
			return this.$store.state.menuList
		},
		defaultActive() {
			return this.$route.fullPath
		}
	},
	methods: {
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		}
	}
}
</script>
<style lang="scss" scoped>
.aside {
	overflow: hidden;
	height: calc(100vh - 60px);
	background-color: #2e3740;
	transition: all 0.35s linear 0.15s;
}
.el-menu {
	border-right-color: #2e3740;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 180px;
}
/deep/ .el-menu-item-group__title {
	width: 0;
	height: 0;
	padding: 0;
}

/deep/.el-submenu__title {
	height: 48px;
	line-height: 48px;
}
.collapse-btn {
	text-align: center;
	> span {
		display: inline-block;
		width: 30px;
		height: 30px;
		font-size: 20px;
		color: #545c64;
		line-height: 30px;
		cursor: pointer;
	}
}
</style>
