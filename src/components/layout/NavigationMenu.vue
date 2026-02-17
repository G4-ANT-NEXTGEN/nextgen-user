<template>
  <!-- Backdrop for mobile -->
  <div v-if="isOpen" class="sidebar-backdrop d-lg-none" @click="$emit('close')"></div>

  <div class="nav-menu-container" :class="{ 'open': isOpen, 'embedded': embedded }">
    <!-- Logo Section (Mobile Only) -->
    <div class="mobile-logo-section d-lg-none">
      <div class="d-flex align-items-center gap-2">
        <div class="logo-box">
          <div class="logo-inner">
            <img class="img-fluid" src="../../../public/logo.png" alt="Vetika Logo" />
          </div>
        </div>
      </div>
      <button class="close-btn" @click="$emit('close')" aria-label="Close menu">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <!-- Navigation Links -->
    <div class="nav-menu">

      <div>
        <router-link :to="{ name: 'home' }" class="nav-item" active-class="active" @click="$emit('close')">
          <i class="bi bi-house-door"></i>
          <span>Home</span>
        </router-link>

        <!-- Messages - Mobile Only -->
        <router-link :to="{ name: 'chat-layout' }" class="nav-item d-lg-none" active-class="active"
          @click="$emit('close')">
          <i class="bi bi-chat-dots"></i>
          <span>Messages</span>
        </router-link>

        <router-link :to="{ name: 'about' }" class="nav-item" active-class="active" @click="$emit('close')">
          <i class="bi bi-info-circle"></i>
          <span>About</span>
        </router-link>

      </div>


      <div>
        <router-link :to="{ name: 'help' }" class="nav-item" active-class="active" @click="$emit('close')">
          <i class="bi bi-question-circle"></i>
          <span>Help</span>
        </router-link>

        <router-link :to="{ name: 'contact' }" class="nav-item" active-class="active" @click="$emit('close')">
          <i class="bi bi-headset"></i>
          <span>Contact</span>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const props = defineProps({
  isOpen: Boolean,
  embedded: Boolean
});

const emit = defineEmits(['close']);

defineOptions({
  name: 'NavigationMenu'
});
</script>

<style scoped>
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.nav-menu-container {
  position: fixed;
  left: 0;
  top: 0;
  height: 94vh;
  max-width: 250px;
  width: 250px;
  background-color: var(--color-background);
  z-index: 1050;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 16px 24px 16px;
  border-right: 1px solid var(--sidebar-border);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-100%);
  /* Hidden by default on mobile */
}

.nav-menu-container .nav-menu {
  height: 90vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav-menu-container.open {
  transform: translateX(0);
}

@media (min-width: 1200px) {
  .nav-menu-container {
    transform: none;
    /* Always visible on desktop */
    z-index: 900;
    top: 70px;
    /* Below navbar */
    padding: 24px 16px;
    justify-content: space-between;
  }

  /* Embedded Mode (Inside AppSidebar) */
  .nav-menu-container.embedded {
    position: static;
    height: auto;
    width: 100%;
    transform: none;
    padding: 0;
    border: none;
    background: transparent;
    z-index: 1;
  }

  /* Hide toggle btn on desktop */
  .toggle-btn {
    display: none;
  }
}

.toggle-btn {
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  color: var(--color-primary);
  background: rgba(var(--color-primary-rgb), 0.1);
}

.menu-title {
  font-weight: 800;
  color: var(--color-primary);
  font-size: 1.5rem;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  color: var(--color-muted);
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-item:hover {
  color: var(--color-primary);
  background: var(--sidebar-hover);
}

.nav-item.active {
  color: var(--color-background);
  font-weight: 600;
  background-color: var(--color-text);
}

.nav-item i {
  font-size: 1.25rem;
  color: inherit;
  width: 24px;
  text-align: center;
}

/* Profile Footer */
.profile-footer {
  margin-top: auto;
  padding: 0 10px;
}

.profile-card {
  background: var(--sidebar-bg);
  border-radius: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--sidebar-border);
  transition: all 0.2s ease;
}

.profile-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.profile-avatar {
  width: 42px;
  height: 42px;
  position: relative;
  flex-shrink: 0;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.online-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border: 2px solid white;
  border-radius: 50%;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-role {
  font-size: 0.75rem;
  color: var(--color-muted);
}

/* Mobile Logo Section */
.mobile-logo-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.logo-box {
  width: 105px;
  height: 48px;
}

.logo-inner {
  width: 100%;
  height: 100%;
}

.logo-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

[data-theme="dark"] .logo-box img {
  filter: brightness(0) invert(1);
}

[data-theme="light"] .logo-box img {
  filter: brightness(0) invert(0);
}

.nav-brand {
  color: var(--color-text);
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--color-secondary);
  color: var(--color-primary);
}
</style>
