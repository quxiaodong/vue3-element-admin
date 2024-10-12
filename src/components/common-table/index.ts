import { Service } from '@/utils/service'
import { TableColumnInstance, TableInstance } from 'element-plus'
import { VNode } from 'vue'

export type Params = { pageNo: number; pageSize: number }
export type Item = Record<string, unknown>

type ColumnHeader = {
  $index: number
  column: Record<string, unknown>
}

type ColumnDefault<Row> = {
  $index: number
  column: Record<string, unknown>
  row: Row
}

export type Column<Row> = TableColumnInstance['$props'] & {
  prop: string
  i18n?: string
  type?: 'default' | 'selection' | 'index' | 'expand'
  alwaysShow?: boolean
  defaultHide?: boolean
  headerSlot?: (scope: ColumnHeader) => VNode[]
  defaultSlot?: (scope: ColumnDefault<Row>) => VNode[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<P extends Params = any, I extends Item = any> = {
  data: I[]
  columns: Column<I>[]
  service: Service<P, I[]>
  tableProps?: TableInstance['$props']
}
