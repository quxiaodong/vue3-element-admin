import { setSetting } from '@/utils/storage'
import { ref } from 'vue'

export enum Code {
  'light' = 'light',
  'dark' = 'dark',
  'auto' = 'auto'
}

type Mode = { code: keyof typeof Code; icon: string; stem: string }

let event: MouseEvent | null

// 媒体查询
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

// 是否处于暗黑模式
export const isDark = ref<boolean>()

// 当前模式
export const mode = ref<Mode>()

// 模式列表
export const modes: Mode[] = [
  { icon: 'Sunny', code: Code.light, stem: 'common:mode.light' },
  { icon: 'Moon', code: Code.dark, stem: 'common:mode.dark' },
  { icon: 'Monitor', code: Code.auto, stem: 'common:mode.auto' }
]

/**
 * 切换模式
 * @param code 模式代码
 * @param isSave 是否保存在本地
 */
export const toggleMode = (code: string, isSave: boolean = true) => {
  // 从模式列表中寻找匹配的模式
  const item = modes.find(v => v.code === code)

  // 更新当前模式
  mode.value = item ?? modes[modes.length - 1]
  code = mode.value.code

  // 根据条件，存储在本地中
  if (isSave) {
    setSetting('dark', code)
  }

  if (code === Code.light && isDark.value !== false) {
    isDark.value = false
    startViewTransition(() => {
      document.documentElement.classList.remove('dark')
    })
  } else if (code === Code.dark && isDark.value !== true) {
    isDark.value = true
    startViewTransition(() => {
      document.documentElement.classList.add('dark')
    })
  } else if (code === Code.auto) {
    if (isDark.value !== mediaQuery.matches) {
      isDark.value = mediaQuery.matches
      startViewTransition(() => {
        document.documentElement.classList.toggle('dark', mediaQuery.matches)
      })
    }
  }
}

/**
 * 点击dropdownItem的时候记录鼠标事件
 * @param e 鼠标事件
 * @returns
 */
export const clickItem = (e: MouseEvent) => (event = e)

const updatePrefersDark = (event: MediaQueryListEvent) => {
  if (mode.value?.code === Code.auto) {
    isDark.value = event.matches
    document.documentElement.classList.toggle('dark', event.matches)
  }
}

mediaQuery.addEventListener('change', updatePrefersDark)

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
