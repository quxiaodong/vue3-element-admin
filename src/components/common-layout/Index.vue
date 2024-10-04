<template>
  <el-container class="w-screen h-screen">
    <el-aside :width class="transition-all duration-300">
      <Aside />
    </el-aside>
    <el-container>
      <el-header
        height="56px"
        class="!p-0 flex items-center justify-between z-10 shadow-[0_4px_10px_0px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0px_0px_#36363a]"
      >
        <Header />
      </el-header>
      <el-main class="!p-0 page-bg">
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { useCollapseStore } from '@/stores/collapse'
import { computed, watchEffect } from 'vue'
import Aside from './aside/Index.vue'
import Header from './header/Index.vue'
import Main from './main/Index.vue'

const screenSize = useScreenSize()
const collapseStore = useCollapseStore()

watchEffect(() => {
  collapseStore.collapse = screenSize.isMobile.value
})

const width = computed(() => {
  if (screenSize.isMobile.value) return '0px'
  return collapseStore.collapse ? '64px' : '208px'
})
</script>
