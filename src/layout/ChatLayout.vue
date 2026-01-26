<template>
  <body style="background-color: #f5f5f5">
    <div class="row">
      <div class="col-3">
        <ChatListView />
      </div>
      <div class="col-9">
        <div
          v-if="!chatStore.isSelectChat"
          class="main-content d-flex justify-content-center align-items-center" style="height:100vh"
        >
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
