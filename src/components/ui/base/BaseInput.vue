<template>
  <div class="mb-3">
    <label :for="id" v-if="label" class="form-label">{{ label }}</label>
    <input :type="type" :id="id" :value="modelValue" :placeholder="placeholder"
      :class="['form-control', { 'is-invalid': error }]" :disabled="disabled" :required="required"
      @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup>
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

defineEmits(['update:modelValue', 'blur'])
</script>


<style scoped>
.form-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 10px;
}

.form-control {
  padding: 16px 18px;
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
</style>
