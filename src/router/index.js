import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies';


import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LocationView from '../views/LocationView.vue' 
import SuitcasesView from '../views/SuitcasesView.vue' 
import VolumeView from '../views/VolumeView.vue' 

const cookies = useCookies(['token']);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/location',
      name: 'location',
      component: LocationView,
      meta: { requiresAuth: true },
    },
    {
      path: '/new-briefcase',
      name: 'new-briefcase',
      component: SuitcasesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/volume',
      name: 'volume',
      component: VolumeView,
      meta: { requiresAuth: true },
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !cookies.get('token')) {
    next('/');
  } else if (to.path === '/' && cookies.get('token')) {
    next('/home');
  }
  else {
    next();
  }
});

export default router
