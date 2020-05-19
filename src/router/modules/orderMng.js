import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: 'noRedirect',
  name: 'order',
  alwaysShow: true,
  meta: {
    title: '订单管理',
    icon: 'form'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/orderMng/list'),
      name: 'orderList',
      meta: { title: '订单列表' }
    },
    {
      path: 'addOilList',
      component: () => import('@/views/orderMng/addOil'),
      name: 'addOilList',
      meta: { title: '加油订单' }
    },
    {
      path: 'kfcList',
      component: () => import('@/views/orderMng/kfc'),
      name: 'kfcList',
      meta: { title: '肯德基订单' }
    },
    {
      path: 'rechargeList',
      component: () => import('@/views/orderMng/recharge'),
      name: 'rechargeList',
      meta: { title: '充值订单' }
    },
    {
      path: 'couponList',
      component: () => import('@/views/orderMng/coupon'),
      name: 'couponList',
      meta: { title: '卡券订单' }
    }
  ]
}

export default orderRouter
