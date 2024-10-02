import { searchUserInfo, UserInfoOutput } from '@/apis/iam'
import { locale, toggleLocale } from '@/components/common-locale/stores'
import routes from '@/router/routes'
import config from '@/utils/config'
import { getSetting } from '@/utils/storage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'

type Menus = NonNullable<UserInfoOutput['role']>['menus']
type Buttons = NonNullable<UserInfoOutput['role']>['buttons']

/**
 * 生成用户路由列表
 * @param prefix 父级路由path
 * @param route 本地路由表
 * @param menus 后端返回的菜单列表
 * @param buttons 后端返回的按钮列表
 * @returns 过滤后的本地路由表
 */
function generateRoutes(
  prefix: string,
  route: RouteRecordRaw,
  menus: Menus,
  buttons: Buttons
) {
  const path = prefix
    ? prefix + (route.path ? '/' + route.path : '')
    : route.path

  // 从后端返回中查找是否有当前路由
  const menu = menus.find(menu => menu.path === path)
  let can = false
  if (route.meta?.permissions) {
    can = buttons.some(button => route.meta?.permissions?.includes(button.code))
  }
  if (!menu && !can) return
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
  }
  // 如果有子菜单，递归查找
  if (route.children) {
    route.children = route.children.filter(v =>
      generateRoutes(path, v, menus, buttons)
    )
  }
  return route
}

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const user = ref<UserInfoOutput>()

  // 菜单权限
  const menus = computed(() =>
    user.value?.username === config.superadmin
      ? routes
      : [...routes].filter(route =>
          generateRoutes(
            '',
            route,
            user.value?.role?.menus || [],
            user.value?.role?.buttons || []
          )
        )
  )

  // 按钮权限
  const buttons = computed(() => user.value?.role?.buttons || [])

  /**
   * 获取用户信息
   * @returns
   */
  const fetchUser = () => {
    const { execute } = searchUserInfo()
    return execute().then(({ data }) => {
      // 用户信息
      user.value = data

      const code = data.locale?.code
      // 如果本地没有存储语言，并且用户地区跟当前语言不匹配
      if (!getSetting('language') && code && code !== locale.value?.code) {
        // 切换当前语言
        toggleLocale(code, false)
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
