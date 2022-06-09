import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _850c5030 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _81988422 = () => interopDefault(import('../pages/manager/index.vue' /* webpackChunkName: "pages/manager/index" */))
const _3f173da0 = () => interopDefault(import('../pages/perfil/index.vue' /* webpackChunkName: "pages/perfil/index" */))
const _3176b1ac = () => interopDefault(import('../pages/perfil/edit.vue' /* webpackChunkName: "pages/perfil/edit" */))
const _97681236 = () => interopDefault(import('../pages/perfil/leads.vue' /* webpackChunkName: "pages/perfil/leads" */))
const _3097bbf2 = () => interopDefault(import('../pages/tag/_id/index.vue' /* webpackChunkName: "pages/tag/_id/index" */))
const _0d29ba4c = () => interopDefault(import('../pages/tag/_id/create/index.vue' /* webpackChunkName: "pages/tag/_id/create/index" */))
const _b001e9b0 = () => interopDefault(import('../pages/tag/_id/edit/index.vue' /* webpackChunkName: "pages/tag/_id/edit/index" */))
const _185b965e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _850c5030,
    name: "login"
  }, {
    path: "/manager",
    component: _81988422,
    name: "manager"
  }, {
    path: "/perfil",
    component: _3f173da0,
    name: "perfil"
  }, {
    path: "/perfil/edit",
    component: _3176b1ac,
    name: "perfil-edit"
  }, {
    path: "/perfil/leads",
    component: _97681236,
    name: "perfil-leads"
  }, {
    path: "/tag/:id",
    component: _3097bbf2,
    name: "tag-id"
  }, {
    path: "/tag/:id?/create",
    component: _0d29ba4c,
    name: "tag-id-create"
  }, {
    path: "/tag/:id?/edit",
    component: _b001e9b0,
    name: "tag-id-edit"
  }, {
    path: "/",
    component: _185b965e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
