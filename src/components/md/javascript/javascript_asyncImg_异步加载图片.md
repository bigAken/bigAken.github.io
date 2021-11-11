### 异步加载图片

```javascript
function imgLoad(url) {
	return new Promise((resolve, reject) => {
		var request = new XMLHttpRequest()
		request.open('GET', url)
		request.responseType = 'blob'
		request.onload = () => {
			if (request.status === 200) {
				resolve(request.response)
			} else {
				reject(Error("Image didn't load successfully; error code:" + request.statusText))
			}
		}
		request.onerror = () => {
			reject(Error('There was a network error.'))
		}
		request.send()
	})
}
var body = document.querySelector('body')
var myImage = new Image()
imgLoad('https://p26-passport.byteacctimg.com/img/user-avatar/1035af1f1261526990c117454a5e3fab~300x300.image').then(
	response => {
		var imageURL = window.URL.createObjectURL(response)
		myImage.src = imageURL
		body.appendChild(myImage)
	},
	Error => {
		console.log(Error)
	}
)
```
