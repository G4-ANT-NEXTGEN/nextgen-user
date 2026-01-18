import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'))
    const user = ref(null)

    const isAuthenticated = computed(() => !!token.value && !!user.value);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/api/profile');
            user.value = response.data.data;
        } catch (error) {
            clearAuth();
            throw error;
        }
    }

    const clearAuth = () => {
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
    }

    const login = async (payload) => {
        const response = await api.post('/api/login', payload);
        token.value = response.data.data.token;
        localStorage.setItem('token', token.value);
        await fetchProfile();
    };

    const logout = async () => {
        try {
            await api.delete('/api/login');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            token.value = null;
            localStorage.removeItem('token');
            router.push('/login');
        }
    };

    return { token, login, logout, fetchProfile, isAuthenticated, user, clearAuth }
})
