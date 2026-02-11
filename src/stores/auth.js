import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'
import router from '@/router'
import { showSuccess, showError } from '@/utils/toast'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const user = ref(null)
  const emailForget = ref('')
  const otpForget = ref('')
  const userResult = ref('')

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const fetchProfile = async () => {
    try {
      const response = await api.get('/api/profile')
      user.value = response.data.data
    } catch (error) {
      clearAuth()
      throw error
    }
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  const login = async (payload) => {
    try {
      const response = await api.post('/api/login', payload)
      token.value = response.data.data.token
      localStorage.setItem('token', token.value)

      if (response.data.result === false) {
        showError(response.data.message)
      } else {
        showSuccess(response.data.message)
        router.push({ name: 'home' })
      }

    } catch (error) {
      showError(error.response?.data?.message || 'Login failed')
      throw error.response
    }
  }

  const logout = async () => {
    try {
      await api.delete('/api/login')
      showSuccess('Logout successful')

    } catch (error) {
      console.error('Logout failed:', error)
      showError('Logout failed')
    } finally {
      token.value = null
      localStorage.removeItem('token')
      router.push({ name: 'landing' })
    }
  }

  const forgetPassword = async (payload) => {
    try {
      const response = await api.post('/api/forgot/pass', payload)
      user.value = response.data
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to reset password')
      throw error
    }
  }

  const otpPassword = async (payload) => {
    try {
      const response = await api.post('/api/forgot/verify-otp', payload)
      user.value = response.data
    } catch (error) {
      showError(error.response?.data?.message || 'Invalid OTP')
      throw error
    }
  }

  const resetPassword = async (payload) => {
    try {
      const response = await api.post('/api/reset/pass', payload)
      user.value = response.data
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to reset password')
      throw error
    }
  }

  const register = async (payload) => {
    try {
      const response = await api.post('/api/register', payload)
      console.log('Register response:', response.data)

      const { result, message, data } = response.data

      if (result === false || result === 'false') {
        showError(message || 'Registration failed')
        userResult.value = false
        return
      }

      userResult.value = true
      user.value = data
      token.value = data?.token
      if (token.value) {
        localStorage.setItem('token', token.value)
      }
      showSuccess('Account created successfully!')


    } catch (error) {
      let errorMsg = 'Registration failed'
      const responseData = error.response?.data

      if (responseData?.data && typeof responseData.data === 'object') {
        // Handle case where validation errors are in response.data.data
        const keys = Object.keys(responseData.data)
        if (keys.length > 0) {
          const firstKey = keys[0]
          const firstError = responseData.data[firstKey]
          if (Array.isArray(firstError) && firstError.length > 0) {
            errorMsg = firstError[0]
          } else {
            errorMsg = String(firstError)
          }
        } else if (responseData?.message) {
          errorMsg = responseData.message
        }
      } else if (responseData?.errors) {
        // Extract the first validation error if available
        const firstErrorKey = Object.keys(responseData.errors)[0]
        errorMsg = responseData.errors[firstErrorKey][0]
      } else if (responseData?.message) {
        errorMsg = responseData.message
      }
      showError(errorMsg)
      console.error('Register error:', error.response?.data || error)
      userResult.value = false
    } finally {
      console.log('Registration attempt finished.')
    }
  }

  const userType = async (payload) => {
    try {
      const response = await api.put('/api/auth/update-user-type', payload)
      user.value = response.data.data
    } catch (error) {
      console.error('Update user type error:', error)
      throw error
    }
  }

  const userPosition = async (payload) => {
    try {
      const response = await api.put("/api/auth/update-position", payload)
      user.value = response.data.data
    } catch (error) {
      console.error('Update user position error:', error)
      throw error
    }
  }

  return {
    token,
    login,
    logout,
    fetchProfile,
    isAuthenticated,
    user,
    clearAuth,
    forgetPassword,
    otpPassword,
    emailForget,
    resetPassword,
    otpForget,
    register,
    userResult,
    userType,
    userPosition
  }
})
