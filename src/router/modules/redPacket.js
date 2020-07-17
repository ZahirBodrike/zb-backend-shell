import Layout from '@/layout'

const redPacketRouter = {
  sort: 3,
  path: '/redPacket',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '整点抢红包',
    icon: 'dashboard',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'config',
      component: () => import('@/views/redPacket/Config'),
      name: 'ConfigForRedPacket',
      meta: {
        title: '整点抢红包',
        icon: 'icon',
        noCache: false
      }
    },
    {
      path: 'list',
      component: () => import('@/views/redPacket/List'),
      name: 'ListForRedPacket',
      meta: {
        title: '数据统计',
        icon: 'icon',
        noCache: false
      }
    }
  ]
}

export default redPacketRouter
