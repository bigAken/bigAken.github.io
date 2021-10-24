<template>
	<!-- 
    你可能不知道的 transition 技巧与细节
    https://juejin.cn/post/6924114612799406093?utm_source=gold_browser_extension
 -->
	<div>
		<el-row>
			<el-col :span="4">
				<ToggleContent :showMore="showMore">
					<div slot="showSlot" class="content-box">
						<div class="content">
							<h3>注意 height 0 配合height auto不生效</h3>
							并非所有属性都支持 transition,并非所有属性都支持 transition。和 animation 类似，这里有一个列表，列出了所有支持
							transition 的属性 CSS animated properties
						</div>
					</div>
					<div slot="hideContent" class="content-box">
						<h3>注意 height 0 配合height auto不生效</h3>
						当然，有的时候，还有更例外的。某些支持 transition 的属性在某些特定状态下，也是不支持 transition 的。非常典型的就是
						height: auto 和 width: auto。
					</div>
				</ToggleContent>
				<el-button type="text" @click="showMore = !showMore">查看更多</el-button>
			</el-col>
			<el-col :span="4">
				<h3>对话气泡</h3>
				<div class="dialogue">你说了啥？</div>
				<h3>扩大可点击区域</h3>
				<button class="increase-aera"></button>
			</el-col>
			<el-col :span="4">
				<input class="switch" type="checkbox" id="connect" />
				<label for="connect"></label>
			</el-col>
			<el-col :span="4">
				<h3>毛玻璃效果</h3>
				<div class="poem">
					<div class="content">
						<p>
							明月别枝惊鹊，
							<br />
							清风半夜鸣蝉。
							<br />
							稻花香里说丰年，
							<br />
							听取蛙声一片。
							<br />
							七八个星天外，
							<br />
							两三点雨山前。
							<br />
							旧时茅店社林边，
							<br />
							路转溪桥忽见。
							<br />
						</p>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import ToggleContent from './ToggleContent'
export default {
	name: 'transition',
	data() {
		return {
			showMore: false
		}
	},
	components: {
		ToggleContent
	}
}
</script>
<style lang="scss" scoped>
// 气泡
.dialogue {
	margin-top: 20px;
	padding: 10px;
	border-radius: 2px;
	display: inline-block;
	position: relative;
	border: 1px solid #ccc;
	border-radius: 5px;
	max-width: 300px;
	background-color: #fff;
	&:before {
		content: '';
		height: 8px;
		width: 8px;
		border: 1px solid;
		border-color: #ccc transparent transparent #ccc;
		background-color: #fff;
		position: absolute;
		top: 15px;
		right: -6px;
		transform: rotate(135deg);
	}
}

// 复选框
.switch {
	/*隐藏复选框，通过label来响应点击*/
	position: absolute; /*不能使用 display：none，那样会把它从键盘tab键切换焦点的队列中删除*/
	clip: rect(0, 0, 0, 0);
	// + 加号是兄弟选择器
	& + label {
		/*设置未选中状态的label样式*/
		display: inline-block;
		height: 30px;
		width: 58px;
		border-radius: 14px;
		background-color: #ff4949;
		position: relative;
	}
	& + label:before {
		/*可滑动的小按钮为label:before伪类*/
		content: '';
		display: inline-block;
		position: absolute;
		height: 28px;
		width: 28px;
		border-radius: 50%;
		background-color: #fff;
		left: 2px;
		top: 50%;
		transform: translate(0, -50%);
		box-shadow: 0 0 2px #666;
		transition: all 0.3s linear;
	}
	&:checked + label {
		/*设置选中状态的label样式*/
		background-color: #13ce66;
	}
	&:checked + label:before {
		margin-left: calc(100% - 32px);
	}
}

//  毛玻璃
.poem {
	width: 500px;
	height: 500px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url('~@/assets/384447f093.jpg');
	background-size: contain;
	background-attachment: fixed;

	.content {
		box-sizing: border-box;
		color: #000;
		font-size: 20px;
		line-height: 2.2em;
		letter-spacing: 3px;
		text-align: center;
		padding: 40px 30px 35px 40px;
		background: hsla(0, 1%, 28%, 0.3);
		position: relative;
		overflow: hidden;
		z-index: 1;
	}
	.content::before {
		background: url('~@/assets/384447f093.jpg');
		background-size: contain;
		background-attachment: fixed;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		filter: blur(50px);
		margin: -30px;
		z-index: -1;
	}
}

// 扩大可选区域
.increase-aera {
	position: relative;
	width: 60px;
	height: 36px;
	border: none;
	border-radius: 18px;
	margin-top: 20px;
	background-color: pink;

	&:before {
		content: '';
		position: absolute;
		top: -10px;
		right: -10px;
		bottom: -10px;
		left: -10px;
		opacity: 0.3;
		background-color: green;
	}
}
</style>
