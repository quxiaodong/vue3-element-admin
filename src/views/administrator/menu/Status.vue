<template>
  <el-switch
    :loading
    :model-value="row.status"
    :active-value="0"
    :inactive-value="1"
    :active-text="$t('common.enable')"
    :inactive-text="$t('common.disable')"
    inline-prompt
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    @change="change"
  />
</template>

<script setup lang="ts">
import { SearchMenuOutput, updateMenu } from '@/apis/administrator/menu'

type Props = {
  row: SearchMenuOutput
}

type Emits = {
  (e: 'refresh'): void
}

const { row } = defineProps<Props>()

const emits = defineEmits<Emits>()

const { execute, loading } = updateMenu(row.id)

const change = () =>
  execute({ status: row.status ^ 1 }).then(() => emits('refresh'))
</script>
