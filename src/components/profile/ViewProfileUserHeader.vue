<template>
  <div class="profile-header-wrapper">
    <!-- Cover - Read Only -->
    <div class="cover position-relative">
      <!-- No edit button for read-only view -->
    </div>

    <!-- Profile Content -->
    <div class="container-fluid p-0">
      <div class="profile-content px-3">
        <!-- Avatar - Read Only -->
        <div class="avatar-wrapper">
          <img class="avatar" src="@/assets/avatar.jpg" alt="Profile" />
          <!-- No edit button for read-only view -->
        </div>

        <!-- Info - Display Only -->
        <div class="info-section">
          <div class="user-info">
            <h4 class="user-name">{{ userData?.full_name || 'User Name' }}</h4>
            <small class="user-role"
              >{{ userData?.job_title || 'Position' }} •
              {{ userData?.company_name || 'Company' }}</small
            >
          </div>

          <!-- No action buttons for read-only view -->
          <div class="actions" style="display: none"></div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="profile-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-btn', { active: activeTab === tab.key }]"
          @click="$emit('change-tab', tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
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

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'professional', label: 'Professional' },
  { key: 'education', label: 'Education' },
  { key: 'project', label: 'Project' },
  { key: 'cv', label: 'CV' },
]
</script>

<style scoped>
.profile-header-wrapper {
  background: var(--color-accent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 0;
  border-radius: 10px;
  overflow: hidden;
}

.cover {
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: url('../../assets/R.png');
  background-size: cover;
  background-position: center;
  position: relative;
}

.profile-content {
  position: relative;
}

.avatar-wrapper {
  position: relative;
  width: fit-content;
  padding-top: 1rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid var(--color-accent);
  margin-top: -50px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: var(--color-accent);
}

.info-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0.75rem;
  gap: 1rem;
  padding-bottom: 1rem;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 2px 0;
}

.user-role {
  color: var(--color-gray);
  font-size: 13px;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-outline {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  color: var(--color-text);
  background: var(--color-accent);
}

.btn-outline:hover {
  background: var(--color-primary);
  border-color: var(--border-color-hover);
  color: white;
}

.btn-icon {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  color: var(--color-primary);
  background: var(--color-accent);
}

.btn-icon:hover {
  background: var(--color-primary);
  border-color: var(--border-color-hover);
  color: white;
}

.btn svg {
  flex-shrink: 0;
}

.profile-tabs {
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid var(--border-color);
  padding-top: 0;
}

.tab-btn {
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gray);
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab-btn:hover {
  color: var(--color-text);
}

.tab-btn.active {
  color: var(--color-text);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-text);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cover {
    height: 200px;
  }

  .avatar {
    width: 80px;
    height: 80px;
    margin-top: -40px;
  }

  .info-section {
    flex-direction: column;
  }

  .actions {
    width: 100%;
  }

  .profile-tabs {
    overflow-x: auto;
  }

  .tab-btn {
    white-space: nowrap;
  }
}
</style>
