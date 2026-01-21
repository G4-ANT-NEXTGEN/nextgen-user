<template>
    <router-view />
    <BaseToast :show="toast.show" :message="toast.message" :type="toast.type" title="Error" @close="toast.close" />
    <!-- Step 2: OTP Verification -->
    <div class="form-section">
        <div class="step-indicator">STEP 2 OF 4</div>
        <h1>OTP Verification</h1>
        <p class="description">Enter the 6-digit code sent to your email or phone</p>

        <form>
            <div class="otp-inputs">
                <input v-for="(n, index) in 6" :key="index" ref="inputs" type="text" class="form-control otp-input"
                    maxlength="1" @input="handleInput($event, index)" @keydown.backspace="handleBackspace(index)" />
            </div>

            <div class="helper-text text-start">
                Didn't receive code?
                <router-link :to="{ name: 'email' }"
                    style="color: #006aff; text-decoration: none; font-weight: 600;">Resend</router-link>
            </div>

            <div class="d-flex justify-content-end mt-5">
                <div class="button-group">
                    <button type="button" class="btn btn-back" @click="router.go(-1)">Back</button>
                    <BaseButton type="button" variant="primary" :disabled="otp.length !== 6" @click="submitOtp"
                        :isLoading="isLoading">
                        Verify OTP
                    </BaseButton>
                </div>
            </div>
        </form>
    </div>

</template>


<script setup>
import BaseButton from "@/components/ui/base/BaseButton.vue"
import router from "@/router"
import { useAuthStore } from "@/stores/auth"
import { useToastStore } from "@/stores/toast"
import { ref, onMounted, nextTick } from "vue"

const otp = ref("")
const authStore = useAuthStore()
const toast = useToastStore()
const inputs = ref([])
const email = ref(authStore.emailForget)
const isLoading = ref(false)


onMounted(async () => {
    await nextTick()
    inputs.value[0]?.focus()   //  only first input focused
})

const handleInput = (e, index) => {
    const value = e.target.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")

    e.target.value = value

    const otpArr = otp.value.split("")
    otpArr[index] = value
    otp.value = otpArr.join("")

    if (value && index < 5) {
        inputs.value[index + 1].focus()
    }
}


const handleBackspace = (index) => {
    if (!otp.value[index] && index > 0) {
        inputs.value[index - 1].focus()
    }
}

const submitOtp = async () => {
    authStore.otpForget = otp.value
    isLoading.value = true
    try {
        await authStore.otpPassword(
            {
                email: email.value,
                otp: otp.value
            }
        )
        if (authStore.user?.result) {
            router.push("/reset-password/new-password")
        } else {
            toast.error(authStore.user?.message || 'Failed to send OTP')
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
