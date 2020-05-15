import componentsRouter from './modules/components'
import Layout from '@/layout'

const asyncRoutes = [
  componentsRouter,

  {
    path: '/test',
    name: 'test',
    redirect: '/test/index',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'test-component' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/test-table'),
        meta: { title: 'test-table' }
      },
      {
        path: 'form',
        component: () => import('@/views/test-search'),
        meta: { title: 'test-form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default asyncRoutes
