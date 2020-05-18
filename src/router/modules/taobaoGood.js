import Layout from '@/layout'

const taobaoGoodRouter = {
  path: '/taobao',
  component: Layout,
  redirect: 'noRedirect',
  name: 'taobao',
  alwaysShow: true,
  meta: {
    title: '淘宝商品管理',
    icon: 'shopping'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/shopMng/list'),
      name: 'taobaoList',
      meta: { title: '淘宝商品列表', type: 'taobao' }
    },
    {
      path: 'category',
      component: () => import('@/views/shopMng/category'),
      name: 'taobaoCategory',
      meta: { title: '淘宝商品分类', type: 'taobao' }
    }
  ]
}

export default taobaoGoodRouter
