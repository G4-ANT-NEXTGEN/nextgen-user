<template>
  <select
    ref="selectEl"
    class="form-select tom-select"
    :multiple="multiple"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import TomSelect from 'tom-select'

const props = defineProps({
  modelValue: [String, Array],
  options: { type: Array, required: true },
  multiple: Boolean,
  placeholder: String,
})

const emit = defineEmits(['update:modelValue'])

const selectEl = ref(null)
let tom

onMounted(() => {
  tom = new TomSelect(selectEl.value, {
    maxItems: props.multiple ? null : 1,
    placeholder: props.placeholder || 'Select...',
    items: props.modelValue ? [].concat(props.modelValue) : [],
    closeAfterSelect: !props.multiple,
    onChange(value) {
      emit('update:modelValue', props.multiple ? value : value[0])
    },
  })
})

watch(
  () => props.modelValue,
  (val) => {
    tom?.setValue(val ? [].concat(val) : [], true)
  }
)

onBeforeUnmount(() => tom?.destroy())
</script>

<style>
/* wrapper */
.ts-wrapper {
  width: 100%;
}

/* input area */
.ts-control {
  background: #f8fafc; /* modal input bg */
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  min-height: 48px;
  padding: 6px 10px;
  box-shadow: none;
}

/* focus */
.ts-control.focus {
  border-color: var(--color-dark);
  box-shadow: 0 0 0 2px rgba(31, 41, 55, 0.08);
}

/* placeholder */
.ts-control input::placeholder {
  color: var(--color-gray);
  font-size: 0.9rem;
}

/* selected tag */
.ts-control .item {
  background: #eef2f7;
  color: var(--color-dark);
  border-radius: 10px;
  padding: 10px;
  font-size: 0.85rem;
  border: 1px solid #e5e7eb;
}

/* remove button */
.ts-control .remove {
  color: var(--color-gray);
  font-size: 14px;
}

/* dropdown */
.ts-dropdown {
  margin-top: 6px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

/* dropdown items */
.ts-dropdown .option {
  padding: 12px 14px;
  font-size: 0.9rem;
  color: var(--color-dark);
}

/* hover */
.ts-dropdown .option.active {
  background: #f1f5f9;
}

/* selected */
.ts-dropdown .option.selected {
  background: #f8fafc;
  font-weight: 500;
}

/* scrollbar */
.ts-dropdown-content::-webkit-scrollbar {
  width: 6px;
}
.ts-dropdown-content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}
.ts-wrapper.multi .ts-control > div{
    padding: 6px !important;
}
</style>
