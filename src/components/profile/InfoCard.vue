
<template>
  <div class="info-card">
    <div class="card-glow"></div>
    <div class="info-card-header">
      <div class="left">
        <div class="icon-wrapper" v-if="icon">
          <i :class="icon"></i>
        </div>
        <span>{{ title }}</span>
      </div>

      <div class="actions-wrapper" v-if="hasActions">
        <button class="actions-trigger" @click.stop="toggleActions">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>

        <div class="actions-menu" :class="{ active: showActions }">
          <div class="menu-backdrop"></div>
          <button v-if="showCreate" @click="handleAction('create')" class="action-item">
            <div class="action-icon">
              <i class="bi bi-plus-lg"></i>
            </div>
            <span>Add New</span>
            <div class="action-indicator"></div>
          </button>

          <button v-if="showUpdate" @click="handleAction('update')" class="action-item">
            <div class="action-icon">
              <i class="bi bi-pencil-square"></i>
            </div>
            <span>Edit</span>
            <div class="action-indicator"></div>
          </button>

          <button v-if="showDelete" @click="handleAction('delete')" class="action-item danger">
            <div class="action-icon">
              <i class="bi bi-trash"></i>
            </div>
            <span>Delete</span>
            <div class="action-indicator danger"></div>
          </button>
        </div>
      </div>
    </div>

    <div class="info-card-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({

  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  showCreate: {
    type: Boolean,
    default: true
  },
  showUpdate: {
    type: Boolean,
    default: true
  },
  showDelete: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['create', 'update', 'delete'])

const showActions = ref(false)

const hasActions = computed(() => {
  return props.showCreate || props.showUpdate || props.showDelete
})

const toggleActions = () => {
  showActions.value = !showActions.value
}

const handleAction = (action) => {
  emit(action)
  showActions.value = false
}

// Close menu when clicking outside
const handleClickOutside = (e) => {
  if (!e.target.closest('.actions-wrapper')) {
    showActions.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.info-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  margin-bottom: 1.5rem;
  color: var(--color-text);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(20px);
}

/* Animated glow effect */
.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

[data-theme="dark"] .card-glow {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
}

.info-card:hover .card-glow {
  opacity: 1;
  animation: glow-pulse 3s ease-in-out infinite;
}

@keyframes glow-pulse {

  0%,
  100% {
    transform: translate(-25%, -25%) scale(1);
  }

  50% {
    transform: translate(-25%, -25%) scale(1.1);
  }
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
      transparent 0%,
      var(--color-primary) 50%,
      transparent 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.info-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.04);
  border-color: var(--color-border);
}

[data-theme="dark"] .info-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.3);
}

.info-card:hover::before {
  opacity: 0.4;
}

.info-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.75rem;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-surface) 100%);
  position: relative;
  z-index: 2;
}

.left {
  display: flex;
  align-items: center;
  gap: 14px;
  font-weight: 600;
  font-size: 15.5px;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.icon-wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-hover);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

[data-theme="dark"] .icon-wrapper::before {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
}

.info-card:hover .icon-wrapper::before {
  opacity: 1;
}

.icon-wrapper i {
  color: var(--color-text);
  font-size: 18px;
  position: relative;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.info-card:hover .icon-wrapper {
  transform: rotate(-5deg) scale(1.05);
  /* background: var(--color-primary); */
}

.info-card:hover .icon-wrapper i {
  transform: scale(1.1);
  color: var(--color-on-primary);
}

.actions-wrapper {
  position: relative;
}

.actions-trigger {
  border: none;
  background: var(--color-hover);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.actions-trigger::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 10px;
}

.actions-trigger:hover::before {
  opacity: 0.08;
}

.actions-trigger:hover {
  color: var(--color-text);
  transform: scale(1.05);
}

.actions-trigger:active {
  transform: scale(0.95);
}

.actions-trigger svg {
  position: relative;
  z-index: 1;
}

.actions-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 12px);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12),
    0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-12px) scale(0.92);
  transform-origin: top right;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  overflow: hidden;
  backdrop-filter: blur(20px);
  padding: 6px;
}

[data-theme="dark"] .actions-menu {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6),
    0 4px 12px rgba(0, 0, 0, 0.4);
  background: rgba(37, 37, 37, 0.95);
}

.menu-backdrop {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-accent) 100%);
  opacity: 0.6;
  z-index: -1;
}

.actions-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.action-item {
  width: 100%;
  border: none;
  background: transparent;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.action-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-hover);
  color: var(--color-text);
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.action-icon i {
  font-size: 15px;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.action-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--color-primary);
  border-radius: 0 3px 3px 0;
  transition: height 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-indicator.danger {
  background: var(--toastify-color-error);
}

.action-item:hover {
  padding-left: 18px;
}

.action-item:hover .action-indicator {
  height: 60%;
}

.action-item:hover .action-icon {
  transform: scale(1.1) rotate(-5deg);
}

.action-item:hover .action-icon i {
  color: var(--color-on-primary);
  transform: scale(1.15);
}

.action-item:active {
  transform: scale(0.97);
}

/* Danger action */
.action-item.danger:hover {
  background: rgba(239, 68, 68, 0.06);
  color: var(--toastify-color-error);
}

.action-item.danger:hover .action-icon {
  background: var(--toastify-color-error);
}

.action-item.danger:hover .action-icon i {
  color: #ffffff;
}

[data-theme="dark"] .action-item.danger:hover {
  background: rgba(248, 113, 113, 0.1);
}

.info-card-body {
  padding: 1.5rem 1.75rem;
  font-size: 14.5px;
  color: var(--color-text-secondary);
  line-height: 1.75;
  background: var(--color-surface);
  position: relative;
  z-index: 1;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .info-card {
    border-radius: 16px;
    margin-bottom: 1.25rem;
  }

  .info-card-header {
    padding: 1.125rem 1.25rem;
  }

  .left {
    font-size: 14.5px;
    gap: 12px;
  }

  .icon-wrapper {
    width: 32px;
    height: 32px;
  }

  .icon-wrapper i {
    font-size: 16px;
  }

  .info-card-body {
    padding: 1.25rem;
    font-size: 14px;
  }

  .actions-menu {
    min-width: 160px;
  }

  .action-item {
    padding: 10px 12px;
    font-size: 13.5px;
  }

  .action-icon {
    width: 28px;
    height: 28px;
  }

  .action-icon i {
    font-size: 14px;
  }
}

/* Smooth entrance animation */
@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-card {
  animation: cardEntrance 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
