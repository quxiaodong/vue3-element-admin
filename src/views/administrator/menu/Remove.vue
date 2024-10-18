<template>
  <el-popconfirm
    width="auto"
    placement="top"
    :confirm-button-text="$t('common.confirm')"
    :cancel-button-text="$t('common.cancel')"
    :title="$t('common.confirm-remove?')"
    :disabled="loading"
    @confirm="confirm"
  >
    <template #reference>
      <el-link type="primary" :underline="false" :disabled="loading">
        {{ $t('common.remove') }}
        <el-icon v-if="loading" class="is-loading">
          <Loading />
        </el-icon>
      </el-link>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { removeMenu, SearchMenuOutput } from '@/apis/administrator/menu'

type Props = {
  row: SearchMenuOutput
}

type Emits = {
  (e: 'refresh'): void
}

const { row } = defineProps<Props>()

const emits = defineEmits<Emits>()

const { execute, loading } = removeMenu(row.id)

const confirm = () => execute().then(() => emits('refresh'))
</script>
