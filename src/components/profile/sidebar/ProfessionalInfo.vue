<template>
  <div>
    <!-- Card When view own profile -->
    <InfoCard
      v-if="isOwnProfile"
      title="Professional"
      icon="bi bi-briefcase"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @update="UpdateProfessional"
    >
      <div v-if="profileStore.user?.professional" class="professional-card">
        <!-- Job Title -->
        <div class="info-row job-title-row">
          <i class="bi bi-person-workspace icon"></i>
          <h4 class="job-title">Job Title: {{ profileStore.user.professional.job_title }}</h4>
        </div>

        <!-- Company Name -->
        <div class="info-row">
          <i class="bi bi-building icon"></i>
          <span class="company-text"
            >Company: {{ profileStore.user.professional.company_name }}</span
          >
        </div>

        <!-- Responsibility -->
        <div
          v-if="profileStore.user.professional.responsibility"
          class="info-row responsibility-row"
        >
          <i class="bi bi-list-check icon"></i>
          <p class="responsibility-text">
            Responsibility: {{ profileStore.user.professional.responsibility }}
          </p>
        </div>
      </div>

      <div v-else class="no-data">
        <p>No professional information available</p>
      </div>
    </InfoCard>

    <!-- Card When view other user's profile -->
    <InfoCard
      v-else
      title="Professional"
      icon="bi bi-briefcase"
      :showCreate="false"
      :showUpdate="false"
      :showDelete="false"
    >
      <div v-if="profileStore.viewUser?.professional" class="professional-card">
        <!-- Job Title -->
        <div class="info-row job-title-row">
          <i class="bi bi-person-workspace icon"></i>
          <h4 class="job-title">Job Title: {{ profileStore.viewUser.professional.job_title }}</h4>
        </div>

        <!-- Company Name -->
        <div class="info-row">
          <i class="bi bi-building icon"></i>
          <span class="company-text"
            >Company: {{ profileStore.viewUser.professional.company_name }}</span
          >
        </div>

        <!-- Responsibility -->
        <div
          v-if="profileStore.viewUser.professional.responsibility"
          class="info-row responsibility-row"
        >
          <i class="bi bi-list-check icon"></i>
          <p class="responsibility-text">
            Responsibility: {{ profileStore.viewUser.professional.responsibility }}
          </p>
        </div>
      </div>

      <div v-else class="no-data">
        <p>No professional information available</p>
      </div>
    </InfoCard>
  </div>
</template>

<script setup>
import InfoCard from '../InfoCard.vue'
import { onMounted, computed } from 'vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()

const isOwnProfile = computed(() => {
  return profileStore.viewUser === null
})

const UpdateProfessional = () => {
  console.log('Update professional triggered')
}

onMounted(async () => {
  if (!profileStore.user) {
    try {
      await profileStore.fetchProfile()
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }
})
</script>

<style scoped>
.professional-card {
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-row.job-title-row {
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.icon {
  font-size: 1rem;
  color: #1f2937;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.job-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.company-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.responsibility-row {
  align-items: flex-start;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.responsibility-row .icon {
  margin-top: 2px;
}

.responsibility-text {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
  line-height: 1.6;
}

.no-data {
  padding: 16px;
  text-align: center;
  color: #6b7280;
}

.no-data p {
  margin: 0;
  font-size: 0.875rem;
}
</style>
