const couponGoodsDetail = {
  dev: (prefix = 'box') => {
    return `https://${prefix}-m.black-unique.com/new/index.html?ZZCAppArg=AppOpenPage,topbar_remove#/detail?pageSource=black&goodsId=`
  },
  test: (prefix = 'test') => {
    return `https://${prefix}-m.black-unique.com/new/index.html?ZZCAppArg=AppOpenPage,topbar_remove#/detail?pageSource=black&goodsId=`
  },
  prod: () => {
    return 'https://m.black-unique.com/new/index.html?ZZCAppArg=AppOpenPage,topbar_remove#/detail?pageSource=black&goodsId='
  }
}

export default couponGoodsDetail
