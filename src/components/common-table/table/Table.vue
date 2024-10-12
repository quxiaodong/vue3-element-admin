<template>
  <el-table
    :data="props.data"
    :size
    :stripe
    :style
    border
    v-bind="props.tableProps"
  >
    <el-table-column
      v-for="column in result"
      :key="column.prop"
      v-bind="column"
      :label="column.i18n ? $t(column.i18n) : column.label"
    >
      <template v-if="column.headerSlot" #header="scope">
        <template v-for="(vnode, _) in column.headerSlot(scope)" :key="_">
          <component :is="vnode" />
        </template>
      </template>
      <template v-if="column.defaultSlot" #default="scope">
        <template v-if="scope.$index !== -1">
          <template v-for="(vnode, _) in column.defaultSlot(scope)" :key="_">
            <component :is="vnode" />
          </template>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { isDark } from '@/components/common-dark/stores'
import { computed } from 'vue'
import { useColumnStore } from '../stores/column'
import { usePropsStore } from '../stores/props'
import { useSizeStore } from '../stores/size'
import { useStripeStore } from '../stores/stripe'

const { result } = useColumnStore()!
const { props } = usePropsStore()!
const { stripe } = useStripeStore()!
const { size } = useSizeStore()!

const style = computed(() =>
  isDark.value
    ? {
        '--el-table-header-bg-color': 'unset',
        '--el-table-tr-bg-color': 'unset',
        '--el-fill-color-lighter': '#202121' // 斑马纹
      }
    : {}
)
</script>
