# react Hooks简要

在 hooks 诞生之前，如果组件包含内部 state，我们都是基于 class 的形式来创建组件。当时我们也知道，react 中，性能的优化点在于：

1. 调用 setState，就会触发组件的重新渲染，无论前后的 state 是否不同
2. 父组件更新，子组件也会自动的更新

**通常的解决方案是：使用 immutable 进行比较，在不相等的时候调用 setState；在 shouldComponentUpdate 中判断前后的 props 和 state，如果没有变化，则返回 false 来阻止更新**

在 hooks 出来之后，我们能够使用 function 的形式来创建包含内部 state 的组件。但是，使用 function 的形式，失去了上面的 shouldComponentUpdate，我们无法通过判断前后状态来决定是否更新。而且，在函数组件中，react 不再区分 mount 和 update 两个状态，这意味着函数组件的每一次调用都会执行其内部的所有逻辑，那么会带来较大的性能损耗。因此，useEffect， useMemo 和 useCallback 就是解决性能问题的杀手锏。

## useEffect

useEffect 用于处理组件中的 effect，通常用于请求数据，事件处理，订阅等相关操作。这里以数据请求为例，来深入介绍 useEffect 的用法。

useEffect 的第二个参数可用于定义其依赖的所有变量。如果其中一个变量发生变化，则 useEffect 会再次运行。如果包含变量的数组为空，则在更新组件时 useEffect 不会再执行，因为它不会监听任何变量的变更。第二个参数如果什么都不写就会每次都执行

```js
// props或者state更新都会执行
useEffect(async () => {
	const result = await axios('http://localhost/api/v1/search?query=redux')
	setData(result.data)
})
// mounted的时候执行 执行一次
useEffect(async () => {
	const result = await axios('http://localhost/api/v1/search?query=redux')
	setData(result.data)
}, [])
// dep变化的时候才会执行
useEffect(async () => {
	const result = await axios('http://localhost/api/v1/search?query=redux')
	setData(result.data)
}, [dep])
```

## useMemo

当依赖`price`变更时，会返回新的值，其他的 props 或者 state 变更时不会执行
初始化的时候执行一次以及 price 变化的时候再次执行，以便于节省性能

```js
const expensive = useMemo(() => {
	return price.toFixed(2)
}, [price])
```

## useCallback

当依赖`count`变更时，会返回新的函数，其他的 props 或者 state 变更时不会执行

```js
const callback = useCallback(() => {
	console.log(count)
}, [count])
```
