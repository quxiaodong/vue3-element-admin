<template>
  <div>
    <el-button type="primary" icon="Plus" @click="click">
      {{ $t('common.create') }}
    </el-button>
    <common-dialog v-model="show" :title="$t('common.create')">
      <Form v-model="model" :loading @submit="submit" />
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import { createMenu, CreateMenuInput } from '@/apis/authority/menu'
import { ref } from 'vue'
import Form from './Form.vue'

type Emits = {
  (e: 'refresh'): void
}

const emits = defineEmits<Emits>()

const initValue: () => CreateMenuInput = () => ({
  name: '',
  path: '',
  status: 0
})

const model = ref<CreateMenuInput>(initValue())

const show = ref(false)

const { execute, loading } = createMenu()

const click = () => {
  show.value = true
  model.value = initValue()
}

const submit = () =>
  execute(model.value).then(() => {
    show.value = false
    emits('refresh')
  })
</script>
