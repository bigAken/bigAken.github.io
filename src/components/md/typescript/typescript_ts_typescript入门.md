# TypeScript 入门以及进阶

[原文](https://mp.weixin.qq.com/s/Mx8kirBth0vSXf-rzxu2eQ)

## 函数定义

```ts
const test: (age: number) => void = function (age) {
	console.log(age)
}

function hello(x: number): void {
	console.log(x)
}
// 箭头函数
const arrow: (y: number) => void = y => {
	console.log(y)
}
```

## 继承

```ts
interface Person {
	age: number
}
interface Girl extends Person {
	sex: 'women'
}
interface Man extends Person {
	sex: 'man'
}
```

## 小技巧

```ts
// 定义一个对象;
interface Funny {
	[key: string]: any
}
// 定义一个数组
interface Arr {
	[key: number]: any
}
// keyof　去获取对象key
interface Women {
	age: number
	sex: 'women'
	height: number
}
type key = keyof Women
// "age" | "sex" | "height"
```

## Intersection Types(交叉类型)

交叉类型是一种将多种类型组合为一种类型的方法。这意味着你可以将给定的类型 A 与类型 B 或更多类型合并，并获得具有所有属性的单个类型。

```ts
type LeftType = {
	id: number
	left: string
}

type RightType = {
	id: number
	right: string
}

type IntersectionType = LeftType & RightType

function showType(args: IntersectionType) {
	console.log(args)
}

showType({ id: 1, left: 'test', right: 'test' })
// Output: {id: 1, left: "test", right: "test"}
```

## Union Types(联合类型)

联合类型使你可以赋予同一个变量不同的类型

```ts
type UnionType = string | number

function showType(arg: UnionType) {
	console.log(arg)
}

showType('test')
// Output: test

showType(7)
// Output: 7
```

## Generic Types(泛型)

泛型类型是复用给定类型的一部分的一种方式。它有助于捕获作为参数传递的类型 T。

> **优点:** 创建可重用的函数，一个函数可以支持多种类型的数据。这样开发者就可以根据自己的数据类型来使用函数

### 泛型函数

如何创建泛型类型:需要使用<>并将 T(名称可自定义)作为参数传递。 🌰 栗子中， 我们给 showType 添加了类型变量 T。T 帮助我们捕获用户传入的参数的类型(比如：number/string)之后我们就可以使用这个类型

```ts
function showType<T>(args: T) {
	console.log(args)
}

showType('test')
// Output: "test"

showType(1)
// Output: 1
```

### 泛型接口

注:泛型变量约束了整个接口后，在实现的时候，必须指定一个类型

```ts
interface GenericType<T> {
	id: number
	name: T
}

function showType(args: GenericType<string>) {
	console.log(args)
}

showType({ id: 1, name: 'test' })
// Output: {id: 1, name: "test"}

function showTypeTwo(args: GenericType<number>) {
	console.log(args)
}

showTypeTwo({ id: 1, name: 4 })
```

### 多参数的泛型类型

泛型类型可以接收多个参数。

```ts
interface GenericType<T, U> {
	id: T
	name: U
}

function showType(args: GenericType<number, string>) {
	console.log(args)
}

showType({ id: 1, name: 'test' })
// Output: {id: 1, name: "test"}

function showTypeTwo(args: GenericType<string, string[]>) {
	console.log(args)
}

showTypeTwo({ id: '001', name: ['This', 'is', 'a', 'Test'] })
// Output: {id: "001", name: Array["This", "is", "a", "Test"]}
```

## Utility Types(内置类型)

### Partial

允许你将 T 类型的所有属性设为可选。它将在每一个字段后面添加一个?

```ts
interface PartialType {
	id: number
	firstName: string
	lastName: string
}
/*
等效于
interface PartialType {
  id?: number
  firstName?: string
  lastName?: string
}
*/

function showType(args: Partial<PartialType>) {
	console.log(args)
}

showType({ id: 1 })
// Output: {id: 1}

showType({ firstName: 'John', lastName: 'Doe' })
```

### Required

将某个类型里的属性全部变为必选项

```ts
interface RequiredType {
	id: number
	firstName?: string
	lastName?: string
}

function showType(args: Required<RequiredType>) {
	console.log(args)
}
```

### Readonly

会转换类型的所有属性，以使它们无法被修改

```ts
interface ReadonlyType {
	id: number
	name: string
}

function showType(args: Readonly<ReadonlyType>) {
	args.id = 4
	console.log(args)
}

showType({ id: 1, name: 'Doe' })
// Error: Cannot assign to 'id' because it is a read-only property.
```

除此之外，你还可以在指定的属性前面使用关键字 readonly 使其无法被重新赋值

```ts
interface ReadonlyType {
	readonly id: number
	name: string
}
```

### Pick

此方法允许你从一个已存在的类型 T 中选择一些属性作为 K, 从而创建一个新类型

即 抽取一个类型/接口中的一些子集作为一个新的类型

> T 代表要抽取的对象 K 有一个约束: 一定是来自 T 所有属性字面量的联合类型 新的类型/属性一定要从 K 中选取， T 是要从中选择元素的类型,K 是要选择的属性(可以使使用联合类型来选择多个字段)

```ts
/**
    源码实现
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
	[P in K]: T[P]
}
```

例子

```ts
interface PickType {
	id: number
	firstName: string
	lastName: string
}

function showType(args: Pick<PickType, 'firstName' | 'lastName'>) {
	console.log(args)
}

showType({ firstName: 'John', lastName: 'Doe' })
// Output: {firstName: "John"}

showType({ id: 3 })
// Error: Object literal may only specify known properties, and 'id' does not exist in type 'Pick<PickType, "firstName" | "lastName">'
```

### Omit

Omit 的作用与 Pick 类型正好相反。不是选择元素，而是从类型 T 中删除 K 个属性。

```ts
interface PickType {
	id: number
	firstName: string
	lastName: string
}

function showType(args: Omit<PickType, 'firstName' | 'lastName'>) {
	console.log(args)
}

showType({ id: 7 })
// Output: {id: 7}

showType({ firstName: 'John' })
// Error: Object literal may only specify known properties, and 'firstName' does not exist in type 'Pick<PickType, "id">'
```

### Extract

Extract<T, U> : 提取 T 中可以赋值给 U 的类型-- **取交集**

```ts
interface FirstType {
	id: number
	firstName: string
	lastName: string
}

interface SecondType {
	id: number
	address: string
	city: string
}

type ExtractType = Extract<keyof FirstType, keyof SecondType>
// Output: "id"
```

## Exclude

Exclude<T, U> --从 T 中剔除可以赋值给 U 的类型。

```ts
interface FirstType {
	id: number
	firstName: string
	lastName: string
}

interface SecondType {
	id: number
	address: string
	city: string
}

type ExcludeType = Exclude<keyof FirstType, keyof SecondType>

// Output; "firstName" | "lastName"
```

上面的代码可以看到，属性 firstName 和 lastName 在 SecondType 类型中不存在。通过使用 Extract 关键字，我们可以获得 T 中存在而 U 中不存在的字段

### Record

Record<K,T> 给定类型 T 的一组属性 K 的类型,将一个类型的属性映射到另一个类型的属性时，Record 非常方便。

```ts
interface EmployeeType {
	id: number
	fullname: string
	role: string
}

let employees: Record<number, EmployeeType> = {
	0: { id: 1, fullname: 'John Doe', role: 'Designer' },
	1: { id: 2, fullname: 'Ibrahima Fall', role: 'Developer' },
	2: { id: 3, fullname: 'Sara Duckson', role: 'Developer' }
}

// 0: { id: 1, fullname: "John Doe", role: "Designer" },
// 1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
// 2: { id: 3, fullname: "Sara Duckson", role: "Developer" }
```

### NonNullable

NonNullable<T> 从 T 中剔除 null 和 undefined

```ts
type NonNullableType = string | number | null | undefined

function showType(args: NonNullable<NonNullableType>) {
	console.log(args)
}

showType('test')
// Output: "test"

showType(1)
// Output: 1

showType(null)
// Error: Argument of type 'null' is not assignable to parameter of type 'string | number'.

showType(undefined)
// Error: Argument of type 'undefined' is not assignable to parameter of type 'string | number'.
```

## Mapped Types( 映射类型)

映射类型允许你从一个旧的类型，生成一个新的类型。

```ts
/*
Readonly， Partial和 Pick是同态的，但 Record不是。因为 Record并不需要输入类型来拷贝属性，所以它不属于同态：
*/
type Readonly<T> = {
	readonly [P in keyof T]: T[P]
}
type Partial<T> = {
	[P in keyof T]?: T[P]
}
type Pick<T, K extends keyof T> = {
	[P in K]: T[P]
}

Record
```

```ts
type StringMap<T> = {
	[P in keyof T]: string
}

function showType(arg: StringMap<{ id: number; name: string }>) {
	console.log(arg)
}

showType({ id: 1, name: 'Test' })
// Error: Type 'number' is not assignable to type 'string'.

showType({ id: 'testId', name: 'This is a Test' })
// Output: {id: "testId", name: "This is a Test"}
```

#### Type Guards(类型保护)

### typeof

```ts
function showType(x: number | string) {
	if (typeof x === 'number') {
		return `The result is ${x + x}`
	}
	throw new Error(`This operation can't be done on a ${typeof x}`)
}

showType("I'm not a number")
// Error: This operation can't be done on a string

showType(7)
// Output: The result is 14
```

### instanceof

```ts
class Foo {
	bar() {
		return 'Hello World'
	}
}

class Bar {
	baz = '123'
}

function showType(arg: Foo | Bar) {
	if (arg instanceof Foo) {
		console.log(arg.bar())
		return arg.bar()
	}

	throw new Error('The type is not supported')
}

showType(new Foo())
// Output: Hello World

showType(new Bar())
// Error: The type is not supported
```

### in

使用 in 检查参数对象上是否存在属性 x

```ts
interface FirstType {
	x: number
}
interface SecondType {
	y: string
}

function showType(arg: FirstType | SecondType) {
	if ('x' in arg) {
		console.log(`The property ${arg.x} exists`)
		return `The property ${arg.x} exists`
	}
	throw new Error('This type is not expected')
}

showType({ x: 7 })
// Output: The property 7 exists

showType({ y: 'ccc' })
// Error: This type is not expected
```

## interface 和 type 的区别

明人不说暗话，直接上区别，下面是引入 ts 官方术语

```txt
An interface can be named in an extends or implements clause, but a type alias for an object type literal cannot.
An interface can have multiple merged declarations, but a type alias for an object type literal cannot.
```

翻译大概如下

```txt
一个接口可以通过扩展或实现被重新生命,但一个对象的type不能。 　　一个接口可以有多个合并的声明,但是一个对象的类型不能。
```
