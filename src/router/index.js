import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Login from '@/components/authentication/Login.vue'
import Register from '@/components/authentication/Register.vue'
import HomeView from '@/views/HomeView.vue'

import ResetLayout from '@/views/resetpassword/ResetLayout.vue'
import Step1Email from '@/views/resetpassword/Step1Email.vue'
import Step2OTP from '@/views/resetpassword/Step2OTP.vue'
import Step3NewPassword from '@/views/resetpassword/Step3NewPassword.vue'

import Step1CreateUserView from '@/views/register/Step1CreateUserView.vue'
import Step2TypeUserView from '@/views/register/Step2TypeUserView.vue'
import Step3PositionUserView from '@/views/register/Step3PositionUserView.vue'
import Step4PreviewUserView from '@/views/register/Step4PreviewUserView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login',
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: false,
        fromLogin: true
      },
      children: [
        {
          path: '/createuser',
          name: 'createuser',
          component: Step1CreateUserView,
          meta: { title: 'Create User' }
        },
        {
          path: '/typeuser',
          name: 'typeuser',
          component: Step2TypeUserView,
          meta: { title: 'Type User' }
        },
        {
          path: '/positionuser',
          name: 'positionuser',
          component: Step3PositionUserView,
          meta: { title: 'Position User' }
        },
        {
          path: '/previewuser',
          name: 'previewuser',
          component: Step4PreviewUserView,
          meta: { title: 'Preview User' }
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        requiresAuth: true
      }
    },

    {
      path: '/reset-password',
      component: ResetLayout,
      meta: {
        requiresAuth: false,
        fromLogin: true
      },
      children: [
        {
          path: '',
          redirect: { name: 'email' }
        },
        {
          path: 'email',
          name: 'email',
          component: Step1Email,
          meta: { title: 'Email', fromLogin: true }
        },
        {
          path: 'otp',
          name: 'otp',
          component: Step2OTP,
          meta: { title: 'OTP', fromLogin: true }
        },
        {
          path: 'new-password',
          name: 'new-password',
          component: Step3NewPassword,
          meta: { title: 'New Password', fromLogin: true }
        }
      ]
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'login' }
    }
  ]
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

  // If user is authenticated (has token), redirect from login only
  if (authStore.isAuthenticated) {
    if (to.name === 'login') {
      return { name: 'home' }
    }
    // Authenticated users can access all other routes including register
    return true
  }

  // If not authenticated, redirect to login for protected routes
  if (to.meta.requiresAuth) {
    return { name: 'login' }
  }

  return true
})


export default router