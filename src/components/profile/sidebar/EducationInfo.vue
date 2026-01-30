<template>
  <div>
    <InfoCard
      title="Education"
      icon="bi bi-mortarboard"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="true"
      @update="UpdateEducation"
    >
      <div
        v-for="education in profileStore.user?.educations"
        :key="education.id"
        class="education-card mb-3"
      >
        <!-- School Name -->
        <div class="info-row school">
          <i class="bi bi-building icon"></i>
          <h4 class="school-name">{{ education.school?.name }}</h4>
        </div>

        <!-- Degree -->
        <div class="info-row">
          <i class="bi bi-mortarboard icon"></i>
          <span class="degree-text">{{ education.degree?.name }}</span>
        </div>

        <!-- Subject -->
        <div v-if="education.subject?.name" class="info-row">
          <i class="bi bi-book icon"></i>
          <span class="subject-text">{{ education.subject?.name }}</span>
        </div>

        <!-- Date Range -->
        <div class="info-row">
          <i class="bi bi-calendar3 icon"></i>
          <span class="date-text"
            >{{ education.start_date }} - {{ education.end_date || 'Present' }}</span
          >
        </div>

        <!-- Description -->
        <div v-if="education.description" class="info-row description-row">
          <i class="bi bi-info-circle icon"></i>
          <p class="description-text">{{ education.description }}</p>
        </div>
      </div>

      <div v-if="!profileStore.user?.educations?.length" class="no-data">
        <p>No education info available</p>
      </div>
    </InfoCard>
  </div>
</template>

<script setup>
import InfoCard from '../InfoCard.vue'
import { onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()

const UpdateEducation = () => {
  console.log('Update education triggered')
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
.education-card {
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

.info-row.school {
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.icon {
  font-size: 1rem;
  color: #000;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.school-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.degree-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.subject-text {
  font-size: 0.875rem;
  color: #4b5563;
}

.date-text {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
}

.description-row {
  align-items: flex-start;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.description-row .icon {
  margin-top: 2px;
}

.description-text {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
  line-height: 1.6;
}
</style>
