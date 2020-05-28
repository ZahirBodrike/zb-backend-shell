import Layout from '@/layout'

const taobaoGoodRouter = {
  sort: 1,
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
    },
    {
      path: 'detail',
      hidden: true,
      component: () => import('@/views/shopMng/detail'),
      name: 'taobaoDetail',
      meta: { title: '新增/编辑商品', type: 'taobao' }
    },
    {
      path: 'categoryDetail',
      hidden: true,
      component: () => import('@/views/shopMng/categoryDetail'),
      name: 'taobaoCategoryDetail',
      meta: { title: '新增/编辑分类', type: 'taobao' }
    }
  ]
}

export default taobaoGoodRouter
