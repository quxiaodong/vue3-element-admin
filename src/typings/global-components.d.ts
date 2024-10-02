import CommonColorSchema from '@/components/common-color-schema/Index.vue'
import CommonDialog from '@/components/common-dialog/Index.vue'
import CommonLocale from '@/components/common-locale/Index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonColorSchema: typeof CommonColorSchema
    CommonLocale: typeof CommonLocale
    CommonDialog: typeof CommonDialog
  }
}
