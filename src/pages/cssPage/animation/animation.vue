<template>
	<div class="animation-box">
		<el-row :gutter="24">
			<el-col :span="5" class="top-animation">
				<h3 class="section-label">鼠标hover动画</h3>
				<div class="container">
					<img src="@/assets/384447f093.jpg" alt="" />
					<div class="slider">
						<h3 class="titile">央视评阳刚之气不只是男性化</h3>
						<content class="content">
							教育部答复“防止男性青少年女性化”的提案引发热议。教育不只是培养“男人”“女人”，更应注重培养人的担当和责任感。文明其精神，野蛮其体魄，让身体和心智一并健康成长，才是最该被关注的。
						</content>
						<button class="btn">查看更多</button>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4" class="top-animation">
				<h3 class="section-label">
					<el-button type="primary" @click="showFadeIn = !showFadeIn" size="small" style="z-index: 99">下往上动画</el-button>
				</h3>
				<div class="fade-wrap">
					<div :class="['fade', showFadeIn && 'fadeIn']"></div>
				</div>
			</el-col>

			<el-col :span="4" class="top-animation">
				<h3 class="section-label">
					<el-button type="primary" @click="showFadeOut = !showFadeOut" size="small" style="z-index: 99">上往下动画</el-button>
				</h3>
				<div class="fade-wrap">
					<div :class="['fade', showFadeOut && 'fadeOut']"></div>
				</div>
			</el-col>
			<el-col :span="4" class="top-animation">
				<h3 class="section-label">
					<el-button type="primary" @click="showFadeLeft = !showFadeLeft" size="small" style="z-index: 99">左往右动画</el-button>
				</h3>
				<div class="fade-wrap">
					<div :class="['fade', showFadeLeft && 'fadeLeft']"></div>
				</div>
			</el-col>
			<el-col :span="4" class="top-animation">
				<h3 class="section-label">
					<el-button type="primary" @click="showFadeRight = !showFadeRight" size="small" style="z-index: 99">
						右往左动画
					</el-button>
				</h3>
				<div class="fade-wrap">
					<div :class="['fade', showFadeRight ? 'fr' : 'fadeRight']"></div>
				</div>
			</el-col>
			<el-col :span="4" class="top-animation">
				<h3 class="section-label">
					<el-button type="primary" @click="showMax = !showMax" size="small" style="z-index: 99">右往左动画</el-button>
				</h3>
				<div class="fade-wrap">
					<div :class="['fade', showMax && 'popIn']"></div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
export default {
	name: 'animation',
	data() {
		return {
			showFadeIn: true,
			showFadeOut: true,
			showFadeLeft: true,
			showFadeRight: true,
			showMax: false
		}
	}
}
</script>
<style lang="scss" scoped>
.top-animation > h3,
.top-animation > div {
	margin: 0 auto;
}
.top-animation > .section-label {
	position: relative;
	height: 40px;
	margin-bottom: 20px;
	z-index: 33;
}
.container {
	position: relative;
	width: 300px;
	height: 430px;
	border: 1px solid #ccc;
	overflow: hidden;
	&:hover {
		box-shadow: 0 0 8px 4px rgb(238, 238, 238);
		img {
			transform: scale(1.2);
		}
		.slider {
			height: 50%;
		}
	}
	img {
		width: 100%;
		height: 100%;
		transition: 0.3s ease;
	}
	.slider {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 0;
		padding: 0 20px;
		box-sizing: border-box;
		overflow: hidden;
		text-align: justify;
		vertical-align: top;
		background: #fff;
		transition: 0.3s ease;
	}
	.titile {
		padding: 15px 0;
		font-size: 18px;
	}
	.content {
		font-size: 14px;
	}
	.btn {
		width: 100px;
		height: 30px;
		margin-top: 20px;
		cursor: pointer;
		border: none;
		color: #fff;
		font-size: 14px;
		transition: 0.3s ease;
		background-color: #e74c3c;
	}
	.btn:hover {
		transform: scale(0.9);
		background-color: #e64533;
	}
}
.container-wraper {
	display: flex;
}

.fade-wrap {
	width: 250px;
	height: 430px;
	border: 1px solid #ccc;
	overflow: hidden;
}
.fade {
	width: 100%;
	height: 100%;
	transition: all 0.6s;
	transform: translate3d(0, 0, 0);
	background-image: url('~@/assets/384447f093.jpg');
	background-size: cover;
	z-index: -99;
}
.fadeIn {
	transform: translate3d(0, 100%, 0);
	opacity: 0;
}
.fadeOut {
	transform: translate3d(0, -100%, 0);
	opacity: 0;
}
.fadeLeft {
	transform: translate3d(-100%, 0, 0);
	opacity: 0;
}
.fr {
	transform: translate3d(100%, 0, 0);
	opacity: 0;
}
.fadeRight {
	transform: translate3d(0, 0, 0);
	opacity: 1;
}
/*弹层动画（放大）*/
.popIn {
	-webkit-animation: fadeleftIn 0.4s;
	animation: fadeleftIn 0.4s;
	-webkit-animation-name: popIn;
	animation-name: popIn;
}

@keyframes popIn {
	0% {
		-webkit-transform: scale3d(0, 0, 0);
		transform: scale3d(0.5, 0.5, 0.5);
		opacity: 0;
	}
	50% {
		-webkit-animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
		animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
	}
	100% {
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
		-webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
		animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
		opacity: 1;
	}
}
</style>
