<template>
  <el-popconfirm
    width="auto"
    placement="top"
    title="确定要删除吗？"
    :disabled="loading"
    @confirm="confirm"
  >
    <template #reference>
      <el-link type="primary" :underline="false" :disabled="loading">
        删除
        <el-icon v-if="loading" class="is-loading">
          <Loading />
        </el-icon>
      </el-link>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { Service } from '@/utils/service'

type Props = {
  service: Service<undefined, unknown>
}

type Emits = {
  (e: 'refresh'): void
}

const { service } = defineProps<Props>()
const { execute, loading } = service

const emits = defineEmits<Emits>()

const confirm = () => execute().then(() => emits('refresh'))
</script>
