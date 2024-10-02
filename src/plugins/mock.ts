import Mock from 'mockjs'
import { appLocale, appTranslation } from '../../mock/app'
import { authorityMenu } from '../../mock/authority/menu'
import { refreshToken, signIn, signUp, singOut } from '../../mock/sign'
import { userInfo, userPassword } from '../../mock/user'

export const mock = () => {
  if (import.meta.env.MODE === 'mock') {
    Mock.setup({ timeout: 500 })

    Mock.mock(/\/app\/locale/, appLocale)
    Mock.mock(/\/app\/translation/, appTranslation)

    Mock.mock(/\/sign-in/, signIn)
    Mock.mock(/\/sign-out/, singOut)
    Mock.mock(/\/sign-up/, signUp)
    Mock.mock(/\/refresh-token/, refreshToken)

    Mock.mock(/\/user-info/, userInfo)
    Mock.mock(/\/user-password/, userPassword)

    Mock.mock(/\/authority\/menu/, authorityMenu)
  }
}
