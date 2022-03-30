# JavaScript Proxy 以及 Reflect

## 举例子

如下请分别使用`Object.defineProperty`和`Proxy`完善下面的代码逻辑

```js
function observe(obj, callback) {}

const obj = observe(
	{
		name: '小明',
		sex: '男'
	},
	(key, value) => {
		console.log(`属性[${key}]的值被修改为[${value}]`)
	}
)

// 这段代码执行后，输出 属性[name]的值被修改为[小红]
obj.name = '小红'

// 这段代码执行后，输出 属性[sex]的值被修改为[女]
obj.sex = '女'
```

下面分别用`Object.defineProperty`和`Proxy`去实现上面的逻辑.

### 使用 Object.defineProperty

```js
/**
 * 请实现这个函数，使下面的代码逻辑正常运行
 * @param {*} obj 对象
 * @param {*} callback 回调函数
 */
function observe(obj, callback) {
	const newObj = {}
	Object.keys(obj).forEach(key => {
		Object.defineProperty(newObj, key, {
			configurable: true,
			enumerable: true,
			get() {
				return obj[key]
			},
			// 当属性的值被修改时，会调用set，这时候就可以在set里面调用回调函数
			set(newVal) {
				obj[key] = newVal
				callback(key, newVal)
			}
		})
	})
	return newObj
}

const obj = observe(
	{
		name: '小明',
		sex: '男'
	},
	(key, value) => {
		console.log(`属性[${key}]的值被修改为[${value}]`)
	}
)

// 这段代码执行后，输出 属性[name]的值被修改为[小红]
obj.name = '小红'

// 这段代码执行后，输出 属性[sex]的值被修改为[女]
obj.name = '女'
```

### 使用 Proxy

```js
function observe(obj, callback) {
	return new Proxy(obj, {
		get(target, key) {
			return target[key]
		},
		set(target, key, value) {
			target[key] = value
			callback(key, value)
		}
	})
}

const obj = observe(
	{
		name: '小明',
		sex: '男'
	},
	(key, value) => {
		console.log(`属性[${key}]的值被修改为[${value}]`)
	}
)

// 这段代码执行后，输出 属性[name]的值被修改为[小红]
obj.name = '小红'

// 这段代码执行后，输出 属性[sex]的值被修改为[女]
obj.name = '女'
```

通过上面两种不同实现方式，我们可以大概的了解到 `Object.defineProperty` 和 `Proxy` 的用法，但是当给对象添加新的属性的时候，区别就出来了，比如给对象添加一个`age`的属性

```js
// 添加age字段
obj.age = 18
```

**使用 Object.defineProperty 无法监听到新增属性，但是使用 Proxy 是可以监听到的。对比上面两段代码可以发现有以下几点不同**

- Object.defineProperty 监听的是对象的每一个属性，而 Proxy 监听的是对象自身
- 使用 Object.defineProperty 需要遍历对象的每一个属性，对于性能会有一定的影响
- Proxy 对新增的属性也能监听到，但 Object.defineProperty 无法监听到。

## 初识 Proxy

在 MDN 中，关于 Proxy 是这样介绍的: Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。什么意思呢？Proxy 就像一个拦截器一样，它可以在读取对象的属性，修改对象的属性，获取对象属性列表，通过 for in 循环等等操作的时候，去拦截对象上面的默认行为，然后自己去自定义这些行为，比如上面例子中的 set,我们通过拦截默认的 set,然后在自定义的 set 里面添加了回调函数的调用

> 可以将`Proxy`理解成“拦截”，在目标对象之前架设一层“拦截”，当外界对该对象的访问，都必须先通过这层拦截，正因为有了一种拦截机制，当外界的访问对象时可以对对象或者对象属性进行一些操作（过滤或改写）

## Proxy 语法

```js
/**
 * target: 要兼容的对象，可以是一个对象，数组,函数等等
 * handler: 是一个对象，里面包含了可以监听这个对象的行为函数，比如上面例子里面的`get`与`set`
 * 同时会返回一个新的对象proxy, 为了能够触发handler里面的函数，必须要使用返回值去进行其他操作，比如修改值
 */
const proxy = new Proxy(target, handler)
```

## handler 里面的捕获器

### handler.get

当通过 proxy 去读取对象里面的属性的时候，会进入到 get 钩子函数里面
语法：

```js
/**
 * target: 目标对象，即通过proxy代理的对象
 * key: 要访问的属性名称
 * receiver: receiver相当于是我们要读取的属性的this,一般情况
 *           下他就是proxy对象本身，关于receiver的作用，后文将具体讲解
 */
handle.get(target, key, receiver)
```

示例
在工作中经常会有封装 axios 的需求，在封装过程中，也需要对请求异常进行封装，比如不同的状态码返回的异常信息是不同的，如下是一部分状态码及其提示信息:

```js
// 状态码提示信息
const errorMessage = {
	400: '错误请求',
	401: '系统未授权，请重新登录',
	403: '拒绝访问',
	404: '请求失败，未找到该资源'
}

// 使用方式
const code = 404
const message = errorMessage[code]
console.log(message)
```

但这存在一个问题，状态码很多，不可能每一个状态码都去枚举出来，所以对于一些异常状态码，希望可以进行统一提示，如提示为系统异常，请联系管理员，这时候就可以使用 Proxy 对错误信息进行代理处理

```js
// 状态码提示信息
const errorMessage = {
	400: '错误请求',
	401: '系统未授权，请重新登录',
	403: '拒绝访问',
	404: '请求失败，未找到该资源'
}

const proxy = new Proxy(errorMessage, {
	get(target, key) {
		const value = target[key]
		return value || '系统异常，请联系管理员'
	}
})

// 输出 错误请求
console.log(proxy[400])
// 输出 系统异常，请联系管理员
console.log(proxy[500])
```

### handler.set

当通过 proxy 去为对象设置修改属性的时候，会进入到 set 钩子函数里面
语法

```js
/**
 * target: 目标对象，即通过proxy代理的对象
 * key: 要赋值的属性名称
 * value: 目标属性要赋的新值
 * receiver: 与 get的receiver 基本一致
 */
handle.set(target, key, value, receiver)
```

示例
某系统需要录入一系列数值用于数据统计，但是在录入数值的时候，可能录入的存在一部分异常值，对于这些异常值需要在录入的时候进行处理, 比如大于 100 的值，转换为 100, 小于 0 的值，转换为 0, 这时候就可以使用 proxy 的 set，在赋值的时候，对数据进行处理

```js
const numbers = []
const proxy = new Proxy(numbers, {
	set(target, key, value) {
		if (value < 0) {
			value = 0
		} else if (value > 100) {
			value = 100
		}
		target[key] = value
		// 对于set 来说，如果操作成功必须返回true, 否则会被视为失败
		return true
	}
})

proxy.push(1)
proxy.push(101)
proxy.push(-10)
// 输出 [1, 100, 0]
console.log(numbers)
```

在使用 Vue2.0 的时候，如果给对象添加新属性的时候，往往需要调用`$set`, 这是因为`Object.defineProperty`只能监听已存在的属性，而新增的属性无法监听，而通过`$set` 相当于手动给对象新增了属性，然后再触发数据响应。但是对于 Vue3.0 来说，因为使用了 `Proxy`， 在他的 set 钩子函数中是可以监听到新增属性的，所以就不再需要使用`$set`

```js
const obj = {
	name: '小明'
}
const proxy = new Proxy(obj, {
	set(target, key, value) {
		if (!target.hasOwnProperty(key)) {
			console.log(`新增了属性${key},值为${value}`)
		}
		target[key] = value
		return true
	}
})
// 新增 age 属性
// 输出 新增了属性age,值为18
proxy.age = 18
```

### handler.has

当使用 `in` 判断属性是否在 `proxy` 代理对象里面时，会触发 `has`
语法

```js
/**
 * target: 目标对象，即通过proxy代理的对象
 * key: 要判断的key是否在target中
 */
handle.has(target, key)
```

示例
一般情况下我们在 js 中声明私有属性的时候，会将属性的名字以*开头，对于这些私有属性，是不需要外部调用，所以如果可以隐藏掉是最好的，这时候就可以通过 has 在判断某个属性是否在对象时，如果以*开头，则返回 false

```js
const obj = {
	publicMethod() {},
	_privateMethod() {}
}
const proxy = new Proxy(obj, {
	has(target, key) {
		if (key.startsWith('_')) {
			return false
		}
		return Reflect.get(target, key)
	}
})

// 输出 false
console.log('_privateMethod' in proxy)

// 输出 true
console.log('publicMethod' in proxy)
```

### handler.deleteProperty

当使用 delete 去删除对象里面的属性的时候，会进入 `deleteProperty`钩子函数
语法

```js
/**
 * target: 目标对象，即通过proxy代理的对象
 * key: 要删除的属性
 */
handle.deleteProperty(target, key)
```

示例：现在有一个用户信息的对象，对于某些用户信息，只允许查看，但不能删除或者修改，对此使用 Proxy 可以对不能删除或者修改的属性进行拦截并抛出异常，如下

```js
const userInfo = {
	name: '小明',
	height: 187,
	sex: '男',
	age: 22
}
// 只能删除用户名和age
const readonlyKeys = ['name', 'age']
const proxy = new Proxy(userInfo, {
	set(target, key, value) {
		if (readonlyKeys.includes(key)) {
			throw new Error(`属性${key}不能被修改`)
		}
		target[key] = value
		return true
	},
	deleteProperty(target, key) {
		if (readonlyKeys.includes(key)) {
			throw new Error(`属性${key}不能被删除`)
			return
		}
		delete target[key]
		return true
	}
})
// 报错
delete proxy.name
```

### handler.apply

当 proxy 监听的是一个函数的时候，当调用这个函数时，会进入 apply 钩子函数

### handle.ownKeys

当通过`Object.getOwnPropertyNames`,`Object.getownPropertySymbols`,`Object.keys`,`Reflect.ownKeys`去获取对象的信息的时候，就会进入 ownKeys 这个钩子函数

### handler.construct

当使用 new 操作符的时候，会进入 construct 这个钩子函数

### handler.defineProperty

当使用 `Object.defineProperty` 去修改属性修饰符的时候，会进入这个钩子函数

### handler.getPrototypeOf

当读取对象的原型的时候，会进入这个钩子函数

### handler.setPrototypeOf

当设置对象的原型的时候，会进入这个钩子函数

### handler.isExtensible

当通过 `Object.isExtensible` 去判断对象是否可以添加新的属性的时候，进入这个钩子函数

### handler.preventExtensions

当通过` Object.preventExtensions` 去设置对象不可以修改新属性时候，进入这个钩子函数

### handler.getOwnPropertyDescriptor

在获取代理对象某个属性的属性描述时触发该操作，比如在执行 `Object.getOwnPropertyDescriptor(proxy, "foo")` 时会进入这个钩子函数

## Reflect

参考[Proxy 和 Reflect](https://juejin.cn/post/6844904090116292616#heading-6)

`Reflect` 是一个内置对象，可简化的创建 Proxy。以前的内部方法，比如`[[Get]]`，`[[Set]] `等等都只是规范，不能直接调用。`Reflect` 对象使调用这些内部方法成为可能。它的方法是内部方法的最小包装。这是 Reflect 执行相同操作和调用的示例：

| 操作              | `Reflect` 调用                    | 内部方法      |
| ----------------- | --------------------------------- | ------------- |
| obj[prop]         | Reflect.get(obj, prop)            | [[Get]]       |
| obj[prop] = value | Reflect.set(obj, prop, value)     | [[Set]]       |
| delete obj[prop]  | Reflect.deleteProperty(obj, prop) | [[Delete]]    |
| new F(value)      | Reflect.construct(F, value)       | [[Construct]] |
| ...               | ...                               | ...           |

例如：

```js
let user = {}

Reflect.set(user, 'name', 'John')

console.log(user.name) // John
```

对于每个可被 `Proxy` 捕获的内部方法，`Reflect` 都有一个对应的方法，其名称和参数与 `Proxy` 钩子相同。

因此，可以用 `Reflect` 将操作转发到原始对象。

在此示例中，钩子`get` 和 `set` 透明地（好像它们都不存在）将读/写操作转发到对象，并显示一条消息：

```js
let user = {
	name: 'John'
}

user = new Proxy(user, {
	get(target, prop, receiver) {
		console.log(`GET ${prop}`)
		return Reflect.get(target, prop, receiver) // (1)
	},
	set(target, prop, val, receiver) {
		console.log(`SET ${prop}=${val}`)
		return Reflect.set(target, prop, val, receiver) // (2)
	}
})

let name = user.name // shows "GET name"
user.name = 'Pete' // shows "SET name=Pete"
```

这里:

- `Reflect.get` 读取一个对象属性
- `Reflect.set` 写入对象属性，成功返回 `true` ，否则返回 `false`

**就是说，一切都很简单：如果钩子想要将调用转发给对象，则只需使用相同的参数调用 `Reflect.<method>` 就足够了**

### 使用`Reflect` 与 `target[prop]`的差别

在大多数情况下，我们可以不使用 `Reflect` 完成相同的事情，例如，使用 `Reflect.get(target, prop, receiver)` 读取属性可以替换为 `target[prop]`。尽管有一些细微的差别。
代理一个 `getter`，让我们看一个示例，说明为什么 `Reflect.get` 更好。我们还将看到为什么 get/set 有第四个参数 `receiver`，而我们以前没有使用过它。

一个带有一个 `_name` 属性和一个 `getter` 的对象 `user`

```js
let user = {
	_name: 'Guest',
	get name() {
		return this._name
	}
}

let userProxy = new Proxy(user, {
	get(target, prop, receiver) {
		return target[prop]
	}
})

console.log(userProxy.name) // Guest
```

该 get 钩子在这里是“透明的”，它返回原来的属性，不会做别的任何事情。对于我们的示例而言，这就足够了。

一切似乎都很好。但是让我们将示例变得更加复杂。

另一个对象 `admin` 从 `user` 继承后，我们可以观察到错误的行为：

```js
let user = {
	_name: 'Guest',
	get name() {
		return this._name
	}
}

let userProxy = new Proxy(user, {
	get(target, prop, receiver) {
		return target[prop] // (*) target = user
	}
})

let admin = {
	__proto__: userProxy,
	_name: 'Admin'
}

// Expected: Admin
alert(admin.name) // 输出：Guest （？！？）
```

读取 `admin.name` 应该返回 `"Admin"`，而不是 `"Guest"`！
但是，如果我们删除代理，那么一切都会按预期进行
问题实际上出在代理中，在 `(*)`行。

1. 当我们读取 `admin.name`，由于 `admin` 对象自身没有对应的的属性，搜索将转到其原型。
2. 原型是 `userProxy`
3. 从代理读取 `name` 属性时，`get` 钩子会触发并从原始对象返回 `target[prop]` 属性，在 `(\*)`行当调用 `target[prop]` 时，若 `prop` 是一个 `getter`，它将在 `this=target` 上下文中运行其代码。因此，结果是来自原始对象 `target` 的 `this.\_name` 即来自 `user`。

为了解决这种情况，我们需要 `get` 钩子的第三个参数 `receiver`。它保证传递正确的 `this` 给 `getter`。在我们的情况下是 `admin`。如何为 `getter` 传递上下文？对于常规函数，我们可以使用 `call/apply`，但这是一个 `getter`，它不是“被调用”的，只是被访问的。`Reflect.get` 可以做到的。如果我们使用它，一切都会正常运行。这是更正后的变体：

```js
let user = {
	_name: 'Guest',
	get name() {
		return this._name
	}
}

let userProxy = new Proxy(user, {
	get(target, prop, receiver) {
		// receiver = admin
		return Reflect.get(target, prop, receiver) // (*)
	}
})

let admin = {
	__proto__: userProxy,
	_name: 'Admin'
}

console.log(admin.name) // Admin
```

现在 `receiver`，保留了**对正确 `this` 的引用（即 `admin`）的引用**，该引用将在 `(*)` 行中使用`Reflect.get`传递给`getter`x
我们可以将钩子重写得更短：

```js
get(target, prop, receiver) {
  return Reflect.get(...arguments);
}
```

`Reflect` 调用的命名方式与钩子完全相同，并且接受相同的参数。它们是通过这种方式专门设计的。

因此， `return Reflect...` 会提供一个安全的提示程序来转发操作，并确保我们不会忘记与此相关的任何内容。

recevier 为最初被调用的对象，什么意思呢，就是谁调用的 Proxy 经过捕捉器函数那么它就是谁

## Proxy 和 Reflect 的局限性

### 某些内置对象使用失败

`Proxy`对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）；但是`Proxy`也有其的局限性
许多内置对象，例如 `Map`, `Set`, `Date`, `Promise` 等等都使用了所谓的 “内部插槽”。
它们类似于属性，但仅限于内部使用，仅用于规范目的。例如， Map 将项目存储在 `[[MapData]]`中。内置方法直接访问它们，而不通过 `[[Get]]/[[Set]]` 内部方法。所以 `Proxy` 不能拦截。
在像这样的内置对象被代理后，代理对象没有这些内部插槽，因此内置方法将失败

```js
let map = new Map()

let proxy = new Proxy(map, {})

proxy.set('test', 1) // Error
```

在内部，一个 `Map` 将所有数据存储在其 `[[MapData]]` 内部插槽中。代理对象没有这样的插槽。内建方法 `Map.prototype.set` 方法试图访问内部属性 `this.[[MapData]]`，但由于 `this=proxy` 在 proxy 中不能找到它，只能失败。
幸运的是，有一种解决方法：

```js
let map = new Map()

let proxy = new Proxy(map, {
	get(target, prop, receiver) {
		let value = Reflect.get(...arguments)
		return typeof value == 'function' ? value.bind(target) : value
	}
})

proxy.set('test', 1)
console.log(proxy.get('test')) // 1 (works!)
```

现在它可以正常工作，因为 `get` 钩子将函数属性（例如 `map.set`）绑定到目标对象（map）本身。与前面的示例不同，`proxy.set(...)` 内部 `this` 的值并不是 `proxy`，而是原始对象 `map`。因此，当 `set` 钩子的内部实现尝试访问 `this.[[MapData]]` 内部插槽时，它会成功

### 私有字段

类的私有字段也会发生类似的情况。
例如，getName() 方法访问私有的 #name 属性并在代理后中断：

```js
class User {
	#name = 'Guest'

	getName() {
		return this.#name
	}
}

let user = new User()

user = new Proxy(user, {})

alert(user.getName()) // Error
```

原因是专用字段是使用内部插槽实现的。JavaScript 访问它们时不使用 `[[Get]]/[[Set]]`
在调用 `getName()` 时 `this` 的值是代理后的 user，它没有带私有字段的插槽。

再次，bind 方法的解决方案使它恢复正常：

```js
class User {
	#name = 'Guest'

	getName() {
		return this.#name
	}
}

let user = new User()

user = new Proxy(user, {
	get(target, prop, receiver) {
		let value = Reflect.get(...arguments)
		return typeof value == 'function' ? value.bind(target) : value
	}
})

alert(user.getName()) // Guest
```

> 该解决方案有缺点，如前所述：将原始对象暴露给该方法，可能使其进一步传递并破坏其他代理功能

### Proxy != target

代理跟原对象肯定是不同的对象，所以当我们使用原对象进行管理后代理却无法进行正确管理，比如下方代理做了一个所有用户实例的集中管理：

```js
const users = new Set()
class User {
	constructor() {
		users.add(this)
	}
}

const user = new User()
// true
console.log(users.has(user))
const userProxy = new Proxy(user, {})
// false
users.has(userProxy)
```

所以在开发中这类问题需要特别注意，在开发时假如对一个对象做代理时，对代理的所有管理也需要再进行一层代理，原对象对原对象，代理对代理，比如上方这个实例可以通过下方代码改进

```js
const users = new Set()
class User {
	constructor() {
		users.add(this)
	}
}

// 获取原对象
const getRaw = target => (target[toRaw] ? target[toRaw] : target)
const toRaw = Symbol('toRaw')
const usersProxy = new Proxy(users, {
	get(target, prop) {
		// 注意Set size是属性，而不是方法，这个属性用到了内部插槽，
		// 所以不能够使用Reflect.get(...arguments)获取
		let value = prop === 'size' ? target[prop] : Reflect.get(...arguments)

		value = typeof value === 'function' ? value.bind(target) : value

		// 这里只做两个api示例，当添加或者判断一定是通过原对象判断添加，
		// 因为原对象的管理只能放原对象
		if (prop === 'has' || prop === 'add') {
			return (target, ...args) => value(getRaw(target), ...args)
		} else {
			return value
		}
	}
})

const factoryUserProxy = user => {
	const userProxy = new Proxy(user, {
		get(target, prop, recevier) {
			if (prop === toRaw) {
				return target
			} else {
				return Reflect.get(...arguments)
			}
		}
	})
	return userProxy
}

const user = new User()
const userProxy = factoryUserProxy(user)
// true
console.log(users.has(user))
// true
console.log(usersProxy.has(user))
// true
console.log(usersProxy.has(userProxy))
// true
console.log(users.size)
// true
console.log(usersProxy.size)
// 因为会转化为原对象添加，而原对象已有 所以添加不进去
usersProxy.add(userProxy)
// 1
console.log(users.size)
// 1
console.log(usersProxy.size)
```
