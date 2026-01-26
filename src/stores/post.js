import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'
import router from '@/router'
import { showSuccess, showError } from '@/utils/toast'

export const usePostStore = defineStore('post', () => {
    const posts = ref([])
    const post = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const fetchPosts = async () => {
        try {
            const response = await api.get('/api/posts')
            posts.value = response.data.data
        } catch (err) {
            error.value = err
            showError('Failed to fetch posts')
        } finally {
            loading.value = false
        }

    }

    const fetchPostsById = async (id) => {
        loading.value = true
        try {
            const response = await api.get(`/api/posts/${id}`)
            post.value = response.data.data
        } catch (err) {
            error.value = err
            showError('Failed to fetch post')
        } finally {
            loading.value = false
        }
    }

    const createPost = async (payload) => {
        try {
            const response = await api.post('/api/posts', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            showSuccess('Post created successfully')
            return response.data.data
        } catch (err) {
            console.log(err.response?.data)
            showError('Failed to create post')
        }

    }

    return {
        posts,
        post,
        loading,
        error,
        fetchPosts,
        fetchPostsById,
        createPost
    }
})
