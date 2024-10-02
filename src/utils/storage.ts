const host = window.location.host
const website = `${host}.admin.`

const Keys = {
  accessToken: `${website}accessToken`,
  refreshToken: `${website}refreshToken`,
  config: `${website}config`
}

export const getToken = () => {
  return {
    accessToken: localStorage.getItem(Keys.accessToken),
    refreshToken: localStorage.getItem(Keys.refreshToken)
  }
}

export const setToken = (data: {
  accessToken: string
  refreshToken: string
}) => {
  localStorage.setItem(Keys.accessToken, data.accessToken)
  localStorage.setItem(Keys.refreshToken, data.refreshToken)
}

export const removeToken = () => {
  localStorage.removeItem(Keys.accessToken)
  localStorage.removeItem(Keys.refreshToken)
}

type Config = {
  settingVisible?: boolean
  asideCollapse?: boolean
  asideVisible?: boolean
  asideWidth?: number
  animate?: string
  language?: string
  color?: string
  dark?: string
  weak?: boolean
  gray?: boolean
}

export const getConfig = <K extends keyof Config>(
  key: K
): Config[K] | undefined => {
  let config: Config = {}
  try {
    const stored = localStorage.getItem(Keys.config)
    if (stored) {
      config = JSON.parse(stored)
    }
    return config[key]
  } catch {
    return config[key]
  }
}

export const setConfig = <K extends keyof Config>(key: K, value: Config[K]) => {
  let config: Config = {}
  try {
    const stored = localStorage.getItem(Keys.config)
    if (stored) {
      config = JSON.parse(stored)
    }
  } finally {
    config[key] = value
    localStorage.setItem(Keys.config, JSON.stringify(config))
  }
}
