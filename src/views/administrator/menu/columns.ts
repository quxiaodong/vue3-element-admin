import { SearchMenuInput, SearchMenuOutput } from '@/apis/administrator/menu'
import type { Column } from '@/components/common-table'
import { Service } from '@/utils/service'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElDivider, ElIcon, ElSpace } from 'element-plus'
import { h } from 'vue'
import Remove from './Remove.vue'
import Status from './Status.vue'
import Update from './Update.vue'

type Columns = Column<SearchMenuOutput>[]

type UseTableColumns = (
  searchService: Service<SearchMenuInput, SearchMenuOutput[]>
) => Columns

export const useTableColumns: UseTableColumns = searchService => {
  const spacer = h(ElDivider, { direction: 'vertical' })

  const columns: Columns = [
    {
      type: 'selection',
      prop: 'selection',
      i18n: '/administrator/menu.selection'
    },
    {
      prop: 'id',
      i18n: '/administrator/menu.id',
      defaultHide: true
    },
    {
      prop: 'name',
      i18n: '/administrator/menu.name',
      alwaysShow: true
    },
    {
      prop: 'path',
      i18n: '/administrator/menu.path'
    },
    {
      prop: 'icon',
      i18n: '/administrator/menu.icon',
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
      i18n: '/administrator/menu.parent',
      defaultSlot: ({ row }) => [h('div', row.parent?.path)]
    },
    {
      prop: 'createAt',
      i18n: '/administrator/menu.create-time'
    },
    {
      prop: 'status',
      i18n: '/administrator/menu.status',
      defaultSlot: ({ row }) => [
        h(Status, { row, onRefetch: searchService.refetch })
      ]
    },
    {
      prop: '$',
      i18n: '/administrator/menu.operations',
      minWidth: 100,
      defaultSlot: ({ row }) => [
        h(ElSpace, { spacer, wrap: true }, () => [
          h(Update, { row, onRefetch: searchService.refetch }),
          h(Remove, { row, onRefetch: searchService.refetch })
        ])
      ]
    }
  ]

  return columns
}
