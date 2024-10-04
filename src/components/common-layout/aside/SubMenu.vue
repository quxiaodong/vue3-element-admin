<template>
  <el-sub-menu v-if="children && children.length && !meta?.hideInMenu" :index>
    <template #title>
      <el-icon v-if="meta?.icon">
        <component :is="meta.icon" />
      </el-icon>
      <span>{{ meta?.stem ? $t(meta.stem) : meta?.breadcrumb }}</span>
    </template>
    <template v-for="item in children" :key="item.path">
      <SubMenu :menu="item" :prefix="index" />
    </template>
  </el-sub-menu>
  <el-menu-item v-else-if="!meta?.hideInMenu" :index>
    <el-icon v-if="meta?.icon">
      <component :is="meta.icon" />
    </el-icon>
    {{ meta?.stem ? $t(meta.stem) : meta?.breadcrumb }}
  </el-menu-item>
</template>

<script setup lang="ts" name="SubMenu">
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'

type Props = {
  prefix?: string
  menu: RouteRecordRaw
}

const { prefix, menu } = defineProps<Props>()
const { path, meta, children } = menu

const index = computed(() =>
  prefix ? prefix + (path ? '/' + path : '') : path
)
</script>
