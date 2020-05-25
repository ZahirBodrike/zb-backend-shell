const routerModules = require.context('./modules', true, /\.js$/)

const router = []

routerModules.keys().forEach(key => {
  router.push(routerModules(key).default)
})

router.sort((a, b) => a.sort ? (a.sort - b.sort) : -1)

const asyncRoutes = [
  ...router,

  { path: '*', redirect: '/404', hidden: true }
]

export default asyncRoutes
