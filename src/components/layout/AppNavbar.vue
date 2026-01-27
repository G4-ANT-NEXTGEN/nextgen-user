<template>
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container-fluid px-4">
            <div class="d-flex align-items-center gap-4">
                <div class="d-flex align-items-center gap-2">
                    <div class="logo-box">
                        <div class="logo-inner">
                            <img class="img-fluid" src="../../../public/logo.jpg" alt="" />
                        </div>
                    </div>
                    <span class="fs-5 fw-bold nav-brand">NextGen</span>
                </div>
            </div>

            <div class="search-container">
                <i class="bi bi-search search-icon"></i>
                <input type="text" class="search-box" placeholder="Search..." v-model="postStore.search"
                    @keyup.enter="handleSearch" />
            </div>

            <div class="d-flex align-items-center gap-3">
                <button @click="toggleTheme" class="theme-btn">
                    <i v-if="theme === 'light'" class="bi bi-moon-fill icon-btn"></i>
                    <i v-else class="bi bi-brightness-high-fill icon-btn"></i>
                </button>

                <!-- <button class="theme-btn">
                    <i class="bi bi-bell icon-btn"></i>
                </button>

                <button class="theme-btn">
                    <i class="bi bi-bookmark icon-btn"></i>
                </button> -->

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
                                <div class="small-avatar overflow-hidden rounded-circle"
                                    style="width: 40px; height: 40px;">
                                    <img class="img-fluid" :src="authStore.user?.avatar" alt="User avatar" />
                                </div>
                                <div>
                                    <h6 class="mb-0 fw-bold">{{ authStore.user?.full_name }}</h6>
                                    <small class="text-muted d-block text-truncate" style="max-width: 150px;">{{
                                        authStore.user?.email
                                    }}</small>
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
                            <button @click="authStore.logout" type="button"
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
import { useTheme } from '@/composables/useTheme'
import { watch } from 'vue'

const authStore = useAuthStore()
const postStore = usePostStore()
const { theme, toggleTheme } = useTheme()

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
    padding: 10px 16px 10px 42px;
    width: 100%;
    transition: all 0.3s ease;
}

@media (max-width: 991px) {
    .search-container {
        max-width: 300px;
        margin: 0 1rem;
    }
}

@media (max-width: 768px) {
    .search-container {
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
