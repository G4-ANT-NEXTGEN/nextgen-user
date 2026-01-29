<template>
  <div class="chat-section container-fluid">
    <div class="row">
      <div v-if="isLoading" class="p-4">
        <div class="d-flex align-items-center py-3">
          <div class="skeleton skeleton-circle me-3" style="width:50px;height:50px;"></div>
          <div class="skeleton skeleton-text" style="width:120px;"></div>
        </div>
        <div v-for="i in 8" :key="i" class="d-flex mb-3"
          :class="i % 2 ? 'justify-content-end' : 'justify-content-start'">
          <div class="skeleton" :style="{
            width: i % 2 ? '200px' : '220px',
            height: '40px'
          }"></div>
        </div>
        <div class="py-3 d-flex align-items-center">
          <div class="skeleton flex-grow-1" style="height:45px;"></div>
          <div class="skeleton ms-2" style="width:45px;height:45px;"></div>
        </div>
      </div>

      <div v-else-if="chatStore.isSelectChat" class="main-content">
        <div class="receiver-name">
          <router-link :to="{ name: 'profile' }" class="text-decoration-none" style="color:var(--color-text)">
            <div class="d-flex align-items-center h-100 px-3">
              <img class="rounded-5 me-2"
                :src="conversationMessage[0]?.isMine ? conversationMessage[0]?.receiver.avatar : conversationMessage[0]?.sender.avatar"
                alt="" width="60" height="60">
              <h4 class="m-0" style="color:var(--color-dark)">{{ conversationMessage[0]?.isMine ?
                conversationMessage[0]?.receiver.full_name :
                conversationMessage[0]?.sender.full_name }}</h4>
            </div>
          </router-link>
        </div>
        <div class="px-3 pt-5">
          <div v-for="receive in conversationMessage" :key="receive.id">
            <div v-if="!receive.isMine">

              <img class="bg-danger rounded-5 me-2"
                :src="conversationMessage[0]?.isMine ? conversationMessage[0]?.receiver.avatar : conversationMessage[0]?.sender.avatar"
                alt="" width="30" height="30">
              <p class="receive-message mb-2">{{ receive.message }} <br> <span  style="font-size: 11px;">{{
                formatLocalTime(receive.created_at) }}</span></p>
            </div>
            <div class="text-end" v-else>
              <p class="send-message mb-2">{{ receive.message }} <br> <span class="" style="font-size: 11px; color: gray;">{{
                formatLocalTime(receive.created_at) }}</span></p>
            </div>
          </div>
          <div class="input-message d-flex">

            <base-input class="w-100" v-model="message" placeholder="send message..."></base-input>
            <base-button class="btn-send-message" @click="sendMessage"><span style="font-size: 14px;"
                v-if="chatStore.isLoading"> Sending...</span><span v-else><i
                  class="bi bi-send"></i></span></base-button>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>
<script setup>

import { useChatStore } from '@/stores/chat'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const message = ref('')
const chatStore = useChatStore()
const isLoading = ref()

const formatLocalTime = (time) => {
  if (!time) return '';
  const date = new Date(time)
  date.setHours(date.getHours() + 7)
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}
const conversationMessage = computed(() => {
  const id = Number(route.params.id)
  return chatStore.getConversationMessages(id)
})
const sendMessage = async () => {
  const formData = new FormData();
  formData.append('message', message.value);
  formData.append('receiver_id', route.params.id);
  await chatStore.sendMessage(formData);
  await chatStore.fetchChats()
  await chatStore.fetchReceivedChats()
  message.value = '';

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
.main-content {
  background: var(--color-background);
  border-radius: 10px;
  height: calc(100vh - 108px);
  padding-bottom: 36px;
  overflow-y: scroll;
}

.chat-section {
  background: var(--color-backgrond);
  height: 100vh;
  padding: 16px 0;
}

.receiver-name {
  position: sticky;
  background: var(--sidebar-bg);
  border-radius: 16px 16px 0px 0px;
  height: 80px;
  margin-top: -36px;
  top: 0;
  color:var(--color-text)

}

.input-message {
  position: fixed;
  align-self: center;
  padding-top: 16px;
  padding-inline: 16px;
  border-radius: 0px 0px 16px 16px;
  bottom: 16px;
  width: 73.8%;
  margin-left: -16px;
  background: var(--sidebar-bg);
}

.receive-message {
  max-width: 60%;
  height: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  background: var(--color-surface);
  color: var(--color-text);
  padding: 8px 12px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 5px;
}

.send-message {
  max-width: 60%;
  height: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  background: var(--color-text);
  color: var(--color-surface);
  padding: 8px 12px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 5px;
}

.btn-send-message {
  margin-left: 8px;
  font-size: 24px;
  width: 8%;
  height: 60px;
  padding: 10px;
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
