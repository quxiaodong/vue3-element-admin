<template>
  <span @click="click">{{ $t('common:layout.change-password') }}</span>
  <common-dialog v-model="show" :title="$t('common:layout.change-password')">
    <el-form ref="dom" :model :rules label-width="auto">
      <el-form-item
        prop="password"
        :label="$t('common:layout.current-password')"
      >
        <el-input
          v-model="model.password"
          show-password
          :placeholder="$t('common.please-input')"
        />
      </el-form-item>
      <el-form-item prop="password1" :label="$t('common:layout.new-password')">
        <el-input
          v-model="model.password1"
          show-password
          :placeholder="$t('common.please-input')"
        />
      </el-form-item>
      <el-form-item
        prop="password2"
        :label="$t('common:layout.confirm-password')"
      >
        <el-input
          v-model="model.password2"
          show-password
          :placeholder="$t('common.please-input')"
        />
      </el-form-item>
      <div class="text-right">
        <el-button :loading type="primary" @click="verify">
          {{ $t('common.submit') }}
        </el-button>
      </div>
    </el-form>
  </common-dialog>
</template>

<script setup lang="ts">
import { updateUserPassword, UserPasswordInput } from '@/apis/iam'
import { i18n } from '@/utils/i18n'
import { removeToken } from '@/utils/storage'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

const DEFAULT_VALUE: UserPasswordInput = {
  password: '',
  password1: '',
  password2: ''
}

const router = useRouter()

const dom = useTemplateRef<FormInstance>('dom')
const model = ref<UserPasswordInput>(DEFAULT_VALUE)
const rules = computed<FormRules<UserPasswordInput>>(() => ({
  password: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' }
  ],
  password1: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' },
    {
      validator: (_, value: string, callback) => {
        if (value.length < 6 || value.length > 32) {
          callback(
            i18n.t('common:validate.password-length', { min: 6, max: 32 })
          )
        }
        if (!/^[A-Za-z0-9!@#$%^&*]{6,32}$/.test(value)) {
          callback(
            i18n.t('common:validate.password-regex', { characters: '!@#$%^&*' })
          )
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  password2: [
    { required: true, message: i18n.t('common.please-input'), trigger: 'blur' },
    {
      validator: (_, value: string, callback) => {
        if (model.value.password1 !== value) {
          callback(i18n.t('common:validate.password2-not-equal'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
}))

const show = ref(false)
const { execute, loading } = updateUserPassword()

const click = () => {
  show.value = true
  model.value = { ...DEFAULT_VALUE }
}

const verify = () => {
  if (!dom.value) return
  dom.value.validate().then(submit)
}

const submit = () => {
  execute(model.value).then(() => {
    show.value = false
    ElMessage.success(i18n.t('common:layout.change-password.success'))
    removeToken()
    router.push('/sign-in')
  })
}
</script>
