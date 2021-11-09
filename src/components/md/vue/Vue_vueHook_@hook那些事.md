## Vue@hook 那些事

组件内的生命周期函数在执行结束后会 $emit 一个 hook + 生命周期名字 的自定义事件。

> 当组件内的生命周期函数在执行结束后 $emit 的自定义事件。不仅仅可以在组件内被监听到。vue 的语法决定了这些事件也可以被父组件 v-on 监听到。

### 常规使用

```Html
// 父组件
<template>
  <div class="parent">
    <Child @hook:mounted="doSomething"/>
  </div>
</template>
<script>
export default {
  methods: {
    doSomething() {
      console.log('父组件监听到子组件 mounted 钩子函数')
    }
  }
}
</script>

//子组件
<template>
  <div class="child">
  </div>
</template>
<script>
export default {
  mounted() {
    console.log('触发mounted事件...')
  }
}
</script>

```

### 组件内使用:清除定时器@hook 写法

```javascript
// 常规写法
<script>
  export default {
    mounted() {
      this.timer = setInterval(() => { ... }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  };
</script>
// vm.$once( event, callback )监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
// @hook写法
<script>
  export default {
    mounted() {
      const timer = setInterval(() => { ... }, 1000);
      this.$once('hook:beforeDestroy', () => clearInterval(timer);)
    }
  };
</script>
```

### 设想一个需求场景

一个页面里需要加载一个可视化组件，这个组件里面的逻辑极其复杂，存在大量复杂的计算。复杂到什么程度呢？就是从页面开始计算到计算完毕大概需要 1s。而且这个时间也是随着数据的多少而变化。 而且这个组件是一个已经离职的同时开发的，里面用到了多个 worker 协助计算，因为属于纯可视化组件，里面只有一个 canvas。因为考虑可能要在多个地方使用，就并没有引入主题相关的 loading。我们的需求是什么呢？

就是在数据渲染到页面的之前让页面 loading。mounted 之后停止 loading。beforeUpdata 时开始 loading。updatad 之后停止 loading。

最简单的方法就是改写组件的生命周期函数，使其在 mounted/beforeUpdata /updatad 时通知父组件显示或者隐藏 loading。

这样做显示不好，因为侵入了自组件的逻辑，增加的逻辑也和组件本身的功能好不关联。最好的办法就是使用 v-on="hook:xxx" 的方式：

```Html
<v-chart
    @hook:mounted="loading = false"
    @hook:beforeUpdated="loading = true"
    @hook:updated="loading = false"
    :data="data"
/>
```
