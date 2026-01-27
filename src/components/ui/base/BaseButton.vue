<template>
    <button class="main-btn" :type="type" :class="[`btn btn-${variant}`, { 'btn-block': block }]"
        :disabled="disabled || isLoading" @click="handleClick()">
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
    },
    block: {
        type: Boolean,
        default: false
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
    padding: 12px 24px;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.3px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* min-width: 120px; */
}

.main-btn.btn-block {
    width: 100%;
}

.main-btn:hover {
    transform: translateY(-2px);
}

.main-btn:active {
    transform: translateY(0);
}

.btn-primary {
    background: var(--color-primary);
    color: var(--color-secondary);
    border: 1px solid var(--color-primary);
}

.btn-primary:hover {
    opacity: 0.9;
    box-shadow: var(--shadow-md);
}

.btn-secondary {
    background: var(--color-secondary);
    color: var(--color-text);
    border: 1px solid var(--color-border);
}

.btn-secondary:hover {
    background: var(--color-border);
}

.main-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}
</style>
