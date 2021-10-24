<template>
	<div>
		<el-button type="primary" @click="dom">xiazai</el-button>
	</div>
</template>
<script>
export default {
	methods: {
		dom() {
			var imgSrc =
				'http://www.perfect99.com/upload_2015/Default_FocusPhoto/2021-1-11-6da99ec8-e236-44e5-a975-48cf030126de.jpg'
			var name = '测试图片'

			function downloadPicture(imgSrc, name) {
				const image = new Image()
				// 解决跨域 Canvas 污染问题
				image.setAttribute('crossOrigin', 'anonymous')
				image.onload = () => {
					const canvas = document.createElement('canvas')
					canvas.width = image.width
					canvas.height = image.height
					const context = canvas.getContext('2d')
					context.drawImage(image, 0, 0, image.width, image.height)
					canvas.toBlob(blob => {
						const url = URL.createObjectURL(blob)
						const a = document.createElement('a')
						a.download = name || 'photo'
						a.href = url
						a.click()
						a.remove()
						URL.revokeObjectURL(url)
					})
				}
				image.src = imgSrc
			}
			downloadPicture(imgSrc, name)
		}
	}
}
</script>
