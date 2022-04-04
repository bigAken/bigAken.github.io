# 关于 css 的相关知识

收集一些 css 相关的东西

## css flex: 1; 是哪几个属性的组合写法

flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。
该属性有两个快捷值：

```css
flex: auto; //flex: 1 1 auto;
flex: none; //flex: 0 0 auto;
```

## Element.getBoundingClientRect()

Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。

如果是标准盒子模型，元素的尺寸等于 width/height + padding + border-width 的总和。如果 box-sizing: border-box，元素的的尺寸等于 width/height

domRect = element.getBoundingClientRect()

## 页面导入样式时，使用 link 和 @import 有什么区别？

- link 是属于 html 的标签，除了加载 css 外，还能够用于定义 rss，定义 rel 连接属性等作用；

- @import 是 css 提供的，只能用于加载 css； 页面被加载的时候，link 会同时被加载，而@import 应用的 css 会等到页面完全被加载后再去加载；

import 是 css2.1 提出的，只会在 ie5 以上才能够被识别，而 link 是 XHTML 的标签，没有任何兼容问题；

## 介绍一下 CSS 的盒子模型

有两种盒子模型：IE 盒模型（border-box）、W3C 标准盒模型（content-box）
IE 盒模型和 W3C 标准盒模型的区别：

- W3C 标准盒模型：属性 width，height 只包含内容 content，不包含 border 和 padding
- IE 盒模型：属性 width，height 包含 content、border 和 padding，指的是 content
  +padding+border。

## width:auto 和 width:100%的区别

- width:100%会使元素 box 的宽度等于父元素的 contentbox 的宽度。如果加上 padding，border 就会超出父盒子宽度
- width:auto 会使元素撑满整个父元素，margin、border、padding、content 区域会自动分配水
  平空间，不会超出父盒子
