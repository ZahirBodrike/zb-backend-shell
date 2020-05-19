import componentsRouter from './modules/components'
import userMngRouter from './modules/userMng'
import taobaoGoodRouter from './modules/taobaoGood'
import jingdongGoodRouter from './modules/jingdongGood'
import pddGoodRouter from './modules/pinduoduoGood'
import weipinhuiGoodRouter from './modules/weipinhuiGood'
import suNingGoodRouter from './modules/suNingGood'
import orderRouter from './modules/orderMng'
import materialRouter from './modules/material'

const asyncRoutes = [
  componentsRouter,
  userMngRouter,
  taobaoGoodRouter,
  jingdongGoodRouter,
  pddGoodRouter,
  weipinhuiGoodRouter,
  suNingGoodRouter,
  orderRouter,
  materialRouter,
  { path: '*', redirect: '/404', hidden: true }
]

export default asyncRoutes
