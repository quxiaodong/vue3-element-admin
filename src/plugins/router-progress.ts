import router from '@/router'
import { useNProgress } from '@vueuse/integrations/useNProgress'

const { isLoading } = useNProgress()

export const routerProgress = () => {
  router.beforeEach(() => {
    isLoading.value = true
  })

  router.afterEach(() => {
    isLoading.value = false
  })
}
