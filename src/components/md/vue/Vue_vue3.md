# VUE3.x 相关知识点

## reactive,toRefs,ref 的区别

- reactive 函数是把一个对象转换成响应式对象，他返回一个 proxy 对象
- toRefs 把 proxy 对象中的每一个属性转成响应式对象，并且可以配合解构使用
- ref 把普通数据转成响应式对象
