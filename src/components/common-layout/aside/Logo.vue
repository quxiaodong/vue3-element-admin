<template>
  <div
    class="h-14 relative z-10 flex items-center justify-center cursor-pointer shadow-[0_4px_10px_0px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0px_0px_#36363a]"
    @click="click"
  >
    <img :src class="h-8" />
  </div>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import smallLogo from '@/images/element-plus-logo-small.svg'
import largeLogo from '@/images/element-plus-logo.svg'
import { useCollapseStore } from '@/stores/collapse'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const screenSize = useScreenSize()
const collapseStore = useCollapseStore()

const src = computed(() => (collapseStore.collapse ? smallLogo : largeLogo))

const click = () => {
  if (screenSize.isMobile.value) {
    collapseStore.toggleCollapse()
  }
  router.push('/')
}
</script>
