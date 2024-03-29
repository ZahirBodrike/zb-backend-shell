import Vue from 'vue'
import Router from 'vue-router'

import constantRoutes from './constantRoutes'
import asyncRoutes from './asyncRoutes'

Vue.use(Router)

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes.concat(asyncRoutes)
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
