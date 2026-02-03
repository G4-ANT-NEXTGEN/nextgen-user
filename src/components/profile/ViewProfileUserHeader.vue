<template>
  <div class="profile-header-wrapper" v-if="userData">
    <!-- Cover & Identity Section -->
    <div class="header-main">
      <div class="cover-area">
        <div v-if="!userData?.cover" class="cover-grid"></div>
        <img v-else :src="userData?.cover" alt="Profile Cover" class="cover-image" />
        <div class="cover-overlay"></div>

        <div class="identity-container">
          <div class="avatar-box">
            <div class="avatar-ring">
              <img :src="userData?.avatar" alt="Profile Avatar" class="profile-avatar" />
              <div class="status-indicator"></div>
            </div>
          </div>

          <div class="identity-details">
            <h1 class="display-name">{{ userData?.full_name || 'Loading...' }}</h1>
            <p class="role-text">{{ userData?.professional?.job_title || 'Freelancer' }}</p>
          </div>

          <div class="identity-actions">
            <BaseButton variant="primary" class="chat-btn" @click="gotoMessage">
              <i class="bi bi-chat-dots-fill"></i>
              <span>Message</span>
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Navigation Bar -->
      <div class="header-nav">
        <div class="nav-links">
          <button v-for="tab in tabs" :key="tab.key" :class="['nav-link-btn', { active: activeTab === tab.key }]"
            @click="$emit('change-tab', tab.key)">
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <ProfileHeaderSkeleton v-else />
</template>

<script setup>
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton.vue'
import BaseButton from '@/components/ui/base/BaseButton.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  activeTab: {
    type: String,
    default: 'overview',
  },
  userData: {
    type: Object,
    required: true,
  },
})

defineEmits(['change-tab'])
const router = useRouter()

const gotoMessage = () => {
  if (props.userData?.id) {
    router.push({ name: 'chat-room', params: { id: props.userData.id } })
  }
}

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'professional', label: 'Professional' },
  { key: 'education', label: 'Education' },
  { key: 'project', label: 'Project' },
  { key: 'cv', label: 'CV' },
]
</script>

<style scoped>
/* ====================================
   MAIN HEADER CONTAINER
   ==================================== */
.profile-header-wrapper {
  margin-bottom: 2rem;
  border-radius: 24px;
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

/* ====================================
   COVER AREA
   ==================================== */
.cover-area {
  position: relative;
  height: 380px;
  background-color: var(--color-background);
  overflow: hidden;
}

.cover-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
}

/* ====================================
  IDENTITY OVERLAY
   ==================================== */
.identity-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 2rem 2.5rem;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  z-index: 5;
}

.avatar-box {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: relative;
  transform: translateY(2rem);
}

.avatar-ring {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  padding: 6px;
  background: var(--color-surface);
  box-shadow: var(--shadow-xl);
  position: relative;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.status-indicator {
  position: absolute;
  z-index: 12 !important;
  bottom: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  background: #10b981;
  border: 4px solid var(--color-surface);
  border-radius: 50%;
}

.identity-details {
  flex: 1;
  padding-bottom: 0.5rem;
}

.display-name {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.25rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.role-text {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-weight: 500;
}

.identity-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.75rem;
}

.chat-btn {
  padding: 0.875rem 2rem !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700 !important;
  border-radius: 16px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
}

.settings-trigger {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.settings-trigger:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ====================================
   NAVIGATION
   ==================================== */
.header-nav {
  padding: 0 2rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.nav-links {
  display: flex;
  gap: 2rem;
  margin-left: 220px;
  /* Offset for avatar */
}

.nav-link-btn {
  padding: 1.5rem 0.5rem;
  background: none;
  border: none;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-muted);
  position: relative;
  transition: color 0.3s ease;
}

.nav-link-btn:hover {
  color: var(--color-text);
}

.nav-link-btn.active {
  color: var(--color-primary);
}

.nav-link-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-primary);
  border-radius: 4px 4px 0 0;
}

/* ====================================
   RESPONSIVE
   ==================================== */
@media (max-width: 991px) {
  .cover-area {
    height: 280px;
  }

  .identity-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 1.5rem;
  }

  .avatar-box {
    transform: translateY(0);
  }

  .avatar-ring {
    width: 140px;
    height: 140px;
  }

  .nav-links {
    margin-left: 0;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
