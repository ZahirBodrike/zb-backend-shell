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
    }
  ]
}

export default orderRouter
