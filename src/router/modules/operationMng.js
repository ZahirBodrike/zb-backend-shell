import Layout from '@/layout'

const operationMngRouter = {
  path: '/operation',
  component: Layout,
  redirect: 'noRedirect',
  name: 'operation',
  alwaysShow: true,
  meta: {
    title: '运营管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'popup-mng-list',
      component: () => import('@/views/operationMng/popupMng/list'),
      name: 'popupMngList',
      meta: { title: '弹窗管理' }
    },
    {
      path: 'popup-mng-detail',
      component: () => import('@/views/operationMng/popupMng/detail'),
      hidden: true,
      name: 'popupMngListDetail',
      meta: { title: '弹窗管理详情' }
    },
    {
      path: 'search-hot-word-list',
      component: () => import('@/views/operationMng/searchHotWordMng/list'),
      name: 'searchHotWordList',
      meta: { title: '搜索热词管理' }
    }
  ]
}

export default operationMngRouter
