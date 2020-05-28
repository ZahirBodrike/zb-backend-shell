import Layout from '@/layout'

const couponMngRouter = {
  sort: 10,
  path: 'http://www.baidu.com',
  component: Layout,
  redirect: 'noRedirect',
  name: 'couponMng',
  meta: {
    title: '卡券管理',
    icon: 'email'
  }
}

export default couponMngRouter
