## 如何减少 Dom 操作中的回流和重绘问题

### 什么是回流和重绘？

- 当 render tree 中的一部分（或全部）因为元素的规模尺寸，布局，隐藏等改变而需要重新构建**影响布局**。这就称为回流（reflow）
- 当 render tree 中的一些**元素需要更新属性**，而这些属性只是影响元素的外观，风格，而**不会影响布局的**，比如 background-color，这就是重绘

> 在回流的时候，浏览器会使渲染树中受影响的一部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程为重绘。 回流必然会引起重绘，而重绘不一定会引起回流

### 常见的重绘和回流操作？

- 添加、删除元素（回流+重绘）
- 隐藏元素，display：none（回流+重绘）
- 移除元素，比如改变 top，left（jQuery 的 animate 方法就是，该变 top，left 不一定会回流），或者移动元素到另外 1 个父元素中。（回流+重绘）
- 对 style 的操作（对不同的属性操作，影响不一样）
- 以下属性，只要改动他们的值，就会造成回流，这些属性包括：offsetLeft、offsetTop、offsetWidth、offsetHeight；scrollTop、scrollLeft、scrollWidth、scrollHeight；clientWidth、clientHeight、clientLeft、clientTop；
- 还有一种是用户的操作，比如改变浏览器大小，改变浏览器的字体大小。

### 如何减少回流和重绘

减少回流、重绘其实就是需要减少对 render tree 的操作（**合并多次 Dom 和样式的修改**），并减少对一下 style 信息的请求，尽量利用好浏览器的优化策略

#### 直接改变 className，如果动态改变样式，则使用 cssText（考虑没有优化的浏览器）

```js
// 不好的写法
var left = 1
var top = 1
el.style.left = left + 'px'
el.style.top = top + 'px'

// 比较好的写法 改变className
el.className += ' className1'
// 比较好的写法 改变style（样式）
el.style.cssText += ';left: ' + left + 'px;top: ' + top + 'px;'
```

#### 让要操作的元素进行”离线处理”，处理完后一起更新
##### CSS中避免回流
 
1. 使用 DocumentFragment 进行缓存操作,引发一次回流和重绘；

```js
//不好的写法（模式中所说的反模式）
var p, t
p = document.creatElement('p')
t = document.creatTextNode('fist paragraph')
p.appendChild(t)
document.body.appendChild(p) //将引起一次回流
p = document.creatElement('p')
t = document.creatTextNode('second paragraph')
p.appendChild(t)
document.body.appendChild(p) //将再引起一次回流
```

```js
//好的写法
var p, t, frag
frag = document.creatDocumentFragment()
p = document.creatElement('p')
t = document.creatTextNode('fist paragraph')
p.appendChild(t)
farg.appendChild(p)
p = document.creatElement('p')
t = document.creatTextNode('second paragraph')
p.appendChild(t)
farg.appendChild(p)
document.body.appendChild(frag)
```

相比前面的方法，这里仅仅引起一次回流，倘若页面里有很多这样的操作，利用文档随便将会提升很多

2. 使用 display:none 技术，display:none上的DOM操作不会引发回流和重绘
3. 使用 cloneNode

#### 不要经常访问会引起浏览器 flush 队列的属性，如果你确实要访问，利用缓存

例如避免循环读取 offsetLeft 等属性。在循环之前把它们存起来。

```js
//BAD WAY
for (循环) {
  el.style.left = el.offsetLeft + 5 + "px";
  el.style.top = el.offsetTop + 5 + "px";
}
// good
var left = el.offsetLeft,
  top = el.offsetTop,
  style = el.style;
for (循环) {
  left += 10;
  top += 10;
  style.left = left + "px";
  style.top = top + "px";
}
```
