const host = window.location.host
const website = `${host}.admin.`

const Keys = {
  accessToken: `${website}accessToken`,
  refreshToken: `${website}refreshToken`,
  language: `${website}language`,
  colorScheme: `${website}colorScheme`
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

export const getLanguage = () => localStorage.getItem(Keys.language)

export const setLanguage = (value: string) =>
  localStorage.setItem(Keys.language, value)

export const getColorScheme = () => localStorage.getItem(Keys.colorScheme)

export const setColorScheme = (value: string) =>
  localStorage.setItem(Keys.colorScheme, value)
