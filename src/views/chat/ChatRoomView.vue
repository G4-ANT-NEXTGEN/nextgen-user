<template>
  <div class="chat-section container-fluid">
    <div class="row">

      <div v-if="chatStore.isSelectChat" class="main-content">
        <div class="receiver-name">
          <router-link :to="{ name: 'profile' }" class="text-decoration-none text-dark">
            <div class="d-flex align-items-center h-100 px-3">
              <img class="rounded-5 me-2"
                :src="conversationMessage[0]?.isMine ? conversationMessage[0]?.receiver.avatar : conversationMessage[0]?.sender.avatar"
                alt="" width="60" height="60">
              <h4 class="m-0" style="color:var(--color-dark)">{{ conversationMessage[0]?.isMine ? conversationMessage[0]?.receiver.full_name :
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
              <p class="receive-message">{{ receive.message }} <br> <span class="" style="font-size: 11px;">{{
                formatLocalTime(receive.created_at) }}</span></p>
            </div>
            <div class="text-end" v-else>
              <p class="send-message">{{ receive.message }} <br> <span class="" style="font-size: 11px; color: gray;">{{
                formatLocalTime(receive.created_at) }}</span></p>
            </div>
          </div>
          <div class="input-message d-flex">

            <base-input class="w-100" v-model="message" placeholder="send message..."></base-input>
            <base-button class="btn-send-message" @click="sendMessage"><span style="font-size: 14px;" v-if="chatStore.isLoading"> Sending...</span><span v-else><i class="bi bi-send"></i></span></base-button>
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
const receiverId = ref(null)
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
  console.log('after send message conversation message : ', await chatStore.getConversationMessages(route.params.id))
  message.value = '';

}
onMounted(async () => {
  console.log('chat open ?', chatStore.isSelectChat)
  await chatStore.fetchChats()
  await chatStore.fetchReceivedChats()
  console.log('all conversation : ', chatStore.chatList)

})
</script>
<style scoped>
.main-content {
  background: var(  --color-background);
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
  background: var(--color-accent);
  border-radius: 16px 16px 0px 0px;
  height: 80px;
  margin-top: -36px;
  top: 0;
  color: var(--color-dark);

}
.input-message {
  position: fixed;
  align-self: center;
  padding-top: 16px;
  padding-inline: 16px;
  border-radius: 0px 0px 16px 16px;
  bottom: 16px;
  width: 72%;
  margin-left: -16px;
  background: var(--color-accent);
}
.receive-message {
  max-width: 60%;
  height: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  background: var(--color-accent);
  color: var(--color-dark);
  /* color: white; */
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
  background: var(--color-primary);
  color: var(--color-secondary);
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
  background: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f5f5f5 37%,
    #e0e0e0 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
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
