import {
  fetchLocale,
  fetchTranslation,
  fetchTranslations,
  locales
} from '@/components/common-locale/stores'
import router from '@/router'
import i18nInstance from '@/utils/i18n.ts'
import { App } from 'vue'

export const locale = (app: App<Element>) => {
  app.use(i18nInstance)

  router.beforeResolve(async to => {
    if (!locales.value) {
      await fetchLocale()
      await fetchTranslations(to.path)
    } else {
      await fetchTranslation(to.path)
    }
  })
}
