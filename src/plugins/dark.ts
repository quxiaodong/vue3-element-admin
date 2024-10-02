import { Code, toggleMode } from '@/components/common-dark/stores'
import { getConfig } from '@/utils/storage'

export const dark = () => {
  toggleMode(getConfig('dark') ?? Code.auto, false)
}
