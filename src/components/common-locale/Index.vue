<template>
  <el-dropdown @command="toggleLocale">
    <div class="placeholder">
      <slot>
        <el-text>
          <svg
            viewBox="0 0 24 24"
            width="1.4em"
            height="1.4em"
            fill="currentColor"
          >
            <path
              d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
            />
          </svg>
        </el-text>
      </slot>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="{ code, name, icon } in locales"
          :key="code"
          :command="code"
          :class="{ 'dropdown-item-active': code === locale?.code }"
        >
          <el-text size="large" class="!mr-1">{{ icon }}</el-text>
          <el-text>{{ name }}</el-text>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale'
import { storeToRefs } from 'pinia'

const localeStore = useLocaleStore()

const { locale, locales } = storeToRefs(localeStore)
const { toggleLocale } = localeStore
</script>
