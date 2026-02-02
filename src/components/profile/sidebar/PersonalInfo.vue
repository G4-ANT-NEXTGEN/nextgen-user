<template>
  <div>
    <!-- Own Profile -->
    <InfoCard
      v-if="isOwnProfile"
      title="Personal"
      icon="bi bi-person"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @update="UpdatePersonal"
    >
      <p>Email: simvin@mail.com</p>
      <p>Cambodia</p>
    </InfoCard>

    <!-- Viewing Other User - Read Only -->
    <InfoCard
      v-else
      title="Personal"
      icon="bi bi-person"
      :showCreate="false"
      :showUpdate="false"
      :showDelete="false"
    >
      <p v-if="profileStore.viewUser?.email">Email: {{ profileStore.viewUser.email }}</p>
      <p v-if="profileStore.viewUser?.current_city">
        City: {{ profileStore.viewUser.current_city }}
      </p>
      <p v-if="profileStore.viewUser?.home_town">Hometown: {{ profileStore.viewUser.home_town }}</p>
    </InfoCard>
  </div>
</template>

<script setup>
import InfoCard from '../InfoCard.vue'
import { computed } from 'vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()

const isOwnProfile = computed(() => {
  return profileStore.viewUser === null
})

const UpdatePersonal = () => {
  console.log('Update personal triggered')
}
</script>