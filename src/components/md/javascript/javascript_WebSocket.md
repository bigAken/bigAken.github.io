# WebSocket 简单使用

## WebSocket

HTML5 开始提供的一种浏览器与服务器进行全双工通讯的网络技术，属于**应用层协议**。它基于 TCP 传输协议，并复用 HTTP 的握手通道。

优点：

- 支持双向通信，实时性更强
- 更好的二进制支持。
- 较少的控制开销。
- 支持扩展。ws 协议定义了扩展，用户可以扩展协议，或者实现自定义的子协议。（比如支持自定义压缩算法等）

## 入门例子

### 服务端

```js
const express = require('express')
const path = require('path')
const app = express()

const server = require('http').Server(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8083 })

wss.on('connection', function connection(ws) {
	console.log('server: receive connection.')

	ws.on('message', function incoming(data) {
		if (data.toString().includes('type')) {
			console.log(JSON.parse(data.toString()))
			const formatData = JSON.parse(data.toString())
			if (formatData.type === 'HeartBeat') {
				ws.send(JSON.stringify({ type: 'HeartBeat---server ' }))
			}
		}
	})

	ws.send('world')
})

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html')
})
app.use(express.static(path.join(__dirname, '/client')))

app.listen(3000)
```

### 客户端

```js
var ws = new WebSocket('ws://localhost:8083')
ws.onclose = function () {
	console.log('ws onclose')
	clearTimeout(heartCheck.timeoutObj)
}
ws.onopen = function () {
	console.log('ws onopen')
	ws.send('from client: hello')
	heartCheck.start()
}
ws.onmessage = function (e) {
	console.log('from server: ' + e.data)
	heartCheck.reset()
}

window.onload = () => {
	const buttonEl = document.getElementById('button')
	buttonEl.addEventListener('click', () => {
		ws.send(Math.random())
	})
}

var heartCheck = {
	timeout: 3000,
	timeoutObj: null,
	reset: function () {
		clearTimeout(this.timeoutObj)
		this.start()
	},
	start: function () {
		this.timeoutObj = setTimeout(function () {
			ws.send(JSON.stringify({ type: 'HeartBeat' }))
		}, this.timeout)
	}
}
```
