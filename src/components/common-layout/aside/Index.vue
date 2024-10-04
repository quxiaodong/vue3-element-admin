<template>
  <component :is="component">
    <div class="h-screen relative z-20 page-container">
      <Logo />
      <div style="height: calc(100vh - 56px)">
        <el-scrollbar>
          <Menu />
        </el-scrollbar>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { useScreenSize } from '@/hooks/useScreenSize'
import { computed, defineComponent, h } from 'vue'
import Drawer from './Drawer.vue'
import Logo from './Logo.vue'
import Menu from './Menu.vue'

const Slider = defineComponent({
  setup(_, { slots }) {
    return () => h('div', null, slots)
  }
})

const screenSize = useScreenSize()

const component = computed(() => (screenSize.isMobile.value ? Drawer : Slider))
</script>
