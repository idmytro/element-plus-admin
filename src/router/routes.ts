import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

function requireAuth (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void {
  const isAuthenticated = !!store.state.user.userName
  if (!isAuthenticated) next({ name: 'SignIn' })
  else next()
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    meta: {
      hidden: true,
    },
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/common/redirect.vue'),
      },
    ],
  },

  {
    path: '/not-found',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/common/not-found.vue'),
  },

  {
    path: '/sign-in',
    name: 'SignIn',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/sign-in/index.vue'),
  },

  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {},
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
    beforeEnter: requireAuth,
  },

  {
    path: '/:pathMatch(.*)',
    redirect: '/not-found',
    meta: {
      hidden: true,
    },
  },
]

export default routes
