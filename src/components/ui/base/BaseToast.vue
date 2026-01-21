<template>
    <Transition name="toast">
        <div v-if="show" class="toast" :class="type">
            <div class="toast-icon">
                <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path
                        d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                </svg>
                <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path
                        d="M5.354 5.354a.5.5 0 0 1 .707 0L8 7.293l2.146-2.147a.5.5 0 0 1 .707.707L8.707 8l2.147 2.146a.5.5 0 0 1-.707.707L8 8.707l-2.146 2.147a.5.5 0 0 1-.707-.707L7.293 8 5.146 5.854a.5.5 0 0 1 0-.707" />
                </svg>
                <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                    <path
                        d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.057.107.107 0 0 1-.066.01H.146a.13.13 0 0 1-.066-.01.163.163 0 0 1-.054-.057.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057" />
                    <path
                        d="M8 4c.535 0 .954.462.954 1.03.022.52-.455 1.03-.954 1.03-.49 0-.973-.51-.954-1.03C7.046 4.462 7.465 4 8 4m.83 1.97v3.708h-1.66V5.97h1.66" />
                </svg>
                <svg v-else-if="type === 'info'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path
                        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
            </div>
            <div class="toast-content">
                <div class="toast-title">{{ title }}</div>
                <div class="toast-message">{{ message }}</div>
            </div>
            <button class="toast-close" @click="$emit('close')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"
                    viewBox="0 0 16 16">
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708l2.647-2.646-2.647-2.646a.5.5 0 0 1 0-.708" />
                </svg>
            </button>
        </div>
    </Transition>
</template>

<script setup>
defineProps({
    show: Boolean,
    title: String,
    message: String,
    type: {
        type: String,
        default: 'success',
    },
})
</script>

<style scoped>
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    min-width: 340px;
    max-width: 450px;
    padding: 16px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
    color: #333;
    z-index: 9999;
    border-left: 4px solid;
}

.toast.success {
    border-left-color: #22c55e;
}

.toast.error {
    border-left-color: #ef4444;
}

.toast.warning {
    border-left-color: #f59e0b;
}

.toast.info {
    border-left-color: #3b82f6;
}

.toast-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
}

.toast.success .toast-icon {
    background: #22c55e;
    color: white;
}

.toast.error .toast-icon {
    background: #ef4444;
    color: white;
}

.toast.warning .toast-icon {
    background: #f59e0b;
    color: white;
}

.toast.info .toast-icon {
    background: #3b82f6;
    color: white;
}

.toast-icon svg {
    width: 18px;
    height: 18px;
}

.toast-content {
    flex: 1;
    min-width: 0;
}

.toast-title {
    font-size: 15px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 3px;
}

.toast-message {
    font-size: 13px;
    color: #9ca3af;
    line-height: 1.4;
}

.toast-close {
    flex-shrink: 0;
    background: none;
    border: none;
    color: #d1d5db;
    width: 24px;
    height: 24px;
    padding: 0;
    margin-left: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;
}

.toast-close:hover {
    background: #f3f4f6;
    color: #9ca3af;
}

.toast-close svg {
    width: 18px;
    height: 18px;
}

/* Animation */
.toast-enter-active,
.toast-leave-active {
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>