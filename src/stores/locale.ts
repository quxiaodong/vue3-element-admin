import { Locale, searchLocale, searchTranslation } from '@/apis/app'
import { useUserStore } from '@/stores/user'
import { i18n } from '@/utils/i18n'
import { getLanguage, setLanguage } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// 翻译内容
// { en: { hello: 'Hello' }, zhCn: { hello: '你好' } }
const _locales: Record<string, Record<string, string>> = {}
// 存储已经获取过的翻译内容，防止重复获取
const array: { code: string; stem: string }[] = []

export const useLocaleStore = defineStore('locale', () => {
  // 路由参数
  const route = useRoute()

  // 当前语言
  const locale = ref<Locale>()

  // 语言列表
  const locales = ref<Locale[]>()

  /**
   * 切换语言
   * @param code 语言代码
   * @param isSave 是否保存在本地
   */
  const toggleLocale = (code: string, isSave: boolean = true) => {
    // 从语言列表中寻找匹配的语言
    const item = locales.value?.find(v => v.code === code)
    if (!item) return

    // 更新当前语言
    locale.value = item

    // 根据条件，存储在本地中
    if (isSave) {
      setLanguage(code)
    }

    // 获取翻译内容
    fetchTranslations()
  }

  /**
   * 获取翻译内容，并切换语言
   * @param stem 翻译属性前缀
   */
  const fetchTranslations = async (stem?: string) => {
    // 开启弹窗
    const message = ElMessage({
      duration: 0,
      message: i18n.t('common:locale.loading-translation')
    })

    // 获取全局通用的翻译内容
    await fetchTranslation('common')
    // 获取当前页面的翻译内容
    await fetchTranslation(stem || route.path)

    // 关闭弹窗
    message.close()
    // 设置语言
    i18n.locale = locale.value!.code
  }

  /**
   * 根据stem获取某个翻译内容
   * @param stem 翻译属性前缀
   * @returns
   */
  const fetchTranslation = (stem: string) => {
    // 是否有语言代码
    const code = locale.value?.code
    if (!code) return
    // 是否已经获取过
    const isExist = array.find(v => v.code === code && v.stem === stem)
    if (isExist) return

    // 设置默认对象
    if (!_locales[code]) {
      _locales[code] = {}
    }

    const { execute } = searchTranslation()
    return execute({ code, stem }).then(({ data }) => {
      array.push({ code, stem })
      // 合并翻译内容
      Object.assign(_locales[code], data)
      // 更新翻译内容
      i18n.setLocaleMessage(code, _locales[code])
    })
  }

  /**
   * 获取语言列表
   * @returns
   */
  const fetchLocale = () => {
    const userStore = useUserStore()
    const { execute } = searchLocale()
    return execute().then(({ data }) => {
      // 设置语言列表
      locales.value = data

      // 语言优先级：url参数、本地、用户地区
      const language = getLanguage() || userStore.user?.region?.code
      const item = data.find(v => v.code === language)
      // 如果找不到，默认第一个
      locale.value = item ?? data[0]

      // 设置全局语言
      i18n.locale = locale.value.code
      i18n.fallbackLocale = locale.value.code
    })
  }

  return {
    locale,
    locales,
    toggleLocale,
    fetchLocale,
    fetchTranslation,
    fetchTranslations
  }
})
