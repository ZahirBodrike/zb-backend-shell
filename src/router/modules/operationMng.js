import Layout from '@/layout'

const operationMngRouter = {
  path: '/operationMng',
  component: Layout,
  redirect: 'noRedirect',
  name: 'operationMng',
  alwaysShow: true,
  meta: {
    title: '运营管理',
    icon: 'shopping'
  },
  children: [
    {
      path: 'invitePoster/list',
      component: () => import('@/views/operationMng/invitePoster/list'),
      name: 'invitePosterList',
      meta: { title: '邀请海报' }
    },
    {
      path: 'goods/detail',
      component: () => import('@/views/operationMng/invitePoster/detail'),
      name: 'invitePosterDetail',
      hidden: true,
      meta: { title: '邀请海报详情' }
    }
  ]
}

export default operationMngRouter
