import { SearchMenuInput, SearchMenuOutput } from '@/apis/authority/menu'
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
      i18n: '/authority/menu.selection'
    },
    {
      prop: 'id',
      i18n: '/authority/menu.id',
      defaultHide: true
    },
    {
      prop: 'name',
      i18n: '/authority/menu.name',
      alwaysShow: true
    },
    {
      prop: 'path',
      i18n: '/authority/menu.path'
    },
    {
      prop: 'icon',
      i18n: '/authority/menu.icon',
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
      i18n: '/authority/menu.parent',
      defaultSlot: ({ row }) => [h('div', row.parent?.path)]
    },
    {
      prop: 'createAt',
      i18n: '/authority/menu.create-time'
    },
    {
      prop: 'status',
      i18n: '/authority/menu.status',
      defaultSlot: ({ row }) => [
        h(Status, { row, onRefresh: searchService.refresh })
      ]
    },
    {
      prop: '$',
      i18n: '/authority/menu.operations',
      minWidth: 100,
      defaultSlot: ({ row }) => [
        h(ElSpace, { spacer, wrap: true }, () => [
          h(Update, { row, onRefresh: searchService.refresh }),
          h(Remove, { row, onRefresh: searchService.refresh })
        ])
      ]
    }
  ]

  return columns
}
