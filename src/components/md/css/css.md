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

#### 页面导入样式时，使用l ink 和 @import 有什么区别？

- link是属于html的标签，除了加载css外，还能够用于定义rss，定义rel连接属性等作用； 

- @import是css提供的，只能用于加载css； 页面被加载的时候，link会同时被加载，而@import应用的css会等到页面完全被加载后再去加载；

import是css2.1提出的，只会在ie5以上才能够被识别，而link是XHTML的标签，没有任何兼容问题；
