/**
 * 中文语言包
 */
import zhElementLocale from 'element-ui/lib/locale/lang/zh-CN'

const context = require.context('./', true, /\.js$/)
const localZh = context.keys().reduce((tempLang, path) => {
	if (path.includes('zh')) {
		tempLang = Object.assign({}, tempLang, context(path).default)
	}
	return tempLang
}, {})

export default { zh: { ...localZh, ...zhElementLocale } }
