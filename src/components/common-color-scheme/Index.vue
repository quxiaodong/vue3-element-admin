<template>
  <el-dropdown @command="toggleMode">
    <div class="placeholder">
      <slot>
        <el-text class="!text-xl">{{ mode?.icon }}</el-text>
      </slot>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="{ code, i18n, icon } in modes"
          :key="code"
          :command="code"
          :class="{ 'dropdown-item-active': code === mode?.code }"
          @click="clickItem"
        >
          <el-text size="large" class="!mr-1">{{ icon }}</el-text>
          <el-text>{{ $t(i18n) }}</el-text>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useColorSchemaStore } from '@/stores/color-schema'
import { storeToRefs } from 'pinia'

const colorSchemaStore = useColorSchemaStore()

const { mode } = storeToRefs(colorSchemaStore)
const { modes, toggleMode, clickItem } = colorSchemaStore
</script>
