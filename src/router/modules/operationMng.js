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
      path: 'homepage-choice-list',
      component: () => import('@/views/operationMng/homePageChoice/list'),
      name: 'homepageChoiceList',
      meta: { title: '首页精选商品推荐' }
    },
    {
      path: 'message-center-list',
      component: () => import('@/views/operationMng/messageCenter/list'),
      name: 'messageCenterList',
      meta: { title: '消息中心' }
    },
    {
      path: 'message-center-detail',
      component: () => import('@/views/operationMng/messageCenter/detail'),
      hidden: true,
      name: 'messageCenterDetail',
      meta: { title: '消息中心详情' }
    },
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
    },
    {
      path: 'search-hot-word-detail',
      component: () => import('@/views/operationMng/searchHotWordMng/detail'),
      hidden: true,
      name: 'searchHotWordListDetail',
      meta: { title: '搜索热词管理详情' }
    },
    {
      path: 'invitePoster/list',
      component: () => import('@/views/operationMng/invitePoster/list'),
      name: 'invitePosterList',
      meta: { title: '邀请海报' }
    },
    {
      path: 'goods/detail',
      component: () => import('@/views/operationMng/invitePoster/detail'),
      name: 'invitePosterDetail',
      hidden: true,
      meta: { title: '邀请海报详情' }
    }
  ]
}

export default operationMngRouter
