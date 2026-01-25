import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'
import { showSuccess, showError } from '@/utils/toast'

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([])
    const category = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const fetchCategorys = async () => {
        try {
            const response = await api.get('/api/categories')
            categories.value = response.data.data
        } catch (err) {
            error.value = err
        }
    }

    return {
        categories,
        category,
        loading,
        error,
        fetchCategorys
    }
})
