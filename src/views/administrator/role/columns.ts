import {
  removeRole,
  SearchRoleInput,
  SearchRoleOutput,
  updateRole
} from '@/apis/administrator/role'
import Remove from '@/components/common-crud/Remove.vue'
import Status from '@/components/common-crud/Status.vue'
import type { Column, DefaultScope } from '@/components/common-table'
import { useAcl } from '@/hooks/useAcl'
import { Service } from '@/utils/service'
import {
  ElCheckbox,
  ElDivider,
  ElLink,
  ElSpace,
  ElTable,
  ElTableColumn
} from 'element-plus'
import { h, VNode } from 'vue'
import { Permission } from './permission'

type Auth = SearchRoleOutput['menus'][number] & {
  children: SearchRoleOutput['menus']
  buttons: SearchRoleOutput['buttons']
}

type Columns = Column<SearchRoleOutput>[]

type UseTableColumns = (
  searchService: Service<SearchRoleInput, SearchRoleOutput[]>
) => Columns

export const useTableColumns: UseTableColumns = searchService => {
  const spacer = h(ElDivider, { direction: 'vertical' })

  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])

  const columns: Columns = [
    {
      prop: 'expand',
      label: '角色详情',
      type: 'expand',
      headerSlot: () => [h('span')],
      defaultSlot: ({ row }) => {
        const auths = row.menus
          .map(v => ({
            ...v,
            buttons: row.buttons.filter(button => button.menuId === v.id)
          }))
          .map((v, _, array) => ({
            ...v,
            children: array.filter(menu => menu.parentId === v.id)
          }))
          .filter(v => !v.parentId)

        return [
          h(
            'div',
            { class: 'px-2' },
            h(
              ElTable,
              {
                data: auths,
                rowKey: 'id',
                size: 'small',
                showHeader: false,
                border: true,
                maxHeight: 500
              },
              () => [
                h(ElTableColumn, (scope: DefaultScope<Auth>) => [
                  h(ElCheckbox, {
                    modelValue: true,
                    disabled: true,
                    label: scope.row.name
                  })
                ]),
                h(ElTableColumn, (scope: DefaultScope<Auth>) =>
                  scope.row.buttons.map(v => [
                    h(ElCheckbox, {
                      modelValue: true,
                      disabled: true,
                      label: v.name
                    })
                  ])
                )
              ]
            )
          )
        ]
      }
    },
    {
      prop: 'id',
      label: '角色编号',
      defaultHide: true
    },
    {
      prop: 'name',
      label: '角色名称',
      alwaysShow: true
    },
    {
      prop: 'code',
      label: '角色代码'
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '角色状态',
      columnKey: 'status',
      filters: [
        { text: '启用', value: '0' },
        { text: '禁用', value: '1' }
      ],
      defaultSlot: ({ row }) => {
        const service = updateRole(row.id)
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
            vnodes.push(
              h(
                ElLink,
                {
                  type: 'primary',
                  underline: false,
                  href: `/#/administrator/role/update?id=${row.id}`
                },
                () => '编辑'
              )
            )
          }

          if (canRemove) {
            const service = removeRole(row.id)
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
