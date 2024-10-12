<template>
  <el-table
    :data="props.data"
    :size
    :stripe
    border
    header-cell-class-name="!bg-gray-50 dark:!bg-[#1d1e1f]"
    v-bind="props.tableProps"
  >
    <el-table-column
      v-for="column in result"
      :key="column.prop"
      v-bind="column"
      :label="$t(column.i18n || '', column.label || '')"
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
import { useColumnStore } from '../stores/useColumnStore'
import { usePropsStore } from '../stores/usePropsStore'
import { useSizeStore } from '../stores/useSizeStore'
import { useStripeStore } from '../stores/useStripeStore'

const { result } = useColumnStore()!
const { props } = usePropsStore()!
const { stripe } = useStripeStore()!
const { size } = useSizeStore()!
</script>
