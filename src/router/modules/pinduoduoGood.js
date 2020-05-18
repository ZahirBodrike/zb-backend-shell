import Layout from '@/layout'

const pddGoodRouter = {
  path: '/pinduoduo',
  component: Layout,
  redirect: 'noRedirect',
  name: 'pinduoduo',
  alwaysShow: true,
  meta: {
    title: '拼多多商品管理',
    icon: 'shopping'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/shopMng/list'),
      name: 'pddList',
      meta: { title: '拼多多商品列表', type: 'pinduoduo' }
    },
    {
      path: 'category',
      component: () => import('@/views/shopMng/category'),
      name: 'pddCategory',
      meta: { title: '拼多多商品分类', type: 'pinduoduo' }
    }
  ]
}

export default pddGoodRouter
