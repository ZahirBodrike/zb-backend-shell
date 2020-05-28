import Layout from '@/layout'

const financeMngRouter = {
  sort: 15,
  path: '/finance',
  component: Layout,
  redirect: 'noRedirect',
  name: 'finance',
  alwaysShow: true,
  meta: {
    title: '财务管理',
    icon: 'money'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/financeMng/list'),
      name: 'financeList',
      meta: { title: '对账单' }
    },
    {
      path: 'cashoutRecord',
      component: () => import('@/views/financeMng/cashoutRecord'),
      name: 'cashoutRecord',
      meta: { title: '提现记录' }
    }
  ]
}

export default financeMngRouter

