import { service } from '@/utils/service'
import { getToken } from '@/utils/storage'

// 用户信息
export type UserInfoOutput = {
  avatar?: string
  username: string
  nickname: string
  regionId?: string
  region?: {
    id: string
    icon: string
    code: string
    name: string
  }
  role?: {
    menus: {
      id: string
      path: string
      name: string
      icon?: string
      parentId?: string
    }[]
    buttons: {
      id: string
      code: string
      name: string
    }[]
  }
}

export const searchUser = () => {
  return service<undefined, UserInfoOutput>(() => ({
    url: '/user-info',
    method: 'post',
    data: {
      accessToken: getToken().accessToken
    }
  }))
}

// 修改密码
export type UpdateUserPasswordInput = {
  password: string
  password1: string
  password2: string
}

export const updateUserPassword = () => {
  return service<UpdateUserPasswordInput>(data => ({
    url: '/user-password',
    method: 'post',
    data
  }))
}
