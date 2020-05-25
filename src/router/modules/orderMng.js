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
      path: 'orderCommissionList',
      component: () => import('@/views/orderMng/orderCommission'),
      name: 'orderCommissionList',
      meta: { title: '订单分佣信息查询' }
    }
  ]
}

export default orderRouter
