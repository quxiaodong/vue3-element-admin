import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumb: string
    i18n?: string
    icon?: string
    hideInMenu?: boolean
    whitelist?: boolean
  }
}
