<template>
  <el-form-item label="暗黑模式">
    <el-select :model-value="mode?.code" @change="toggleMode">
      <el-option
        v-for="{ code, i18n, icon } in modes"
        :key="code"
        :value="code"
        @click="clickItem"
      >
        <div class="flex items-center">
          <el-icon class="mr-1">
            <component :is="icon" />
          </el-icon>
          {{ $t(i18n || '') }}
        </div>
      </el-option>
      <template #label>
        <div class="flex items-center">
          <el-icon class="mr-1">
            <component :is="mode?.icon" />
          </el-icon>
          {{ $t(mode?.i18n || '') }}
        </div>
      </template>
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import {
  clickItem,
  mode,
  modes,
  toggleMode
} from '@/components/common-dark/stores'
</script>
