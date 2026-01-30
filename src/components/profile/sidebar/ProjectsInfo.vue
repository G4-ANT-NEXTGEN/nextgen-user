<template>
  <div>
    <InfoCard
      title="Projects"
      icon="bi bi-folder"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="true"
      @update="UpdateProjects"
    >
      <div v-for="project in profileStore.user?.projects" :key="project.id" class="project-card">
        <!-- Project Title -->
        <div class="info-row title-row">
          <i class="bi bi-folder2-open icon"></i>
          <h4 class="project-title">{{ project.title }}</h4>
        </div>

        <!-- Project Link -->
        <div v-if="project.link" class="info-row">
          <i class="bi bi-link-45deg icon"></i>
          <a :href="project.link" target="_blank" class="project-link">{{ project.link }}</a>
        </div>
      </div>

      <div v-if="!profileStore.user?.projects?.length" class="no-data">
        <p>No projects available</p>
      </div>
    </InfoCard>
  </div>
</template>

<script setup>
import InfoCard from '../InfoCard.vue'
import { onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()

const UpdateProjects = () => {
  console.log('Update projects triggered')
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
.project-card {
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 12px;
}

.project-card:last-child {
  margin-bottom: 0;
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

.info-row.title-row {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;
}

.icon {
  font-size: 1rem;
  color: #000;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.project-link {
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
  word-break: break-all;
}

.project-link:hover {
  text-decoration: underline;
  color: #1d4ed8;
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
