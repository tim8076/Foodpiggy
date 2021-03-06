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
        path: 'category',
        name: 'indexCategory',
        component: () => import('../views/front/PageCategory.vue'),
      },
      {
        path: 'shop/:shop',
        name: 'indexshop',
        component: () => import('../views/front/PageShop.vue'),
      },
      {
        path: 'order',
        name: 'indexOrder',
        component: () => import('../views/front/PageOrder.vue'),
      },
      {
        path: 'checkout/:orderId',
        name: 'indexCheckout',
        component: () => import('../views/front/PageCheckout.vue'),
      },
      {
        path: 'article/:article',
        name: 'indexArticle',
        component: () => import('../views/front/PageArticle.vue'),
      },
      {
        path: 'favorite',
        name: 'indexFavorite',
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
      {
        path: 'orders',
        name: 'dashboardOrders',
        component: () => import('../views/back/PageOrderlist.vue'),
      },
      {
        path: 'articles',
        name: 'dashboardArticles',
        component: () => import('../views/back/PageArticle.vue'),
      },
      {
        path: 'coupon',
        name: 'dashboardCoupon',
        component: () => import('../views/back/PageCoupon.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
