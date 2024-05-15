import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../login/pages/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../Home/pages/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../products/pages/Products.vue')
    },
    {
      path: '/products/:id',
      name: 'product',
      component: () => import('../products/pages/Product.vue')
    }
  ]
})

export default router

// router.beforeEach((to, from, next) => {
//   // Verificar si la ruta requiere autenticación y si el usuario está autenticado
//   if (to.meta.requiresAuth && !isAuthenticated()) {
//     // Si la ruta requiere autenticación y el usuario no está autenticado, redirigirlo a la página de inicio de sesión
//     next('/login')
//   } else {
//     // Si no se requiere autenticación o el usuario está autenticado, permitir el acceso a la ruta
//     next()
//   }
// })
