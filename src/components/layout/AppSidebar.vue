<template>
  <div class="sidebar-left">
    <div class="sidebar-content">
      <!-- Profile Card -->
      <div class="profile-card">
        <!-- Cover Background with Grid Pattern -->
        <div class="profile-cover">
          <div class="cover-grid"></div>
          <div class="cover-overlay">
            <img v-if="authStore.user?.cover" class="w-100 h-100 object-contain border-0" :src="authStore.user?.cover"
              alt="">
          </div>
        </div>

        <!-- Profile Content -->
        <div class="profile-content">
          <!-- Avatar Section -->
          <div class="avatar-section">
            <div class="avatar-wrapper">
              <img class="avatar-image img-fluid rounded-circle" :src="authStore.user?.avatar" alt="Profile">
              <div class="avatar-ring"></div>
            </div>
          </div>

          <!-- Profile Info -->
          <div class="profile-info">
            <h6 class="profile-name">
              {{ authStore.user?.full_name }}
              <i class="bi bi-patch-check-fill verified-badge"></i>
            </h6>
            <small class="profile-handle">
              @{{ authStore.user?.full_name?.toLowerCase().replace(/ /g, '.') }}
            </small>
          </div>
        </div>
      </div>

      <!-- Categories Navigation -->
      <div class="categories-card" v-if="isHomePage">
        <div class="card-header-premium">
          <i class="bi bi-grid-fill header-icon"></i>
          <span class="header-title">Categories</span>
        </div>

        <div class="categories-list">
          <template v-if="categoryStore.loading && categoryStore.categories.length === 0">
            <CategorySkeleton />
          </template>
          <template v-else>
            <button class="category-nav-item" :class="{ active: postStore.category === 0 }"
              @click="filterByCategory(0)">
              <div class="cat-icon-wrap all-posts">
                <i class="bi bi-collection-fill"></i>
              </div>
              <span class="cat-name">All Posts</span>
              <div v-if="postStore.category === 0" class="active-indicator"></div>
            </button>

            <button v-for="cat in categoryStore.categories" :key="cat.id" class="category-nav-item"
              :class="{ active: postStore.category === cat.id }" @click="filterByCategory(cat.id)">
              <div class="cat-icon-wrap">
                <img v-if="cat.image" class="cat-icon-image" :src="cat.image" :alt="cat.name">
                <i v-else class="bi bi-tag-fill"></i>
              </div>
              <span class="cat-name">{{ cat.name }}</span>
              <div v-if="postStore.category === cat.id" class="active-indicator"></div>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCategoryStore } from '@/stores/category';
import { usePostStore } from '@/stores/post';
import CategorySkeleton from '@/components/common/CategorySkeleton.vue';

const authStore = useAuthStore();
const categoryStore = useCategoryStore();
const postStore = usePostStore();
const route = useRoute();

const isHomePage = computed(() => route.name === 'home');

onMounted(() => {
  categoryStore.fetchCategorys();
});

const filterByCategory = async (categoryId) => {
  postStore.category = categoryId;
  await postStore.fetchPosts();
};

defineOptions({
  name: 'AppSidebar'
})
</script>

<style scoped>
.sidebar-left {
  width: 100%;
  position: sticky;
  top: 85px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE/Edge */
}

.sidebar-left::-webkit-scrollbar {
  display: none;
  /* Chrome/Safari */
}

.sidebar-content {
  padding-right: 4px;
  padding-bottom: 20px;
  /* Extra padding for the last item */
}

.profile-card {
  background: var(--sidebar-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 28px;
}

/* Cover Background */
.profile-cover {
  position: relative;
  height: 160px;
  background: var(--profile-cover-bg);
  overflow: hidden;
}

/* Grid Pattern */
.cover-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--profile-cover-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--profile-cover-grid) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: gridMove 10s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(20px, 20px);
  }
}

.verified-badge {
  color: #1d9bf0 !important;
  font-size: 14px;
}

/* Cover Overlay */
.cover-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
}

/* Profile Content */
.profile-content {
  padding: 0 40px 24px;
  position: relative;
}

/* Avatar Section */
.avatar-section {
  display: flex;
  justify-content: center;
  margin-top: -32px;
  margin-bottom: 16px;
}

.avatar-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--sidebar-bg, #ffffff);
  background: var(--sidebar-bg, #ffffff);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: var(--profile-accent);
  z-index: -1;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* Profile Info */
.profile-info {
  text-align: center;
  margin-bottom: 20px;
}

.profile-name {
  margin: 0 0 4px;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-text, #1f2937);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.verified-badge {
  color: var(--profile-accent);
  font-size: 1rem;
}

.profile-handle {
  color: var(--color-muted, #6b7280);
  font-size: 0.875rem;
  font-weight: 500;
}

/* Stats */
.profile-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
  background: var(--stats-bg, #f9fafb);
  border-radius: 12px;
  gap: 8px;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-value {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-text, #1f2937);
  margin-bottom: 2px;
}

.stat-label {
  color: var(--color-muted, #6b7280);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--sidebar-border, #e5e7eb);
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-cover {
    height: 100px;
  }

  .avatar-wrapper {
    width: 64px;
    height: 64px;
  }

  .profile-name {
    font-size: 1.1rem;
  }

  .stat-value {
    font-size: 1.1rem;
  }

  .profile-stats {
    padding: 12px;
  }
}

/* Categories Card Styles */
.categories-card {
  background: var(--sidebar-bg);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card-header-premium {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

.header-icon {
  font-size: 1.2rem;
  color: var(--color-primary);
}

.header-title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text);
  letter-spacing: 0.3px;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  background: transparent;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  text-align: left;
}

.category-nav-item:hover {
  background: rgba(var(--color-primary-rgb), 0.06);
  box-shadow: inset 0 0 0 1px rgba(var(--color-primary-rgb), 0.15);
}


.category-nav-item.active {
  background: rgba(var(--color-primary-rgb), 0.08);
}

.cat-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent);
  color: var(--color-muted);
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-nav-item:hover .cat-icon-wrap {
  background: var(--color-accent);
  color: var(--color-text);
}

.cat-icon-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.all-posts {
  background: var(--color-primary);
  color: var(--color-background);
  box-shadow: 0 4px 10px rgba(var(--color-primary-rgb), 0.2);
}

.no-category {
  background: rgba(100, 116, 139, 0.1);
  color: #64748b;
}


.category-nav-item.active .cat-icon-wrap {
  background: var(--color-primary);
  color: var(--color-background);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}

.cat-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text);
  flex: 1;
  transition: all 0.3s ease;
}

.category-nav-item.active .cat-name {
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: 0.2px;
}

.active-indicator {
  width: 4px;
  height: 20px;
  background: var(--color-primary);
  border-radius: 10px;
  position: absolute;
  right: 14px;
  box-shadow: 0 0 12px rgba(var(--color-primary-rgb), 0.5);
  animation: indicatorGlow 2s ease-in-out infinite;
}

@keyframes indicatorGlow {

  0%,
  100% {
    opacity: 1;
    transform: scaleY(1);
  }

  50% {
    opacity: 0.7;
    transform: scaleY(0.9);
  }
}
</style>
