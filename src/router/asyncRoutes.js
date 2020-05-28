import { sortBy } from 'lodash'

const routerModules = require.context('./modules', true, /\.js$/)

const router = []

routerModules.keys().forEach(key => {
  router.push(routerModules(key).default)
})

const sortedRouter = sortBy(router, i => i.sort)

const asyncRoutes = [
  ...sortedRouter,

  { path: '*', redirect: '/404', hidden: true }
]

export default asyncRoutes
