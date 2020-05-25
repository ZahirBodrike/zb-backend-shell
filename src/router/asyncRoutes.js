import componentsRouter from './modules/components'
import userMngRouter from './modules/userMng'
import taobaoGoodRouter from './modules/taobaoGood'
import jingdongGoodRouter from './modules/jingdongGood'
import pddGoodRouter from './modules/pinduoduoGood'
import weipinhuiGoodRouter from './modules/weipinhuiGood'
import suNingGoodRouter from './modules/suNingGood'
import orderRouter from './modules/orderMng'
import addOilMngRouter from './modules/addOilMng'
import materialRouter from './modules/material'
import operationMngRouter from './modules/operationMng'
import couponMngRouter from './modules/couponMng'
import financeMngRouter from './modules/finance'
import signToMoneyRouter from './modules/signToMoney'
import redEnvelopeWarRouter from './modules/redEnvelope'
import rebateMngRouter from './modules/rebateMng'

const asyncRoutes = [
  componentsRouter,
  userMngRouter,
  taobaoGoodRouter,
  jingdongGoodRouter,
  pddGoodRouter,
  weipinhuiGoodRouter,
  suNingGoodRouter,
  orderRouter,
  addOilMngRouter,
  operationMngRouter,
  materialRouter,
  couponMngRouter,
  financeMngRouter,
  signToMoneyRouter,
  redEnvelopeWarRouter,
  rebateMngRouter,

  { path: '*', redirect: '/404', hidden: true }
]

export default asyncRoutes
