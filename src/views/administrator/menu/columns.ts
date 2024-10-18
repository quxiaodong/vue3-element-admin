import {
  removeMenu,
  SearchMenuInput,
  SearchMenuOutput,
  updateMenu
} from '@/apis/administrator/menu'
import Remove from '@/components/common-crud/Remove.vue'
import Status from '@/components/common-crud/Status.vue'
import type { Column } from '@/components/common-table'
import { useAcl } from '@/hooks/useAcl'
import { Service } from '@/utils/service'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElDivider, ElIcon, ElSpace } from 'element-plus'
import { h, VNode } from 'vue'
import { Permission } from './permission'
import Update from './Update.vue'

type Columns = Column<SearchMenuOutput>[]

type UseTableColumns = (
  searchService: Service<SearchMenuInput, SearchMenuOutput[]>
) => Columns

export const useTableColumns: UseTableColumns = searchService => {
  const spacer = h(ElDivider, { direction: 'vertical' })

  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])

  const columns: Columns = [
    {
      prop: 'id',
      label: '菜单编号',
      defaultHide: true
    },
    {
      prop: 'name',
      label: '菜单名称',
      alwaysShow: true
    },
    {
      prop: 'path',
      label: '菜单路径'
    },
    {
      prop: 'icon',
      label: '菜单图标',
      defaultSlot: ({ row: { icon } }) => {
        return icon
          ? [
              h(ElIcon, { size: 20 }, () => [
                h(ElementPlusIconsVue[icon as keyof typeof ElementPlusIconsVue])
              ])
            ]
          : []
      }
    },
    {
      prop: 'parent',
      label: '父级菜单',
      defaultSlot: ({ row }) => [h('div', row.parent?.path)]
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '菜单状态',
      columnKey: 'status',
      filters: [
        { text: '启用', value: '0' },
        { text: '禁用', value: '1' }
      ],
      defaultSlot: ({ row }) => {
        const service = updateMenu(row.id)
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
            const service = removeMenu(row.id)
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
