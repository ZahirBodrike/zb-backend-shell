import runTime from './runTime'
import workOrder from './workOrder'
import appDomainPage from './appDomainPage'
import couponGoodsDetail from './couponGoodsDetail'
import couponLinkPage from './couponLinkPage'
import fanxianRunTime from './fanxianRunTime'
import mGoodsDetail from './mGoodsDetail'
import refundApplyInfoPage from './refundApplyInfoPage'
import supplierInfoPage from './supplierInfoPage'

function getRuntime() {
  const currentHost = window.location.host
  const obj = {}
  if ((/^box\d*-cps-mng-h5/).test(currentHost) || currentHost.indexOf('localhost') !== -1) {
    obj.env = 'dev'
    obj.prefix = currentHost.substring(0, currentHost.indexOf('-cps-mng-h5'))
  } else if ((/^test\d*-cps-mng-h5/).test(currentHost)) {
    obj.env = 'test'
    obj.prefix = currentHost.substring(0, currentHost.indexOf('-cps-mng-h5'))
  } else {
    obj.env = 'prod'
    obj.prefix = ''
  }
  return obj
}

const runTimeObj = getRuntime()
const runTimeCode = runTimeObj.env
const IS_PROD = runTimeCode === 'prod'

let HOST = runTime[runTimeObj.env](runTimeObj.prefix)
const FANXIAN_HOST = fanxianRunTime[runTimeObj.env](runTimeObj.prefix)
const WORK_ORDER_URL = workOrder[runTimeObj.env](runTimeObj.prefix)
const M_GOODS_DETAIL = mGoodsDetail[runTimeObj.env](runTimeObj.prefix)
const COUPON_PAGE_LINK = couponLinkPage[runTimeObj.env](runTimeObj.prefix)
const COUPON_GOODS_LINK = couponGoodsDetail[runTimeObj.env](runTimeObj.prefix)
const SUPPLIER_INFO_LINK = supplierInfoPage[runTimeObj.env](runTimeObj.prefix)
const REFUND_Apply_Info_LINK = refundApplyInfoPage[runTimeObj.env](runTimeObj.prefix)
const APP_DOMAIN_PAGE_LINK = appDomainPage[runTimeObj.env](runTimeObj.prefix)

if (window.location.host.indexOf('localhost') !== -1) {
  HOST = runTime[runTimeObj.env]()
}

export {
  HOST,
  FANXIAN_HOST,
  WORK_ORDER_URL,
  M_GOODS_DETAIL,
  COUPON_PAGE_LINK,
  COUPON_GOODS_LINK,
  SUPPLIER_INFO_LINK,
  REFUND_Apply_Info_LINK,
  APP_DOMAIN_PAGE_LINK,

  IS_PROD,
  runTimeObj
}
