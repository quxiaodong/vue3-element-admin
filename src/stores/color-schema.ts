import { getColorScheme, setColorScheme } from '@/utils/storage'
import { defineStore } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'

enum Code {
  'light' = 'light',
  'dark' = 'dark',
  'auto' = 'auto'
}

type Mode = { icon: string; code: keyof typeof Code; i18n: string }

let event: MouseEvent | null

const startViewTransition = (fn: () => void) => {
  document.startViewTransition(fn).ready.then(animate)
}

const animate = () => {
  if (!event) return
  const { clientX, clientY } = event
  event = null

  const radius = Math.hypot(
    Math.max(clientX, innerWidth - clientX),
    Math.max(clientY, innerHeight - clientY)
  )

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ]
    },
    {
      duration: 500,
      pseudoElement: '::view-transition-new(root)'
    }
  )
}

export const useColorSchemaStore = defineStore('color-schema', () => {
  // 是否处于暗黑模式
  const isDark = ref<boolean>()

  // 当前模式
  const mode = ref<Mode>()

  // 媒体查询
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  // 模式列表
  const modes: Mode[] = [
    { icon: '🌞', code: Code.light, i18n: 'common:mode.light' },
    { icon: '🌘', code: Code.dark, i18n: 'common:mode.dark' },
    { icon: '🖥️', code: Code.auto, i18n: 'common:mode.auto' }
  ]

  /**
   *
   * @param code 模式代码
   * @param isSave 是否保存在本地
   */
  const toggleMode = (code: string, isSave: boolean = true) => {
    // 从模式列表中寻找匹配的模式
    const item = modes.find(v => v.code === code)
    if (!item) return

    // 更新当前模式
    mode.value = item

    // 根据条件，存储在本地中
    if (isSave) {
      setColorScheme(code)
    }

    if (code === Code.light) {
      isDark.value = false
      startViewTransition(() => {
        document.documentElement.classList.remove('dark')
      })
    } else if (code === Code.dark) {
      isDark.value = true
      startViewTransition(() => {
        document.documentElement.classList.add('dark')
      })
    } else if (code === Code.auto) {
      isDark.value = mediaQuery.matches
      startViewTransition(() => {
        document.documentElement.classList.toggle('dark', mediaQuery.matches)
      })
    }
  }

  const updatePrefersDark = (event: MediaQueryListEvent) => {
    if (mode.value?.code === Code.auto) {
      document.documentElement.classList.toggle('dark', event.matches)
    }
  }

  /**
   * 点击dropdownItem的时候记录鼠标事件
   * @param e 鼠标事件
   * @returns
   */
  const clickItem = (e: MouseEvent) => (event = e)

  onMounted(() => {
    mediaQuery.addEventListener('change', updatePrefersDark)
  })

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', updatePrefersDark)
  })

  toggleMode(getColorScheme() ?? 'auto', false)

  return { isDark, mode, modes, toggleMode, clickItem }
})
