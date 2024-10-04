<template>
  <div>
    <Toggle class="item" />
  </div>
  <div class="flex">
    <common-color-schema class="item" />
    <common-locale class="item" />
    <User class="item" />
  </div>
</template>

<script setup lang="ts">
import Toggle from './Toggle.vue'
import User from './User.vue'
</script>

<style scoped>
.item.placeholder,
.item :deep(.placeholder) {
  @apply px-3 h-14 flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1d1e1f];
}
</style>
