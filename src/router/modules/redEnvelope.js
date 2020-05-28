import Layout from '@/layout'

const redEnvelopeWarRouter = {
  sort: 14,
  path: '/red-envelope',
  component: Layout,
  redirect: 'noRedirect',
  name: 'redEnvelope',
  alwaysShow: true,
  meta: {
    title: '整点抢红包管理',
    icon: 'email'
  },
  children: [
    {
      path: 'rule',
      component: () => import('@/views/redEnvelope/rule'),
      name: 'redEnvelopeRule',
      meta: { title: '红包配置' }
    },
    {
      path: 'list',
      component: () => import('@/views/redEnvelope/list'),
      name: 'redEnvelopeList',
      meta: { title: '数据统计' }
    }
  ]
}

export default redEnvelopeWarRouter
