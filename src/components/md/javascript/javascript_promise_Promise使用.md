## 关于 Promise 以及 async await

> 什么是 promise？我们用 Promise 来解决什么问题？

### 什么是异步，什么是同步

- 同步：你打电话去书店订书，老板说我查查，你不挂电话在等待，老板把查到的结果告诉你，这期间你不能做自己的事情
- 异步：你打电话去书店订书，老板说我查查，回头告诉你，你把电话挂了，先去做自己的事情

### 什么是 promise？

> **Promise 是异步编程的一种解决方案**

从语法上讲，promise 是一个对象，从它可以获取异步操作的消息；从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。

promise 有三种状态：**pending(等待状态)，fulfiled(成功状态)，rejected(失败状态)**，状态一旦改变，就不会再变。创造 promise 实例后，它会立即执行

### 我们用 Promise 来解决什么问题？

- 同步的方式写异步的代码，用来解决回调地狱问题。
- 此外，promise 对象提供统一的接口，使得控制异步操作更加容易。

### Promise 构造函数

使用 new 来创建一个 promise 对象，接收一个回调函数，这个回调函数接收两个参数，分别是 resolve 和 reject；resolve 代表成功状态，reject 代表失败状态；

#### then()方法

通过 then 方法的回调可以获取到这两个状态，第一个是 resolve 成功状态的返回值，第二是 reject 失败状态的返回值

```js
const test = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (window) {
				resolve({ data: 111, status: 200 })
			} else {
				reject({ data: null, status: 500 })
			}
		}, 200)
	})
}
test().then(
	res => {
		console.log('res', res)
	},
	er => {
		console.log('er', er)
	}
)
```

#### catch()方法

它可以和 then 的第二个参数一样，用来获取 reject 的状态的返回值

```js
test()
	.then(res => {
		console.log('res', res)
	})
	.catch(er => {
		console.log('er', er)
	})
```

#### all()方法

**在所有异步操作执行完后才执行回调**

```js
function test1() {
	var p = new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (window) {
				resolve({ status: 200, data: 1 })
			} else {
				reject({
					status: 500,
					data: null
				})
			}
		}, 1000)
	})
	return p
}
function test2() {
	var p = new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (window) {
				resolve({ status: 200, data: 1 })
			} else {
				reject({
					status: 500,
					data: null
				})
			}
		}, 1000)
	})
	return p
}
Promise.all([test1(), test2()]).then(function (results) {
	console.log('results', results)
})
```

#### race()方法

race 按字面解释，就是赛跑的意思,race 的用法与 all 一样，
**race 的话只要有一个异步操作执行完毕，就立刻执行 then 回调**

```js
Promise.all([test1(), test2()]).then(function (results) {
	console.log('results', results)
})
```

### 什么是 async await

我总结为一句话 async/await 是 generator + Promise 的语法糖，它用同步方式执行异步代码
