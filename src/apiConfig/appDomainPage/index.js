const appDomainPage = {
  dev: (prefix = 'box') => {
    return `https://${prefix}-m.black-unique.com/`
  },
  test: (prefix = 'test') => {
    return `https://${prefix}-m.black-unique.com/`
  },
  prod: () => {
    return 'https://m.black-unique.com/'
  }
}

export default appDomainPage
