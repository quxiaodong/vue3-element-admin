import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      meta: {
        breadcrumb: '首页',
        i18n: 'common:menu.home'
      },
      component: () => import('@/components/common-layout/Index.vue')
    },
    {
      path: '/sign-up',
      component: () => import('@/views/sign/Index.vue'),
      children: [
        {
          path: '',
          meta: {
            whitelist: true,
            breadcrumb: '注册',
            i18n: 'common:menu.sign-up'
          },
          component: () => import('@/views/sign/sign-up/Index.vue')
        }
      ]
    },
    {
      path: '/sign-in',
      component: () => import('@/views/sign/Index.vue'),
      children: [
        {
          path: '',
          meta: {
            whitelist: true,
            breadcrumb: '登录',
            i18n: 'common:menu.sign-in'
          },
          component: () => import('@/views/sign/sign-in/Index.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404/Index.vue')
    }
  ]
})

export default router
