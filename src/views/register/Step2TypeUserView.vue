<template>
  <div class="form-section">
    <div class="header-section">
      <button class="back-button" @click="router.go(-1)">
        <i class="bi bi-arrow-left"></i>
        <span>Previous Step</span>
      </button>
      <div class="step-chip">STEP 2 OF 4</div>
      <h1 class="form-title">Account Type</h1>
      <p class="form-description">Select the category that best describes your needs.</p>
    </div>

    <div class="user-type-grid">
      <div v-for="userType in usersTypes" :key="userType.id" class="user-type-option">
        <input type="radio" name="userType" :id="'type-' + userType.id" :value="userType.id"
          v-model="selectedUserTypeId" class="type-radio" />
        <label :for="'type-' + userType.id" class="type-card">
          <div class="type-icon-wrapper">
            <i :class="userType.icon"></i>
          </div>
          <div class="type-content">
            <div class="type-label">{{ userType.name }}</div>
            <div class="type-desc">{{ userType.description }}</div>
          </div>
          <div class="selected-indicator">
            <i class="bi bi-check-circle-fill"></i>
          </div>
        </label>
      </div>
    </div>

    <div class="form-footer">
      <BaseButton variant="primary" size="lg" class="submit-btn" :isLoading="isLoading" :disabled="!selectedUserTypeId"
        @click="nextStep">
        <span>Continue</span>
        <i class="bi bi-chevron-right ms-2"></i>
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showError } from "@/utils/toast";
import BaseButton from "@/components/ui/base/BaseButton.vue"
import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const isLoading = ref(false)
const authStore = useAuthStore()

const selectedUserTypeId = computed({
  get: () => authStore.registrationForm.user_type_ids,
  set: (val) => authStore.registrationForm.user_type_ids = val
})

const usersTypes = ref([
  { id: 1, name: 'Freelancer', description: 'Work independently on projects', icon: 'bi bi-laptop' },
  { id: 2, name: 'Student', description: 'Learning and building portfolio', icon: 'bi bi-book' },
  { id: 3, name: 'Investor', description: 'Looking for great opportunities', icon: 'bi bi-graph-up-arrow' },
  { id: 4, name: 'Interpreter', description: 'Language and communication expert', icon: 'bi bi-translate' },
  { id: 5, name: 'Client', description: 'Hiring talent for projects', icon: 'bi bi-briefcase' },
])

const nextStep = async () => {
  if (!selectedUserTypeId.value) return

  try {
    isLoading.value = true
    const payload = {
      user_type_ids: JSON.stringify([selectedUserTypeId.value])
    }
    await authStore.userType(payload)
    router.push({ name: 'positionuser' })
  } catch {
    showError('Failed to select user type')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.form-section {
  animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-section {
  margin-bottom: 40px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 600;
  padding: 0;
  margin-bottom: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  color: var(--color-primary);
  transform: translateX(-4px);
}

.step-chip {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(var(--color-primary-rgb), 0.08);
  color: var(--color-primary);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.form-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.form-description {
  color: var(--color-text-tertiary);
  font-size: 15px;
  line-height: 1.6;
}

.user-type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 10px;
}

.user-type-option {
  position: relative;
}

.type-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.type-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  height: 100%;
}

.type-card:hover {
  border-color: var(--color-primary);
  background: rgba(var(--color-primary-rgb), 0.02);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.type-radio:checked+.type-card {
  border-color: var(--color-primary);
  background: rgba(var(--color-primary-rgb), 0.04);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.type-icon-wrapper {
  width: 56px;
  height: 56px;
  background: rgba(var(--color-primary-rgb), 0.05);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.type-radio:checked+.type-card .type-icon-wrapper {
  background: var(--color-primary);
  color: var(--color-surface);
  transform: scale(1.1);
}

.type-content {
  flex: 1;
}

.type-label {
  font-weight: 700;
  font-size: 16px;
  color: var(--color-text);
  margin-bottom: 4px;
}

.type-desc {
  font-size: 13px;
  color: var(--color-text-tertiary);
  line-height: 1.4;
}

.selected-indicator {
  position: absolute;
  top: 16px;
  right: 16px;
  color: var(--color-primary);
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.type-radio:checked+.type-card .selected-indicator {
  opacity: 1;
  transform: scale(1);
}

.form-footer {
  margin-top: 48px;
  display: flex;
  justify-content: flex-end;
}

.submit-btn {
  min-width: 160px;
  border-radius: 14px;
  height: 54px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .user-type-grid {
    grid-template-columns: 1fr;
  }
}
</style>
