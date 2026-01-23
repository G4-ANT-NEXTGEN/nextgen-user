<template>
  <div class="profile-header-wrapper">
    <!-- Cover -->
    <div class="cover position-relative">
      <button class="btn btn-light btn-sm edit-cover">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        Edit Cover Photo
      </button>
    </div>

    <!-- Profile Content -->
    <div class="container-fluid">
      <div class="profile-content">
        <!-- Avatar positioned to overlap cover -->
        <div class="avatar-wrapper">
          <img class="avatar" src="../../assets/avatar.jpg" alt="Profile" />
        </div>

        <!-- Info and Actions -->
        <div class="info-section">
          <div class="user-info">
            <h4 class="user-name">Sim Vin</h4>
            <small class="user-role">Web Developer • Freelancer</small>
          </div>

          <div class="actions">
            <button class="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Upload CV
            </button>
            <button class="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Collaboration
            </button>
            <button class="btn btn-icon">
              <i class="bi bi-gear"></i>
            </button>
          </div>
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
defineProps({ 
  activeTab: {
    type: String,
    default: 'overview'
  }
})

defineEmits(['change-tab'])

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'professional', label: 'Professional' },
  { key: 'education', label: 'Education' },
  { key: 'project', label: 'Project' },
]
</script>

<style scoped>
.profile-header-wrapper {
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 0;
}

.cover {
  height: 180px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: url('../../assets/R.png');
  background-size: cover;
  background-position: center;
  position: relative;
}

.edit-cover {
  position: absolute;
  right: 16px;
  bottom: 16px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #030307;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.edit-cover:hover {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.profile-content {
  position: relative;
}

.avatar-wrapper {
  position: relative;
  padding-top: 1rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  margin-top: -50px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
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
  color: #030307;
  margin: 0 0 2px 0;
}

.user-role {
  color: #6b7280;
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
  border: 1px solid #e5e7eb;
  color: #030307;
  background: white;
}

.btn-outline:hover {
  background: var(--color-primary);
  border-color: #d1d5db;
  color: white
}

.btn-icon {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  color: var(--color-primary);
  background: white;
}

.btn-icon:hover {
  background: var(--color-primary);
  border-color: #d1d5db;
  color: white;
}

.btn svg {
  flex-shrink: 0;
}

.profile-tabs {
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid #f3f4f6;
  padding-top: 0;
}

.tab-btn {
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab-btn:hover {
  color: #030307;
}

.tab-btn.active {
  color: #030307;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #030307;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .info-section {
    flex-direction: column;
  }

  .actions {
    width: 100%;
  }

  .btn-outline {
    flex: 1;
  }

  .profile-tabs {
    overflow-x: auto;
  }

  .tab-btn {
    white-space: nowrap;
  }
}
</style>