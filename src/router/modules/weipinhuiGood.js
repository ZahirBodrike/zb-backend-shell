import Layout from '@/layout'

const weipinhuiGoodRouter = {
  path: '/weipinhui',
  component: Layout,
  redirect: 'noRedirect',
  name: 'weipinhui',
  alwaysShow: true,
  meta: {
    title: '唯品会商品管理',
    icon: 'shopping'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/shopMng/list'),
      name: 'weipinhuiList',
      meta: { title: '唯品会商品列表', type: 'weipinhui' }
    },
    {
      path: 'category',
      component: () => import('@/views/shopMng/category'),
      name: 'weipinhuiCategory',
      meta: { title: '唯品会商品分类', type: 'weipinhui' }
    }
  ]
}

export default weipinhuiGoodRouter
