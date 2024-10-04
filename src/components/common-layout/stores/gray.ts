import { setConfig } from '@/utils/storage'
import { ref } from 'vue'

export const gray = ref(false)

export const toggleGray = (value: boolean) => {
  gray.value = value
  setConfig('gray', value)
  if (value) {
    document.documentElement.classList.add('grayscale')
  } else {
    document.documentElement.classList.remove('grayscale')
  }
}
