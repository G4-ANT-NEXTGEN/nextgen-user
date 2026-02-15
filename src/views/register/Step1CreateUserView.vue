<template>
  <div class="form-section">
    <div class="header-section">
      <button class="back-button" @click="router.push({ name: 'login' })">
        <i class="bi bi-arrow-left"></i>
        <span>Back to Login</span>
      </button>
      <div class="step-chip">STEP 1 OF 4</div>
      <h1 class="form-title">Create Account</h1>
      <p class="form-description">Let's get started with your basic information.</p>
    </div>

    <form @submit.prevent="nextStep()" class="registration-form">
      <div class="row g-4">
        <div class="col-12">
          <BaseInput v-model="fullname" label="Full Name" placeholder="Next Gen" :error="errors.fullname"
            @input="validateFullName" />
        </div>

        <div class="col-md-6">
          <BaseInput v-model="email" type="email" label="Email Address" placeholder="Vetika@gmail.com"
            :error="errors.email" @input="validateEmail" />
        </div>

        <div class="col-md-6">
          <BaseInput v-model="phone" type="tel" label="Phone Number" placeholder="081 777 888" :error="errors.phone"
            @input="validatePhone" />
        </div>

        <div class="col-md-6">
          <BaseInput v-model="password" type="password" label="Password" placeholder="••••••••" :error="errors.password"
            @input="validatePassword" />
        </div>

        <div class="col-md-6">
          <BaseInput v-model="comfirmpassword" type="password" label="Confirm Password" placeholder="••••••••"
            :error="errors.comfirmpassword" @input="validateComfirmPassword" />
        </div>
      </div>

      <div class="form-footer">
        <BaseButton type="submit" variant="primary" size="lg" class="submit-btn" :isLoading="isLoading">
          <span>Continue</span>
          <i class="bi bi-chevron-right ms-2"></i>
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import { usePasswordValidator } from '@/composables/usePasswordValidator';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import BaseButton from '@/components/ui/base/BaseButton.vue';
import BaseInput from '@/components/ui/base/BaseInput.vue';

const { errors, validateField } = useRequiredValidator()
const { validatePassword: checkPassword } = usePasswordValidator()

const authStore = useAuthStore()
const isLoading = ref(false)

// Use binding to store for persistence
const fullname = computed({
  get: () => authStore.registrationForm.full_name,
  set: (val) => authStore.registrationForm.full_name = val
})
const email = computed({
  get: () => authStore.registrationForm.email,
  set: (val) => authStore.registrationForm.email = val
})
const phone = computed({
  get: () => authStore.registrationForm.phone,
  set: (val) => authStore.registrationForm.phone = val
})
const password = computed({
  get: () => authStore.registrationForm.password,
  set: (val) => authStore.registrationForm.password = val
})
const comfirmpassword = computed({
  get: () => authStore.registrationForm.password_confirmation,
  set: (val) => authStore.registrationForm.password_confirmation = val
})

const validateEmail = () => validateField('email', email.value, 'Email is required')
const validateFullName = () => validateField('fullname', fullname.value, 'Full Name is required')
const validatePhone = () => validateField('phone', phone.value, 'Phone Number is required')
const validatePassword = () => {
  const result = checkPassword(password.value)
  errors.password = result.message
  return result.isValid
}
const validateComfirmPassword = () => {
  if (!comfirmpassword.value) {
    errors.comfirmpassword = 'Confirm Password is required'
    return false
  }
  if (password.value !== comfirmpassword.value) {
    errors.comfirmpassword = 'Passwords do not match'
    return false
  }
  errors.comfirmpassword = ''
  return true
}

const validateForm = () => {
  const isFullNameValid = validateFullName()
  const isEmailValid = validateEmail()
  const isPhoneValid = validatePhone()
  const isPasswordValid = validatePassword()
  const isConfirmValid = validateComfirmPassword()

  return isFullNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmValid
}

const nextStep = async () => {
  if (!validateForm()) return

  try {
    isLoading.value = true
    await authStore.register({
      full_name: fullname.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      password_confirmation: comfirmpassword.value
    })

    if (authStore.userResult !== false) {
      router.push({ name: 'typeuser' })
    }
  } catch (e) {
    console.error('Registration error:', e)
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

.registration-form {
  margin-top: 10px;
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

/* BaseInput overrides/enhancements if needed */
:deep(.base-input-container) {
  margin-bottom: 0;
}

/* Custom transitions and states */
.row.g-4 {
  --bs-gutter-y: 1.5rem;
}
</style>
