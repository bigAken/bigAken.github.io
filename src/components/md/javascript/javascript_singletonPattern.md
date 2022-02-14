# JavaScript 设计模式之单例模式

## 单例模式

确保一个类只有一个实例，并提供一个访问它的全局访问点

> 单例模式需满足两个条件: 只有一个实例和可以全局访问。

## 实现方式

使用一个变量存储类实例对象（值初始为 null/undefined ）。进行类实例化时，判断类实例对象是否存在，存在则返回该实例，不存在则创建类实例后返回

## "简单版本"单例模式

在类里定义个静态方法 getIntance ，判断是否创建过实例，如果创建过则直接返回，没有则创建。
所以无论调用多少次 getIntance 返回的都是第一次创建的那个实例，自然 s1.getName 与 s2.getName 指向的 this 都是 s1
而 s3 不是通过 getIntance 创建的，是直接 new 出来的，所以跟 s1 s2 都不一样

缺点：

- 这种单例模式存在两种创建实例方式，当采用 new 时就不再单例了
- 判断是否实例化过(即单例判断)跟对象创建都放在 getIntance 处理，不符合单一职责原则

```js
class SingleObject {
	constructor(name) {
		this.name = name
		this.instance = null
	}
	getName() {
		return this.name
	}
	static getInstance(name) {
		// 判断是否已经 new 过1个实例
		if (!this.instance) {
			// 若这个唯一的实例不存在，则创建它并存储
			this.instance = new SingleObject(name)
		}
		// 如果这个唯一实例已经存在,则直接返回
		return this.instance
	}
}

const s1 = SingleObject.getInstance('张三')
const s2 = SingleObject.getInstance('李四')
console.info(s1.getName()) // 张三
console.info(s2.getName()) // 张三
console.info(s1 == s2) // true

// 这里只能用 getInstance 才能保证单例，如果用 new SingleObject 就没办法保证了
const s3 = new SingleObject('王五')
console.info(s3.getName()) // 王五
console.info(s3 == s2) // false
```

## 闭包版单例模式

通过立即执行函数，以及闭包创建了单例函数，这下就又统一成以 new 的形式创建对象即可

```js
const SingleObject = (function () {
	//在闭包里面定义了一个instance变量，将instance变量定义在外部会污染全局变量
	let instance = null
	return function (name) {
		// 判断变量是否为 null
		if (!instance) {
			this.name = name
			instance = this
		}
		return instance
	}
})()
SingleObject.prototype.getName = function () {
	return this.name
}

const s1 = new SingleObject('张三')
const s2 = new SingleObject('李四')
console.info(s1.getName()) // 张三
console.info(s2.getName()) // 张三
console.info(s1 == s2) // true

const s3 = new SingleObject('王五')
console.info(s3.getName()) // 张三
console.info(s3 == s2) // true
```

## "代理版" 单例模式

简单版本单例模式将单例管理与对象创建全整在一个类里，不符合单一职责原则，而代理版的作用就是将这两者分离

这样， SingleObject 只负责该类相关的属性跟方法， 至于管理单例就由 ProxySingleObject 处理，对外也只暴露 ProxySingleObject 即可。

```js
class SingleObject {
	constructor(name) {
		this.name = name
	}
	getName() {
		return this.name
	}
}
const ProxySingleObject = (function () {
	let instance
	return function (name) {
		if (!instance) {
			instance = new SingleObject(name)
		}
		return instance
	}
})()

const s1 = new ProxySingleObject('张三')
const s2 = new ProxySingleObject('李四')
console.info(s1.getName()) // 张三
console.info(s2.getName()) // 张三
console.info(s1 == s2) // true

const s3 = new ProxySingleObject('王五')
console.info(s3.getName()) // 张三
console.info(s3 == s2) // true
```

## 通用惰性单例模式

上面惰性单例模式，也是存在单例控制以及创建融合在一起的问题，另外也不够通用。何为通用呢？ 就是将单例控制抽离成单独的函数，控制保证只有一个对象，类似这样的：

```js
function getSingle(fn) {
	let result
	return function (name) {
		console.log('name', name)
		return result || (result = new fn(name))
	}
}
class SingleObject {
	constructor(name) {
		console.log('1111', name)
		this.name = name
	}
	getName() {
		return this.name
	}
}
const createSingle = getSingle(SingleObject)
const test = createSingle('xiaoming')
console.log(test.name)
```

懒汉式(惰性)：默认不会实例化，什么时候用到了，才会创建对象实例。
饿汉式：类加载的时候就会进行实例化，并且创建单例对象实例。
