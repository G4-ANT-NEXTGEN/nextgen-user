<template>
  <div class="form-section mt-0">
    <div class="header-section">
      <button class="back-button" @click="router.go(-1)">
        <i class="bi bi-arrow-left"></i>
        <span>Previous Step</span>
      </button>
      <div class="step-chip">STEP 4 OF 4</div>
      <h1 class="form-title">Review & Confirm</h1>
      <p class="form-description">Please double check your information before completing registration.</p>
    </div>

    <div class="review-grid">
      <!-- Profile Summary Card -->
      <div class="review-card profile-card">
        <div class="card-header">
          <div class="icon-box"><i class="bi bi-person-badge"></i></div>
          <h3 class="card-title">Personal Details</h3>
        </div>
        <div class="card-body">
          <div class="info-item">
            <span class="label">Full Name</span>
            <span class="value">{{ authStore.user?.full_name || 'Not provided' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Email Address</span>
            <span class="value">{{ authStore.user?.email || 'Not provided' }}</span>
          </div>
          <div class="info-item">
            <span class="label">Phone Number</span>
            <span class="value">{{ authStore.user?.phone || 'Not provided' }}</span>
          </div>
        </div>
      </div>

      <!-- Account Type Summary Card -->
      <div class="review-card">
        <div class="card-header">
          <div class="icon-box"><i class="bi bi-shield-check"></i></div>
          <h3 class="card-title">Account Setup</h3>
        </div>
        <div class="card-body">
          <div class="info-item">
            <span class="label">User Type</span>
            <span class="value highlight">
              {{ authStore.user?.types?.[0]?.name || 'Not selected' }}
            </span>
          </div>
          <div class="info-item">
            <span class="label">Desired Position</span>
            <span class="value highlight">
              {{ authStore.user?.positions?.[0]?.name || 'Not selected' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="form-footer">
      <BaseButton variant="primary" size="lg" class="submit-btn" :isLoading="isLoading" @click="handleRegister">
        <span>Complete Registration</span>
        <i class="bi bi-check-all ms-2"></i>
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { showSuccess } from "@/utils/toast";
import BaseButton from "@/components/ui/base/BaseButton.vue"

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)

async function handleRegister() {
  try {
    isLoading.value = true
    // Simulate API call if needed or just navigate
    showSuccess('Registration successful!')
    authStore.resetRegistrationForm()
    router.push({ name: 'login' });
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

.review-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-card {
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: 20px;
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.icon-box {
  width: 38px;
  height: 38px;
  background: rgba(var(--color-primary-rgb), 0.05);
  color: var(--color-primary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.card-body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.value {
  font-size: 14px;
  color: var(--color-text);
  font-weight: 600;
}

.value.highlight {
  color: var(--color-primary);
}

.terms-notice {
  margin-top: 32px;
  text-align: center;
}

.terms-notice p {
  font-size: 13px;
  color: var(--color-text-tertiary);
}

.terms-notice a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
}

.terms-notice a:hover {
  text-decoration: underline;
}

.form-footer {
  margin-top: 48px;
  display: flex;
  justify-content: center;
}

.submit-btn {
  min-width: 240px;
  border-radius: 14px;
  height: 56px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .card-body {
    grid-template-columns: 1fr;
  }
}
</style>
