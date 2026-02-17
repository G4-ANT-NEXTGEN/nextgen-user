<template>
  <router-view></router-view>
  <!-- Full Screen Loader for critical operations -->
  <FullScreenLoader v-if="profileStore.isDeletingAccount" text="Deleting your account..." />
</template>

<script setup>
import FullScreenLoader from '@/components/common/FullScreenLoader.vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()
</script>
