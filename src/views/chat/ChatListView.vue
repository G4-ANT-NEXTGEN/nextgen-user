<template>
  <div class="chat-section container-fluid">
    <div class="row">
      <div class="">
        <div class="chat-list">

          <div class="search-chat p-3 pb-1">
            <h4>Messages</h4>
            <base-input class="w-100 pt-3" placeholder="Search Conversation..."></base-input>
          </div>
          <hr class="my-1"/>
          <div class="chat" v-for="chat in chatStore.chatList" :key="chat.id">
            <router-link class="text-start conversationer text-decoration-none" @click="chatStore.isSelectChat=true"  :to="{ name: 'chat-room', params: { id: chat.messages[0].isMine ? chat.messages[0].receiver.id : chat.messages[0].sender.id }}" type="button" variant="white"
            >
                <div class="d-flex align-items-center">
                  <img :src="chat.messages[0].isMine ? chat.messages[0].receiver.avatar : chat.messages[0].sender.avatar" class="rounded-5 me-2"
                    width="60" height="60" alt="">
                  <div>
                    <p class="mb-0 fw-bold">{{ chat.messages[0].isMine ? chat.messages[0].receiver.full_name : chat.messages[0].sender.full_name }}
                    </p>
                    <div class="message">
                      <span v-if="chat.messages[0].isMine">{{ `You : ${chat.messages[0].message}` }}</span>
                      <span v-else style="font-weight: bold; font-size: 15px;">{{ `${chat.messages[0].sender.full_name} : ${chat.messages[0].message}` }}</span>
                      </div>
                  </div>
                </div>
              </router-link >

            </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'

// chatStore.isSelectChat = false
const chatStore = useChatStore()
// console.log()
onMounted(async () => {
  chatStore.isSelectChat=false;
  console.log('chat open ?', chatStore.isSelectChat)
  await chatStore.fetchChats()
  await chatStore.fetchReceivedChats();
  console.log('all conversation : ', chatStore.chatList)
})
</script>
<style scoped>
.chat-section {
  background: var(--color-accent);
  height: 100vh;
  padding: 16px 0;
  padding-left: 16px;
}

.chat-list {
  background: var(--color-background);
  height: calc(100vh - 32px);
  border-radius: 10px;
  width: 100%;
}
.chat {
  transition: all 0.5s;
  width: 100%;
}
.chat:hover {
  background: var(--color-gray);
  border-radius: 10px;
}
.conversationer {
  align-content: center;
  padding: 10px;
  height: 80px;
  width: 100%;
  color:black

}

.conversationer.active {
  background-color: var(--color-gray);
  color: var(--color-text);
  border-radius: 10px;
  /* border-left: 4px solid #4f46e5; */
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
</style>
