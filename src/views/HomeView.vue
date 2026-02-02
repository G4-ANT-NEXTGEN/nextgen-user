<template>
  <div class="home-view">
    <ShootingStars />
    <AppNavbar @toggle-menu="toggleMobileMenu" />
    <NavigationMenu :isOpen="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

    <div class="home-container" :class="{ 'content-padding': isHomePage }">
      <div class="row g-4 h-100" v-if="isHomePage">
        <!-- Sidebar Left (Profile) -->
        <div class="col-lg-3 d-none d-lg-block h-100">
          <AppSidebar />
        </div>

        <!-- Main Content (Feed) -->
        <div class="col-lg-6 main-content-column h-100">
          <MainLayout>
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </MainLayout>
        </div>

        <!-- Sidebar Right -->
        <div class="col-lg-3 d-none d-lg-block h-100">
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

const route = useRoute();
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
}

.home-container {
  flex: 1;
  margin-top: 70px;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.content-padding {
  padding: 1.5rem;
  max-width: 1700px;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 992px) {
  .home-container {
    margin-left: 280px;
    width: auto;
    /* Reset max-width for container if needed, but handled by content-padding */
  }
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
