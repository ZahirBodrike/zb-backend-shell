import Layout from '@/layout'

const signToMoneyRouter = {
  sort: 12,
  path: '/signToMoney',
  component: Layout,
  redirect: 'noRedirect',
  name: 'signToMoney',
  alwaysShow: true,
  meta: {
    title: '签到赚钱管理',
    icon: 'people'
  },
  children: [
    {
      path: 'task-config',
      component: () => import('@/views/signToMoney/taskConfig'),
      name: 'signToMoneyTaskConfig',
      meta: { title: '任务配置' }
    },
    {
      path: 'exchange-record',
      component: () => import('@/views/signToMoney/record'),
      name: 'signToMoneyExchangeRecord',
      meta: { title: '兑换记录' }
    },
    {
      path: 'golden-bean-config',
      component: () => import('@/views/signToMoney/goldenBeanConfig'),
      hidden: true,
      name: 'signToMoneyGoldenBeanConfig',
      meta: { title: '金豆配置' }
    },
    {
      path: 'golden-bean-config-detail',
      component: () => import('@/views/signToMoney/goldenBeanConfigDetail'),
      hidden: true,
      name: 'signToMoneyGoldenBeanConfigDetail',
      meta: { title: '金豆配置详情' }
    }
  ]
}

export default signToMoneyRouter
