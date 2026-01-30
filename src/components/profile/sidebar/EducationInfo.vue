<template>
  <div class="education-section">
    <!-- Education Cards -->
    <template v-if="educations.length">
      <div v-for="edu in educations" :key="edu.id" class="education-item">
        <InfoCard
          :title="edu.school?.name || 'Education'"
          icon="bi bi-mortarboard"
          @create="onCreate"
          @update="onUpdate(edu)"
          @delete="onDelete(edu.id)"
        >
          <div class="edu-content">
            <div class="info-row">
              <i class="bi bi-mortarboard icon"></i>
              <span class="text-medium">{{ edu.degree?.name }}</span>
            </div>

            <div v-if="edu.subject?.name" class="info-row">
              <i class="bi bi-book icon"></i>
              <span class="text-regular">{{ edu.subject?.name }}</span>
            </div>

            <div class="info-row">
              <i class="bi bi-calendar3 icon"></i>
              <span class="text-muted">{{ edu.start_date }} - {{ edu.end_date || 'Present' }}</span>
            </div>

            <div v-if="edu.description" class="info-row description">
              <i class="bi bi-info-circle icon"></i>
              <p class="description-text">{{ edu.description }}</p>
            </div>
          </div>
        </InfoCard>
      </div>
    </template>

    <!-- Placeholder for Empty State -->
    <InfoCard
      v-else
      title="Education"
      icon="bi bi-mortarboard"
      :showUpdate="false"
      :showDelete="false"
      @create="onCreate"
    >
      <div class="no-data">
        <p>No education info available</p>
      </div>
    </InfoCard>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import InfoCard from '../InfoCard.vue'

const profileStore = useProfileStore()
const educations = computed(() => profileStore.user?.educations || [])

// Handlers
const onCreate = () => console.log('Create education triggered')
const onUpdate = (edu) => console.log('Update education triggered', edu)
const onDelete = (id) => console.log('Delete education triggered', id)

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
.education-item {
  margin-bottom: 1rem;
}

.education-item:last-child {
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

.icon {
  width: 20px;
  text-align: center;
  font-size: 1rem;
  color: var(--color-text-muted, #64748b);
  flex-shrink: 0;
}

.text-medium {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text, #334155);
}

.text-regular {
  font-size: 0.875rem;
  color: var(--color-text-muted, #475569);
}

.text-muted {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text-muted, #64748b);
}

.info-row.description {
  align-items: flex-start;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color, #e5e7eb);
}

.description .icon {
  margin-top: 2px;
}

.description-text {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted, #475569);
  margin: 0;
}

.no-data {
  text-align: center;
  padding: 1rem;
  color: var(--color-text-muted, #64748b);
}
</style>
