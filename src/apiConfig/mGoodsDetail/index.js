const mGoodsDetail = {
  dev: (prefix = 'box') => {
    return `https://${prefix}-m.black-unique.com/new/#/detail?pageSource=black&goodsId=`
  },
  test: (prefix = 'test') => {
    return `https://${prefix}-m.black-unique.com/new/#/detail?pageSource=black&goodsId=`
  },
  prod: () => {
    return 'https://m.black-unique.com/new/#/detail?pageSource=black&goodsId='
  }
}

export default mGoodsDetail
