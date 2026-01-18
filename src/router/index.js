import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'
import Login from '@/components/authentication/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
  ],
})


router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  document.title = to.meta.title ? to.meta.title + " - My Admin" : "My Admin"

  // check user have token or not and have user profile data
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchProfile()
    } catch (error) {
      authStore.logout()
      return { name: 'login' }
    }
  }

  // redirect to login if not authenticated
  if (to.name !== 'login' && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.name === 'login' && authStore.isAuthenticated) {
    // return { name: 'dashboard' }
  }

  return true
})

export default router


