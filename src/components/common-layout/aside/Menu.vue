<template>
  <el-menu
    router
    :collapse
    :collapse-transition="false"
    :default-active="route.path"
    class="!border-r-0 select-none"
    @select="select"
  >
    <template v-for="menu in userStore.menus" :key="menu.path">
      <SubMenu :menu :prefix="''" />
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { useCollapseStore } from '@/stores/collapse'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SubMenu from './SubMenu.vue'

const route = useRoute()
const userStore = useUserStore()
const screenSize = useScreenSize()
const collapseStore = useCollapseStore()

const collapse = computed(() =>
  screenSize.isMobile.value ? false : collapseStore.collapse
)

const select = () => {
  if (screenSize.isMobile.value) {
    collapseStore.toggleCollapse()
  }
}
</script>

<style scoped>
:global(.el-menu) {
  --el-menu-item-height: 40px;
  --el-menu-sub-item-height: 40px;
}
</style>
