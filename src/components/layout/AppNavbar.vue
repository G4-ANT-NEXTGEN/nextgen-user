<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid px-4">
      <div class="d-flex align-items-center gap-4">
        <div class="d-flex align-items-center gap-2">
          <!-- Mobile Sidebar Toggle -->
          <button class="theme-btn d-lg-none me-2" @click="$emit('toggle-menu')" aria-label="Toggle menu">
            <i class="bi bi-list fs-4"></i>
          </button>

          <div @click="$router.push('/home')" class="logo-box d-none d-lg-flex">
            <div class="logo-inner">
              <img class="img-fluid" src="../../../public/logo.jpg" alt="" />
            </div>
          </div>
          <span class="fs-5 fw-bold nav-brand d-none d-lg-block">NextGen</span>
        </div>
      </div>

      <div class="search-container" :class="{ 'search-active': isSearchActive }">
        <i class="bi bi-search search-icon"></i>
        <input type="text" class="search-box" placeholder="Search..." v-model="postStore.search"
          @keyup.enter="handleSearch" />
        <button class="filter-btn" :aria-label="postStore.search ? 'Clear' : 'Filter'"
          @click="postStore.search ? postStore.search = '' : null">
          <i :class="postStore.search ? 'bi bi-x-lg' : ' '"></i>
        </button>
      </div>

      <div class="d-flex align-items-center gap-3">
        <!-- Mobile Search Toggle Button -->
        <button @click="toggleSearch" class="theme-btn mobile-search-btn">
          <i class="bi bi-search icon-btn"></i>
        </button>

        <!-- Mobile Message Button -->
        <button @click="goToMessages" class="theme-btn mobile-message-btn">
          <i class="bi bi-chat-dots icon-btn"></i>
        </button>

        <AnimatedThemeToggler />

        <div class="dropdown">
          <button class="profile-trigger border-0 bg-transparent p-0" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <div class="user-profile">
              <div class="small-avatar overflow-hidden rounded-circle">
                <img class="img-fluid" :src="authStore.user?.avatar" alt="User avatar" />
              </div>
              <span class="user-name d-none d-md-block">
                {{ authStore.user?.full_name }}
              </span>
              <i class="bi bi-chevron-down ms-1 small opacity-50"></i>
            </div>
          </button>

          <ul class="action-dropdown dropdown-menu dropdown-menu-end shadow-lg border-0 p-2">
            <div class="dropdown-header-info px-3 py-3 border-bottom mb-2">
              <div class="d-flex align-items-center gap-3">
                <div class="small-avatar overflow-hidden rounded-circle" style="width: 40px; height: 40px;">
                  <img class="img-fluid" :src="authStore.user?.avatar" alt="User avatar" />
                </div>
                <div class="text-muted-info">
                  <h6 class="mb-0 fw-bold">{{ authStore.user?.full_name }}</h6>
                  <small class="d-block text-truncate" style="max-width: 150px;">
                    {{ authStore.user?.email }}
                  </small>
                </div>
              </div>
            </div>

            <li>
              <router-link :to="{ name: 'profile' }"
                class="action-item dropdown-item d-flex align-items-center gap-3 py-2">
                <i class="bi bi-person-fill text-muted"></i>
                <span>My Profile</span>
              </router-link>
            </li>
            <div class="dropdown-divider mx-2"></div>
            <li>
              <button @click="authStore.logout" type="button" :isLoading="isLoading"
                class="action-item dropdown-item d-flex align-items-center gap-3 py-2 text-danger">
                <i class="bi bi-box-arrow-right"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import { useRouter } from 'vue-router'
import { watch, ref } from 'vue'
import AnimatedThemeToggler from '@/registry/magicui/AnimatedThemeToggler.vue'

const authStore = useAuthStore()
const postStore = usePostStore()
const router = useRouter()
const isSearchActive = ref(false)
const isLoading = ref(false)

defineEmits(['toggle-menu'])

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value
}

const goToMessages = () => {
  router.push({ name: 'chat-layout' })
}

const handleSearch = () => {
  postStore.fetchPosts()
}

let timeout = null
watch(() => postStore.search, () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    postStore.fetchPosts()
  }, 500)
})

authStore.fetchProfile()
</script>

<style scoped>
/* Navbar-only styles */
.navbar {
  z-index: 1030;
}

.theme-btn {
  background: var(--nav-surface);
  color: var(--color-text);
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.nav-brand {
  color: var(--color-text);
}

.text-muted-info {
  color: var(--color-text);
}

.navbar {
  background-color: var(--nav-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 12px 0;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
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

.logo-box:hover{
  cursor: pointer;
}

.logo-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-fluid {
  width: 40px;
}

.search-container {
  position: relative;
  margin: 0 2rem;
  flex: 1;
  max-width: 500px;
}

.search-box {
  background-color: var(--nav-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 12px;
  padding: 10px 40px 10px 42px;
  width: 100%;
  transition: all 0.3s ease;
}

.filter-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--color-muted);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  color: var(--color-text);
  background: rgba(0, 0, 0, 0.05);
}

@media (max-width: 991px) {
  .search-container {
    max-width: 300px;
    margin: 0 1rem;
  }

}

@media (max-width: 768px) {

  .search-box {
    margin-top: 20px;
    padding: 10px 16px 10px 42px;
  }

  .search-icon {
    display: none;
  }

  .search-container {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    margin: 0;
    max-width: calc(100% - 30px);
    padding-left: 30px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .search-container.search-active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .mobile-search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (min-width: 769px) {

  .mobile-search-btn,
  .mobile-message-btn {
    display: none;
  }
}

.search-box:focus {
  outline: none;
  background-color: var(--nav-bg);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.03);
}

.small-avatar {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: 1px solid var(--color-border);
}

.small-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-muted);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.user-profile:hover {
  background-color: var(--nav-surface);
}

.user-name {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.95rem;
}

.action-dropdown {
  min-width: 240px;
  background-color: var(--color-accent);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  margin-top: 10px !important;
  overflow: hidden;
  animation: dropdownFadeIn 0.2s ease-out;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.action-item {
  border-radius: 10px;
  margin: 0 4px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.action-item:hover {
  background-color: var(--color-secondary);
  color: var(--color-text);

}

.action-item i {
  font-size: 1.1rem;
  color: var(--color-text) !important;
  transition: all 0.2s ease;
}

.action-item.text-danger:hover {
  background-color: rgba(220, 38, 38, 0.08);
}
</style>
