import Layout from '@/layout'

const addOilMngRouter = {
  path: 'http://map.baidu.com',
  component: Layout,
  redirect: 'noRedirect',
  name: 'addOil',
  meta: {
    title: '加油管理',
    icon: 'list'
  }
}

export default addOilMngRouter
