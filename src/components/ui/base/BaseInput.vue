<template>
  <div class="mb-3 position-relative">
    <label :for="id" v-if="label" class="form-label">{{ label }}</label>

    <div class="input-group-custom">
      <!-- Use Flatpickr for date inputs -->
      <flat-pickr v-if="type === 'date'" :id="id" :value="modelValue" :placeholder="placeholder"
        :class="['form-control', { 'is-invalid': error }]" :disabled="disabled" :config="flatpickrConfig"
        @on-change="handleDateChange" v-bind="$attrs" />

      <!-- Regular input for non-date types -->
      <template v-else>
        <input :type="inputType" :id="id" :value="modelValue" :placeholder="placeholder"
          :class="['form-control', { 'is-invalid': error, 'pe-5': type === 'password' }]" :disabled="disabled"
          :required="required" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />

        <!-- Password Visibility Toggle -->
        <button v-if="type === 'password'" type="button" class="password-toggle" @click="togglePassword" tabindex="-1">
          <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
        </button>
      </template>
    </div>

    <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

const props = defineProps({
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

const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

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

/* Password Toggle Styles */
.input-group-custom {
  position: relative;
  display: flex;
  align-items: center;
}

.password-toggle {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 5;
  border-radius: 8px;
}

.password-toggle:hover {
  color: var(--color-primary);
  background: rgba(var(--color-primary-rgb), 0.05);
}

.password-toggle i {
  font-size: 1.2rem;
}

.pe-5 {
  padding-right: 3rem !important;
}
</style>
