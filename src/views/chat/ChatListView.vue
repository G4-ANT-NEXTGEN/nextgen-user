<template>
  <div class="chat-list-container">
    <div class="list-header">
      <div class="header-top px-3 py-3">
        <h2 class="ms-3">Messages</h2>
        <div class="badge-count">{{ chatStore.chatList.length }}</div>
      </div>
    </div>

    <div class="scrollable-area">
      <div v-if="isLoading" class="skeleton-list p-3">
        <div v-for="i in 6" :key="i" class="skeleton-item mb-4">
          <div class="skeleton-circle"></div>
          <div class="skeleton-texts">
            <div class="skeleton-line w-75"></div>
            <div class="skeleton-line w-50 mt-2"></div>
          </div>
        </div>
      </div>

      <div v-else class="chats-stack">
        <router-link v-for="chat in chatStore.chatList" :key="chat.id" class="chat-entry"
          :to="{ name: 'chat-room', params: { id: chat.id } }" active-class="active"
          @click="chatStore.isSelectChat = true">
          <div class="avatar-cell">
            <img :src="chat.otherUser.avatar" class="user-avatar" />
            <span class="status-dot online"></span>
            <div v-if="chat.unreadCount > 0" class="unread-pill">{{ chat.unreadCount }}</div>
          </div>
          <div class="info-cell">
            <div class="name-row">
              <span class="full-name">{{ chat.otherUser.full_name }}</span>
              <span class="time-stamp" v-if="chat.messages.length > 0">{{ formatLocalTime(chat.messages[0].created_at)
              }}</span>
            </div>
            <div class="message-row">
              <p class="last-msg-text text-truncate">
                <template v-if="chat.messages.length > 0">
                  <span v-if="chat.messages[0].isMine">You: </span>
                  {{ chat.messages[0].message }}
                </template>
                <template v-else>
                  <span class="fst-italic opacity-50">New conversation...</span>
                </template>
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const isLoading = ref(false);

const formatLocalTime = (time) => {
  if (!time) return '';
  const date = new Date(time)
  date.setHours(date.getHours() + 7)
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  chatStore.isSelectChat = false;
  try {
    isLoading.value = true;
    await chatStore.fetchChats()
    await chatStore.fetchReceivedChats();
  }
  catch (e) {
    console.log('Error in fetching chats in ChatListView : ', e)
  }
  finally {
    isLoading.value = false;
  }
})
</script>

<style scoped>
.chat-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--sidebar-bg);
}

.list-header {
  border-bottom: 1px solid var(--color-border);
}

.header-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-top h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  color: var(--color-text);
}

.badge-count {
  background: var(--color-danger);
  color: white;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

.custom-search {
  position: relative;
  background: var(--color-background);
  border-radius: 12px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom-search i {
  color: var(--color-muted);
}

.custom-search input {
  background: transparent;
  border: none;
  flex-grow: 1;
  color: var(--color-text);
  font-size: 0.9rem;
}

.custom-search input:focus {
  outline: none;
}

.scrollable-area {
  flex-grow: 1;
  overflow-y: auto;
}

.chat-entry {
  display: flex;
  padding: 16px;
  gap: 16px;
  text-decoration: none;
  transition: all 0.2s ease;
  border-bottom: 1px solid transparent;
}

.chat-entry:hover {
  background: var(--color-hover);
}

.chat-entry.active {
  background: var(--color-surface);
  box-shadow: inset 4px 0 0 var(--color-primary);
}

.avatar-cell {
  position: relative;
  flex-shrink: 0;
}

.user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid var(--sidebar-bg);
}

.status-dot.online {
  background: #10b981;
}

.unread-pill {
  position: absolute;
  top: -2px;
  right: -2px;
  background: var(--color-danger);
  color: white;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  border: 2px solid var(--sidebar-bg);
}

.info-cell {
  flex-grow: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.full-name {
  font-weight: 700;
  color: var(--color-text);
}

.time-stamp {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.message-row {
  display: flex;
}

.last-msg-text {
  font-size: 0.85rem;
  color: var(--color-muted);
  margin: 0;
}

/* Skeleton Loader Styles */
.skeleton-item {
  display: flex;
  gap: 16px;
}

.skeleton-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-border);
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-line {
  height: 12px;
  background: var(--color-border);
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 0.6;
  }
}

/* Custom Scrollbar */
.scrollable-area::-webkit-scrollbar {
  width: 4px;
}

.scrollable-area::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable-area::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}
</style>
