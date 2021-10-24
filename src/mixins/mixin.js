/**
 *
 * 控制页面的生命周期
 *
 */

export default {
  install(Vue) {
    Vue.mixin({
      created() {
        if (this.init && typeof this.init == "function") {
          this.init();
        }
      },
    });
  },
};
