import Layout from '@/layout'

const couponMngRouter = {
  path: '/couponMng',
  component: Layout,
  redirect: 'noRedirect',
  name: 'couponMng',
  meta: {
    title: '卡券管理',
    icon: 'email'
  },
  children: [
    {
      path: 'http://www.baidu.com',
      name: 'couponList',
      meta: { title: '卡券管理' }
    }
  ]
}

export default couponMngRouter
