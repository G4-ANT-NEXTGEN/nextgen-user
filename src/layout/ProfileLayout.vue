<template>
  <div class="profile-page p-3">
    <AppNavbar @toggle-menu="toggleMobileMenu" />
    <NavigationMenu :isOpen="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

    <ProfileHeader :activeTab="activeTab" @change-tab="activeTab = $event" />

    <div class="profile-container">
      <div class="profile-layout">
        <!-- Sidebar -->
        <aside class="profile-sidebar">
          <ProfileSidebar />
        </aside>

        <!-- Main content -->
        <main class="profile-content">
          <div class="mb-3">
            <h5>Post Card</h5>
          </div>
          <component :is="currentComponent" />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import ProfileSidebar from '@/components/profile/ProfileSidebar.vue'

import PersonalInfo from '@/components/profile/sidebar/PersonalInfo.vue'
import ProfessionalInfo from '@/components/profile/sidebar/ProfessionalInfo.vue'
import ProjectsInfo from '@/components/profile/sidebar/ProjectsInfo.vue'
import EducationInfo from '@/components/profile/sidebar/EducationInfo.vue'
import CVInfo from '@/components/profile/sidebar/CVInfo.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'


const activeTab = ref('overview')
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const map = {
  overview: PersonalInfo,
  professional: ProfessionalInfo,
  project: ProjectsInfo,
  education: EducationInfo,
  cv: CVInfo,
}

const currentComponent = computed(() => map[activeTab.value])
</script>

<style scoped>
.profile-page {
  background: var(--color-background);
  min-height: 100vh;
  margin-top: 77px;
}

.profile-container {
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 0;
}

.profile-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1rem;
  align-items: start;
}

.profile-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.profile-content {
  min-height: 300px;
}

@media (max-width: 968px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }
}
</style>
