import { createI18n } from 'vue-i18n'

const instance = createI18n({})

export default instance

export const i18n = instance.global

// 有些信息展示的时候，配置还没有加载
i18n.setLocaleMessage('en', {
  'common:locale.loading-translation': 'Translation is loading'
})
i18n.setLocaleMessage('zhCn', {
  'common:locale.loading-translation': '多语言配置加载中'
})
