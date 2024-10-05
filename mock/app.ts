export const appLocale = function () {
  return {
    code: 200,
    data: [
      {
        icon: '🇨🇳',
        code: 'zhCn',
        name: '简体中文'
      },
      {
        icon: '🇺🇸',
        code: 'en',
        name: 'English'
      }
    ]
  }
}

const en = {
  'common.search': 'Search',
  'common.create': 'Create',
  'common.update': 'Update',
  'common.remove': 'Remove',
  'common.reset': 'Reset',
  'common.edit': 'Edit',
  'common.enable': 'Enable',
  'common.disable': 'Disable',
  'common.verify': 'Verify',
  'common.submit': 'Submit',
  'common.cancel': 'Cancel',
  'common.confirm': 'Confirm',
  'common.confirm-remove?': 'Remove?',
  'common.please-input': 'Please input',
  'common.please-select': 'Please select',

  'common:mode.light': 'Light',
  'common:mode.dark': 'Dark',
  'common:mode.auto': 'Auto',
  'common:menu.home': 'Home',
  'common:menu.sign-up': 'Register',
  'common:menu.sign-in': 'Login',
  'common:menu.authority': 'authority',
  'common:menu.authority-menu': 'Menu List',
  'common:locale.loading-translation': 'Translation is loading',
  'common:layout.change-password': 'Change Password',
  'common:layout.current-password': 'Current Password',
  'common:layout.new-password': 'New Password',
  'common:layout.confirm-password': 'Confirm Password',
  'common:layout.change-password.success': 'Change Password Success',
  'common:layout.sign-out': 'Sign out',
  'common:layout.sign-out-success': 'Sign out Success',
  'common:table.stripe': 'Table Stripe',
  'common:table.stripe.open': 'O',
  'common:table.stripe.close': 'X',
  'common:table.refresh': 'Refresh',
  'common:table.size': 'Size',
  'common:table.size.small': 'Small',
  'common:table.size.default': 'Medium',
  'common:table.size.large': 'Large',
  'common:table.setting': 'Col Setting',
  'common:table.fullscreen': 'Fullscreen',
  'common:table.col-show/sort': 'Col Show/Sort',

  '/sign-in.login': 'Login',
  '/sign-in.to-register': "Haven't account? Go to register",
  '/sign-in.login-success': 'Account Login Success',
  '/sign-up.register': 'Register',
  '/sign-up.to-login': 'Have account? Go to login',
  '/authority/menu.selection': 'Selection',
  '/authority/menu.id': 'ID',
  '/authority/menu.name': 'Name',
  '/authority/menu.path': 'Path',
  '/authority/menu.icon': 'Icon',
  '/authority/menu.parent': 'Parent',
  '/authority/menu.create-time': 'Create time',
  '/authority/menu.status': 'Status',
  '/authority/menu.operations': 'Operations'
}

const zhCn = {
  'common.search': '查询',
  'common.create': '新建',
  'common.update': '更新',
  'common.remove': '删除',
  'common.reset': '重置',
  'common.edit': '编辑',
  'common.enable': '启用',
  'common.disable': '禁用',
  'common.verify': '校验',
  'common.submit': '提交',
  'common.cancel': '取消',
  'common.confirm': '确定',
  'common.confirm-remove?': '确定删除吗？',
  'common.please-input': '请输入',
  'common.please-select': '请选择',

  'common:mode.light': '明亮模式',
  'common:mode.dark': '暗黑模式',
  'common:mode.auto': '跟随系统',
  'common:menu.home': '首页',
  'common:menu.sign-up': '注册',
  'common:menu.sign-in': '登陆',
  'common:menu.authority': '权限管理',
  'common:menu.authority-menu': '菜单列表',
  'common:locale.loading-translation': '多语言配置加载中',
  'common:layout.change-password': '更改密码',
  'common:layout.current-password': '当前密码',
  'common:layout.new-password': '新的密码',
  'common:layout.confirm-password': '确认密码',
  'common:layout.change-password.success': '密码修改成功',
  'common:layout.sign-out': '退出登录',
  'common:layout.sign-out-success': '账号退出成功',
  'common:table.stripe': '表格斑马纹',
  'common:table.stripe.open': '开',
  'common:table.stripe.close': '关',
  'common:table.refresh': '刷新',
  'common:table.size': '密度',
  'common:table.size.small': '紧凑',
  'common:table.size.default': '中等',
  'common:table.size.large': '宽松',
  'common:table.setting': '列设置',
  'common:table.fullscreen': '全屏',
  'common:table.col-show/sort': '列展示/排序',

  '/sign-in.login': '登录',
  '/sign-in.to-register': '没有账号？去注册',
  '/sign-in.login-success': '账号登录成功',
  '/sign-up.register': '注册',
  '/sign-up.to-login': '已有账号？去登陆',
  '/authority/menu.selection': '多选按钮',
  '/authority/menu.id': '菜单编号',
  '/authority/menu.name': '菜单名称',
  '/authority/menu.path': '菜单路径',
  '/authority/menu.icon': '菜单图标',
  '/authority/menu.parent': '父级菜单',
  '/authority/menu.create-time': '创建时间',
  '/authority/menu.status': '菜单状态',
  '/authority/menu.operations': '管理操作'
}

export const appTranslation = function (options: any) {
  const url = options.url

  function filterByPrefix(obj: Record<string, string>, prefix: string) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => key.startsWith(prefix))
    )
  }

  if (url.includes('code=zhCn')) {
    if (url.includes('stem=common')) {
      return { code: 200, data: filterByPrefix(zhCn, 'common') }
    } else if (url.includes('stem=%2Fsign-in')) {
      return { code: 200, data: filterByPrefix(zhCn, '/sign-in') }
    } else if (url.includes('stem=%2Fsign-up')) {
      return { code: 200, data: filterByPrefix(zhCn, '/sign-up') }
    } else if (url.includes('stem=%2Fauthority%2Fmenu')) {
      return { code: 200, data: filterByPrefix(zhCn, '/authority/menu') }
    }
  }

  if (url.includes('code=en')) {
    if (url.includes('stem=common')) {
      return { code: 200, data: filterByPrefix(en, 'common') }
    } else if (url.includes('stem=%2Fsign-in')) {
      return { code: 200, data: filterByPrefix(en, '/sign-in') }
    } else if (url.includes('stem=%2Fsign-up')) {
      return { code: 200, data: filterByPrefix(en, '/sign-up') }
    } else if (url.includes('stem=%2Fauthority%2Fmenu')) {
      return { code: 200, data: filterByPrefix(en, '/authority/menu') }
    }
  }

  return {
    code: 200
  }
}
