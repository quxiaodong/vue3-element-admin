<template>
  <el-empty :image description="抱歉，您访问的页面不存在" class="h-screen">
    <el-button type="primary" tag="a" href="/#/">返回首页</el-button>
  </el-empty>
</template>

<script setup lang="ts">
import image from '@/images/404.svg'
</script>
