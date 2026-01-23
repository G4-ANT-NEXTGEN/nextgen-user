<template>

    <!-- Step 1: Create Account -->
    <button class="back-button" @click="router.go(-1)">
        <div class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6" />
            </svg>
        </div>
        Back
    </button>

    <div class="step-indicator">STEP 3 OF 4</div>
    <h1>User Position</h1>
    <p class="description">Select your user position</p>

    <h3 class="section-title">Choose Your User Position</h3>

    <div class="user-type-grid">
        <div class="user-type-option" v-for="userType in usersTypes" :key="userType.id">
            <input type="radio" name="userType" :id="userType.id" :value="userType.id"
                v-model="selectedUserPositionId" />
            <label :for="userType.id" class="user-type-card">
                <div class="user-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                </div>
                <span class="user-type-label">{{ userType.name }}</span>
            </label>
        </div>
    </div>

    <div class="d-flex justify-content-end mt-0">
        <div class="button-group">
            <BaseButton type="button" variant="primary" @click="nextStep()" :isLoading="isLoading">
                Continue
            </BaseButton>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccess, showError } from "@/utils/toast";
import BaseButton from "@/components/ui/base/BaseButton.vue"
import { useAuthStore } from '@/stores/auth';

const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const selectedUserPositionId = ref(null)
const usersTypes = ref([
    {
        id: 1,
        name: 'Font End',
    },
    {
        id: 2,
        name: 'Back End',
    },
    {
        id: 3,
        name: 'Mobile App',
    },
    {
        id: 4,
        name: 'UX/UI Design',
    },
    {
        id: 5,
        name: 'Data Science',
    },
    {
        id: 6,
        name: 'DevOps',
    },
])

const nextStep = async () => {
    try {
        isLoading.value = true

        const payload = {
            position_ids: JSON.stringify([selectedUserPositionId.value])
        }

        await authStore.userPosition(payload)

        router.push({ name: 'previewuser' })    

    } catch (error) {
        showError('Failed to select user position')
    } finally {
        isLoading.value = false
    }
}
</script>


<style scoped>
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

.button-group {
    width: 200px;
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

.back-button .icon {
    background: #e5e7eb;
    border-radius: 50%;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
}

.page-title {
    font-size: 2rem;
    font-weight: bold;
    color: #111827;
    margin-bottom: 0.5rem;
}

.page-subtitle {
    color: #6b7280;
    margin-bottom: 2rem;
}

.section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1.5rem;
}

/* User Type Grid */
.user-type-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.user-type-option {
    position: relative;
}

.user-type-option input[type="radio"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.user-type-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 2rem 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
}

.user-type-option input[type="radio"]:checked+.user-type-card {
    border-color: #000;
    background: #f9fafb;
}

.user-type-card:hover {
    border-color: #9ca3af;
}

.user-icon {
    width: 48px;
    height: 48px;
    background: #f3f4f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
}

.user-type-option input[type="radio"]:checked+.user-type-card .user-icon {
    background: #e5e7eb;
    color: #111827;
}

.user-type-label {
    font-size: 0.9375rem;
    color: #111827;
    font-weight: 500;
}

/* Continue Button */
.button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 3rem;
}

.continue-button {
    background: #000;
    color: white;
    border: none;
    padding: 0.875rem 2rem;
    border-radius: 8px;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.continue-button:hover {
    background: #1f2937;
}

.continue-button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}
</style>