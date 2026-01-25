<template>
  <teleport to="body">
    <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5)" @click.self="close">
      <div class="modal-dialog modal-dialog-centered" :class="sizeClass">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" @click="close"></button>
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
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: String,
  size: { type: String, default: '' },
})

const emit = defineEmits(['close'])

const close = () => emit('close')

const sizeClass = computed(() => (props.size ? `modal-${props.size}` : ''))

</script>

<style scoped>

.modal-body {
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--color-secondary);
}

.modal-content {
  background-color: var(--color-secondary);
  border-radius: 12px;
  padding: 20px;
}

.modal-header,
.modal-footer {
  background-color: var(--color-secondary);
}

.modal-title {
  color: var(--color-text);
  font-weight: bold;
}

.btn-close {
  filter: var(--filter);
  color: var(--color-secondary);
}

/* Optional: Add scrollbar styling for better appearance */
.modal-body::-webkit-scrollbar {
  width: 8px;
  display: none;
}

.modal-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #555;
  display: block;
}

</style>
