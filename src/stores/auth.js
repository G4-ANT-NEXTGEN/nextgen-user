import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'
import router from '@/router'
import { useToastStore } from './toast'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'))
    const user = ref(null)
    const emailForget = ref('')
    const otpForget = ref('')
    const userResult = ref('')



    const isAuthenticated = computed(() => !!token.value && !!user.value);

    const fetchProfile = async () => {
        const toast = useToastStore()

        try {
            const response = await api.get('/api/profile')
            user.value = response.data.data

            if (user.value?.result) {
                toast.success('Login successful')
            } else {
                toast.error('Invalid email or password')
            }
        } catch (error) {
            toast.error('Failed to fetch profile')
            clearAuth()
            throw error
        }
    }

    const clearAuth = () => {
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
    }

    const login = async (payload) => {
        const toast = useToastStore()
        try {
            const response = await api.post('/api/login', payload)
            token.value = response.data.data.token
            localStorage.setItem('token', token.value)
            await fetchProfile()
            toast.success('Login successful')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
            throw error
        }
    }

    const logout = async () => {
        const toast = useToastStore()
        try {
            await api.delete('/api/login')
            toast.success('Logout successful')
        } catch (error) {
            console.error('Logout failed:', error)
            toast.error('Logout failed')
        } finally {
            token.value = null
            localStorage.removeItem('token')
            router.push('/login')
        }
    }

    const forgetPassword = async (payload) => {
        const toast = useToastStore()
        try {
            const response = await api.post('/api/forgot/pass', payload)
            user.value = response.data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP')
            throw error
        }
    }

    const otpPassword = async (payload) => {
        const toast = useToastStore()
        try {
            const response = await api.post('/api/forgot/verify-otp', payload)
            user.value = response.data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid OTP')
            throw error
        }
    }

    const resetPassword = async (payload) => {
        const toast = useToastStore()
        try {
            const response = await api.post('/api/reset/pass', payload)
            user.value = response.data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password')
            throw error
        }
    }

    const register = async (payload) => {
        const toast = useToastStore()
        try {
            const response = await api.post('/api/register', payload)
            console.log('Register response:', response.data)

            const { result, message, data } = response.data
            userResult.value = result

            if (result) {
                token.value = data.token
                user.value = data
                localStorage.setItem('token', token.value)
                await fetchProfile()
                toast.success('Account created successfully!')
            } else {
                // Handle validation errors
                if (data && typeof data === 'object') {
                    const errors = Object.entries(data)
                        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                        .join('\n')
                    console.log('Validation errors:', errors)
                    toast.error(errors || message || 'Registration failed')
                } else {
                    toast.error(message || 'Registration failed')
                }
            }
        } catch (error) {
            console.error('Register error:', error.response?.data)
            toast.error(error.response?.data?.message || 'Registration failed')
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
        userResult
    }
})
