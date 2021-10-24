/**
 * 英文语言包
 */
import enElementLocale from 'element-ui/lib/locale/lang/en'

const context = require.context('./', true, /\.js$/)
const localEn = context.keys().reduce((tempLang, path) => {
	if (path.includes('en')) {
		tempLang = Object.assign({}, tempLang, context(path).default)
	}
	return tempLang
}, {})

export default { en: { ...localEn, ...enElementLocale } }
