<template>
  <div class="placeholder" @click="collapseStore.toggleCollapse()">
    <el-text>
      <el-icon :size="20">
        <component :is="component" />
      </el-icon>
    </el-text>
  </div>
</template>

<script setup lang="ts">
import { useCollapseStore } from '@/stores/collapse'
import { computed } from 'vue'

const collapseStore = useCollapseStore()

const component = computed(() => (collapseStore.collapse ? 'Expand' : 'Fold'))
</script>
