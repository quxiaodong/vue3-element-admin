import { getConfig, setConfig } from '@/utils/storage'
import { ref } from 'vue'

export const animates = ['fade', 'fade-right', 'fade-up', 'fade-down']

export const animate = ref(
  animates.includes(getConfig('animate') ?? '')
    ? getConfig('animate')
    : animates[0]
)

export const toggleAnimate = (value: string) => {
  setConfig('animate', value)
  animate.value = value
}
