import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// https://blog.csdn.net/weixin_44356647/article/details/105361571
// https://blog.csdn.net/dcxia89/article/details/80408984
// 设置color时需要将svg文件中的path下面的fill=“#xxx”去除即可）
Vue.component(SvgIcon.name, SvgIcon)

const req = require.context('@/icons', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
