import Layout from '@/layout'

const addOilMngRouter = {
  path: '/addOil',
  component: Layout,
  redirect: 'noRedirect',
  name: 'addOil',
  meta: {
    title: '加油管理',
    icon: 'list'
  },
  children: [
    {
      path: 'http://www.baidu.com',
      name: 'addOilPrivilege',
      meta: { title: '加油管理' }
    }
  ]
}

export default addOilMngRouter
