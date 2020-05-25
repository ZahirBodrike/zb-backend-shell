import Layout from '@/layout'

const rebateMngRouter = {
  path: '/rebate',
  component: Layout,
  redirect: 'noRedirect',
  name: 'rebate',
  alwaysShow: true,
  meta: {
    title: '返利宝管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/rebateMng/commissionConfig'),
      name: 'rebateCommissionConfig',
      meta: { title: '佣金配置' }
    },
    {
      path: 'detail',
      component: () => import('@/views/rebateMng/commissionConfigDetail'),
      hidden: true,
      name: 'rebateCommissionConfigDetail',
      meta: { title: '佣金配置详情' }
    }
  ]
}

export default rebateMngRouter
