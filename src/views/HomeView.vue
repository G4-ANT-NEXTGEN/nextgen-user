<template>
  <div class="home-view">
    <AppNavbar />

    <div class="home-container">
      <div class="row g-4 h-100">
        <!-- Sidebar Left -->
        <div class="col-lg-3 d-none d-lg-block h-100">
          <AppSidebar />
        </div>

        <!-- Main Content (Dynamic via Router) -->
        <div :class="[isHomePage ? 'col-lg-6' : 'col-lg-9', 'main-content-column', 'h-100']">
          <MainLayout>
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </MainLayout>
        </div>

        <!-- Sidebar Right -->
        <div v-if="isHomePage" class="col-lg-3 d-none d-lg-block h-100">
          <RightSidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layout/MainLayout.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import RightSidebar from '@/components/layout/RightSidebar.vue';
import AppNavbar from '@/components/layout/AppNavbar.vue';

const route = useRoute();
const isHomePage = computed(() => route.name === 'home');

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
}

.home-container {
  flex: 1;
  padding: 1.5rem;
  margin-top: 70px;
  /* Offset for fixed navbar */
  max-width: 1700px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  overflow: hidden;
}

.main-content-column {
  position: relative;
  z-index: 10;
  overflow-y: auto;
  height: 100%;
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
