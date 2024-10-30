import CommonColorSchema from '@/components/common-color-schema/Index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonColorSchema: typeof CommonColorSchema
  }
}
