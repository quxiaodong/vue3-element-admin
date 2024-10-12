<template>
  <div ref="dom" class="p-4 rounded page-container">
    <tool-bar>
      <slot name="toolbar" />
    </tool-bar>
    <div v-loading="service.loading.value">
      <Table />
      <Pagination />
    </div>
  </div>
</template>

<script setup lang="ts" generic="P extends Params, I extends Item">
import { useTemplateRef } from 'vue'
import { Item, Params, Props } from './index'
import Pagination from './pagination/Index.vue'
import { useProvideApiStore } from './stores/useApiStore'
import { useProvideColumnStore } from './stores/useColumnStore'
import { useProvideFullscreenStore } from './stores/useFullscreenStore'
import { useProvidePropsStore } from './stores/usePropsStore'
import { useProvideSizeStore } from './stores/useSizeStore'
import { useProvideStripeStore } from './stores/useStripeStore'
import Table from './table/Index.vue'
import ToolBar from './toolbar/Index.vue'

const props = defineProps<Props<P, I>>()

const params = defineModel<P>('params', { required: true })

const service = props.service
const columns = props.columns

const dom = useTemplateRef<HTMLDivElement>('dom')

useProvideApiStore(service, params)
useProvideColumnStore(columns)
useProvideFullscreenStore(dom)
useProvidePropsStore(props)
useProvideStripeStore()
useProvideSizeStore()
</script>
