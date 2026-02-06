<template>

  <div class="container d-flex align-items-center justify-content-center">
    <div class="main-container">
      <div class="row g-0 h-100">
        <div class="col-lg-6">
          <div class="left-panel h-100">
            <div class="h-100 d-flex flex-column justify-content-between p-4 relative z-10">
              <div>
                <div class="logo">
                  <div class="logo-icon">
                    <img src="/public/logo.jpg" alt="NextGen Logo">
                  </div>
                  <span>NextGen</span>
                </div>
              </div>

              <div class="hero-content">
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
          <div class="right-panel h-100">
            <div class="login-form">
              <div class="form-header mb-4">
                <h2>Welcome Back!</h2>
                <p>Log in to connect with your community and start building together.</p>
              </div>

              <form @submit.prevent="loginForm()">


                <BaseInput @input="validateEmail()" v-model="email" type="text" :error="errors.email" id="email-input"
                  placeholder="Enter your email" label="Email Address" />

                <div class="mb-3 position-relative">
                  <BaseInput @input="validatePassword()" v-model="password" :type="showPass ? 'text' : 'password'"
                    :error="errors.password" id="password-input" placeholder="Enter your password" label="Password" />
                  <i class="bi" :class="showPass ? 'bi-eye-slash' : 'bi-eye'" @click="showPass = !showPass"
                    style="cursor: pointer; position: absolute; right: 20px; top: 65px; transform: translateY(-50%);"></i>
                </div>

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

              <div class="divider mb-4 mt-4">Or continue with</div>

              <div class="social-buttons mb-4">
                <button class="social-btn">
                  <svg width="20" height="20" viewBox="0 0 18 18">
                    <path fill="#4285F4"
                      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
                    <path fill="#34A853"
                      d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
                    <path fill="#FBBC05"
                      d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z" />
                    <path fill="#EA4335"
                      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button class="social-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#181717">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </button>

                <button class="social-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>Email</span>
                </button>
              </div>

              <div class="signup-link">
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
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import { usePasswordValidator } from '@/composables/usePasswordValidator';
import { showError } from '@/utils/toast';
import BaseInput from '../ui/base/BaseInput.vue';
import { useRouter } from 'vue-router';
import ShootingStars from '../ui/background/ShootingStars.vue';
import { useTheme } from '@/composables/useTheme';

const authStore = useAuthStore()
const router = useRouter()
const { theme } = useTheme()
const email = ref('')
const password = ref('')
const showPass = ref(false)
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

    console.log(authStore.userResult);
    router.push({ name: 'home' })
  } catch (err) {
    console.log(err);
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
body {
  min-height: 100vh;
  display: flex;
  overflow-x: hidden;
  background: #e8e8e8;
  padding: 40px;
  align-items: center;
  justify-content: center;
}

.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-container {
  width: 100%;
  height: calc(100vh - 100px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.left-panel {
  background: #000000;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  min-height: 600px;
  border-radius: 24px;
}



.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-size: 28px;
  font-weight: 700;
  z-index: 1;
  letter-spacing: -0.5px;
  position: relative;
}

.logo-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-content {
  z-index: 1;
  color: white;
  position: relative;
}

.hero-content h1 {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 17px;
  opacity: 0.85;
  max-width: 500px;
  line-height: 1.6;
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
  background: white;
  padding: 60px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-header h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #0a0a0a;
}

.form-header p {
  color: #666;
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
  color: #0a0a0a;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;

}

.btn-login {
  width: 100%;
  color: var(--color-secondary);
  background-color: var(--color-primary);
}

.forgot-password:hover {
  color: #000000;
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
  color: #999;
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
  background: #e5e5e5;
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
  background: white;
  border: 2px solid #d0d0d0;
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
  border-color: #0a0a0a;
  transform: translateY(-2px);
}

.signup-link {
  text-align: center;
  font-size: 15px;
  color: #666;
  font-weight: 500;
}

.signup-link a {
  color: #0a0a0a;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s;
}

.signup-link a:hover {
  color: #000000;
  background: none;
  transform: translateY(-2px);
}

@media (max-width: 991px) {
  body {
    padding: 20px;
  }

  .main-container {
    height: auto;
  }

  .left-panel {
    display: none;
  }

  .right-panel {
    padding: 40px 30px;
  }
}
</style>
