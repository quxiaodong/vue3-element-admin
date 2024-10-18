import { RouteRecordRaw } from 'vue-router'

const administrator: RouteRecordRaw = {
  path: '/administrator',
  meta: {
    icon: 'User',
    breadcrumb: '系统管理',
    i18n: 'common:menu.administrator'
  },
  component: () => import('@/components/common-layout/Index.vue'),
  children: [
    {
      path: 'menu',
      meta: {
        breadcrumb: '菜单列表',
        i18n: 'common:menu.administrator-menu'
      },
      component: () => import('@/views/administrator/menu/Index.vue')
    }
  ]
}

export default administrator
