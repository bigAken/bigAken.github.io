import Vue from 'vue'
import ElementUI from 'element-ui'
import router from '@/router/router'
import plugins from '@/plugins/index'
import '@/style/reset.css'
import '@/style/common.scss'
import mixin from '@/mixins/mixin.js'
import '@/theme/index.css'
import store from '@/store/store.js'
import i18n from '@/i18n/i18n-setup'
import App from './App.vue'
import '@/icons/index.js'
import '@/components/index.js'
import '@/icons/index.js' //引入图标
import 'highlight.js/styles/github.css' // md代码高亮
import 'github-markdown-css' // md其他元素使用 github 的样式

Vue.use(ElementUI)
plugins.forEach(plugin => {
	Vue.use(plugin)
})
Vue.use(mixin)

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	i18n,
	store,
	router
}).$mount('#app')
