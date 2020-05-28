import Layout from '@/layout'

const suNingGoodRouter = {
  sort: 5,
  path: '/suning',
  component: Layout,
  redirect: 'noRedirect',
  name: 'suning',
  alwaysShow: true,
  meta: {
    title: '苏宁商品管理',
    icon: 'shopping'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/shopMng/list'),
      name: 'suningList',
      meta: { title: '苏宁商品列表', type: 'suning' }
    },
    {
      path: 'category',
      component: () => import('@/views/shopMng/category'),
      name: 'suningCategory',
      meta: { title: '苏宁商品分类', type: 'suning' }
    },
    {
      path: 'detail',
      hidden: true,
      component: () => import('@/views/shopMng/detail'),
      name: 'suningDetail',
      meta: { title: '新增/编辑商品', type: 'suning' }
    },
    {
      path: 'categoryDetail',
      hidden: true,
      component: () => import('@/views/shopMng/categoryDetail'),
      name: 'suningCategoryDetail',
      meta: { title: '新增/编辑分类', type: 'suning' }
    }
  ]
}

export default suNingGoodRouter
