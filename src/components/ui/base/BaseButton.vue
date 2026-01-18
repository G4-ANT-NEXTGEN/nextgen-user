<template>
    <button class="main-btn" :type="type" :class="`btn btn-${variant}`" :disabled="disabled || isLoading"
        @click="handleClick()">
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
        <slot></slot>
    </button>
</template>

<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: 'primary'
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'button'
    }
})

const emit = defineEmits(['click'])

const handleClick = () => {
    if (!props.disabled && !props.isLoading) {
        emit('click')
    }
}
</script>

<style scoped>
.main-btn {
    width: 100%;
    padding: 18px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 0.3px;
}

.main-btn:hover {
    transform: translateY(-2px);
}

.main-btn:active {
    transform: translateY(0);
}

.btn-primary {
    background: #0a0a0a;
    color: #ffffff;
}

.btn-primary:hover {
    background: #2a2a2a;
}

</style>