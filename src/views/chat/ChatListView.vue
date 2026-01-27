<template>
  <div class="chat-section container-fluid">
    <div class="row">
      <div class="">
        <div v-if="isLoading">
          <div class="p-3">
            <div class="skeleton skeleton-text mb-3" style="width:120px;height:22px;"></div>
            <div class="skeleton mb-4" style="height:45px;border-radius:12px;"></div>
            <div v-for="i in 4" :key="i" class="d-flex align-items-center mb-3 p-2">
              <div class="skeleton skeleton-circle me-3" style="width:48px;height:48px;"></div>
              <div class="flex-grow-1">
                <div class="skeleton skeleton-text mb-2" style="width:60%;"></div>
                <div class="skeleton skeleton-small" style="width:40%;"></div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center p-3" v-for="i in 4" :key="i">
            <div class="skeleton skeleton-circle me-3" style="width:50px;height:50px;"></div>
            <div class="flex-grow-1">
              <div class="skeleton skeleton-text mb-2" style="width:60%;"></div>
              <div class="skeleton skeleton-small" style="width:40%;"></div>
            </div>
          </div>
        </div>
        <div v-else class="chat-list">
          <div class="search-chat p-3 pb-1">
            <div class="d-flex justify-content-between align-items-center">
              <h4 style="color:var(--color-dark)">Messages</h4>
              <button @click="toggleTheme" class="theme-btn">
                <i v-if="theme === 'light'" class="bi bi-moon-fill icon-btn"></i>
                <i v-else class="bi bi-brightness-high-fill icon-btn"></i>
              </button>
            </div>
            <base-input class="w-100 pt-3" placeholder="Search Conversation..."></base-input>
          </div>
          <hr class="my-1" />
          <div class="chat" v-for="chat in chatStore.chatList" :key="chat.id">
            <router-link class="text-start conversationer text-decoration-none" @click="isSelectChat(true)"
              :to="{ name: 'chat-room', params: { id: chat.messages[0].isMine ? chat.messages[0].receiver.id : chat.messages[0].sender.id } }"
              type="button" variant="white">
              <div class="d-flex align-items-center">
                <img :src="chat.messages[0].isMine ? chat.messages[0].receiver.avatar : chat.messages[0].sender.avatar"
                  class="rounded-5 me-2" width="60" height="60" alt="">
                <div>
                  <p class="mb-0 fw-bold" style="color:var(--color-dark)">{{ chat.messages[0].isMine ?
                    chat.messages[0].receiver.full_name :
                    chat.messages[0].sender.full_name }}
                  </p>
                  <div class="message">
                    <span v-if="chat.messages[0].isMine" style="color:var(--color-text);">{{ `You :
                      ${chat.messages[0].message}` }}</span>
                    <span v-else style="font-weight: bold;color: var(--color-text); font-size: 15px;">{{
                      `${chat.messages[0].sender.full_name} : ${chat.messages[0].message}` }}</span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme();
const chatStore = useChatStore()
const isLoading = ref(false);
localStorage.setItem('chatSelect', false);
const isSelectChat = (chatSelect) => {

  localStorage.setItem('chatSelect', chatSelect);
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
  console.log('all conversation : ', chatStore.chatList)
})
</script>
<style scoped>
.chat-section {
  background: var(--color-background);
  height: 100vh;
  padding: 16px 0;
  padding-left: 16px;
}

.chat-list {
  background: var(--color-accent);
  height: calc(100vh - 32px);
  border-radius: 10px;
  width: 100%;
}

.search-chat {
  color: var(--color-dark)
}

.chat {
  transition: all 0.5s;
  width: 100%;
}

.chat:hover {
  background: var(--border-color-hover);
  border-radius: 10px;
}

.conversationer {
  align-content: center;
  padding: 10px;
  height: 80px;
  width: 100%;
  color: black
}

.conversationer.active {
  background-color: var(--color-gray);
  color: var(--color-text);
  border-radius: 10px;
  font-weight: 600;
}

.message {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: auto;
  color: var(--color-background);
  font-size: 14px;
}

.skeleton {
  background: linear-gradient(90deg,
      #e0e0e0 25%,
      #f5f5f5 37%,
      #e0e0e0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}

.skeleton-circle {
  border-radius: 50%;
}

.skeleton-text {
  height: 14px;
}

.skeleton-small {
  height: 10px;
}

.theme-btn {
  border: 1px solid var(--border-color);
  background: var(--color-secondary);
  color: var(--color-text);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}
</style>
