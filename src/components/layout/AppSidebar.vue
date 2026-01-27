<template>
  <div class="sidebar-left position-sticky top-85">
    <div class="sidebar-content">
      <!-- Profile Card -->
      <div class="profile-card">
        <!-- Cover Background with Grid Pattern -->
        <div class="profile-cover">
          <div class="cover-grid"></div>
          <div class="cover-overlay">
            <img class="img-fluid" src="" alt="">
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
              <i class="bi bi-check-circle-fill verified-badge"></i>
            </h6>
            <small class="profile-handle">
              @{{ authStore.user?.full_name?.toLowerCase().replace(/ /g, '.') }}
            </small>
          </div>

          <!-- Stats -->
          <div class="profile-stats">
            <div class="stat-item">
              <div class="stat-value">2.3k</div>
              <div class="stat-label">Followers</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value">235</div>
              <div class="stat-label">Following</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value">80</div>
              <div class="stat-label">Posts</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="nav-menu mb-3">
        <router-link :to="{ name: 'home' }" class="nav-item" active-class="active">
          <i class="bi bi-house-door-fill"></i>
          <span>Feed</span>
        </router-link>
        <router-link :to="{ name: 'events' }" class="nav-item" active-class="active">
          <i class="bi bi-calendar-event-fill"></i>
          <span>Events</span>
        </router-link>
        <router-link :to="{ name: 'about' }" class="nav-item" active-class="active">
          <i class="bi bi-info-circle-fill"></i>
          <span>About us</span>
        </router-link>
        <router-link :to="{ name: 'help' }" class="nav-item" active-class="active">
          <i class="bi bi-question-circle-fill"></i>
          <span>help</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

defineOptions({
  name: 'AppSidebar'
})
</script>

<style scoped>
.sidebar-left {
  width: 100%;
  height: 100%;
}

.sidebar-content {
  height: 100%;
  overflow-y: auto;
  padding-right: 4px;
}

.sidebar-content::-webkit-scrollbar {
  width: 4px;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: var(--sidebar-border);
  border-radius: 10px;
}

.sidebar-content:hover::-webkit-scrollbar-thumb {
  background: var(--sidebar-muted);
}

.profile-card {
  background: var(--sidebar-bg);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--sidebar-border, #e5e7eb);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 28px;
}

/* Cover Background */
.profile-cover {
  position: relative;
  height: 120px;
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

/* Cover Overlay */
.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
}

/* Profile Content */
.profile-content {
  padding: 0 24px 24px;
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

.nav-menu {
  background: var(--sidebar-bg);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid var(--sidebar-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  color: var(--sidebar-text);
  margin-bottom: 4px;
}

.nav-item:hover {
  background: var(--sidebar-hover);
  color: var(--color-primary);
  transform: translateX(4px);
}

.nav-item.active {
  background: var(--sidebar-active);
  color: var(--color-primary) !important;
  box-shadow: var(--shadow-sm);
}

.nav-item.active i {
  color: var(--color-primary) !important;
}

.nav-item i {
  font-size: 20px;
  color: var(--sidebar-muted);
  transition: all 0.2s ease;
}

.section-title {
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--color-muted);
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.page-item-custom {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  cursor: pointer;
}

.page-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white !important;
  font-weight: 700;
  font-size: 13px;
}

.page-icon--ui {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.page-icon--wd {
  background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%);
}

.page-icon--d {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
}

.page-icon--b {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
}

.page-name {
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--color-text);
}

.text-primary-custom {
  color: var(--color-primary);
}

.link-custom {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
}
</style>
