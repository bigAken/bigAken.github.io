# 关于 css 的相关知识

收集一些 css 相关的东西

#### css flex: 1; 是哪几个属性的组合写法

flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。
该属性有两个快捷值：

```css
flex: auto; //flex: 1 1 auto;
flex: none; //flex: 0 0 auto;
```

#### Element.getBoundingClientRect()

Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。

如果是标准盒子模型，元素的尺寸等于 width/height + padding + border-width 的总和。如果 box-sizing: border-box，元素的的尺寸等于 width/height

domRect = element.getBoundingClientRect()