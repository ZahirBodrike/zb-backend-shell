const fanxianRunTime = {
  dev: (prefix = 'box') => {
    return `//${prefix}-fanxian-admin-api.chuxingyouhui.com`
  },
  test: (prefix = 'test') => {
    return `//${prefix}-fanxian-admin-api.chuxingyouhui.com`
  },
  prod: () => {
    return `//fanxian-admin-api.chuxingyouhui.com`
  }
}

export default fanxianRunTime
