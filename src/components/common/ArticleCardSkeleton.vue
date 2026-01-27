<template>
  <div class="post-card-skeleton">
    <div class="skeleton-header">
      <div class="skeleton-avatar"></div>
      <div class="skeleton-info">
        <div class="skeleton-line name"></div>
        <div class="skeleton-line date"></div>
      </div>
    </div>
    <div class="skeleton-content">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    </div>
    <div class="skeleton-media"></div>
    <div class="skeleton-footer">
      <div class="skeleton-actions">
        <div class="skeleton-btn"></div>
        <div class="skeleton-btn"></div>
        <div class="skeleton-btn"></div>
      </div>
      <div class="skeleton-bookmark"></div>
    </div>
  </div>
</template>

<style scoped>
.post-card-skeleton {
  background: var(--color-accent);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06);
}

.skeleton-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-border);
  animation: pulse 1.5s infinite;
}

.skeleton-info {
  flex: 1;
}

.skeleton-line {
  background: var(--color-border);
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-line.name {
  width: 140px;
  height: 16px;
  margin-bottom: 8px;
}

.skeleton-line.date {
  width: 80px;
  height: 12px;
}

.skeleton-content {
  margin-bottom: 16px;
}

.skeleton-content .skeleton-line {
  height: 14px;
  margin-bottom: 10px;
}

.skeleton-content .skeleton-line.short {
  width: 60%;
}

.skeleton-media {
  width: 100%;
  height: 300px;
  background: var(--color-border);
  border-radius: 12px;
  margin-bottom: 20px;
  animation: pulse 1.5s infinite;
}

.skeleton-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.skeleton-actions {
  display: flex;
  gap: 12px;
}

.skeleton-btn {
  width: 80px;
  height: 32px;
  background: var(--color-border);
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

.skeleton-bookmark {
  width: 32px;
  height: 32px;
  background: var(--color-border);
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.6;
  }
}
</style>
