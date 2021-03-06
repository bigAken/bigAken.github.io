# JavaScript 设计模式之代理模式

## 定义

代理模式是为对象提供一个代用品或者占位符，以便控制对它的直接访问。当一个对象不想被外界直接访问，就可以使用代理，提供一个替身对象来控制对它的访问，替身对象对请求进行处理之后，再把请求转交给本体对象。

![示意图](./image/Snipaste_2022-02-16_22-23-14.png)

## 类型

一般代理有两种类型，保护代理和虚拟代理。

### 保护代理

保护代理主要用来控制不同权限的对象对目标对象的访问，如果目标对象想过滤掉一些请求，就可以让自己的代理去处理掉。

### 虚拟代理

虚拟代理主要用来延时去创建对象或者执行目标对象的方法，如果执行目标对象的方法是一个开销很大的操作，虚拟代理就可以先代理目标对象的方法，延迟到真正需要它的时候再去调用。

在 JavaScript 中实现保护代理比较困难，因为很难判断谁访问了对象，虚拟代理是一种比较常用的代理模式，所以接下来主要讲解虚拟代理的应用。

## 应用

### 使用代理实现图片预加载

下面就用虚拟代理实现图片预加载功能，web 开发中，如果要显示一张很大的图片，经常会使用较小的图片先占位，然后再用异步请求，等大图加载完了再显把它填充到 img 的 src 属性中。

```js
var myImage = (function () {
	var imageNode = document.createElement('img')
	document.body.appendChild(imgNode)

	return {
		setSrc: function (src) {
			imgNode.src = src
		}
	}
})()

var proxyImage = (function () {
	var img = new Image()
	img.onload = function () {
		myImage.setSrc(this.src)
	}
	return {
		setSrc: function (src) {
			myImage.setSrc('loading.gif')
			img.src = src
		}
	}
})()

// test
proxyImage.setSrc('largeImg.png')
```

上面代码实现了一个通过 proxyImage 间接访问 myImage。在加载完大图前，用一张 loading 图先占位，避免出现白屏占位的情况。也许你会说，上面的例子通过给 myImage 加一个 img.onload 事件，就可以达到一样的效果。

```js
var myImage = (function () {
	var imageNode = document.createElement('img')
	document.body.appendChild(imgNode)
	var img = new Image()

	img.onload = function () {
		imgNode.src = img.src
	}

	return {
		setSrc: function (src) {
			imgNode.src = 'loading.gif'
			img.src = src
		}
	}
})()

// test
myImage.setSrc('largeImage.png')
```

第二段代码精简了许多，但是函数里面做了两件事——给 img 节点设置 src 和预加载图片。这违反了单一职责原则。而第一段代码中，myImage 和 proxyImage 的功能都是单一的。添加预加载功能时，我们也并没有修改 myImage 的代码，这符合开发-封闭原则。但我们加载小图片（不需要预加载功能）时，直接调用 myImage 即可。

我们还可以优化一些第一段代码，**让两个函数表现的一致**。

```js
var myImage = (function () {
	var imageNode = document.createElement('img')
	document.body.appendChild(imgNode)

	return function (src) {
		imgNode.src = src
	}
})()

var proxyImage = (function () {
	var img = new Image()
	img.onload = function () {
		myImage(this.src)
	}
	return function (src) {
		myImage('loading.gif')
		img.src = src
	}
})()

// 接口表现的一致
myImage('smallImg.png')
proxyImage('largeImg.png')
```

### 使用虚拟代理合并 HTTP 请求

在 web 开发中，网络请求的开销很大，假设我们要做一个文件同步的功能，当我们选中文件的时候，文件就会同步到服务器。首先在页面中创建可供点击的 checkbox 节点：

```html
<input type="checkbox" id="1" />
1
<input type="checkbox" id="2" />
2
<input type="checkbox" id="3" />
3
<input type="checkbox" id="4" />
4
<input type="checkbox" id="5" />
5
<input type="checkbox" id="6" />
6
<input type="checkbox" id="7" />
7
<input type="checkbox" id="7" />
8
```

接下来，给 checkbox 绑定点击事件，然后同步文件到服务器:

```js
const synchronousFile = function (id) {
	console.log(`同步文件, id为${id}`)
}
const checkboxList = document.querySelectorAll('input')
for (let i = 0, len = checkboxList.length; i < len; i++) {
	const checkbox = checkboxList[i]
	checkbox.onclick = function () {
		if (this.checkbox === true) {
			synchronousFile(this.id)
		}
	}
}
```

当我们一次性选了 3 个 checkbox 的时候，同时也向服务器发送了 3 次文件同步的请求。对于手速快的程序员，可能 1 秒钟可以点击 4 个 checkbox，这样频繁的网络请求会带来很大的开销。
解决方案就是通过代理 synchronousFile 方法，收集一段时间的请求，最后一次性发给服务器。比如等待两秒钟之后，然后把两秒钟内的需要同步的文件列表一起发送给服务器。实现代码如下：

```js
const synchronousFile = function (id) {
	console.log(`同步文件, id为${id}`)
}

const proxySynchronousFile = (function () {
	let cache = [],
		timer
	return function (id) {
		if (cache.indexOf(id) > -1) {
			cache.push(id)
		}
		if (timer) {
			return
		}
		timers = setTimeout(function () {
			synchronousFile(cache.join(','))
			clearTimeout(timer)
			timer = null
			cache = []
		}, 2000)
	}
})()

const checkboxList = document.querySelectorAll('input')
for (let i = 0, len = checkboxList.length; i < len; i++) {
	const checkbox = checkboxList[i]
	checkbox.onclick = function () {
		if (this.checkbox === true) {
			proxySynchronousFile(this.id)
		}
	}
}
```

### 缓存代理

缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回结果。

#### 计算阶乘

```js
const factorial = function (n) {
	if (n === 0 || n === 1) {
		return 1
	}
	return n * factorial(n - 1)
}

factorial(4) // 24
factorial(4) // 24
```

引入代理：

```js
const proxyFactorial = (function () {
	const cache = {}
	return function (n) {
		if (cache[n]) {
			return cache[n]
		}
		return (cache[n] = factorial.call(this, n))
	}
})()

proxyFactorial(4) // 24
proxyFactorial(4) // 24
```

#### 缓存 ajax 请求

我们在项目中经常会遇到分页的请求，在一些场景下，同一页的数据理论上只需要去服务端获取一次，然后可以缓存起来，下次再请求同一页的时候就可以直接从缓存中获取。这种情形也可以使用缓存代理，需要注意的是从后端获取数据是一个异步操作，我们无法直接把计算结果同步的放在缓存中，而是要通过回调的方式。

### 其它代理模式

代理模式的变体种类很多，下面做挑一些做简单的介绍。

- 防火墙代理：控制网络资源的访问，保护主机不让“坏人接近”。
- 远程代理：为一个对象在不同的地址空间提供局部代表。
- 智能引用代理：取代了简单的指针，它在访问对象时执行一些附加操作，比如 Vue 中的对象劫持。
- 写时复制代理：通常用于复制一个庞大的的对象的情况。这种代理模式延迟了复制的过程，当对象被真正修改时，才对它进行复制操作。

## 总结

通过前面的这些应用我们可以看到，**代理和目标对象有一致的接口**。比如通过代理实现的预加载图片的功能，实现了 setSrc 方法，当我们有一天不需要图片预加载功能，也可以直接调用本体的方法，因为它们都对外提供了 setSrc 方法。在客户看来，代理和目标对象是一致的，客户并不知道代理和目标对象的区别。这样的做有两个好处：

- 用户可以放心使用代理，因为他只关心是否能得到想要的结果
- 在任何使用本体的地方都可以替换成代理，不需要代理的时候，也可以直接使用本体
