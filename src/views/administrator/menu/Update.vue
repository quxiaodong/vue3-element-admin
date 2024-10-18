<template>
  <div>
    <el-link type="primary" :underline="false" @click="click">
      {{ $t('common.edit') }}
    </el-link>
    <common-dialog v-model="show" :title="$t('common.edit')">
      <Form v-model="model" :loading @submit="submit" />
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  detailMenu,
  SearchMenuOutput,
  updateMenu,
  UpdateMenuInput
} from '@/apis/administrator/menu'
import { ref } from 'vue'
import Form from './Form.vue'

type Props = {
  row: SearchMenuOutput
}

type Emits = {
  (e: 'refetch'): void
}

const { row } = defineProps<Props>()

const emits = defineEmits<Emits>()

const model = ref<UpdateMenuInput>({})

const show = ref(false)

const { execute, loading } = updateMenu(row.id)

const click = () => {
  show.value = true
  model.value = { ...row }

  detailMenu(row.id).execute()
}

const submit = () =>
  execute(model.value).then(() => {
    show.value = false
    emits('refetch')
  })
</script>
