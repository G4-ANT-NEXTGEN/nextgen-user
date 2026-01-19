<template>
    <div class="container d-flex align-items-center justify-content-center" style="height: 100vh;">
        <div class="container-custom">
            <div class="row g-0">
                <!-- Sidebar -->
                <div class="col-lg-4">
                    <div class="sidebar">
                        <div class="sidebar-content">
                            <div class="logo">
                                <div class="logo-icon">
                                    <img class="img-fluid" src="/public/logo.jpg" alt="">
                                </div>
                                <div class="logo-text">NextGen</div>
                            </div>
                            <div class="subtitle">Complete password reset in 4 easy steps</div>

                            <div class="steps">
                                <div :class="['step', { active: isStepActive(1), completed: isStepCompleted(1) }]"
                                    data-step="1">
                                    <div class="step-number">1</div>
                                    <div class="step-info">
                                        <div class="step-title">Reset Password</div>
                                        <div class="step-desc">Enter your email or phone</div>
                                    </div>
                                </div>

                                <div :class="['step', { active: isStepActive(2), completed: isStepCompleted(2) }]"
                                    data-step="2">
                                    <div class="step-number">2</div>
                                    <div class="step-info">
                                        <div class="step-title">OTP Verification</div>
                                        <div class="step-desc">Verify your identity</div>
                                    </div>
                                </div>

                                <div :class="['step', { active: isStepActive(3), completed: isStepCompleted(3) }]"
                                    data-step="3">
                                    <div class="step-number">3</div>
                                    <div class="step-info">
                                        <div class="step-title">New Password</div>
                                        <div class="step-desc">Create new password</div>
                                    </div>
                                </div>

                                <div :class="['step', { active: isStepActive(4), completed: isStepCompleted(4) }]"
                                    data-step="4">
                                    <div class="step-number">4</div>
                                    <div class="step-info">
                                        <div class="step-title">Confirm</div>
                                        <div class="step-desc">Review and confirm</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="col-lg-8 col-12">
                    <div class="d-flex align-items-center justify-content-center h-100 w-100">
                        <div class="main-content">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
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
body {
    background: var(--color-background);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container-custom {
    background: var(--color-accent);
    border-radius: 20px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
    width: 100%;
    overflow: hidden;
}

.sidebar {
    background: #000000;
    color: white;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px;
    height: 100%;
}

.sidebar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(0deg, rgba(255, 255, 255, 0.08) 2px, transparent 2px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.08) 2px, transparent 2px);
    background-size: 60px 60px;
    animation: gridMove 3s linear infinite;
    z-index: 0;
}

.sidebar::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 600px;
    background: radial-gradient(circle, rgba(100, 100, 100, 0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    animation: spotlight 1ms ease-in-out infinite;
    z-index: 0;
}

@keyframes gridMove {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(60px, 60px);
    }
}

@keyframes spotlight {

    0%,
    100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(1);
    }

    50% {
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1.1);
    }
}

.sidebar-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.logo-icon {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--color-dark);
    font-size: 14px;
}

.logo-text {
    font-size: 20px;
    font-weight: 700;
}

.subtitle {
    color: #9ca3af;
    font-size: 13px;
    margin-bottom: 48px;
    line-height: 1.5;
}

.steps {
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.step {
    display: flex;
    align-items: center;
    gap: 16px;
    opacity: 0.4;
    transition: all 500ms ease;
    position: relative;
    padding: 16px 0;
}

.step.active {
    opacity: 1;
}

.step.completed {
    opacity: 0.7;
}

.step:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 21px;
    top: 58px;
    width: 2px;
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    z-index: 1;
}

.step-number {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
    transition: all 500ms ease;
    position: relative;
    z-index: 2;
}

.step.active .step-number {
    background: white;
    color: #000;
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.step.completed .step-number {
    background: white;
    color: #000;
}

.step-info {
    flex: 1;
}

.step-title {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 2px;
}

.step-desc {
    font-size: 12px;
    color: #9ca3af;
}

/* Main Content */
.main-content {
    padding: 56px 0px;
    width: calc(100% - 200px);
    background: var(--color-accent);
}

.step-indicator {
    color: rgb(0, 106, 255);
    font-size: 12px;
    margin-bottom: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

h1 {
    font-size: 32px;
    color: var(--color-text);
    margin-bottom: 10px;
    font-weight: 700;
    line-height: 1.2;
}

.description {
    color: var(--color-gray);
    font-size: 14px;
    margin-bottom: 40px;
    line-height: 1.5;
}

.form-section {
    display: none;
    animation: fadeIn 500ms ease;
}

.form-section.active {
    display: block;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.form-label {
    margin-bottom: 10px;
    color: var(--color-text);
    font-size: 13px;
    font-weight: 600;
}

.form-label span {
    color: #ef4444;
}

.form-control,
.form-select {
    padding: 15px 18px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    transition: all 500ms ease;
    line-height: 1.5;
}

.form-control:focus,
.form-select:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.1);
    transform: translateY(-1px);
}

.form-control::placeholder {
    color: #9ca3af;
}

.helper-text {
    font-size: 12px;
    color: var(--color-gray);
    margin-top: 8px;
    line-height: 1.5;
}

.checkbox-group {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin: 32px 0;
    padding: 18px;
    background: var(--color-secondary);
    border-radius: 8px;
}

.form-check-input {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    cursor: pointer;
}

.checkbox-label {
    font-size: 13px;
    color: var(--color-gray);
    line-height: 1.6;
}

.checkbox-label a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 600;
}

.checkbox-label a:hover {
    text-decoration: underline;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 40px;
}

.btn {
    padding: 15px 32px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    transition: all 500ms ease;
    letter-spacing: 0.3px;
}

.btn-back {
    background: transparent;
    color: var(--color-gray);
    border: 1.5px solid #e5e7eb;
}

.btn-back:hover {
    background: var(--color-secondary);
    color: var(--color-gray);
    transform: translateY(-1px);
}

.btn-continue {
    background: var(--color-primary);
    color: white;
    padding: 15px 48px;
    border: none;
}

.btn-continue:hover {
    background: #1a1a1a;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(10, 10, 10, 0.25);
}

.btn-continue:active {
    transform: translateY(0);
}

.otp-inputs {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin: 40px 0;
}

.otp-input {
    width: 64px;
    height: 64px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    transition: all 500ms ease;
}

.otp-input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.1);
    transform: scale(1.05);
}

.success-message {
    text-align: center;
    padding: 40px 20px;
}

.success-icon {
    width: 80px;
    height: 80px;
    background: #10b981;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 40px;
    color: white;
}

@media (max-width: 768px) {

    .sidebar {
        padding: 30px 20px;
        min-height: auto;
    }

    .steps {
        flex-direction: row;
        overflow-x: auto;
        gap: 20px;
    }

    .step {
        flex-direction: column;
        text-align: center;
    }

    .step:not(:last-child)::after {
        left: auto;
        top: 20px;
        width: 40px;
        height: 2px;
        right: -30px;
    }

    .otp-inputs {
        gap: 8px;
    }

    .otp-input {
        width: 50px;
        height: 50px;
        font-size: 20px;
    }
}
</style>