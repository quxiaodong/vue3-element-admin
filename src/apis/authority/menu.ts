import { service } from '@/utils/service'

export type SearchMenuInput = {
  pageNo: number
  pageSize: number
  name?: string
  path?: string
}

export type SearchMenuOutput = {
  id: string
  name: string
  path: string
  icon?: string
  status: number
  createAt: string
  updateAt: string
  parentId?: string
  parent?: SearchMenuOutput
}

export const searchMenu = () => {
  return service<SearchMenuInput, SearchMenuOutput[]>(params => ({
    url: '/authority/menu',
    method: 'get',
    params
  }))
}

export const detailMenu = (id: string) => {
  return service<undefined, SearchMenuOutput>(() => ({
    url: '/authority/menu/' + id,
    method: 'get'
  }))
}

export type CreateMenuInput = {
  name: string
  path: string
  icon?: string
  status: number
  parentId?: string
}

export const createMenu = () => {
  return service<CreateMenuInput>(data => ({
    url: '/authority/menu',
    method: 'post',
    data
  }))
}

export type UpdateMenuInput = Partial<CreateMenuInput>

export const updateMenu = (id: string) => {
  return service<UpdateMenuInput>(data => ({
    url: '/authority/menu/' + id,
    method: 'patch',
    data
  }))
}

export const removeMenu = (id: string) => {
  return service(() => ({
    url: '/authority/menu/' + id,
    method: 'delete'
  }))
}
