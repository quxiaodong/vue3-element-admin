<template>
  <div>
    <common-search
      v-model:model="searchModel"
      v-model:params="searchParams"
      :service="searchService"
      :init-value
    >
      <el-form-item label="按钮名称">
        <el-input v-model="searchModel.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="按钮代码">
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
        <Create @refresh="searchService.refresh" />
      </template>
    </common-table>
  </div>
</template>

<script setup lang="ts">
import { searchButton, SearchButtonInput } from '@/apis/administrator/button'
import type { Props } from '@/components/common-table'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useTableColumns } from './columns'
import Create from './Create.vue'

const initValue = (): SearchButtonInput => ({
  pageNo: 1,
  pageSize: 10
})

const searchModel = ref(initValue())

const searchService = searchButton()
const searchParams = ref(initValue())

const data = computed(() =>
  (searchService.result.value?.data ?? []).map(v => {
    v.createAt = dayjs(v.createAt).format('YYYY-MM-DD HH:mm:ss')
    return v
  })
)

const columns = useTableColumns(searchService)

const tableProps: Props['tableProps'] = {
  'onFilter-change': (data: SearchButtonInput) => {
    searchParams.value = {
      ...searchModel.value,
      ...data,
      pageNo: 1,
      pageSize: searchParams.value.pageSize
    }
    searchService.execute(searchParams.value)
  }
}

searchService.execute(searchParams.value)
</script>
