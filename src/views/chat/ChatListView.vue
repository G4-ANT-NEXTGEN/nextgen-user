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
            <router-link class="text-start conversationer text-decoration-none"  :to="{ name: 'chat-room', params: { id: chat.messages[0].isMine ? chat.receiver.id : chat.sender.id }}" type="button" variant="white"
            >
                <div class="d-flex align-items-center">
                  <img :src="chat.messages[0].isMine ? chat.receiver.avatar : chat.sender.avatar" class="rounded-5 me-2"
                    width="60" height="60" alt="">
                  <div>
                    <p class="mb-0 fw-bold">{{ chat.messages[0].isMine ? chat.receiver.full_name : chat.sender.full_name }}
                    </p>
                    <div class="message">{{ chat.messages[0].isMine ? `You : ${chat.messages[0].isMine}` : `${chat.sender.full_name} : ${chat.messages[0].isMine}` }}</div>
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

const chatStore = useChatStore()
onMounted(async () => {
  await chatStore.fetchChats()
  console.log('all conversation : ', chatStore.chatList)
})
</script>
<style scoped>
.chat-section {
  background: #f5f5f5;
  height: 100vh;
  padding: 16px 0;
  padding-left: 16px;
}

.chat-list {
  background: white;
  height: calc(100vh - 32px);
  border-radius: 10px;
  width: 100%;
}
.chat {
  transition: all 0.5s;
  width: 100%;
}
.chat:hover {
  background: #f5f5f5;
}
.conversationer {
  align-content: center;
  padding: 10px;
  height: 80px;
  width: 100%;
  color:black

}

.conversationer.active {
  background-color: #f5f5f5;
  /* border-left: 4px solid #4f46e5; */
  font-weight: 600;
}

.message {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: auto;
  color: gray;
  font-size: 14px;
}
</style>
