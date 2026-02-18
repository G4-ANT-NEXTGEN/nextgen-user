<template>
  <div class="info-card-skeleton">
    <div class="skeleton-header">
      <div class="skeleton-left">
        <div class="skeleton-icon"></div>
        <div class="skeleton-title"></div>
      </div>
      <div class="skeleton-action"></div>
    </div>
    <div class="skeleton-body">
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    </div>
  </div>
</template>

<style scoped>
.info-card-skeleton {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  position: relative;
}

.skeleton-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.75rem;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-surface) 100%);
}

.skeleton-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.skeleton-icon {
  width: 36px;
  height: 36px;
  background: var(--color-hover);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.skeleton-title {
  height: 20px;
  width: 120px;
  background: var(--color-hover);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.skeleton-action {
  width: 38px;
  height: 38px;
  background: var(--color-hover);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.skeleton-body {
  padding: 1.5rem 1.75rem;
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-line {
  height: 14px;
  background: var(--color-hover);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.skeleton-line.short {
  width: 70%;
}

/* Shimmer animation */
.skeleton-icon::before,
.skeleton-title::before,
.skeleton-action::before,
.skeleton-line::before {
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

[data-theme="dark"] .skeleton-icon::before,
[data-theme="dark"] .skeleton-title::before,
[data-theme="dark"] .skeleton-action::before,
[data-theme="dark"] .skeleton-line::before {
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

/* Pulse animation (alternative) */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .info-card-skeleton {
    border-radius: 16px;
    margin-bottom: 1.25rem;
  }

  .skeleton-header {
    padding: 1.125rem 1.25rem;
  }

  .skeleton-left {
    gap: 12px;
  }

  .skeleton-icon {
    width: 32px;
    height: 32px;
  }

  .skeleton-title {
    height: 18px;
    width: 100px;
  }

  .skeleton-action {
    width: 34px;
    height: 34px;
  }

  .skeleton-body {
    padding: 1.25rem;
    gap: 10px;
  }

  .skeleton-line {
    height: 12px;
  }
}
</style>
