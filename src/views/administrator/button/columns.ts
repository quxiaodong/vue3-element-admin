import {
  removeButton,
  SearchButtonInput,
  SearchButtonOutput,
  updateButton
} from '@/apis/administrator/button'
import Remove from '@/components/common-crud/Remove.vue'
import Status from '@/components/common-crud/Status.vue'
import type { Column } from '@/components/common-table'
import { useAcl } from '@/hooks/useAcl'
import { Service } from '@/utils/service'
import { ElDivider, ElSpace } from 'element-plus'
import { h, VNode } from 'vue'
import { Permission } from './permission'
import Update from './Update.vue'

type Columns = Column<SearchButtonOutput>[]

type UseTableColumns = (
  searchService: Service<SearchButtonInput, SearchButtonOutput[]>
) => Columns

export const useTableColumns: UseTableColumns = searchService => {
  const spacer = h(ElDivider, { direction: 'vertical' })

  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])

  const columns: Columns = [
    {
      prop: 'id',
      label: '按钮编号',
      defaultHide: true
    },
    {
      prop: 'name',
      label: '按钮名称',
      alwaysShow: true
    },
    {
      prop: 'code',
      label: '按钮代码'
    },
    {
      prop: 'menu',
      label: '所属菜单',
      defaultSlot: ({ row }) => [h('div', row.menu.path)]
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '按钮状态',
      columnKey: 'status',
      filters: [
        { text: '启用', value: '0' },
        { text: '禁用', value: '1' }
      ],
      defaultSlot: ({ row }) => {
        const service = updateButton(row.id)
        return [
          h(Status, {
            service,
            status: row.status,
            permission: [Permission.Update],
            onRefresh: searchService.refresh
          })
        ]
      }
    }
  ]

  if (canUpdate || canRemove) {
    columns.push({
      prop: '$',
      label: '管理操作',
      defaultSlot: ({ row }) => [
        h(ElSpace, { spacer, wrap: true }, () => {
          const vnodes: VNode[] = []

          if (canUpdate) {
            vnodes.push(h(Update, { row, onRefresh: searchService.refresh }))
          }

          if (canRemove) {
            const service = removeButton(row.id)
            vnodes.push(
              h(Remove, { service, onRefresh: searchService.refresh })
            )
          }

          return vnodes
        })
      ]
    })
  }

  return columns
}
