<template>
  <div class="profile-page p-4">
    <ViewProfileUserHeader :activeTab="activeTab" :userData="userData" @change-tab="activeTab = $event" />

    <div class="profile-main-container">
      <div class="row g-4">
        <div class="col-lg-4 col-xl-3">
          <!-- Sidebar - Read Only Version -->
          <aside class="profile-sidebar-column">
            <ViewProfileUserSidebar :userData="userData" @change-tab="activeTab = $event" />
          </aside>
        </div>

        <div class="col-lg-8 col-xl-9">
          <!-- Main content -->
          <main class="profile-content-column">
            <transition name="fade-slide" mode="out-in">
              <component :is="currentComponent" :userData="userData" />
            </transition>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import ViewProfileUserHeader from '@/components/profile/ViewProfileUserHeader.vue'
import ViewProfileUserSidebar from '@/components/profile/ViewProfileUserSidebar.vue'

import PersonalInfo from '@/components/profile/sidebar/PersonalInfo.vue'
import ProfessionalInfo from '@/components/profile/sidebar/ProfessionalInfo.vue'
import ProjectsInfo from '@/components/profile/sidebar/ProjectsInfo.vue'
import EducationInfo from '@/components/profile/sidebar/EducationInfo.vue'
import CollaborationInfo from '@/components/profile/sidebar/CollaborationInfo.vue'
import CVInfo from '@/components/profile/sidebar/CVInfo.vue'

defineProps({
  userData: {
    type: Object,
    required: true,
  },
})

const activeTab = ref('overview')

const map = {
  overview: PersonalInfo,
  professional: ProfessionalInfo,
  project: ProjectsInfo,
  education: EducationInfo,
  collaboration: CollaborationInfo,
  cv: CVInfo,
}

const currentComponent = computed(() => map[activeTab.value])
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding-bottom: 3rem;
  background-color: var(--color-background);
}

.profile-main-container {
  max-width: 1400px;
  margin: 0 auto;
}

.profile-sidebar-column {
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-content-column {
  min-height: 500px;
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 991px) {
  .profile-sidebar-column {
    position: static;
    margin-bottom: 2rem;
  }
}
</style>
