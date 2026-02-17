<template>
  <ViewProfileUserLayout :userData="userProfile" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ViewProfileUserLayout from '@/layout/ViewProfileUserLayout.vue'
import { useProfileStore } from '@/stores/profile'

const route = useRoute()
const profileStore = useProfileStore()
const userProfile = ref(null)
const isLoading = ref(true)

const fetchUserProfile = async () => {
  try {
    isLoading.value = true
    const userId = route.params.id
    await profileStore.fetchProfileById(userId)
    userProfile.value = profileStore.viewUser
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
