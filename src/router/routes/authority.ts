import { RouteRecordRaw } from 'vue-router'

const authority: RouteRecordRaw = {
  path: '/authority',
  meta: {
    icon: 'User',
    breadcrumb: '权限管理',
    i18n: 'common:menu.authority'
  },
  component: () => import('@/components/common-layout/Index.vue'),
  children: [
    {
      path: 'menu',
      meta: {
        breadcrumb: '菜单列表',
        i18n: 'common:menu.authority-menu'
      },
      component: () => import('@/views/authority/menu/Index.vue')
    }
  ]
}

export default authority
