<template>
  <div>
    <div class="pill-container">
      <div v-for="pill in pills" :key="pill" :class="['pill', { active: pill === selected }]" @click="selectPill(pill)">
        {{ pill }}
      </div>
    </div>

    <p>Selected: <span>{{ selected || 'None' }}</span></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// List of pill values
const pills = ['Design', 'Business', 'Technology', 'Marketing', 'Career', 'Freelance']

// Selected pill
const selected = ref(null)

// Function to select a pill
function selectPill(pill) {
  selected.value = pill
}
</script>

<style scoped>
.pill-container {
  display: flex;
  gap: 10px;
  margin: 20px;
}

.pill {
  padding: 8px 16px;
  border-radius: 50px;
  /* pill shape */
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.pill:hover {
  background-color: #e0e0e0;
}

.pill.active {
  background-color: #2563eb;
  /* blue */
  color: white;
  border-color: #2563eb;
}
</style>
