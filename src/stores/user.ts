import { searchUser, UserInfoOutput } from '@/apis/user'
import routes from '@/router/routes'
import { useLocaleStore } from '@/stores/locale'
import { getLanguage } from '@/utils/storage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'

type Menus = NonNullable<UserInfoOutput['role']>['menus']

/**
 * 生成用户路由列表
 * @param prefix 父级路由path
 * @param route 本地路由表
 * @param menus 后端返回的菜单列表
 * @returns 过滤后的本地路由表
 */
function generateRoutes(prefix: string, route: RouteRecordRaw, menus: Menus) {
  const path = prefix
    ? prefix + (route.path ? '/' + route.path : '')
    : route.path

  // 从后端返回中查找是否有当前路由
  const menu = menus.find(menu => menu.path === path)
  if (menu) {
    const { name, icon } = menu
    // 更新菜单名称
    if (name && route.meta) {
      route.meta.breadcrumb = name
    }
    // 更新菜单图标
    if (icon && route.meta) {
      route.meta.icon = icon
    }
    // 如果有子菜单，递归查找
    if (route.children) {
      route.children = route.children.filter(v =>
        generateRoutes(path, v, menus)
      )
    }
    return route
  }
}

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const user = ref<UserInfoOutput>()

  // 菜单权限
  const menus = computed(() =>
    [...routes].filter(route =>
      generateRoutes('', route, user.value?.role?.menus || [])
    )
  )

  // 按钮权限
  const buttons = computed(() => user.value?.role?.buttons || [])

  /**
   * 获取用户信息
   * @returns
   */
  const fetchUser = () => {
    const localeStore = useLocaleStore()
    const { execute } = searchUser()
    return execute().then(({ data }) => {
      // 用户信息
      user.value = data

      const code = data.region?.code
      // 如果本地没有存储语言，并且用户地区跟当前语言不匹配
      if (!getLanguage() && code && code !== localeStore.locale?.code) {
        // 切换当前语言
        localeStore.toggleLocale(code, false)
      }

      return data
    })
  }

  /**
   * 清除用户信息
   * @returns
   */
  const clearUser = () => (user.value = undefined)

  return { user, menus, buttons, fetchUser, clearUser }
})
