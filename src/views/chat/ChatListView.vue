<template>
  <div class="chat-section container-fluid">
    <div class="row">
      <div class="col-3">
        <div class="chat-list">
          <div class="chat" v-for="chat in chatStore.chatList" :key="chat.id">
            <base-button class="text-start" type="button" variant="white" @click="selectChat(chat.receiver.id)">
              <div class="d-flex align-items-center">
                <img :src="chat.receiver.avatar" class="rounded-5 me-2" width="60" height="60" alt="">
                <div>
                  <p class="mb-0 fw-bold">{{ chat.receiver.full_name }}</p>
                  <span class="message">You : <b>{{ chat.messages[0].message }}</b></span>
                </div>
              </div>
            </base-button>
          </div>

        </div>
      </div>

      <div class="col-9">
        <div v-if="isSelectChat" class="main-content">
          <h1>{{ chatStore.getOwnMessages(receiverId)[0].receiver.full_name }}</h1>
          <div>
            <div>receiver from </div>
            <div v-for="receive in chatStore.getReceivedMessages(receiverId)" :key="receive.id">
              <p>{{ receive.message }}</p>
            </div>
            <div class="text-end">
              <div v-for="message in chatStore.getOwnMessages(receiverId)" :key="message.id">
                <!-- <p>Receiver : {{ message.receiver.full_name }}</p> -->
                <p>{{ message.message }}</p>
                <!-- <p v-for="m in message.messages" :key="m.id">{{ m.message }}</p> -->
              </div>
            </div>
            <input type="text" class="form-control">
            <base-input/
          </div>

        </div>
        <div v-else class="main-content d-flex justify-content-center align-items-center">
          <h3>Start message now...</h3>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import { ref } from 'vue'



const chatStore = useChatStore()
const isSelectChat = ref(false)
const receiverId = ref(null)
const senderId = ref(null)
const selectChat = (id) => {
  senderId.value = id;
  isSelectChat.value = true;
  receiverId.value = id;
  chatStore.getOwnMessages(id);
  console.log('spacific receiver : ', chatStore.getOwnMessages(id));

  // console.log('the value in chat list: ',chatStore.chatList)
}
onMounted(() => {
  chatStore.fetchChats()
  chatStore.fetchReceivedChats()
  // chatStore.chatList
})
</script>
<style scoped>
.main-content {
  /* max-height: 100vh; */
  background: #f5f5f5;
  border-radius: 10px;
  height: 100%;
  padding: 10px;
}

.chat-section {
  background: white;
  height: 100vh;
  padding: 16px;
}

.chat-list {
  background: #f5f5f5;
  height: calc(100vh - 32px);
  border-radius: 10px;
  width: 100%;
}

.chat {
  transition: all 0.5s;
  width: 100%;
}

.chat:hover {
  background: white;

}

.message {
  color: gray;
  font-size: 14px;
}
</style>
