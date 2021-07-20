<template>
	<div class="wraper">
		<el-row>
			<el-col :span="4">
				<!-- 复制粘贴 -->
				<div ref="copyText" id="copy-txt">我是大帅锅的歌的歌</div>
				<el-button type="primary" @click="setClibord">复制</el-button>
			</el-col>
			<el-col :span="4">
				<div class="img-wraper">
					<img src="https://profile.csdnimg.cn/E/B/0/3_weixin_4098311911w122" alt="" id="imgs" />
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
export default {
	name: 'domBase',
	methods: {
		imgLoad() {
			document.getElementById('imgs').addEventListener(
				'error',
				function() {
					console.log('shibai')
				},
				true
			)
		},
		setClibord() {
			var div = document.getElementById('copy-txt')
			let range
			// createTextRange方法
			// 主要是用来对一些文本对象进行操作.比如你有一大段文字,都在同一个P标签内,但是你只希望通过JS改变其中的一小部分,这时就可以用createTextRange来创建Range对象操作文本.
			// 因为默认情况下文本只是文本,并不是对象,要想像操作对象那样操作文本,只能是创建为Range对象.这是要操作的文本就具有了对象的功能和特性了

			if (document.body.createTextRange) {
				// 创建包含文本的对象
				range = document.body.createTextRange()
				// 把当前的TextRange对象的开始点和结束点对齐到指定的元素的文本内容
				range.moveToElementText(div)
				// 选择
				range.select()
			} else if (window.getSelection) {
				var selection = window.getSelection()
				range = document.createRange()
				console.log('range', range)
				console.log('selection',selection);
				range.selectNodeContents(div)
				selection.removeAllRanges()
				selection.addRange(range)
			} else {
				console.warn('none')
			}
			document.execCommand('Copy') // 执行浏览器复制命令

			alert('已复制好，可贴粘。')
		}
	},
	mounted() {
		this.imgLoad()
	}
}
</script>
<style lang="scss" scoped>
.wraper {
	padding: 10px;
	box-sizing: border-box;
	.container {
		width: 150px;
		height: 150px;
		overflow: scroll;
		.content-max {
			width: 200px;
			height: 200px;
			background-color: red;
			margin-bottom: 10px;
		}
	}
}
</style>
