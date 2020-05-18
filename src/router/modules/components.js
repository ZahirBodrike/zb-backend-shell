/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  hidden: true,
  alwaysShow: true,
  meta: {
    title: 'Components',
    icon: 'component'
  },
  children: [
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: 'test page' }
    }
  ]
}

export default componentsRouter
