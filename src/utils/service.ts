import router from '@/router'
import { getToken, removeToken, setToken } from '@/utils/storage'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

type ApiResponse<T = null> = {
  data: T
  code: number
  total: number
  message: string
}

type RefreshTokenOutput = {
  accessToken: string
  refreshToken: string
}

let refreshTokenPromise: Promise<ApiResponse<RefreshTokenOutput>> | null = null

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

instance.interceptors.request.use(
  config => {
    const accessToken = getToken().accessToken
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const { config: originalConfig, status, message } = error

    // 400、404、500...
    if (status !== 401 || !originalConfig) {
      ElMessage.error(message)
      return Promise.reject()
    }

    // 401
    const refreshToken = getToken().refreshToken
    if (originalConfig.url?.endsWith('refresh-token') || !refreshToken) {
      ElMessage.error('用户信息过期，请重新登陆')
      removeToken()
      router.push({
        path: '/sign-in',
        query: { redirect: router.currentRoute.value.fullPath }
      })
      return Promise.reject()
    }

    if (!refreshTokenPromise) {
      refreshTokenPromise = instance.request({
        url: '/refresh-token',
        method: 'post',
        data: { refreshToken }
      })
      refreshTokenPromise
        .then(({ data }) => setToken(data))
        .finally(() => (refreshTokenPromise = null))
    }

    return refreshTokenPromise.then(() => {
      originalConfig.headers.Authorization = getToken().accessToken
      return instance.request(originalConfig)
    })
  }
)

export const service = <Input = undefined, Output = null>(
  initConfig: Input extends undefined
    ? () => AxiosRequestConfig
    : (input: Input) => AxiosRequestConfig
) => {
  const result = ref<ApiResponse<Output>>()
  const error = ref<Error>()
  const loading = ref(false)
  const cancel = ref<() => void>(() => {})

  let _input: Input

  type Execute = Input extends undefined
    ? () => Promise<ApiResponse<Output>>
    : (input: Input) => Promise<ApiResponse<Output>>

  const execute: Execute = ((input: Input) => {
    const controller = new AbortController()

    _input = input
    loading.value = true
    cancel.value = controller.abort

    return instance
      .request<ApiResponse<Output>>({
        ...initConfig(input),
        signal: controller.signal
      })
      .then(({ data }) => {
        if (data.code !== 200) {
          if (data.message) {
            ElMessage.error(data.message)
          }
          return Promise.reject()
        }
        result.value = data
        return data
      })
      .finally(() => {
        loading.value = false
        cancel.value = () => {}
      })
  }) as Execute

  const refresh = () => execute(_input)

  return { result, error, loading, cancel, execute, refresh }
}

export type Service<I, O> = ReturnType<typeof service<I, O>>
