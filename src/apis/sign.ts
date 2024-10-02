import { service } from '@/utils/service'

// 账号登入
export type SignInInput = {
  username: string
  password: string
}

export type SignInOutput = {
  accessToken: string
  refreshToken: string
}

export const signIn = () => {
  return service<SignInInput, SignInOutput>(data => ({
    url: '/sign-in',
    method: 'post',
    data
  }))
}

// 账号登出
export const signOut = () => {
  return service(() => ({
    url: '/sign-out',
    method: 'get'
  }))
}

// 账号注册
export type SignUpInput = {
  username: string
  password1: string
  password2: string
}

export const signUp = () => {
  return service<SignUpInput>(data => ({
    url: '/sign-up',
    method: 'post',
    data
  }))
}
