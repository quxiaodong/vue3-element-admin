import { Locale, searchLocale, searchTranslation } from '@/apis/app'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { i18n } from '@/utils/i18n'
import { getSetting, setSetting } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

// 翻译内容
// { en: { hello: 'Hello' }, zhCn: { hello: '你好' } }
const config: Record<string, Record<string, string>> = {}
// 存储已经获取过的翻译内容，防止重复获取
const array: { code: string; stem: string }[] = []

// 当前语言
export const locale = ref<Locale>()

// 语言列表
export const locales = ref<Locale[]>()

/**
 * 切换语言
 * @param code 语言代码
 * @param isSave 是否保存在本地
 */
export const toggleLocale = (code: string, isSave: boolean = true) => {
  if (!locales.value) return

  // 从语言列表中寻找匹配的语言
  const item = locales.value.find(v => v.code === code)

  // 更新当前语言
  locale.value = item ?? locales.value[0]
  code = locale.value.code

  // 根据条件，存储在本地中
  if (isSave) {
    setSetting('language', code)
  }

  // 获取翻译内容
  fetchTranslations().then(() => (i18n.locale = locale.value!.code))
}

/**
 * 获取翻译内容，并切换语言
 * @param stem 翻译属性前缀
 */
export const fetchTranslations = async (stem?: string) => {
  // 开启弹窗
  const message = ElMessage({
    duration: 0,
    message: i18n.t('common:locale.load-translation')
  })

  // 获取全局通用的翻译内容
  await fetchTranslation('common')
  // 获取当前页面的翻译内容
  await fetchTranslation(stem || router.currentRoute.value.path)

  // 关闭弹窗
  message.close()
}

/**
 * 根据stem获取某个翻译内容
 * @param stem 翻译属性前缀
 * @returns
 */
export const fetchTranslation = (stem: string) => {
  // 是否有语言代码
  const code = locale.value?.code
  if (!code) return
  // 是否已经获取过
  const isExist = array.find(v => v.code === code && v.stem === stem)
  if (isExist) return

  // 设置默认对象
  if (!config[code]) {
    config[code] = {}
  }

  const { execute } = searchTranslation()
  return execute({ code, stem }).then(({ data }) => {
    array.push({ code, stem })
    // 合并翻译内容
    Object.assign(config[code], i18n.getLocaleMessage(code), data)
    // 更新翻译内容
    i18n.setLocaleMessage(code, config[code])
  })
}

/**
 * 获取语言列表
 * @returns
 */
export const fetchLocale = () => {
  const userStore = useUserStore()
  const { execute } = searchLocale()
  return execute().then(({ data }) => {
    // 设置语言列表
    locales.value = data

    // 语言优先级：url参数、本地、用户地区
    const language = getSetting('language') || userStore.user?.locale?.code
    const item = data.find(v => v.code === language)
    // 如果找不到，默认第一个
    locale.value = item ?? data[0]

    i18n.locale = locale.value.code
  })
}
