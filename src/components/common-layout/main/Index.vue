<template>
  <div class="h-full flex flex-col">
    <Breadcrumb class="p-4" />
    <div class="grow overflow-hidden">
      <el-scrollbar>
        <div class="p-4 pt-0">
          <router-view />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './Breadcrumb.vue'
</script>
