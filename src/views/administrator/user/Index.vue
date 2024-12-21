<template>
  <div>
    <common-search
      v-model:model="searchModel"
      v-model:params="searchParams"
      :service="searchService"
      :init-value
    >
      <el-form-item label="登录账号">
        <el-input v-model="searchModel.username" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="searchModel.nickname" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="searchModel.phone" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="邮箱地址">
        <el-input v-model="searchModel.email" placeholder="请输入" />
      </el-form-item>
    </common-search>
    <common-table
      v-model:params="searchParams"
      :data
      :columns
      :service="searchService"
      :table-props="tableProps"
    >
      <template #toolbar>
        <el-button
          v-acl="[Permission.Create]"
          type="primary"
          icon="Plus"
          tag="a"
          href="/#/administrator/user/create"
        >
          新建
        </el-button>
      </template>
    </common-table>
  </div>
</template>

<script setup lang="ts">
import { searchUser, SearchUserInput } from '@/apis/administrator/user'
import type { Props } from '@/components/common-table'
import { getUrlParams, setUrlParams } from '@/utils/url-params'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
import { useTableColumns } from './columns'
import { Permission } from './permission'

const initValue = (): SearchUserInput => ({
  pageNo: 1,
  pageSize: 10
})

const initDefault = (): SearchUserInput => ({
  ...initValue(),
  ...getUrlParams([
    { key: 'pageNo', type: 'Number', transform: Number },
    { key: 'pageSize', type: 'Number', transform: Number },
    { key: 'username', type: 'String' },
    { key: 'nickname', type: 'String' },
    { key: 'phone', type: 'String' },
    { key: 'email', type: 'String' },
    { key: 'status', type: 'Array', transform: v => v.map(Number) }
  ])
})

const searchModel = ref(initDefault())

const searchService = searchUser()
const searchParams = ref(initDefault())

const data = computed(() =>
  (searchService.result.value?.data ?? []).map(v => {
    v.createAt = dayjs(v.createAt).format('YYYY-MM-DD HH:mm:ss')
    return v
  })
)

const columns = useTableColumns(searchService)

const tableProps: Props['tableProps'] = {
  'onFilter-change': (data: SearchUserInput) => {
    searchParams.value = {
      ...searchModel.value,
      ...data,
      pageNo: 1,
      pageSize: searchParams.value.pageSize
    }
    searchService.execute(searchParams.value)
  }
}

watch(searchParams, () => setUrlParams(searchParams.value), { deep: true })

searchService.execute(searchParams.value)
</script>
