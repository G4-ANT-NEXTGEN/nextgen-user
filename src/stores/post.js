import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'
import { showSuccess, showError } from '@/utils/toast'

export const usePostStore = defineStore('post', () => {
  const posts = ref([])
  const post = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const page = ref(1)
  const search = ref('')
  const pagination = ref({
    has_page: false,
    on_first_page: true,
    has_more_pages: false,
    first_item: 0,
    last_item: 0,
    total: 0,
    current_page: 1,
    last_page: 1
  })

  const fetchPosts = async (isLoadMore = false) => {
    if (loading.value) return
    loading.value = true

    try {
      if (!isLoadMore) {
        page.value = 1
      }

      const response = await api.get('/api/posts', {
        params: {
          page: page.value,
          per_page: 20,
          category: 0,
          search: search.value,
        },
      })

      if (isLoadMore) {
        posts.value = [...posts.value, ...response.data.data]
      } else {
        posts.value = response.data.data
      }

      if (response.data.paginate) {
        pagination.value = response.data.paginate
      }
    } catch (err) {
      error.value = err
      showError('Failed to fetch posts')
    } finally {
      loading.value = false
    }
  }

  const fetchMorePosts = async () => {
    if (pagination.value.has_more_pages && !loading.value) {
      page.value++
      await fetchPosts(true)
    }
  }

  const fetchPostsById = async (id) => {
    loading.value = true
    try {
      const response = await api.get(`/api/posts/${id}`)
      post.value = response.data.data
      console.log(post.value);

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

  const updatePost = async (id, payload) => {
    try {
      const response = await api.post(`/api/posts/${id}`, payload)
      showSuccess('Post updated successfully')
    } catch (err) {
      console.log(err.response?.data);
      showError('Failed to update post');
    }
  }

  const deletePost = async (id) => {
    try {
      await api.delete(`/api/posts/${id}`)
      showSuccess('Post deleted successfully')
      await fetchPosts()
    } catch (err) {
      console.log(err.response?.data);
      showError('Failed to delete post');
    }
  }

  return {
    posts,
    post,
    loading,
    error,
    search,
    pagination,
    fetchPosts,
    fetchMorePosts,
    fetchPostsById,
    createPost,
    updatePost,
    deletePost
  }
})
