import {
  removeUser,
  SearchUserInput,
  SearchUserOutput,
  updateUser
} from '@/apis/administrator/user'
import Remove from '@/components/common-crud/Remove.vue'
import Status from '@/components/common-crud/Status.vue'
import type { Column } from '@/components/common-table'
import { useAcl } from '@/hooks/useAcl'
import { Service } from '@/utils/service'
import {
  ElDescriptions,
  ElDescriptionsItem,
  ElDivider,
  ElLink,
  ElSpace
} from 'element-plus'
import { h, VNode } from 'vue'
import Password from './Password.vue'
import { Permission } from './permission'

type Columns = Column<SearchUserOutput>[]

type UseTableColumns = (
  searchService: Service<SearchUserInput, SearchUserOutput[]>
) => Columns

export const useTableColumns: UseTableColumns = searchService => {
  const spacer = h(ElDivider, { direction: 'vertical' })

  const canUpdate = useAcl([Permission.Update])
  const canRemove = useAcl([Permission.Remove])
  const canPassword = useAcl([Permission.Password])

  const columns: Columns = [
    {
      prop: 'expand',
      label: '用户详情',
      type: 'expand',
      headerSlot: () => [h('span')],
      defaultSlot: ({ row }) => {
        return [
          h(
            'div',
            { class: 'px-2' },
            h(ElDescriptions, { column: 2, border: true }, () => [
              h(
                ElDescriptionsItem,
                { label: '联系方式' },
                () => row.phone || '无'
              ),
              h(
                ElDescriptionsItem,
                { label: '邮箱地址' },
                () => row.email || '无'
              ),
              h(
                ElDescriptionsItem,
                { label: '备注信息' },
                () => row.remark || '无'
              )
            ])
          )
        ]
      }
    },
    {
      prop: 'id',
      label: '用户编号',
      defaultHide: true
    },
    {
      prop: 'username',
      label: '登录账号',
      alwaysShow: true
    },
    {
      prop: 'nickname',
      label: '用户昵称'
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
      prop: 'status',
      label: '用户状态',
      columnKey: 'status',
      filters: [
        { text: '启用', value: '0' },
        { text: '禁用', value: '1' }
      ],
      defaultSlot: ({ row }) => {
        const service = updateUser(row.id)
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

  if (canUpdate || canRemove || canPassword) {
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
                  href: `/#/administrator/user/update?id=${row.id}`
                },
                () => '编辑'
              )
            )
          }

          if (canRemove) {
            const service = removeUser(row.id)
            vnodes.push(
              h(Remove, { service, onRefresh: searchService.refresh })
            )
          }

          if (canPassword) {
            vnodes.push(h(Password, { row }))
          }

          return vnodes
        })
      ]
    })
  }

  return columns
}
