<template>
  <el-form ref="dom" :model :rules label-width="auto">
    <el-form-item prop="name" :label="$t('/administrator/menu.name')">
      <el-input v-model="model.name" :placeholder="$t('common.please-input')" />
    </el-form-item>
    <el-form-item prop="path" :label="$t('/administrator/menu.path')">
      <el-input v-model="model.path" :placeholder="$t('common.please-input')" />
    </el-form-item>
    <el-form-item prop="status" :label="$t('/administrator/menu.status')">
      <el-select
        v-model="model.status"
        :placeholder="$t('common.please-select')"
      >
        <el-option :value="0" :label="$t('common.enable')" />
        <el-option :value="1" :label="$t('common.disable')" />
      </el-select>
    </el-form-item>
    <div class="text-right">
      <el-button type="primary" :loading @click="verify">
        {{ $t('common.submit') }}
      </el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { CreateMenuInput, UpdateMenuInput } from '@/apis/administrator/menu'
import { i18n } from '@/utils/i18n'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, useTemplateRef } from 'vue'

type Props = {
  loading: boolean
}

type Emits = {
  (e: 'submit'): void
}

type Model = CreateMenuInput | UpdateMenuInput

const { loading } = defineProps<Props>()

const emits = defineEmits<Emits>()

const dom = useTemplateRef<FormInstance>('dom')
const model = defineModel<Model>({ required: true })
const rules = reactive<FormRules<Model>>({
  name: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' }
  ],
  path: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' }
  ],
  status: [
    { required: true, message: i18n.t('common.please-select'), trigger: 'blur' }
  ]
})

const verify = () => {
  if (!dom.value) return
  dom.value.validate().then(() => emits('submit'))
}
</script>
