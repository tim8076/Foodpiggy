import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/front/PageIndex.vue'),
    children: [
      {
        path: 'home',
        name: 'indexHome',
        component: () => import('../views/front/PageHome.vue'),
      },
      {
        path: 'category/:category',
        name: 'indexCategory',
        component: () => import('../views/front/PageCategory.vue'),
      },
      {
        path: 'favorite',
        name: 'favorite',
        component: () => import('../views/front/PageFavorite.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/back/PageLogin.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/back/PageDashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'dashboardProducts',
        component: () => import('../views/back/PageProductList.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
