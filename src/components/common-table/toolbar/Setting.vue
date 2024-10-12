<template>
  <el-popover trigger="click" width="200">
    <template #reference>
      <div class="text-[0px]">
        <el-tooltip :content="$t('common:table.setting')" placement="top">
          <el-icon size="18" class="cursor-pointer">
            <Setting />
          </el-icon>
        </el-tooltip>
      </div>
    </template>
    <div class="flex items-center justify-between">
      <el-checkbox
        :model-value="isAll"
        :indeterminate="indeterminate"
        @change="selectAll!"
      >
        <el-text>{{ $t('common:table.col-show/sort') }}</el-text>
      </el-checkbox>
      <el-link type="primary" :underline="false" @click="reset">
        {{ $t('common.reset') }}
      </el-link>
    </div>
    <div class="max-h-80 overflow-y-auto">
      <el-checkbox-group ref="dom" :model-value="selected" @change="select!">
        <div
          v-for="column in columns"
          :key="column.prop"
          class="flex items-center"
        >
          <el-icon size="16" class="mr-2 cursor-move">
            <Rank />
          </el-icon>
          <el-checkbox :value="column.prop" :disabled="column.alwaysShow">
            <el-text truncated>
              {{ $t(column.i18n || '', column.label || '') }}
            </el-text>
          </el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { useTemplateRef } from 'vue'
import { useColumnStore } from '../stores/useColumnStore'

const { columns, selected, isAll, indeterminate, select, selectAll, reset } =
  useColumnStore()!

const dom = useTemplateRef<HTMLDivElement>('dom')

useSortable(dom, columns, {
  handle: '.cursor-move',
  animation: 150
})
</script>

<style scoped>
:deep(.el-checkbox__label) {
  @apply overflow-hidden;
}
</style>
