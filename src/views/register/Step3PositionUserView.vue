<template>
    <div class="form-section">
        <div class="header-section">
            <button class="back-button" @click="router.go(-1)">
                <i class="bi bi-arrow-left"></i>
                <span>Previous Step</span>
            </button>
            <div class="step-chip">STEP 3 OF 4</div>
            <h1 class="form-title">Your Position</h1>
            <p class="form-description">Select your main area of expertise or interest.</p>
        </div>

        <div class="position-grid">
            <div v-for="pos in usersTypes" :key="pos.id" class="position-option">
                <input type="radio" name="userPosition" :id="'pos-' + pos.id" :value="pos.id"
                    v-model="selectedUserPositionId" class="pos-radio" />
                <label :for="'pos-' + pos.id" class="pos-card">
                    <div class="pos-icon-wrapper">
                        <i :class="pos.icon"></i>
                    </div>
                    <div class="pos-content">
                        <div class="pos-label">{{ pos.name }}</div>
                    </div>
                    <div class="selected-indicator">
                        <i class="bi bi-check-circle-fill"></i>
                    </div>
                </label>
            </div>
        </div>

        <div class="form-footer">
            <BaseButton variant="primary" size="lg" class="submit-btn" :isLoading="isLoading"
                :disabled="!selectedUserPositionId" @click="nextStep">
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

const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const selectedUserPositionId = computed({
    get: () => authStore.registrationForm.position_ids,
    set: (val) => authStore.registrationForm.position_ids = val
})

const usersTypes = ref([
    { id: 1, name: 'Front End', icon: 'bi bi-window-sidebar' },
    { id: 2, name: 'Back End', icon: 'bi bi-database' },
    { id: 3, name: 'Mobile App', icon: 'bi bi-phone' },
    { id: 4, name: 'UX/UI Design', icon: 'bi bi-bezier2' },
    { id: 5, name: 'Programming', icon: 'bi bi-cpu' },
    { id: 6, name: 'Web Development', icon: 'bi bi-laptop' },
])

const nextStep = async () => {
    if (!selectedUserPositionId.value) return

    try {
        isLoading.value = true
        const payload = {
            position_ids: JSON.stringify([selectedUserPositionId.value])
        }
        await authStore.userPosition(payload)
        router.push({ name: 'previewuser' })
    } catch {
        showError('Failed to select user position')
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

.position-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 10px;
}

.position-option {
    position: relative;
}

.pos-radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.pos-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 32px 20px;
    background: var(--color-surface);
    border: 1.5px solid var(--color-border);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    text-align: center;
}

.pos-card:hover {
    border-color: var(--color-primary);
    background: rgba(var(--color-primary-rgb), 0.02);
    transform: translateY(-2px);
}

.pos-radio:checked+.pos-card {
    border-color: var(--color-primary);
    background: rgba(var(--color-primary-rgb), 0.04);
    box-shadow: 0 0 0 1px var(--color-primary);
}

.pos-icon-wrapper {
    width: 60px;
    height: 60px;
    background: rgba(var(--color-primary-rgb), 0.05);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: var(--color-primary);
    transition: all 0.3s ease;
}

.pos-radio:checked+.pos-card .pos-icon-wrapper {
    background: var(--color-primary);
    color: var(--color-surface);
    transform: scale(1.1);
}

.pos-label {
    font-weight: 700;
    font-size: 16px;
    color: var(--color-text);
}

.selected-indicator {
    position: absolute;
    top: 12px;
    right: 12px;
    color: var(--color-primary);
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pos-radio:checked+.pos-card .selected-indicator {
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

@media (max-width: 576px) {
    .position-grid {
        grid-template-columns: 1fr;
    }
}
</style>
