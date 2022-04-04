# JavaScript 知识碎片

## 面向过程和面向对象的区别

- 面向过程就是分析出解决问题所需要的步骤，然后使用代码把步骤一步一步的实现。
- 分析要解决的问题有哪些实体，实体有哪些属性和方法，如何调用这些属性和方法去解决问题。

## script 标签中的 async 和 defer 属性

浏览器在解析 HTML 的时候，如果遇到一个没有任何属性的 script 标签，就会暂停解析，先发送网络请求获取该 JS 脚本的代码内容，然后让 JS 引擎执行该代码，当代码执行完毕后恢复解析。

### async

当浏览器遇到带有 async 属性的 script 时，请求该脚本的网络请求是异步的，不会阻塞浏览器解析 HTML，一旦网络请求回来之后，如果此时 HTML 还没有解析完，浏览器会暂停解析，先让 JS 引擎执行代码，执行完毕后再进行解析;
当然，如果在 JS 脚本请求回来之前，HTML 已经解析完毕了，那就啥事没有，立即执行 JS 代码

> 缺点：async 是不可控的，因为执行时间不确定，你如果在异步 JS 脚本中获取某个 DOM 元素，有可能获取到也有可能获取不到。而且如果存在多个 async 的时候，它们之间的执行顺序也不确定，完全依赖于网络传输结果，谁先到执行谁。

### defer

defer 表示延迟，当浏览器遇到带有 defer 属性的 script 时，获取该脚本的网络请求也是异步的，不会阻塞浏览器解析 HTML，一旦网络请求回来之后，如果此时 HTML 还没有解析完，浏览器不会暂停解析并执行 JS 代码，而是等待 HTML 解析完毕再执行 JS 代码，

| script 标签      | JS 执行顺序      | 是否阻塞解析 HTML      |
| ---------------- | ---------------- | ---------------------- |
| `<script>`       | 在 HTML 中的顺序 | 阻塞                   |
| `<script async>` | 网络请求返回顺序 | 可能阻塞，也可能不阻塞 |
| `<script defer>` | 在 HTML 中的顺序 | 不阻塞                 |

## 自定义事件

```js
// 定义事件名称setItemEvent以及事件对象setEvent
let setEvent = new Event('setItemEvent')

function dispatchEventStroage(key, val) {
	setEvent.key = key
	setEvent.newValue = val
	localStorage.setItem(key, val)
	localStorage.setItem(key, val)
	// 分发事件
	window.dispatchEvent(setEvent)
}
// 监听事件
window.addEventListener('setItemEvent', e => {
	const value = e.key && localStorage.getItem(e.key)
})

document.getElementById('button').addEventListener('click', () => {
	// 触发事件
	dispatchEventStroage('test', Math.random())
})
```
