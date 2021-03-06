### 不可变数据

[原文地址](https://blog.csdn.net/zeping891103/article/details/83834953)

#### Mutable

JS 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。如 foo={a: 1}; bar=foo; bar.a=2 你会发现此时 foo.a 也被改成了 2。虽然这样做可以节约内存，但当应用复杂后，这就造成了非常大的隐患，突变带来的优点变得得不偿失。为了解决这个问题，一般的做法是使用 shallowCopy（浅拷贝）或 deepCopy（深拷贝）来避免被修改，但缺点是造成了 CPU 和内存的浪费。

如深拷贝的代码如下：

```js
var cloneDeep = require('lodash.clonedeep') // npm install lodash.clonedeep

var data = {
	id: '1',
	author: {
		name: 'Lee'
	}
}

var dataDeepCopy = cloneDeep(data)

console.log(dataDeepCopy === data) // 打印 false

dataDeepCopy.id = '2'
dataDeepCopy.author.name = 'Huang'

console.log(data.id) // 打印 1
console.log(dataDeepCopy.id) // 打印 2
```

#### 什么是 IMMUTABLE DATA（不可变数据）

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改操作都会返回一个新的 Immutable 对象。

Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据可用且没有发生变化。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），**即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享**。

> react 目前最常用的是 immutable，常用的方法是 Immutable.fromJS() 和 Immutable.Record()
