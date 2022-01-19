# JavaScript 装饰器

## 前言

装饰器是最新的 ECMA 中的一个提案，是一种与类（class）相关的语法，用来注释或修改类和类方法。装饰器在 Python 和 Java 等语言中也被大量使用。装饰器是实现 AOP（面向切面）编程的一种重要方式
下面是一个使用装饰器的简单例子，这个 @readonly 可以将 `sex` 属性设置为只读。可以看出来，装饰器大大提高了代码的简洁性和可读性

```js
class Girl {
	@readonly sex = 'woman'
}
```

## 装饰器

装饰器模式是一种结构型设计模式，**它允许向一个现有的对象添加新的功能，同时又不改变其结构，是作为对现有类的一个包装**。

一般来说，在代码设计中，我们应当遵循「多用组合，少用继承」的原则。通过装饰器模式动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活。

在传统面向对象语言中，如果想为一个对象创建新的功能或者属性时，往往采用继承的方式，重写某个方法

举个例子:例如小学生擦黑板 但是有些个子小的小学生擦黑板前要做一些前置动作，比如他要拿个凳子垫一下脚，因为他不够高擦不到黑板，那么个子小的小学生擦黑板之前就要做拿凳子垫一下的前置动作了，以下分别使用两种方式来实现这个个子小的小学生擦黑板这个动作

方式一 如果是传统的话往往采用继承的方式，重写某个方法

```js
class Student {
	constructor(name) {
		this.name = name
	}
	cleanBoard() {
		console.log(`我是${this.name}，我正在擦黑板....`)
	}
}
class SmallStd1 extends Student {
	constructor(name) {
		super(name)
	}
	smallStdCleanBoard() {
		console.log('我个子小，先拿个凳子垫一下')
		this.cleanBoard()
	}
}

const std1 = new SmallStd1('小明')
std1.smallStdCleanBoard()
```

方式一的做法不易后期分解移除，超类和子类之间存在强耦合性的问题，因此这种方式并不能灵活，
后期估计还要其他的前置或者后置动作，我们应当遵循「多用组合，少用继承」的原则
方式二 es7 使用装饰器

```js
class Studdent {
	constructor(name) {
		this.name = name
	}
	cleanBoard() {
		console.log(`${this.name}正在擦黑板....`)
	}
}

function takeChair() {
	return function (target, key, descriptor) {
		console.log('我个子小，先拿个凳子垫一下')
		return descriptor
	}
}

class SmallStd2 extends Student {
	constructor(name) {
		super(name)
	}
	@takeChair()
	smallStdCleanBoard() {
		this.cleanBoard()
	}
}

const std2 = new SmallStd2('小红')
std2.smallStdCleanBoard()
```

## [JavaScript 装饰器](https://github.com/tc39/proposal-decorators)

[@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators#docsNav)

装饰器是 ES2016 提出来的一个提案，当前处于 Stage 2 阶段，装饰器是一种与类相关的语法糖，用来包装或者修改类或者类的方法的行为，其实装饰器就是设计模式中装饰者模式的一种实现方式。

> 注意：装饰器目前还处于 stage-2，意味着语法之后也许会有变动

### 类装饰器

装饰类的时候，装饰器方法一般会接收一个目标类作为参数

```js
@decoratorClass(18)
class Person {}
function decoratorClass(age) {
	return function (target) {
		target.prototype.age = age
	}
}
console.log('age', new Person().age)
```

经过 babel 编译之后主要源码部分如下，可以很清晰得看出类装饰器是把整
个构造函数作为参数传递进装饰函数的，**除了可以修改类本身，还可以通过修改原型，给实例增加新属性**
**利用高阶函数的属性，还可以给装饰器传参，通过参数来判断对类进行什么处理**

```js
var _dec, _class
var Person =
	((_dec = decoratorClass(18)),
	_dec(
		(_class = _createClass(function Person() {
			_classCallCheck(this, Person)
		}))
	) || _class)

function decoratorClass(age) {
	return function (target) {
		target.prototype.age = age
	}
}

console.log('age', new Person().age)
console.log('person', Person.age)
```

### 类属性装饰器

类属性装饰器可以用在类的属性、方法、get/set 函数中，一般会接收三个参数：

- target：被修饰的类
- name：类成员的名字
- descriptor：属性描述符，对象会将这个参数传给 Object.defineProperty

```js
class Person {
	@readonly sex = 'girl'
}
function readonly(target, name, descriptor) {
	descriptor.writable = false
}
const person = new Person()
person.sex = 'boy' // 报错
```

经过 babel 编译之后主要源码部分如下，由编译之后得代码可知，当`new Person`的时候
会执行函数`_initializerDefineProperty`并且传递了四个参数其中包括`property`
和`descriptor`，在函数`_initializerDefineProperty`里面最终是使用`Object.defineProperty`
来定义属性

```js
var _class, _descriptor
function _initializerDefineProperty(target, property, descriptor, context) {
	if (!descriptor) return
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	})
}
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {}
	Object.keys(descriptor).forEach(function (key) {
		desc[key] = descriptor[key]
	})
	desc.enumerable = !!desc.enumerable
	desc.configurable = !!desc.configurable
	if ('value' in desc || desc.initializer) {
		desc.writable = true
	}
	desc = decorators
		.slice()
		.reverse()
		.reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc
		}, desc)
	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0
		desc.initializer = undefined
	}
	if (desc.initializer === void 0) {
		Object.defineProperty(target, property, desc)
		desc = null
	}
	return desc
}
var Person =
	((_class = _createClass(function Person() {
		_classCallCheck(this, Person)
		_initializerDefineProperty(this, 'sex', _descriptor, this)
	})),
	(_descriptor = _applyDecoratedDescriptor(_class.prototype, 'sex', [readonly], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: function initializer() {
			return 'girl'
		}
	})),
	_class)

function readonly(target, name, descriptor) {
	descriptor.writable = false
}
```

还可以用来统计一个函数的执行时间，以便于后期做一些性能优化

```js
function time(target, name, descriptor) {
	const func = descriptor.value
	if (typeof func === 'function') {
		descriptor.value = function (...args) {
			console.time()
			const results = func.apply(this, args)
			console.timeEnd()
			return results
		}
	}
}
class Person {
	@time
	say() {
		console.log('hello')
	}
}
const person = new Person()
person.say()
```

### 装饰器组合

装饰器是可以叠加的，排前面得装饰器限制性，由上到下，由前到后

```js
function takeMicro(target, name, descriptor) {
	const func = descriptor.value
	if (typeof func === 'function') {
		descriptor.value = function (...args) {
			console.log('拿起麦克风')
			const results = func.apply(this, args)
			return results
		}
	}
}
function openMouth(target, name, descriptor) {
	const func = descriptor.value
	if (typeof func === 'function') {
		descriptor.value = function (...args) {
			console.log('张大嘴巴')
			const results = func.apply(this, args)
			return results
		}
	}
}
class Person {
	@takeMicro
	@openMouth
	say() {
		console.log('say hello')
	}
}
const person = new Person()
person.say()
// 拿起麦克风
// 张大嘴巴
// say hello
```

## 装饰器可以做哪些有意思的事情

### 记录日志

```js
function log(target, name, descriptor) {
	const fn = descriptor.value
	descriptor.value = function (...rest) {
		console.log(`这是调用方法【${name}】前打印的日志`)
		fn.call(this, ...rest)
		console.log(`这是调用方法【${name}】后打印的日志`)
	}
}
class Person {
	@log
	say() {}
}

new Person().say()
```

### 节流

```js
const throttle = time => {
	let prev = 0
	return (target, name, descriptor) => {
		const func = descriptor.value
		if (typeof func === 'function') {
			descriptor.value = function (...args) {
				const now = new Date()
				if (now - prev >= time) {
					func.apply(this, args)
					prev = new Date()
				}
			}
		}
	}
}
class Person {
	@throttle(1000)
	say() {
		console.log('hello')
	}
}
const person = new Person()
person.say()
person.say()
```

### 防抖

```js
const debounce = time => {
	let timer
	return (target, name, descriptor) => {
		const func = descriptor.value
		if (typeof func === 'function') {
			descriptor.value = function (...args) {
				if (timer) clearTimeout(timer)
				timer = setTimeout(() => {
					func.apply(this, args)
				}, time)
			}
		}
	}
}

class Person {
	@debounce(100)
	say() {
		console.log('hello')
	}
}

const person = new Person()
person.say()
person.say()
```

其实装饰器可以做的东西还有很多，mobx，Angular，Nestjs 都已经开始使用装饰器了，大家阔以慢慢得去探究哦，
