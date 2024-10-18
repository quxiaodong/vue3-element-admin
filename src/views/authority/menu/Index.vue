<template>
  <div>
    <common-search
      v-model:model="searchModel"
      v-model:params="searchParams"
      :service="searchService"
      :init-value
    >
      <el-form-item :label="$t('/authority/menu.name')">
        <el-input
          v-model="searchModel.name"
          :placeholder="$t('common.please-input')"
        />
      </el-form-item>
      <el-form-item :label="$t('/authority/menu.path')">
        <el-input
          v-model="searchModel.path"
          :placeholder="$t('common.please-input')"
        />
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
import {
  SearchMenuInput,
  SearchMenuOutput,
  searchMenu
} from '@/apis/authority/menu'
import type { Props } from '@/components/common-table'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useTableColumns } from './columns'
import Create from './Create.vue'

const initValue: () => SearchMenuInput = () => ({
  pageNo: 1,
  pageSize: 10
})

const searchModel = ref(initValue())

const searchService = searchMenu()
const searchParams = ref(initValue())

const data = computed(() =>
  (searchService.result.value?.data ?? []).map(v => {
    v.createAt = dayjs(v.createAt).format('YYYY-MM-DD HH:mm:ss')
    return v
  })
)

const columns = useTableColumns(searchService)

const tableProps: Props['tableProps'] = {
  'onSelection-change': (data: SearchMenuOutput[]) => {
    console.log(data)
  }
}

searchService.execute(searchParams.value)
</script>
