import Layout from '@/layout'

const jingdongGoodRouter = {
  sort: 2,
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
    },
    {
      path: 'detail',
      hidden: true,
      component: () => import('@/views/shopMng/detail'),
      name: 'jingdongDetail',
      meta: { title: '新增/编辑商品', type: 'jingdong' }
    },
    {
      path: 'categoryDetail',
      hidden: true,
      component: () => import('@/views/shopMng/categoryDetail'),
      name: 'jingdongCategoryDetail',
      meta: { title: '新增/编辑分类', type: 'jingdong' }
    }
  ]
}

export default jingdongGoodRouter