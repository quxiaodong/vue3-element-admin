<template>
  <el-drawer
    v-model="show"
    :show-close="false"
    :with-header="false"
    direction="ltr"
    size="208px"
    style="--el-drawer-padding-primary: 0"
    @open="collapseStore.toggleCollapse(false)"
    @close="collapseStore.toggleCollapse(true)"
  >
    <slot />
  </el-drawer>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { useCollapseStore } from '@/stores/collapse'
import { ref, watch } from 'vue'

const screenSize = useScreenSize()
const collapseStore = useCollapseStore()

const show = ref(false)

watch([screenSize.isMobile, collapseStore], ([isMobile, store]) => {
  show.value = isMobile && !store.collapse
})
</script>
