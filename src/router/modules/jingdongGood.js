import Layout from '@/layout'

const jingdongGoodRouter = {
  path: '/jingdong',
  component: Layout,
  redirect: 'noRedirect',
  name: 'jingdong',
  alwaysShow: true,
  meta: {
    title: '京东商品管理',
    icon: 'shopping'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/shopMng/list'),
      name: 'jingdongList',
      meta: { title: '京东商品列表', type: 'jingdong' }
    },
    {
      path: 'category',
      component: () => import('@/views/shopMng/category'),
      name: 'jingdongCategory',
      meta: { title: '京东商品分类', type: 'jingdong' }
    }
  ]
}

export default jingdongGoodRouter
