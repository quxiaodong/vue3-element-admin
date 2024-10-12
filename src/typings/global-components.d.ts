import CommonColorSchema from '@/components/common-color-schema/Index.vue'
import CommonDialog from '@/components/common-dialog/Index.vue'
import CommonLocale from '@/components/common-locale/Index.vue'
import CommonSearch from '@/components/common-search/Index.vue'
import CommonTable from '@/components/common-table/Index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonColorSchema: typeof CommonColorSchema
    CommonLocale: typeof CommonLocale
    CommonDialog: typeof CommonDialog
    CommonSearch: typeof CommonSearch
    CommonTable: typeof CommonTable
  }
}
