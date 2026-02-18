<template>
  <div class="profile-header-skeleton">
    <!-- Cover Section Skeleton -->
    <div class="skeleton-cover-section">
      <div class="skeleton-cover-image"></div>
      <div class="skeleton-edit-cover-btn"></div>

      <!-- Avatar Skeleton -->
      <div class="skeleton-avatar-container">
        <div class="skeleton-avatar"></div>
      </div>
    </div>

    <!-- Profile Info & Actions Skeleton -->
    <div class="skeleton-info-section">
      <div class="skeleton-profile-info">
        <div class="skeleton-user-name"></div>
        <div class="skeleton-user-role"></div>
      </div>

      <div class="skeleton-profile-actions">
        <div class="skeleton-action-btn"></div>
        <div class="skeleton-action-btn"></div>
        <div class="skeleton-action-btn small"></div>
      </div>
    </div>

    <!-- Navigation Tabs Skeleton -->
    <div class="skeleton-nav-tabs">
      <div class="skeleton-tab" v-for="i in 5" :key="i"></div>
    </div>
  </div>
</template>

<style scoped>
.profile-header-skeleton {
  background: var(--color-surface);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

/* ====================================
   COVER SECTION SKELETON
   ==================================== */
.skeleton-cover-section {
  position: relative;
  height: 240px;
  background: var(--color-accent);
}

.skeleton-cover-image {
  width: 100%;
  height: 100%;
  background: var(--color-hover);
  position: relative;
  overflow: hidden;
}

.skeleton-edit-cover-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 110px;
  height: 36px;
  background: var(--color-surface);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

/* ====================================
   AVATAR SKELETON
   ==================================== */
.skeleton-avatar-container {
  position: absolute;
  bottom: -50px;
  left: 32px;
}

.skeleton-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--color-hover);
  border: 4px solid var(--color-surface);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

/* ====================================
   PROFILE INFO SKELETON
   ==================================== */
.skeleton-info-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 64px 32px 24px;
  gap: 20px;
}

.skeleton-profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-user-name {
  width: 220px;
  height: 28px;
  background: var(--color-hover);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.skeleton-user-role {
  width: 150px;
  height: 18px;
  background: var(--color-hover);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

/* ====================================
   ACTION BUTTONS SKELETON
   ==================================== */
.skeleton-profile-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.skeleton-action-btn {
  width: 130px;
  height: 38px;
  background: var(--color-hover);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.skeleton-action-btn.small {
  width: 38px;
}

/* ====================================
   NAVIGATION TABS SKELETON
   ==================================== */
.skeleton-nav-tabs {
  display: flex;
  gap: 0;
  padding: 0 32px;
  border-top: 1px solid var(--color-border);
  overflow-x: auto;
  scrollbar-width: none;
}

.skeleton-nav-tabs::-webkit-scrollbar {
  display: none;
}

.skeleton-tab {
  width: 100px;
  height: 20px;
  margin: 16px 24px;
  background: var(--color-hover);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

/* ====================================
   SHIMMER ANIMATION
   ==================================== */
.skeleton-cover-image::before,
.skeleton-edit-cover-btn::before,
.skeleton-avatar::before,
.skeleton-user-name::before,
.skeleton-user-role::before,
.skeleton-action-btn::before,
.skeleton-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

[data-theme="dark"] .skeleton-cover-image::before,
[data-theme="dark"] .skeleton-edit-cover-btn::before,
[data-theme="dark"] .skeleton-avatar::before,
[data-theme="dark"] .skeleton-user-name::before,
[data-theme="dark"] .skeleton-user-role::before,
[data-theme="dark"] .skeleton-action-btn::before,
[data-theme="dark"] .skeleton-tab::before {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* ====================================
   PULSE ANIMATION (ALTERNATIVE)
   ==================================== */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* ====================================
   RESPONSIVE DESIGN
   ==================================== */
@media (max-width: 968px) {
  .skeleton-info-section {
    flex-direction: column;
    align-items: flex-start;
    padding: 64px 24px 20px;
  }

  .skeleton-profile-actions {
    width: 100%;
  }

  .skeleton-action-btn {
    flex: 1;
  }

  .skeleton-nav-tabs {
    padding: 0 24px;
  }
}

@media (max-width: 768px) {
  .skeleton-cover-section {
    height: 200px;
  }

  .skeleton-avatar-container {
    left: 20px;
    bottom: -40px;
  }

  .skeleton-avatar {
    width: 100px;
    height: 100px;
  }

  .skeleton-info-section {
    padding: 52px 20px 20px;
  }

  .skeleton-user-name {
    width: 180px;
    height: 24px;
  }

  .skeleton-user-role {
    width: 120px;
    height: 16px;
  }

  .skeleton-profile-actions {
    flex-direction: column;
    width: 100%;
  }

  .skeleton-action-btn {
    width: 100%;
  }

  .skeleton-action-btn.small {
    width: 100%;
  }

  .skeleton-nav-tabs {
    padding: 0 20px;
  }

  .skeleton-tab {
    width: 80px;
    margin: 14px 16px;
  }

  .skeleton-edit-cover-btn {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 32px;
  }
}
</style>
