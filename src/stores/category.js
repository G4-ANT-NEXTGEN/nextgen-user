import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([])
    const category = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const fetchCategorys = async () => {
        loading.value = true
        try {
            const response = await api.get('/api/categories')
            categories.value = response.data.data
        } catch (err) {
            error.value = err
        } finally {
            loading.value = false
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
