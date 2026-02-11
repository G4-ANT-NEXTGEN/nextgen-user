<template>
  <div class="mb-3">
    <label :for="id" v-if="label" class="form-label">{{ label }}</label>

    <!-- Use Flatpickr for date inputs -->
    <flat-pickr v-if="type === 'date'" :id="id" :value="modelValue" :placeholder="placeholder"
      :class="['form-control', { 'is-invalid': error }]" :disabled="disabled" :config="flatpickrConfig"
      @on-change="handleDateChange" v-bind="$attrs" />

    <!-- Regular input for non-date types -->
    <input v-else :type="type" :id="id" :value="modelValue" :placeholder="placeholder"
      :class="['form-control', { 'is-invalid': error }]" :disabled="disabled" :required="required"
      @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />

    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  error: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'blur'])

// Flatpickr configuration
const flatpickrConfig = computed(() => ({
  dateFormat: 'Y-m-d',
  altInput: true,
  altFormat: 'F j, Y',
  allowInput: true,
}))

const handleDateChange = (selectedDates, dateStr) => {
  emit('update:modelValue', dateStr)
}
</script>


<style scoped>
.form-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 10px;
}

.form-control {
  padding: 12px 16px;
  border: 1px solid var(--input-border);
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--input-bg);
  color: var(--input-text);
}

.form-control::placeholder {
  color: var(--input-placeholder);
}

.form-control:focus {
  outline: none;
  border-color: var(--input-focus-border);
  background: var(--input-bg);
  box-shadow: 0 0 0 4px var(--input-focus-shadow);
}

/* Flatpickr custom styling */
:deep(.flatpickr-input) {
  padding: 12px 16px;
  border: 1px solid var(--input-border);
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--input-bg);
  color: var(--input-text);
}

:deep(.flatpickr-input:focus) {
  outline: none;
  border-color: var(--input-focus-border);
  background: var(--input-bg);
  box-shadow: 0 0 0 4px var(--input-focus-shadow);
}

:deep(.flatpickr-calendar) {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
}

:deep(.flatpickr-day.selected) {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

:deep(.flatpickr-day:hover) {
  background: var(--color-accent);
  border-color: var(--color-accent);
}

:deep(.flatpickr-months) {
  background: var(--color-surface);
}

:deep(.flatpickr-current-month) {
  color: var(--color-text);
}

:deep(.flatpickr-weekday) {
  color: var(--color-muted);
}

:deep(.flatpickr-day) {
  color: var(--color-text);
}

:deep(.flatpickr-day.today) {
  border-color: var(--color-primary);
}
</style>
