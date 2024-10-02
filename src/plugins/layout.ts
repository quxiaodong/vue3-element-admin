import { toggleColor } from '@/components/common-layout/stores/color'
import { toggleGray } from '@/components/common-layout/stores/gray'
import { toggleWeak } from '@/components/common-layout/stores/weak'
import { getConfig } from '@/utils/storage'

export const layout = () => {
  toggleColor(getConfig('color'))

  toggleWeak(!!getConfig('weak'))

  toggleGray(!!getConfig('gray'))
}
