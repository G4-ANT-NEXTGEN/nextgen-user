<template>
    <!-- Step 1: Create Account -->
    <div class="form-section active">
        <div class="step-indicator">STEP 1 OF 4</div>
        <h1>Create Account</h1>
        <p class="description">Provide your basic information</p>

        <form @submit.prevent="nextStep()">
            <div class="row mb-2">
                <div class="col-md-12 mb-3 mb-md-0">
                    <BaseInput @input="validateFullName()" v-model="fullname" type="text" :error="errors.fullname"
                        id="fullname-input" placeholder="Enter your Full Name" label="Full Name *" />
                </div>
            </div>

            <div class="row mb-2">
                <div class="col-md-6 mb-3 mb-md-0">
                    <BaseInput @input="validateEmail()" v-model="email" type="text" :error="errors.email"
                        id="email-input" placeholder="Enter your email" label="Email Address *" />
                </div>
                <div class="col-md-6 mb-3 mb-md-0">
                    <BaseInput @input="validatePhone()" v-model="phone" type="text" :error="errors.phone"
                        id="phone-input" placeholder="Enter your phone number" label="Phone Number *" />
                </div>
            </div>

            <div class="col-md-12 mb-2">
                <BaseInput @input="validatePassword()" v-model="password" type="password" :error="errors.password"
                    id="password-input" placeholder="Enter your password" label="Password *" />
                <div class="helper-text">Must be at least 8 characters with letters and numbers
                </div>
            </div>

            <div class="col-md-12 mb-2">
                <BaseInput @input="validateComfirmPassword()" v-model="comfirmpassword" type="password"
                    :error="errors.comfirmpassword" id="comfirmpassword-input" placeholder="Enter your comfirm password"
                    label=" Comfirm Password *" />
                <div class="helper-text">
                </div>
            </div>

            <div class="d-flex justify-content-end mt-0">
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
import { ref, reactive } from 'vue';
import { showSuccess, showError } from "@/utils/toast";
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import { usePasswordValidator } from '@/composables/usePasswordValidator';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const { errors, validateField } = useRequiredValidator()
const { validatePassword: checkPassword, validatePasswordMatch } = usePasswordValidator()
const email = ref('')
const password = ref('')
const comfirmpassword = ref('')
const fullname = ref('')
const phone = ref('')
const authStore = useAuthStore()
const isLoading = ref(false)



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
    errors.comfirmpassword = ''
    return true
}

const validateForm = () => {
    const fullNameValid = validateFullName()
    const emailValid = validateEmail()
    const phoneValid = validatePhone()
    const passwordValid = validatePassword()
    const comfirmPasswordValid = validateComfirmPassword()

    let isValid = fullNameValid && emailValid && phoneValid && passwordValid && comfirmPasswordValid

    if (isValid && password.value !== comfirmpassword.value) {
        const matchResult = validatePasswordMatch(password.value, comfirmpassword.value)
        errors.comfirmpassword = matchResult.message
        isValid = false
    }

    return isValid
}

const nextStep = async () => {

    if (!validateForm()) {
        return
    }

    try {
        isLoading.value = true
        await authStore.register(
            {
                full_name: fullname.value,
                email: email.value,
                phone: phone.value,
                password: password.value,
                password_confirmation: comfirmpassword.value
            }
        )

        if (authStore.userResult == false) {
            return
        } else {
            router.push({ name: 'typeuser' })
        }

    }
    catch (e) {
        const res = e.response?.data;

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