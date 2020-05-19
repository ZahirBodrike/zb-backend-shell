import Layout from '@/layout'

const materialRouter = {
  path: '/material',
  component: Layout,
  redirect: 'noRedirect',
  name: 'material',
  alwaysShow: true,
  meta: {
    title: '素材中心',
    icon: 'shopping'
  },
  children: [
    {
      path: 'goods/list',
      component: () => import('@/views/material/goods/list'),
      name: 'goodsMaterialList',
      meta: { title: '优选好货' }
    },
    {
      path: 'goods/detail',
      component: () => import('@/views/material/goods/detail'),
      name: 'goodsMaterialDetail',
      hidden: true,
      meta: { title: '优选好货详情' }
    },
    {
      path: 'spread/list',
      component: () => import('@/views/material/spread/list'),
      name: 'spreadMaterialList',
      meta: { title: '宣传素材' }
    },
    {
      path: 'spread/detail',
      component: () => import('@/views/material/spread/detail'),
      name: 'spreadMaterialDetail',
      hidden: true,
      meta: { title: '宣传素材详情' }
    }
  ]
}

export default materialRouter
