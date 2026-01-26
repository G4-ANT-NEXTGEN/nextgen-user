<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid px-4">
      <div class="d-flex align-items-center gap-4">
        <div class="d-flex align-items-center gap-2">
          <div class="logo-box">
            <div class="logo-inner">
              <img class="img-fluid" src="../../public/logo.jpg" alt="" />
            </div>
          </div>
          <span class="fs-5 fw-bold nav-brand">NextGen</span>
        </div>

        <div class="position-relative ms-4">
          <i class="bi bi-search search-icon"></i>
          <input type="text" class="search-box" placeholder="Search" style="width: 420px" />
        </div>
      </div>

      <div class="d-flex align-items-center gap-3">
        <button @click="toggleTheme" class="theme-btn">
          <i v-if="theme === 'light'" class="bi bi-moon-fill icon-btn"></i>
          <i v-else class="bi bi-brightness-high-fill icon-btn"></i>
        </button>

        <button class="theme-btn">
          <i class="bi bi-bell icon-btn"></i>
        </button>

        <button class="theme-btn">
          <i class="bi bi-bookmark icon-btn"></i>
        </button>

        <div class="d-flex align-items-center gap-2" style="cursor: pointer">
          <div class="small-avatar overflow-hidden rounded-circle">
            <img class="img-fluid" :src="authStore.user.avatar" alt="" />
          </div>
          <span class="fw-semibold">
            {{ authStore.user.full_name }}
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useTheme } from '@/composables/useTheme'

const authStore = useAuthStore()
const { theme, toggleTheme } = useTheme()

authStore.fetchProfile()
</script>

<style scoped>
/* Navbar-only styles */

.theme-btn {
  background: var(--color-secondary);
  color: var(--color-text);
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.nav-brand {
  color: var(--color-text);
}

.navbar {
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding: 16px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.logo-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(10, 10, 10, 0.15);
}

.logo-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-fluid {
  width: 40px;
}

.search-box {
  background-color: var(--color-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 10px 16px 10px 42px;
  transition: all 0.3s ease;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-muted);
}
</style>
