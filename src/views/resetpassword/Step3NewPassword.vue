<template>
    <!-- <router-view /> -->
    <BaseToast :show="toast.show" :message="toast.message" :type="toast.type" title="Error" @close="toast.close" />
    <!-- Step 3: New Password -->
    <div class="form-section" id="step3">
        <div class="step-indicator">STEP 3 OF 4</div>
        <h1>Create New Password</h1>
        <p class="description">Enter and confirm your new password</p>

        <form>
            <div class="col-md-10 mb-3">
                <BaseInput @input="validatePassword()" v-model="password" type="password" :error="errors.password"
                    id="password-input" placeholder="Enter your password" label="New Password *" />
                <div class="helper-text">Must be at least 8 characters with letters and numbers
                </div>
            </div>

            <div class="col-md-10 mb-3 mb-md-0">
                <BaseInput @input="validateComfirmPassword()" v-model="comfirmPassword" type="password"
                    :error="errors.comfirmPassword" id="comfirmpassword-input" placeholder="Enter your comfirmpassword"
                    label="Comfirm Password *" />
            </div>

            <div class="d-flex justify-content-end mt-5">
                <div class="button-group">
                    <button type="button" class="btn btn-back" @click="router.go(-1)">Back</button>
                    <BaseButton type="button" variant="primary" @click="submitPassword" :isLoading="isLoading">
                        Continue
                    </BaseButton>
                </div>
            </div>
        </form>
    </div>

</template>

<script setup>
import { useRequiredValidator } from "@/composables/useRequiredValidator";
import { usePasswordValidator } from "@/composables/usePasswordValidator";
import { useAuthStore } from "@/stores/auth"
import { useToastStore } from "@/stores/toast"
import { ref } from "vue"
import router from "@/router";


const password = ref("")
const comfirmPassword = ref("")
const authStore = useAuthStore()
const toast = useToastStore()
const isLoading = ref(false)

const { errors, validateField } = useRequiredValidator()
const { validatePassword: checkPassword, validatePasswordMatch } = usePasswordValidator()

const validatePassword = () => {
    const result = checkPassword(password.value)
    errors.password = result.message
    return result.isValid
}

const validateComfirmPassword = () => {
    if (!comfirmPassword.value) {
        errors.comfirmPassword = 'Confirm Password is required'
        return false
    }
    errors.comfirmPassword = ''
    return true
}

const validateForm = () => {
    let isValid = true
    if (!validatePassword()) {
        isValid = false
    }
    if (!validateComfirmPassword()) {
        isValid = false
    }
    const matchResult = validatePasswordMatch(password.value, comfirmPassword.value)
    if (!matchResult.isValid) {
        errors.comfirmPassword = matchResult.message
        isValid = false
    }
    return isValid
}

const submitPassword = async () => {
    isLoading.value = true
    if (!validateForm()) {
        isLoading.value = false
        return
    }

    try {
        await authStore.resetPassword({
            email: authStore.emailForget,
            otp: authStore.otpForget,
            new_pass: password.value,
            new_pass_confirmation: comfirmPassword.value
        })
        if (authStore.user?.result) {
            router.push({ name: 'login' })
        } else {
            toast.error(authStore.user?.data?.new_pass[0] || 'Failed to send OTP')
        }
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false
    }

}


</script>


<style scoped>
.step-indicator {
    color: #006aff;
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
    display: block;
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
    width: 280px;
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
    justify-content: start;
    margin: 40px 0;
}


.otp-inputs {
    display: flex;
    gap: 16px;
    justify-content: start;
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
</style>
