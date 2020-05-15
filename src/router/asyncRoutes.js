import componentsRouter from './modules/components'

const asyncRoutes = [
  componentsRouter,

  { path: '*', redirect: '/404', hidden: true }
]

export default asyncRoutes
