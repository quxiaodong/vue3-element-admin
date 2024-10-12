<template>
  <el-dropdown trigger="click" @command="change">
    <div class="text-[0px]">
      <el-tooltip :content="$t('common:table.size')" placement="top">
        <el-icon size="18" class="cursor-pointer">
          <Grid />
        </el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="{ command } in sizes"
          :key="command"
          :command
          :class="{ 'dropdown-item-active': size === command }"
        >
          {{ $t('common:table.size.' + command) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useSizeStore } from '../stores/size'

const { size, sizes, change } = useSizeStore()!
</script>
