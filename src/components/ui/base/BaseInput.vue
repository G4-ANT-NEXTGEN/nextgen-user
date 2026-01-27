<template>
  <div class="mb-3">
    <label :for="id" v-if="label" class="form-label">{{ label }}</label>
    <input :type="type" :id="id" :value="modelValue" :placeholder="placeholder"
      :class="['form-control', { 'is-invalid': error }]" :disabled='disabled' :required="required"
      @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  id: String,
  type: {
    type: String,
    default: 'text'
  },

  error: String,
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits(['update:modelValue'], "blur");
</script>


<style scoped>
.form-label {
  font-size: 15px;
  font-weight: 600;
  color: #0a0a0a;
  margin-bottom: 10px;
}

.form-control {
  padding: 16px 18px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s;
  background: #ffffff;
  color: #0a0a0a;
}

.form-control::placeholder {
  color: #999;
}

.form-control:focus {
  border-color: #0a0a0a;
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);
}
</style>
