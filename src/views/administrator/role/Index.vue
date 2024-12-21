<template>
  <div>
    <common-search
      v-model:model="searchModel"
      v-model:params="searchParams"
      :service="searchService"
      :init-value
    >
      <el-form-item label="角色名称">
        <el-input v-model="searchModel.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="角色代码">
        <el-input v-model="searchModel.code" placeholder="请输入" />
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
          href="/#/administrator/role/create"
        >
          新建
        </el-button>
      </template>
    </common-table>
  </div>
</template>

<script setup lang="ts">
import { searchRole, SearchRoleInput } from '@/apis/administrator/role'
import type { Props } from '@/components/common-table'
import { getUrlParams, setUrlParams } from '@/utils/url-params'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
import { useTableColumns } from './columns'
import { Permission } from './permission'

const initValue = (): SearchRoleInput => ({
  pageNo: 1,
  pageSize: 10
})

const initDefault = (): SearchRoleInput => ({
  ...initValue(),
  ...getUrlParams([
    { key: 'pageNo', type: 'Number', transform: Number },
    { key: 'pageSize', type: 'Number', transform: Number },
    { key: 'name', type: 'String' },
    { key: 'code', type: 'String' },
    { key: 'status', type: 'Array', transform: v => v.map(Number) }
  ])
})

const searchModel = ref(initDefault())

const searchService = searchRole()
const searchParams = ref(initDefault())

const data = computed(() =>
  (searchService.result.value?.data ?? []).map(v => {
    v.createAt = dayjs(v.createAt).format('YYYY-MM-DD HH:mm:ss')
    return v
  })
)

const columns = useTableColumns(searchService)

const tableProps: Props['tableProps'] = {
  'onFilter-change': (data: SearchRoleInput) => {
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
