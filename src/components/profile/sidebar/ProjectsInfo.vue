<template>
  <section class="projects-section">
    <!-- Project List -->
    <template v-if="projects.length">
      <InfoCard
        v-for="project in projects"
        :key="project.id"
        :title="project.title || 'Project'"
        icon="bi bi-folder"
        class="project-card"
        @create="onCreate"
        @update="onUpdate(project)"
        @delete="onDelete(project.id)"
      >
        <div v-if="project.link" class="info-row">
          <i class="bi bi-link-45deg icon"></i>
          <router-link :to="project.link" target="_blank" class="project-link">{{ project.link }}</router-link>
        </div>
      </InfoCard>
    </template>

    <!-- Empty State -->
    <InfoCard
      v-else
      title="Projects"
      icon="bi bi-folder"
      :showUpdate="false"
      :showDelete="false"
      @create="onCreate"
    >
      <div class="no-data">
        <p>No projects available</p>
      </div>
    </InfoCard>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import InfoCard from '../InfoCard.vue'

const profileStore = useProfileStore()
const projects = computed(() => profileStore.user?.projects || [])

const onCreate = () => console.log('Create project triggered')
const onUpdate = (project) => console.log('Update project triggered', project)
const onDelete = (id) => console.log('Delete project triggered', id)

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
  margin-bottom: 1rem;
}

.project-card:last-child {
  margin-bottom: 0;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  width: 20px;
  text-align: center;
  font-size: 1.1rem;
  color: var(--color-text-muted, #64748b);
  flex-shrink: 0;
}

.project-link {
  font-size: 0.875rem;
  color: var(--color-primary, #2563eb);
  text-decoration: none;
  word-break: break-all;
  transition: opacity 0.2s ease;
}

.project-link:hover {
  text-decoration: underline;
  opacity: 0.8;
}

.no-data {
  text-align: center;
  padding: 0.5rem;
  color: var(--color-text-muted, #64748b);
}
</style>
