<template>
  <teleport to="body">
    <div class="modal fade show d-block" tabindex="-1" @click.self="close">
      <div class="modal-dialog modal-dialog-centered" :class="sizeClass">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close btn-close-dark" @click="close"></button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  size: { type: String, default: '' },
})

const emit = defineEmits(['close'])

const close = () => emit('close')

const sizeClass = computed(() => (props.size ? `modal-${props.size}` : ''))
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.modal-dialog {
  margin-top: 5vh;
}

.modal-content {
  background-color: var(--sidebar-bg);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  border-bottom: 1px solid var(--color-border);
  padding: 20px 24px;
}

.modal-title {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-text);
}

.btn-close {
  border-radius: 50%;
  padding: 8px;
  opacity: 0.8;
  color: var(--color-close) !important;
  transition: all 0.2s ease;
}

.btn-close:hover {
  opacity: 1;
  
}

.btn-close-dark{
  color: var(--color-text) !important;
}

.modal-body {
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
  background-color: var(--sidebar-bg);
}

.modal-footer {
  border-top: 1px solid var(--color-border);
  padding: 16px 24px;
}

/* Custom Scrollbar for Modal Body */
.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: var(--color-muted);
}
</style>
