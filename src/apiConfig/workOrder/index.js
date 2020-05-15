const workOrderObj = {
  dev: () => {
    return `http://zcsweb_bugfix-poi.zuzuche.net/#/ticketflow/create?orderType=KINIGHT_MALL&source=KINIGHT_MALL&orderId=`
  },
  test: () => {
    return `http://zcsweb_bugfix-poi.zuzuche.net/#/ticketflow/create?orderType=KINIGHT_MALL&source=KINIGHT_MALL&orderId=`
  },
  prod: () => {
    return 'http://zcs.zuzuche.com/#/ticketflow/create?orderType=KINIGHT_MALL&source=KINIGHT_MALL&orderId='
  }
}

export default workOrderObj
