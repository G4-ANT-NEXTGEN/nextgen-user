<template>
  <div class="chat-room-facelift h-100 d-flex flex-column">
    <!-- Header -->
    <div class="room-header px-3 py-3 border-bottom">
      <div class="d-flex align-items-center">
        <!-- Back button - only visible on mobile -->
        <router-link :to="{ name: 'chat-layout' }" @click="chatStore.isSelectChat = false"
          class="text-decoration-none me-3 d-lg-none back-btn">
          <i class="bi bi-chevron-left"></i>
        </router-link>

        <router-link :to="{ name: 'view-profile', params: { id: route.params.id } }"
          class="text-decoration-none d-flex align-items-center">
          <div class="avatar-stack me-3">
            <img :src="roomUser?.avatar" class="header-avatar" />
          </div>
          <div class="user-details">
            <h4 class="m-0">{{ roomUser?.full_name }}</h4>
            <span class="status-text">Online</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Message Stream -->
    <div v-if="isLoading" class="p-4 flex-grow-1">
      <div v-for="i in 5" :key="i" class="skeleton-bubble-container mb-4" :class="{ 'sent': i % 2 === 0 }">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-bubble"></div>
      </div>
    </div>

    <div v-else class="message-stream flex-grow-1 p-4 overflow-y-auto">
      <!-- Empty State - No Messages -->
      <div v-if="conversationMessage.length === 0" class="empty-messages-state">
        <div class="empty-icon-wrapper">
          <i class="bi bi-chat-dots empty-chat-icon"></i>
        </div>
        <h3 class="empty-title light-dark">No messages yet</h3>
        <p class="empty-subtitle">Start the conversation by sending a message below</p>
      </div>

      <!-- Messages List -->
      <template v-else>
        <div class="date-divider"><span>Today</span></div>

        <div v-for="msg in conversationMessage" :key="msg.id" class="message-group" :class="{ 'is-mine': msg.isMine }">
          <img v-if="!msg.isMine" :src="msg.sender.avatar" class="bubble-avatar" />
          <div class="bubble-wrapper">
            <div class="message-bubble">
              <p class="message-text">{{ msg.message }}</p>
            </div>
            <span class="msg-time">{{ formatLocalTime(msg.created_at) }}</span>
          </div>
          <img v-if="msg.isMine" :src="msg.sender.avatar" class="bubble-avatar" />
        </div>
      </template>
    </div>

    <!-- Facelift Input -->
    <div class="room-input-area p-3">
      <div class="input-card">
        <div class="input-field">
          <input type="text" v-model="message" placeholder="Type a message..." @keyup.enter="sendMessage" />
        </div>
        <button class="send-facelift-btn" @click="sendMessage" :disabled="!message.trim() || chatStore.isLoading">
          <i v-if="!chatStore.isLoading" class="bi bi-send-fill"></i>
          <span v-else class="spinner-border spinner-border-sm"></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>

import { useChatStore } from '@/stores/chat'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment-timezone'


const route = useRoute()
const message = ref('')
const chatStore = useChatStore()
const isLoading = ref()

const formatLocalTime = (time) => {
  if (!time) return '';
  return moment.utc(time).local().format('hh:mm A');
}
const roomUser = computed(() => {
  if (conversationMessage.value.length > 0) {
    const firstMsg = conversationMessage.value[0]
    return firstMsg.isMine ? firstMsg.receiver : firstMsg.sender
  }
  return chatStore.temporaryChatUser
})

const conversationMessage = computed(() => {
  const id = Number(route.params.id)
  return chatStore.getConversationMessages(id)
})
const sendMessage = async () => {
  const formData = new FormData();
  formData.append('message', message.value);
  formData.append('receiver_id', route.params.id);
  await chatStore.sendMessage(formData);
  message.value = '';
  await chatStore.fetchChats()
  await chatStore.fetchReceivedChats()

}
onMounted(async () => {
  if (route.params.id) {
    chatStore.isSelectChat = true;
  }
  try {
    isLoading.value = true
    await chatStore.fetchChats()
    await chatStore.fetchReceivedChats()
  }
  catch (e) {
    console.log(e)
  }
  finally {
    isLoading.value = false
  }
})
</script>
<style scoped>
.chat-room-facelift {
  background: var(--color-background);
}

.room-header {
  background: var(--color-surface);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.header-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--color-surface);
}

.status-indicator.online {
  background: #10b981;
}

.user-details h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
}

.status-text {
  font-size: 0.75rem;
  color: #10b981;
}

.action-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: var(--color-muted);
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--color-hover);
  color: var(--color-primary);
}

.back-btn {
  color: var(--color-text);
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-btn:hover {
  background: var(--color-surface);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.back-btn i {
  font-size: 1.25rem;
  line-height: 1;
}

.message-stream {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.date-divider {
  text-align: center;
  position: relative;
  margin: 20px 0;
}

.date-divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
  z-index: 1;
}

.date-divider span {
  position: relative;
  background: var(--color-background);
  padding: 0 16px;
  font-size: 0.75rem;
  color: var(--color-muted);
  z-index: 2;
}

/* Empty Messages State */
.empty-messages-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 3rem 2rem;
  text-align: center;
}

.empty-icon-wrapper {
  width: 120px;
  height: 120px;
  background: var(--color-surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.empty-chat-icon {
  font-size: 3.5rem;
  color: var(--color-primary);
  opacity: 0.6;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.empty-subtitle {
  font-size: 1rem;
  color: var(--color-muted);
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
}

.message-group {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  max-width: 80%;
}

.message-group.is-mine {
  align-self: flex-end;
  flex-direction: row;
}

.bubble-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.message-bubble {
  padding: 12px 18px;
  border-radius: 20px 20px 20px 4px;
  background: var(--color-surface);
  position: relative;
}

.is-mine .message-bubble {
  background: var(--btn-primary-bg);
  color: var(--color-background);
  border-radius: 20px 20px 4px 20px;
}

.message-bubble p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.message-text {
  color: var(--color-text);
}

.is-mine .message-text {
  color: var(--color-background);
}

[data-bs-theme="dark"] .is-mine .message-text {
  color: #000000 !important;
}

.msg-time {
  font-size: 0.65rem;
  opacity: 0.6;
  color: var(--color-muted);
  display: block;
  margin-top: 5px;
  text-align: right;
}

.room-input-area {
  background: var(--color-background);
}

.input-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 6px 12px;
}

.util-btn,
.emoji-btn {
  background: transparent;
  border: none;
  font-size: 1.3rem;
  color: var(--color-muted);
  padding: 8px;
  display: flex;
  align-items: center;
}

.input-field {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.input-field input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 8px 0;
  color: var(--color-text);
}

.input-field input:focus {
  outline: none;
}

.send-facelift-btn {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.send-facelift-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.send-facelift-btn:disabled {
  opacity: 0.5;
}

/* Skeleton facelifts */
.skeleton-bubble-container {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.skeleton-bubble-container.sent {
  flex-direction: row-reverse;
}

.skeleton-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-border);
  animation: pulse 1.5s infinite;
}

.skeleton-bubble {
  height: 40px;
  width: 200px;
  border-radius: 15px;
  background: var(--color-border);
  animation: pulse 1.5s infinite;
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

.message-stream::-webkit-scrollbar {
  width: 4px;
}

.message-stream::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}
</style>
