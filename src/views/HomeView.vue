<template>
  <div class="home-view">
    <ShootingStars v-if="theme === 'dark'" />
    <BackgroundBeams v-if="theme === 'dark'" />
    <AppNavbar @toggle-menu="toggleMobileMenu" />
    <NavigationMenu :isOpen="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

    <div class="home-container" :class="{ 'content-padding': isHomePage }">
      <div class="row g-4 h-100" v-if="isHomePage">
        <!-- Sidebar Left (Profile) -->
        <div class="col-xl-3 d-none d-xl-block h-100">
          <AppSidebar />
        </div>

        <!-- Main Content (Feed) -->
        <div class="col-xl-6 main-content-column h-100">
          <MainLayout>
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </MainLayout>
        </div>

        <!-- Sidebar Right -->
        <div class="col-xl-3 d-none d-xl-block h-100">
          <RightSidebar />
        </div>
      </div>

      <!-- Full Width Content (About, Help, Contact) -->
      <div v-else class="h-100 main-content-column">
        <MainLayout>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </MainLayout>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layout/MainLayout.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import RightSidebar from '@/components/layout/RightSidebar.vue';
import AppNavbar from '@/components/layout/AppNavbar.vue';
import ShootingStars from '@/components/ui/background/ShootingStars.vue';
import NavigationMenu from '@/components/layout/NavigationMenu.vue';
import BackgroundBeams from '@/components/ui/background/BackgroundBeams.vue';

import { useTheme } from '@/composables/useTheme';

const route = useRoute();
const { theme } = useTheme();
const isHomePage = computed(() => route.name === 'home');
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

defineOptions({
  name: 'HomeView'
});
</script>

<style scoped>
.home-view {
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  position: relative;
  /* Ensure absolute children like ShootingStars stay within bounds */
}

.home-container {
  flex: 1;
  margin-top: 70px;
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* Prevent content from leaking during transitions */
}

.content-padding {
  padding: 1.5rem;
  max-width: 1700px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

@media (min-width: 1200px) {
  .home-view {
    padding-left: 280px;
    /* Offset for fixed sidebar at view level */
  }

  .home-container {
    width: 100%;
  }
}

.main-content-column {
  position: relative;
  z-index: 10;
  overflow-y: auto;
  height: 100%;
  min-width: 0;
  /* Bootstrap default */
}

/* Custom Scrollbar for Main Content */
.main-content-column::-webkit-scrollbar {
  width: 6px;
}

.main-content-column::-webkit-scrollbar-track {
  background: transparent;
}

.main-content-column::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}

.main-content-column::-webkit-scrollbar-thumb:hover {
  background: var(--color-muted);
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
