<template>
  <el-tooltip :content="$t('common:table.refresh')" placement="top">
    <el-icon size="18" class="cursor-pointer" @click="refresh">
      <RefreshRight />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useApiStore } from '../stores/useApiStore'

const { service } = useApiStore()!

const refresh = () => {
  if (!service.loading.value) {
    service.refetch()
  }
}
</script>
