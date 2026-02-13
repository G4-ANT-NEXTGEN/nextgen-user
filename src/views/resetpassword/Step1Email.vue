<template>
    <router-view />

    <!-- Step 1: Reset Password -->
    <div class="form-section active">
        <button class="back-button mb-4" @click="router.push({ name: 'login' })">
            <i class="bi bi-arrow-left me-2"></i>
            <span>Back to Login</span>
        </button>
        <div class="step-indicator">STEP 1 OF 4</div>
        <h1>Reset Password</h1>
        <p class="description">Enter your email or phone number to reset your password</p>

        <form @submit.prevent="nextStep()">
            <div class="row mb-3">
                <div class="col-md-10 mb-3 mb-md-0">
                    <BaseInput @input="validateEmail()" v-model="email" type="text" :error="errors.email"
                        id="email-input" placeholder="Enter your email" label="Email Address" />
                </div>
            </div>

            <div class="helper-text">We'll send a verification code to your email or phone
                number
            </div>

            <div class="d-flex justify-content-end mt-5">
                <div class="button-group">
                    <BaseButton type="button" variant="primary" @click="nextStep()" :isLoading="isLoading">
                        Continue
                    </BaseButton>
                </div>
            </div>

        </form>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import { useAuthStore } from '@/stores/auth';
import { showError } from '@/utils/toast';
import router from '@/router';

const { errors, validateField } = useRequiredValidator()
const email = ref('')
const authStore = useAuthStore()
const isLoading = ref(false)


const validateEmail = () => validateField('email', email.value, 'Email is required')

const validateForm = () => {
    let isValid = true
    if (!validateEmail()) {
        isValid = false
    }
    return isValid
}

const nextStep = async () => {
    isLoading.value = true
    if (!validateForm()) {
        return
    }

    authStore.emailForget = email.value

    try {
        await authStore.forgetPassword(
            {
                email: email.value
            }
        )
        if (authStore.user?.result) {
            router.push("/reset-password/otp")
        } else {
            console.log();
            showError(authStore.user?.message || 'Email not Found')
        }
    } catch (error) {
        console.log(error);
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

.back-button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: var(--color-text-secondary);
    font-size: 14px;
    font-weight: 600;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
}

.back-button:hover {
    color: var(--color-primary);
    transform: translateX(-4px);
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
    width: 180px;
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
    background: #1a1a1a;
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
</style>
