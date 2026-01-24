<template>
  <div class="info-card">
    <div class="info-card-header">
      <div class="left">
        <i v-if="icon" :class="icon"></i>
        <span>{{ title }}</span>
      </div>

      <div class="actions-wrapper" v-if="hasActions">
        <button class="actions-trigger" @click.stop="toggleActions">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
        
        <div class="actions-menu" :class="{ active: showActions }">
          <button 
            v-if="showCreate" 
            @click="handleAction('create')" 
            class="action-item"
          >
            <i class="bi bi-plus-lg"></i>
            <span>Create</span>
          </button>
          
          <button 
            v-if="showUpdate" 
            @click="handleAction('update')" 
            class="action-item"
          >
            <i class="bi bi-pencil-square"></i>
            <span>Update</span>
          </button>
          
          <button 
            v-if="showDelete" 
            @click="handleAction('delete')" 
            class="action-item danger"
          >
            <i class="bi bi-trash"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>

    <div class="info-card-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  showCreate: {
    type: Boolean,
    default: true
  },
  showUpdate: {
    type: Boolean,
    default: true
  },
  showDelete: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['create', 'update', 'delete'])

const showActions = ref(false)

const hasActions = computed(() => {
  return props.showCreate || props.showUpdate || props.showDelete
})

const toggleActions = () => {
  showActions.value = !showActions.value
}

const handleAction = (action) => {
  emit(action)
  showActions.value = false
}

// Close menu when clicking outside
const handleClickOutside = (e) => {
  if (!e.target.closest('.actions-wrapper')) {
    showActions.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.info-card {
  background: white;
  border: 1px solid var(--color-secondary);
  border-radius: 10px;
  margin-bottom: 1rem;
  color: var(--color-text);
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.info-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #e5e7eb;
}

.info-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-secondary);
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 15px;
  color: var(--color-text);
}

.left i {
  color: var(--color-dark);
  font-size: 18px;
}

.actions-wrapper {
  position: relative;
}

.actions-trigger {
  border: none;
  background: transparent;
  color: var(--color-gray);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.actions-trigger:hover {
  background: var(--color-secondary);
  color: var(--color-dark);
}

.actions-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 140px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.2s ease;
  z-index: 10;
  overflow: hidden;
}

.actions-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.action-item {
  width: 100%;
  border: none;
  background: white;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text);
  transition: background 0.15s ease;
  text-align: left;
}

.action-item:hover {
  background: var(--color-secondary);
}

.action-item svg {
  color: var(--color-gray);
  flex-shrink: 0;
}

.action-item:hover svg {
  color: var(--color-dark);
}

.action-item.danger:hover {
  background: #fef2f2;
  color: #dc2626;
}

.action-item.danger:hover svg {
  color: #dc2626;
}

.info-card-body {
  padding: 1rem 1.25rem;
  font-size: 14px;
  color: var(--color-gray);
  line-height: 1.6;
}
</style>