<template>
  <div class="register-wrapper">
    <!-- Premium Background Effects -->
    <ShootingStars v-if="theme === 'dark'" />
    <BackgroundBeams v-if="theme === 'dark'" />

    <div class="container container-lg-fluid d-flex align-items-center justify-content-center min-vh-100 py-4">
      <div class="container-custom">
        <div class="row g-0 h-100">
          <!-- Sidebar: Professional & Dynamic -->
          <div class="col-lg-4 d-none d-lg-block">
            <div class="sidebar">
              <!-- Animated Background Grid -->
              <div class="sidebar-bg-grid"></div>

              <div class="sidebar-content">
                <div class="brand-section">
                  <div class="logo">
                    <div class="logo-icon">
                      <img src="../../../public/logo_favicon.png" alt="Vetika Logo" class="img-fluid rounded-2">
                    </div>
                  </div>
                  <p class="subtitle">Join our community and start your journey in 4 simple steps.</p>
                </div>

                <div class="steps-container">
                  <div v-for="step in steps" :key="step.number" :class="['step-item', {
                    'active': isStepActive(step.number),
                    'completed': isStepCompleted(step.number)
                  }]">
                    <div class="step-line" v-if="step.number < 4"></div>
                    <div class="step-number-wrap">
                      <div class="step-number">
                        <i v-if="isStepCompleted(step.number)" class="bi bi-check-lg"></i>
                        <span v-else>{{ step.number }}</span>
                      </div>
                    </div>
                    <div class="step-info">
                      <div class="step-title">{{ step.title }}</div>
                      <div class="step-desc">{{ step.desc }}</div>
                    </div>
                  </div>
                </div>

                <div class="sidebar-footer">
                  <p>© 2026 . All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content: Clean & Focused -->
          <div class="col-lg-8 col-12">
            <div class="main-content-wrapper">
              <!-- Mobile Logo (Shown only on small screens) -->
              <div class="mobile-header d-lg-none">
                <div class="logo">
                  <img src="/logo.jpg" alt="Logo" class="mobile-logo">
                  <span class="logo-text">Vetika</span>
                </div>
              </div>

              <div class="main-content">
                <router-view v-slot="{ Component }">
                  <transition name="fade-slide" mode="out-in">
                    <component :is="Component" />
                  </transition>
                </router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import ShootingStars from '@/components/ui/background/ShootingStars.vue'
import BackgroundBeams from '@/components/ui/background/BackgroundBeams.vue'

const route = useRoute()
const router = useRouter()
const { theme } = useTheme()
const activeStep = ref(1)

const steps = [
  { number: 1, title: 'Create Account', desc: 'Basic info & credentials' },
  { number: 2, title: 'User Type', desc: 'How will you use Vetika?' },
  { number: 3, title: 'Position', desc: 'Your professional role' },
  { number: 4, title: 'Review', desc: 'Confirm your details' }
]

const stepMap = {
  'createuser': 1,
  'typeuser': 2,
  'positionuser': 3,
  'previewuser': 4
}

const updateActiveStep = () => {
  const currentRouteName = route.name
  activeStep.value = stepMap[currentRouteName] || 1
}

watch(() => route.name, updateActiveStep, { immediate: true })

const isStepActive = (step) => activeStep.value === step
const isStepCompleted = (step) => activeStep.value > step

defineOptions({
  name: 'RegisterLayout'
})
</script>

<style scoped>
.register-wrapper {
  background-color: var(--color-background);
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s ease;
  overflow-x: hidden;
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

/* Sidebar Styling - Redesigned for Premium Feel */
.sidebar {
  background: radial-gradient(circle at top left, #1c1c1c 0%, #09090b 100%);
  color: #fafafa;
  height: 100%;
  position: relative;
  padding: 48px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .sidebar {
  background: radial-gradient(circle at top left, #27272a 0%, #09090b 100%);
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
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.logo-icon {
  width: 105px;
  height: 48px;
  object-fit: cover;
  overflow: hidden;
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

.subtitle {
  color: #a1a1aa;
  font-size: 15px;
  line-height: 1.6;
  max-width: 260px;
  font-weight: 400;
  letter-spacing: 0.2px;
}

/* Steps Progress */
.steps-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-left: 4px;
}

.step-item {
  display: flex;
  gap: 34px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-line {
  position: absolute;
  left: 20px;
  top: 48px;
  width: 2px;
  height: calc(100% - 8px);
  background: rgba(255, 255, 255, 0.05);
  z-index: 1;
  border-radius: 1px;
  overflow: hidden;
}

.step-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.5));
  transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-item.completed .step-line::after {
  height: 100%;
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
  font-size: 15px;
  color: #71717a;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
}

.step-item.active .step-number {
  background: #ffffff;
  color: #000;
  border-color: #ffffff;
  transform: scale(1.1);
  box-shadow:
    0 0 0 4px rgba(255, 255, 255, 0.1),
    0 0 25px rgba(255, 255, 255, 0.5);
}

.step-item.completed .step-number {
  background: #ffffff;
  color: #000;
  border-color: #ffffff;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

.step-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: all 0.4s ease;
  padding-top: 4px;
}

.step-item.active .step-info {
  transform: translateX(4px);
}

.step-title {
  font-size: 17px;
  font-weight: 700;
  color: #71717a;
  transition: color 0.4s ease;
  letter-spacing: -0.2px;
}

.step-item.active .step-title,
.step-item.completed .step-title {
  color: #ffffff;
}

.step-desc {
  font-size: 13.5px;
  color: #52525b;
  font-weight: 400;
  transition: color 0.4s ease;
}

.step-item.active .step-desc,
.step-item.completed .step-desc {
  color: #a1a1aa;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar-footer p {
  font-size: 12px;
  color: #3f3f46;
  margin-bottom: 0;
  letter-spacing: 0.3px;
}

/* Main Content Styling */
.main-content-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
}

.mobile-header {
  padding: 24px 32px 0;
}

.mobile-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  margin-right: 12px;
}

.main-content {
  flex: 1;
  padding: 64px 64px 80px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.main-content::-webkit-scrollbar {
  width: 6px;
}

.main-content::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 1200px) {
  .container-custom {
    max-width: 95%;
    height: auto;
    max-height: none;
    margin: 20px 0;
  }

  .sidebar {
    padding: 32px;
  }
}

@media (max-width: 991px) {
  .register-wrapper {
    align-items: flex-start;
    padding: 16px;
  }

  .container-custom {
    height: auto;
    max-height: none;
    border-radius: 24px;
    margin: 0;
  }

  .main-content-wrapper {
    height: auto;
  }

  .main-content {
    padding: 32px 24px;
    overflow-y: visible;
    height: auto;
    flex: none;
  }

  .container-lg-fluid {
    padding: 0;
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 24px 16px;
  }
}
</style>
