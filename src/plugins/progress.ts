import router from '@/router'
import NProgress from 'nprogress'

export const progress = () => {
  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
