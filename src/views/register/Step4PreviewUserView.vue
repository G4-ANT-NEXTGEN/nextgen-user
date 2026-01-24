<template>

    <div class="content-wrapper">
        <button class="back-button" @click="router.go(-1)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
        </button>

        <div class="step-indicator">STEP 4 OF 4</div>
        <h2 class="page-title">Confirm</h2>
        <p class="page-subtitle">Review and confirm</p>

        <h3 class="section-title">Review Your Information</h3>

        <div class="info-grid">
            <div class="info-card">
                <div class="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="info-label">Full Name</div>
                <div class="info-value">{{ authStore.user.full_name }}</div>
            </div>

            <div class="info-card">
                <div class="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                        </path>
                    </svg>
                </div>
                <div class="info-label">Phone</div>
                <div class="info-value">{{ authStore.user.phone }}</div>
            </div>

            <div class="info-card full-width">
                <div class="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                        </path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </div>
                <div class="info-label">Email</div>
                <div class="info-value">{{ authStore.user.email }}</div>
            </div>

            <div class="info-card">
                <div class="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </div>
                <div class="info-label">User Type</div>
                <div class="info-value">{{ authStore.user.types[0].name }}</div>
            </div>

            <div class="info-card">
                <div class="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                </div>
                <div class="info-label">Position</div>
                <div class="info-value">{{ authStore.user.positions[0].name }}</div>
            </div>
        </div>

        <div class="d-flex align-item-center justify-content-end mt-0">
            <div class="button-container">
                <BaseButton @click="handleRegister" type="button" variant="primary">
                    Register
                </BaseButton>
            </div>
        </div>
    </div>

</template>

<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

console.log(authStore.user.full_name);


function handleRegister() {
    // Implement registration logic here
    router.push({ name: 'login' });
}

</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: #f9fafb;
}

.container {
    display: flex;
    min-height: 100vh;
}

/* Sidebar */
.sidebar {
    width: 320px;
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
    color: white;
    padding: 2rem;
}

.logo-section {
    margin-bottom: 3rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
}

.logo-icon {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-weight: bold;
    font-size: 0.875rem;
}

.logo h1 {
    font-size: 1.5rem;
    font-weight: bold;
}

.logo-subtitle {
    color: #9ca3af;
    font-size: 0.875rem;
}

/* Steps */
.steps {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.step {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.step-number {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
    transition: all 0.3s;
}

.step.active .step-number {
    background: white;
    color: black;
}

.step:not(.active) .step-number {
    background: #374151;
    color: #9ca3af;
}

.step-content {
    padding-top: 0.5rem;
}

.step-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.step.active .step-title {
    color: white;
}

.step:not(.active) .step-title {
    color: #6b7280;
}

.step-subtitle {
    color: #6b7280;
    font-size: 0.875rem;
}

.step-line {
    position: absolute;
    left: 24px;
    top: 56px;
    width: 2px;
    height: 40px;
    background: #374151;
}

/* Main Content */
.main-content {
    flex: 1;
    padding: 3rem;
}

.content-wrapper {
    max-width: 800px;
}

.back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: #374151;
    font-size: 0.875rem;
    cursor: pointer;
    margin-bottom: 2rem;
    padding: 0.5rem;
    transition: color 0.2s;
}

.back-button:hover {
    color: #000;
}

.step-indicator {
    color: #9ca3af;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.page-title {
    font-size: 2rem;
    font-weight: bold;
    color: #111827;
    margin-bottom: 0.5rem;
}

.page-subtitle {
    color: #6b7280;
    margin-bottom: 2.5rem;
}

.section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1.5rem;
}

/* Information Grid */
.info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.info-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    /* border: none; */
    padding: 13px 20px;
    transition: all 0.2s;
}

.info-card:hover {
    border-color: #d1d5db;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.info-card.full-width {
    grid-column: 1 / -1;
}

.info-label {
    color: #6b7280;
    font-size: 0.8125rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    margin-bottom: 0.5rem;
}

.info-value {
    color: #111827;
    font-size: 1rem;
    font-weight: 600;
}

.info-icon {
    width: 40px;
    height: 40px;
    background: #f3f4f6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    margin-bottom: 1rem;
}

/* Register Button */
.button-container {
    width: 200px;
    display: flex;
    justify-content: flex-end;
}

.register-button {
    background: #000;
    color: white;
    border: none;
    padding: 0.875rem 2.5rem;
    border-radius: 8px;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.register-button:hover {
    background: #1f2937;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
    }

    .main-content {
        padding: 2rem 1.5rem;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }

    .info-card.full-width {
        grid-column: 1;
    }
}
</style>