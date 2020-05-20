import Layout from '@/layout'

const addOilMngRouter = {
  path: '/addOil',
  component: Layout,
  redirect: 'noRedirect',
  name: 'addOil',
  alwaysShow: true,
  meta: {
    title: '加油管理',
    icon: 'list'
  },
  children: [
    {
      path: 'privilege',
      component: () => import('@/views/addOilMng/privilege'),
      name: 'addOilPrivilege',
      meta: { title: '加油特权' }
    },
    {
      path: 'repeatStation',
      component: () => import('@/views/addOilMng/repeatStation'),
      name: 'repeatStation',
      meta: { title: '重复油站标记' }
    }
  ]
}

export default addOilMngRouter
