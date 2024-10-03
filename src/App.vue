<template>
  <el-config-provider :locale>
    <el-watermark :content :font :z-index="9999">
      <router-view />
    </el-watermark>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useColorSchemaStore } from '@/stores/color-schema'
import { useLocaleStore } from '@/stores/locale'
import { WatermarkFontType } from 'element-plus'
import * as locales from 'element-plus/es/locale/index.mjs'
import { computed, ComputedRef } from 'vue'

const localeStore = useLocaleStore()
const colorSchemaStore = useColorSchemaStore()

const content = ['development', 'mock'].includes(import.meta.env.MODE)
  ? '内容仅供测试和展示'
  : ''

const locale = computed(
  () => locales[localeStore.locale?.code as keyof typeof locales]
)

const font: ComputedRef<WatermarkFontType> = computed(() => ({
  fontSize: 16,
  color: colorSchemaStore.isDark
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'
}))
</script>
