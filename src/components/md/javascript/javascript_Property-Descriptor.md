# JavaScript 对象属性描述符

参考[JS 对象属性描述符详解](http://c.biancheng.net/view/5775.html)
参考[深入理解对象的数据属性与访问器属性](https://www.cnblogs.com/shiningly/p/9482283.html)
在 JavaScript 中，对象的属性也可以用一些关键字来修饰，用以表示当前属性是否可写、是否有默认值、是否可枚举等，这些关键字就是属性描述符。属性描述符是 ECMAScript 5 新增的语法，它其实就是一个内部对象，用来描述对象的属性的特性。

## 操作属性描述符

- `Object.getOwnPropertyDescriptor()`：可以读出指定对象私有属性的属性描述符。
- `Object.defineProperty()`：通过定义属性描述符来定义或修改一个属性，然后返回修改后的描述符。
- `Object.defineProperties()`：可以同时定义多个属性描述符。
- `Object.getOwnPropertyNames()`：获取对象的所有私有属性。
- `Object.keys()`：获取对象的所有本地可枚举的属性。
- `propertyIsEnumerable()`：对象实例方法，直接调用，判断指定的属性是否可枚举。\*

## 属性描述符的结构

属性描述符一共有 6 个:

- value：设置属性值，默认值为 undefined
- writable：设置属性值是否可写，默认值为 true
- enumerable：设置属性是否可枚举，即是否允许使用 for/in 语句或 Object.keys() 函数遍历访问，默认为 true
- configurable：设置是否可设置属性特性，默认为 true。如果为 false，将无法删除该属性，不能够修改属性值，也不能修改属性的属性描述符
- get：取值函数，默认为 undefined
- set：存值函数，默认为 undefined

## 数据属性

数据属性包含下面四个属性描述符：

- Configurable: 表示能否通过 delete 删除属性从而重新定义属性，能否修改属性特性，能否把属性修改为访问器属性。通过以上方式添加的对象属性，默认为 true
- Enumerable: 表示能否通过 for-in 循环访问属性。通过以上方式添加的对象属性，默认为 true
- Writable: 表示能否修改属性的值。通过以上方式添加的对象属性，默认为 true
- Value: 包含这个属性的数据值，可读取写入。通过以上方式添加的对象属性，默认为 undefined

## 访问器属性

访问器属性包含四个属性描述符：

- Configurable : 表示能否通过 delete 删除属性从而重新定义属性，能否修改属性特性，能否把属性修改为数据属性。直接在对象上定义的属性，默认为 true
- Enumerable : 表示能否通过 for-in 循环访问属性。直接在对象上定义的属性，默认为 true
- Get : 读取属性时调用的函数，默认为 undefined
- Set : 写入属性时调用的函数，默认为 undefined

> 注：在访问器属性的 get 和 set 中，不可以使用 this 访问属性本身，否则会无限递归而导致内存泄漏
> 注意；定义属性时访问器属性和数据属性只能存在一个，否则会报错，但是两者可以相互转化
> Vue 底层是使用该特性

## 数据属性与访问器属性的相互转换

### 数据属性 -> 访问器属性

属性的特性只能是访问器描述符和数据描述符中的一种，给已有的数据属性加 get 或 set 转换为访问器属性时，其属性的 value、writable 就会被废弃。

### 访问器属性 -> 数据属性

将访问器属性转换为数据属性，只需要给现有访问器属性设置 value 或 writable 这两个属性描述符中的任意一个即可，其原有的 get 和 set 就会被废弃，从而转换为数据属性

## 控制对象状态

JavaScript 提供了 3 种方法，用来精确控制一个对象的读写状态，防止对象被改变

- Object.preventExtensions：阻止为对象添加新的属性。
- Object.seal：阻止为对象添加新的属性，同时也无法删除旧属性。等价于属性描述符的 configurable 属性设为 false。注意，该方法不影响修改某个属性的值。
- Object.freeze：阻止为一个对象添加新属性、删除旧属性、修改属性值。

同时提供了 3 个对应的辅助检查函数

- Object.isExtensible；检查一个对象是否允许添加新的属性。
- Object.isSealed：检查一个对象是否使用了 Object.seal 方法。
- Object.isFrozen：检查一个对象是否使用了 Object.freeze 方法。
