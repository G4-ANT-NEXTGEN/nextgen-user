<template>
  <ViewProfileUserLayout v-if="!isLoading" :userData="userProfile" />
  <div v-else class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ViewProfileUserLayout from '@/layout/ViewProfileUserLayout.vue'
import api from '@/api/api'

const route = useRoute()
const userProfile = ref(null)
const isLoading = ref(true)

const fetchUserProfile = async () => {
  try {
    isLoading.value = true
    const userId = route.params.id
    const res = await api.get(`/api/profile/${userId}`)
    userProfile.value = res.data.data
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchUserProfile()
})
</script>