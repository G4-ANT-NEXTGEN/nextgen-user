<template>

  <body style="background-color: var(--color-background)">
    <div class="row">
      <div class="col-3">
        <ChatListView />
      </div>
      <div class="col-9">


        <div v-if="!chatStore.isSelectChat" class="main-content d-flex justify-content-center align-items-center"
          style="height:100vh">
          <h3>Start message now...</h3>
        </div>
        <router-view />
      </div>
    </div>
  </body>
</template>
<script setup>
import ChatListView from '@/views/chat/ChatListView.vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
console.log('chatStore in layout : ', chatStore.isSelectChat)
</script>
<style scoped>
.chat-section {
  background: var(--color-background);
  height: 100vh;
  padding: 16px 0;
  padding-left: 16px;
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
</style>
