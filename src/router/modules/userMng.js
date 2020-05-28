import Layout from '@/layout'

const userMngRouter = {
  sort: 6,
  path: '/user',
  component: Layout,
  redirect: 'noRedirect',
  name: 'user',
  alwaysShow: true,
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user/list'),
      name: 'userList',
      meta: { title: '用户列表' }
    }
  ]
}

export default userMngRouter
