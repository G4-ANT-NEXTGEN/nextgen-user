<template>
  <div class="reset-wrapper">
    <!-- Premium Background Effects -->
    <ShootingStars v-if="theme === 'dark'" />
    <BackgroundBeams v-if="theme === 'dark'" />

    <div class="container d-flex align-items-center justify-content-center min-vh-100 py-4">
      <div class="container-custom">
        <div class="row g-0 h-100">
          <!-- Sidebar -->
          <div class="col-lg-4 d-none d-lg-block">
            <div class="sidebar">
              <!-- Animated Background Grid -->
              <div class="sidebar-bg-grid"></div>

              <div class="sidebar-content">
                <div class="brand-section">
                  <div class="logo">
                    <div class="logo-icon">
                      <img class="img-fluid rounded-2" src="/logo.jpg" alt="NextGen Logo">
                    </div>
                  </div>
                  <p class="subtitle">Complete password reset in 4 easy steps</p>
                </div>

                <div class="steps">
                  <div :class="['step', { active: isStepActive(1), completed: isStepCompleted(1) }]">
                    <div class="step-line" v-if="true"></div>
                    <div class="step-number-wrap">
                      <div class="step-number">
                        <i v-if="isStepCompleted(1)" class="bi bi-check-lg"></i>
                        <span v-else>1</span>
                      </div>
                    </div>
                    <div class="step-info">
                      <div class="step-title">Reset Password</div>
                      <div class="step-desc">Enter your email or phone</div>
                    </div>
                  </div>

                  <div :class="['step', { active: isStepActive(2), completed: isStepCompleted(2) }]">
                    <div class="step-line" v-if="true"></div>
                    <div class="step-number-wrap">
                      <div class="step-number">
                        <i v-if="isStepCompleted(2)" class="bi bi-check-lg"></i>
                        <span v-else>2</span>
                      </div>
                    </div>
                    <div class="step-info">
                      <div class="step-title">OTP Verification</div>
                      <div class="step-desc">Verify your identity</div>
                    </div>
                  </div>

                  <div :class="['step', { active: isStepActive(3), completed: isStepCompleted(3) }]">
                    <div class="step-number-wrap">
                      <div class="step-number">
                        <i v-if="isStepCompleted(3)" class="bi bi-check-lg"></i>
                        <span v-else>3</span>
                      </div>
                    </div>
                    <div class="step-info">
                      <div class="step-title">New Password</div>
                      <div class="step-desc">Create new password</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="col-lg-8 col-12">
            <div class="main-content-wrapper">
              <div class="main-content">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import ShootingStars from '@/components/ui/background/ShootingStars.vue'
import BackgroundBeams from '@/components/ui/background/BackgroundBeams.vue'

const route = useRoute()
const { theme } = useTheme()
const activeStep = ref(1)

const stepMap = {
  'email': 1,
  'otp': 2,
  'new-password': 3
}

const updateActiveStep = () => {
  const currentRouteName = route.name
  activeStep.value = stepMap[currentRouteName] || 1
}

watch(() => route.name, updateActiveStep, { immediate: true })

const isStepActive = (step) => activeStep.value === step
const isStepCompleted = (step) => activeStep.value > step
</script>


<style scoped>
.reset-wrapper {
  background-color: var(--color-background);
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s ease;
  overflow-x:
    hidden;
}

.container-custom {
  background: var(--color-surface);
  border-radius: 32px;
  width: 100%;
  max-width: 1240px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  position: relative;
  z-index: 10;
  backdrop-filter: blur(20px);
}

/* Sidebar Styling */
.sidebar {
  background: radial-gradient(circle at top left, #1c1c1c 0%, #09090b 100%);
  color: #fafafa;
  height: 100%;
  position:
    relative;
  padding: 48px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid rgba(255,
      255, 255, 0.05);
}

.sidebar-bg-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255,
        255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent);
  opacity:
    0.4;
  animation: grid-pulse 10s infinite alternate;
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

.sidebar-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.brand-section {
  margin-bottom: 72px;
}

.logo {
  display: flex;
  align-items:
    center;
  gap: 16px;
  margin-bottom: 20px;
}

.logo-icon {
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255,
      0.05);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255,
        0.2));
}

.logo-text {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(135deg,
      #ffffff 0%, #a1a1aa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color:
    transparent;
}

.subtitle {
  color: #a1a1aa;
  font-size: 14px;
  line-height: 1.6;
  max-width: 260px;
}

.steps {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.step {
  display: flex;
  gap: 24px;
  position: relative;
  transition: all 0.4s ease;
}

.step-line {
  position: absolute;
  left: 20px;
  top: 48px;
  width: 2px;
  height: calc(100% - 0px);
  background: rgba(255, 255, 255, 0.05);
  z-index: 1;
}

.step-number-wrap {
  position: relative;
  z-index: 2;
}

.step-number {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #71717a;
  transition: all 0.4s ease;
}

.step.active .step-number {
  background: #ffffff;
  color: #000;
  transform: scale(1.1);
}

.step.completed .step-number {
  background: #ffffff;
  color: #000;
}

.step-info {
  padding-top: 4px;
}

.step-title {
  font-size: 16px;
  font-weight: 700;
  color: #71717a;
}

.step.active .step-title,
.step.completed .step-title {
  color: #ffffff;
}

.step-desc {
  font-size: 13px;
  color: #52525b;
}

.step.active .step-desc,
.step.completed .step-desc {
  color: #a1a1aa
}

/* Main Content */
.main-content-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
}

.main-content {
  flex: 1;
  padding: 64px;
  overflow-y: auto;
}

@media (max-width: 991px) {
  .container-custom {
    max-width: 95%;
    margin: 20px 0;
  }

  .main-content {
    padding: 32px 24px;
  }
}
</style>
