import { useScreenSize } from '@/hooks/useScreenSize'
import { createInjectionState } from '@vueuse/shared'
import { ref } from 'vue'

type Size = 'small' | 'default' | 'large'

const [useProvideSizeStore, useSizeStore] = createInjectionState(() => {
  const { isMobile } = useScreenSize()

  const size = ref<Size>(isMobile.value ? 'small' : 'default')

  const sizes: { command: Size; text: string }[] = [
    { command: 'small', text: '紧凑' },
    { command: 'default', text: '中等' },
    { command: 'large', text: '宽松' }
  ]

  const change = (value: Size) => {
    size.value = value
  }

  return { size, sizes, change }
})

export { useProvideSizeStore }

export { useSizeStore }
