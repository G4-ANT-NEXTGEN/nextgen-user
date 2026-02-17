<template>
  <div class="container-custom">
    <!-- Premium Background Effects -->
    <ShootingStars v-if="theme === 'dark'" />
    <BackgroundBeams v-if="theme === 'dark'" />
    <div class="container d-flex align-items-center justify-content-center">
      <div class="main-container">
        <div class="row g-0 h-100">
          <div class="col-lg-6">
            <div class="left-panel h-100">
              <!-- Animated Background Grid -->
              <div class="sidebar-bg-grid"></div>
              <div class="h-100 d-flex flex-column justify-content-between relative z-10">
                <div>
                  <div class="logo">
                    <div class="logo-icon">
                      <img src="../../../public/logo.png" alt="Vetika Logo" class="img-fluid rounded-2">
                    </div>
                  </div>
                </div>

                <div class="hero-content animate-slide-up">
                  <h1>Connect. Innovate.<br>Grow Together.</h1>
                  <p>A vibrant community for students, freelancers, entrepreneurs, and investors to connect,
                    innovate, and grow together.</p>
                </div>

                <router-link to="/" class="back-link">
                  <span>←</span>
                  <span>Back to Website</span>
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="right-panel">
              <div class="login-form animate-fade-in">
                <div class="form-header mb-4">
                  <h2>Welcome Back!</h2>
                  <p>Log in to connect with your community and start building together.</p>
                </div>

                <form @submit.prevent="loginForm()">


                  <BaseInput @input="validateEmail()" v-model="email" type="text" :error="errors.email" id="email-input"
                    placeholder="Enter your email" label="Email Address" />

                  <BaseInput @input="validatePassword()" v-model="password" type="password" :error="errors.password"
                    id="password-input" placeholder="Enter your password" label="Password" />

                  <div class="form-options mb-4">
                    <div class="form-check">
                      <input class="form-check-input me-2" type="checkbox" id="remember">
                      <label class="form-check-label" for="remember">
                        Remember Me
                      </label>
                    </div>
                    <span @click="goToEmail" class="forgot-password" style="cursor: pointer;">
                      Forgot Password?
                    </span>
                  </div>

                  <BaseButton @click="loginForm()" :isLoading="Isloading" type="button" variant="primary"
                    class="btn-login">
                    <span>{{ Isloading ? 'Loading...' : 'Login' }}</span>
                  </BaseButton>

                </form>


                <div class="signup-link mt-4">
                  Don't have an account?
                  <span class="forgot-password" @click="gotoRegister" style="cursor: pointer;">
                    Sign up here
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import { usePasswordValidator } from '@/composables/usePasswordValidator';
import BaseInput from '../ui/base/BaseInput.vue';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme'
import ShootingStars from '@/components/ui/background/ShootingStars.vue'
import BackgroundBeams from '@/components/ui/background/BackgroundBeams.vue'

const authStore = useAuthStore()
const router = useRouter()
const { theme } = useTheme()
const email = ref('')
const password = ref('')
const Isloading = ref(false)
const { errors, validateField } = useRequiredValidator()
const { validatePassword: checkPassword } = usePasswordValidator()


const validateEmail = () => validateField('email', email.value, 'Email is required')

const validatePassword = () => {
  const result = checkPassword(password.value)
  errors.password = result.message
  return result.isValid
}


const validateForm = () => {
  let isValid = true
  if (!validateEmail() || !validatePassword()) {
    isValid = false
  }
  return isValid
}

const loginForm = async () => {

  if (!validateForm()) {
    return
  }

  try {
    Isloading.value = true
    await authStore.login(
      {
        email_or_phone: email.value,
        password: password.value
      }
    )
  } catch (e) {
    console.error('Login error:', e)
  } finally {
    Isloading.value = false
  }
}


function goToEmail() {
  router.push({ name: 'email' })
}

function gotoRegister() {
  router.push({ name: 'createuser' })
}

</script>



<style scoped>
.container-custom {
  background: var(--color-background);
}

.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.main-container {
  width: 100%;
  max-width: 1050px;
  height: min(700px, calc(100vh - 60px));
  min-height: 520px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.form-check-label {
  color: var(--color-text);
}

.left-panel {
  background: radial-gradient(circle at top left, #1c1c1c 0%, #09090b 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px;
  height: 100%;
  border-radius: 24px;
}

.relative {
  position: relative;
}

.z-10 {
  z-index: 10;
}

.left-panel::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
}

.sidebar-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent);
  opacity: 0.4;
  animation: grid-pulse 10s infinite alternate;
  z-index: 0;
}

@keyframes grid-pulse {
  0% {
    transform: scale(1);
    opacity: 0.2;
  }

  100% {
    transform: scale(1.05);
    opacity: 0.4;
  }
}

@keyframes bg-grid-move {
  0% {
    transform: rotate(15deg) translateY(0);
  }

  100% {
    transform: rotate(15deg) translateY(100px);
  }
}

.logo {
  width: 105px;
}

.logo-icon {
  overflow: hidden;
  width: 100%;
  height: 48px;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;

}

[data-theme="dark"] .logo-icon img {
  filter: brightness(0) invert(1);
}

[data-theme="light"] .logo-icon img {
  filter: brightness(1) invert(1);
}

.logo-text {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.hero-content {
  z-index: 1;
  color: white;
  position: relative;
}

.hero-content h1 {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -1.5px;
  background: linear-gradient(to bottom, #fff, #94a3b8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-content p {
  font-size: 16px;
  color: #a1a1aa;
  max-width: 440px;
  line-height: 1.6;
  font-weight: 400;
}

.back-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  z-index: 1;
  position: relative;
  transition: color 0.3s;
}

.back-link:hover {
  color: white;
  background: none;
}

.right-panel {
  background: var(--color-surface);
  padding: 45px 60px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.right-panel::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}

.right-panel::-webkit-scrollbar {
  width: 6px;
}

.right-panel::-webkit-scrollbar-track {
  background: transparent;
}

.right-panel::-webkit-scrollbar-thumb {
  background: #e5e5e5;
  border-radius: 10px;
}

.form-header h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--color-text);
}

.form-header p {
  color: var(--color-text-secondary);
  font-size: 15px;
  line-height: 1.5;
}

.form-label {
  font-size: 15px;
  font-weight: 600;
  color: #0a0a0a;
  margin-bottom: 10px;
}

.form-control {
  padding: 16px 18px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s;
  background: #ffffff;
  color: #0a0a0a;
}

.form-control::placeholder {
  color: #999;
}

.form-control:focus {
  border-color: #0a0a0a;
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);
}

.input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  font-size: 14px;
  user-select: none;
  background: none;
  border: none;
  padding: 0;
}

.password-toggle:hover {
  color: #0a0a0a;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4a4a4a;
  font-weight: 500;
}

.form-check-input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-check-input:checked {
  background-color: #0a0a0a;
  border-color: #0a0a0a;
}

.forgot-password {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-login {
  width: 100%;
}

.forgot-password:hover {
  color: var(--color-primary);
  background: none;
  transform: translateY(-2px);
}

.login-btn {
  width: 100%;
  padding: 18px;
  background: #0a0a0a;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 0.3px;
}

.login-btn:hover {
  background: #2a2a2a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.login-btn:active {
  transform: translateY(0);
}

.divider {
  text-align: center;
  color: var(--color-text-tertiary);
  font-size: 14px;
  font-weight: 500;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 38%;
  height: 1px;
  background: var(--color-border);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.social-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.social-btn {
  width: 100%;
  padding: 14px 12px;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  color: var(--color-text);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}

.social-btn:hover {
  border-color: var(--color-text);
  background: var(--color-hover);
  transform: translateY(-2px);
}

.social-btn svg path {
  transition: fill 0.3s;
}

/* Ensure SVG icons are visible and some handle theme */
.social-btn svg[stroke="currentColor"] {
  color: var(--color-text);
}

.signup-link {
  text-align: center;
  font-size: 15px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.signup-link span {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s;
}

.signup-link span:hover {
  color: var(--color-primary);
}

/* Animations */
.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 991px) {
  body {
    padding: 20px;
  }

  .main-container {
    height: auto;
    min-height: auto;
  }

  .left-panel {
    display: none;
  }

  .right-panel {
    padding: 30px 20px;
  }
}

@media (max-height: 800px) {
  .hero-content h1 {
    font-size: 36px;
  }

  .right-panel {
    padding: 40px;
  }

  .form-header h2 {
    font-size: 28px;
  }
}

@media (max-height: 600px) {
  .hero-content h1 {
    font-size: 28px;
  }

  .hero-content p {
    font-size: 14px;
  }

  .right-panel {
    padding: 30px;
  }
}
</style>
