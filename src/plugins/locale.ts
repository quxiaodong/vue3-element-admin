import router from '@/router'
import { useLocaleStore } from '@/stores/locale'
import i18nInstance from '@/utils/i18n.ts'
import { App } from 'vue'

export const locale = (app: App<Element>) => {
  app.use(i18nInstance)

  router.beforeResolve(async to => {
    const localeStore = useLocaleStore()
    if (!localeStore.locales) {
      await localeStore.fetchLocale()
      await localeStore.fetchTranslations(to.path)
    } else {
      await localeStore.fetchTranslation(to.path)
    }
  })
}
