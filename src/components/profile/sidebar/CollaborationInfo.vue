<template>
  <section class="collaboration-section">
    <div class="section-header-row mb-4">
      <h3 class="section-title">Collaboration Opportunities</h3>
    </div>

    <!-- Collaboration Grid -->
    <div v-if="collaborationData" class="collaboration-grid">
      <div class="collaboration-card">
        <div class="card-content">
          <!-- Logo Area -->
          <div class="logo-wrapper">
            <img :src="collaborationData.company_logo" alt="Company Logo" class="company-logo">
          </div>

          <!-- Action Area -->
          <div class="card-actions">
            <a :href="collaborationData.company_link" target="_blank" class="website-btn">
              <span>Visit Website</span>
              <i class="bi bi-arrow-up-right-circle-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state-card" :class="{ 'clickable': isOwnProfile }"
      @click="isOwnProfile ? onAddCollaboration() : null">
      <div class="empty-visual">
        <div class="icon-circle">
          <i class="bi bi-people"></i>
        </div>
        <div class="sparkles">
          <span class="sparkle"></span>
          <span class="sparkle"></span>
          <span class="sparkle"></span>
        </div>
      </div>
      <div class="empty-content">
        <h4>No Collaborations Yet</h4>
        <p v-if="isOwnProfile">Post your first collaboration opportunity to connect with partners.</p>
        <p v-else>This user hasn't shared any collaboration opportunities yet.</p>

        <BaseButton v-if="isOwnProfile" variant="primary" class="mt-4">
          <i class="bi bi-plus-lg me-2"></i>
          Add Collaboration
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useProfileStore } from '@/stores/profile'
import BaseButton from '@/components/ui/base/BaseButton.vue'

const profileStore = useProfileStore()

const emit = defineEmits(['open-collab'])

const isOwnProfile = computed(() => {
  return profileStore.viewUser === null
})

const collaborationData = computed(() => {
  return profileStore.user?.collaboration.company_logo && profileStore.user?.collaboration.company_link
    ? profileStore.user?.collaboration
    : null
})




const onAddCollaboration = () => {
  emit('open-collab')
}


</script>

<style scoped>
.collaboration-section {
  animation: fadeIn 0.6s ease-out;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.02em;
}

/* Updated Grid Layout */
.collaboration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.collaboration-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
  aspect-ratio: 1 / 1;
}

.collaboration-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
}

/* Logo Styling */
.logo-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
}

.company-logo {
  border-radius: 10px;
  max-width: 100%;
  max-height: 100px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.collaboration-card:hover .company-logo {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.05);
}

.logo-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-background);
  color: var(--color-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

/* Action Button */
.card-actions {
  margin-top: auto;
  text-align: center;
}

.website-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  width: 100%;
  background: var(--color-background);
  color: var(--color-text);
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.website-btn:hover {
  background: var(--color-primary);
  color: var(--color-surface);
  transform: translateY(-2px);
}

.no-link-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--color-muted);
  padding: 0.5rem;
}

/* Empty State */
.empty-state-card {
  padding: 5rem 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 30px;
  text-align: center;
}

.empty-visual {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 2rem;
}

.icon-circle {
  width: 100px;
  height: 100px;
  background: var(--color-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-primary);
  position: relative;
  z-index: 2;
}

.sparkles .sparkle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  animation: sparkle-float 3s infinite;
}

.sparkle:nth-child(1) {
  top: -10px;
  left: -10px;
  animation-delay: 0s;
}

.sparkle:nth-child(2) {
  top: 20px;
  right: -20px;
  animation-delay: 1s;
}

.sparkle:nth-child(3) {
  bottom: -10px;
  left: 20px;
  animation-delay: 2s;
}

.empty-content h4 {
  font-size: 1.75rem;
  font-weight: 850;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.empty-content p {
  color: var(--color-muted);
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
}

@keyframes sparkle-float {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.5;
  }

  50% {
    transform: translate(5px, -10px) rotate(15deg);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .collaboration-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  .website-btn span {
    display: none;
  }

  .website-btn i {
    font-size: 1.2rem;
  }
}
</style>
