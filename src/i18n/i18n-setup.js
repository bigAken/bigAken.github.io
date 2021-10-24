import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ElementLocale from 'element-ui/lib/locale'
import messages from '@/lang/zh'

Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: 'zh', // 设置语言环境
	fallbackLocale: 'zh',
	messages // 设置语言环境信息
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

const loadedLanguages = ['zh'] // 我们的预装默认语言

function setI18nLanguage(lang) {
	i18n.locale = lang
	// axios.defaults.headers.common['Accept-Language'] = lang
	document.querySelector('html').setAttribute('lang', lang)
	return lang
}
export function loadLanguageAsync(lang) {
	if (i18n.locale !== lang) {
		if (!loadedLanguages.includes(lang)) {
			return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then(msgs => {
				i18n.setLocaleMessage(lang, msgs.default[lang])
				loadedLanguages.push(lang)
				return setI18nLanguage(lang)
			})
		}
		return Promise.resolve(setI18nLanguage(lang))
	}
	return Promise.resolve(lang)
}
export default i18n
