<template>
  <div id="">
    <h1>Vue.observable监听使用</h1>

    <el-button>默认按钮</el-button>
    <!-- <button @click="setCount(count + 1)">+</button>
    <button @click="setCount(count - 1)">-</button>
    <button @click="changeName(name2)">change</button> -->
  </div>
</template>

<script>
// import { store, mutations } from "@/store.js";

export default {
  name: "observerUse",
  data() {
    return {
      name2: "改变后的name",
    };
  },
  // computed: {
  //   count() {
  //     return store.count;
  //   },
  //   name() {
  //     return store.name;
  //   },
  // },
  methods: {
    // setCount: mutations.setCount,
    // changeName: mutations.changeName,
  },
};
</script>