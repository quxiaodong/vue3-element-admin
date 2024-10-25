import CommonColorSchema from '@/components/common-color-schema/Index.vue'
import CommonLocale from '@/components/common-locale/Index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonColorSchema: typeof CommonColorSchema
    CommonLocale: typeof CommonLocale
  }
}
