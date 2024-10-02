import router from '@/router'
import qs from 'qs'
import { LocationQueryValue } from 'vue-router'

type FormatBase = {
  key: string
  type: 'String' | 'Number' | 'Boolean'
  transform?: (v: LocationQueryValue) => unknown
}

type FormatArray = {
  key: string
  type: 'Array'
  transform: (v: LocationQueryValue[]) => unknown
}

type Format = (FormatBase | FormatArray)[]

export const getUrlParams = (format: Format) => {
  const data: Record<string, unknown> = {}
  const query = router.currentRoute.value.query

  format.forEach(({ key, type, transform }) => {
    if (query[key]) {
      if (type === 'Array') {
        const value = Array.isArray(query[key]) ? query[key] : [query[key]]
        data[key] = transform ? transform(value) : value
      } else {
        const value = Array.isArray(query[key]) ? query[key][0] : query[key]
        data[key] = transform ? transform(value) : value
      }
    }
  })

  return data
}

export const setUrlParams = (query: Record<string, unknown>) => {
  const params = qs.stringify(query, { arrayFormat: 'repeat' })
  const path = router.currentRoute.value.path + '?' + params
  router.replace(path)
}
