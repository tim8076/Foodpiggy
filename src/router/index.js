import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/front/Home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/back/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/back/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'dashboardProducts',
        component: () => import('../views/back/ProductList.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
