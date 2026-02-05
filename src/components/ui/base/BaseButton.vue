<template>
  <button class="main-btn" :type="type" :class="[`btn btn-${variant}`, { 'btn-block': block }]"
    :disabled="disabled || isLoading" @click="handleClick()">
    <span v-if="isLoading" class="spinner me-2"></span>
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
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border: 1px solid var(--btn-primary-bg);
}

.btn-primary:hover {
  background: var(--btn-primary-hover);
  border-color: var(--btn-primary-hover);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  border: 1px solid var(--btn-secondary-border);
}

.btn-secondary:hover {
  background: var(--btn-secondary-hover);
}

.main-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 24px;
  height: 24px;
  display: grid;
  border: 1.9px solid var(--color-background);
  border-radius: 50%;
  border-right-color: var(--color-text);
  animation: spinner-a4dj62 1s infinite linear;
}

.spinner::before,
.spinner::after {
  content: "";
  grid-area: 1/1;
  margin: 1px;
  border: inherit;
  border-radius: 50%;
  animation: spinner-a4dj62 2s infinite;
}

.spinner::after {
  margin: 3.9px;
  animation-duration: 3s;
}

@keyframes spinner-a4dj62 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
