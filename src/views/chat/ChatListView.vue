<template>
  <div class="chat-section container-fluid">
    <div class="row">
      <div class="col-3">
        <div class="p-3 chat-list d-flex justify-content-start align-items-start">
          <div>
            <div class="chat" v-for="chat in chatStore.chats" :key="chat.id">
              <base-button class="text-start" type="button" variant="white">
                <div class="d-flex align-items-center">
                  <img
                    :src="chat.receiver.avatar"
                    class="rounded-5 me-2"
                    width="60"
                    height="60"
                    alt=""
                  />
                  <div>
                    <p class="mb-0 fw-bold">{{ chat.receiver.full_name }}</p>
                    <span class="message">You : {{ chat.message }}</span>
                  </div>
                </div></base-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-9 bg-primary rounded-3 ">
        <div class="main-content d-flex justify-content-center align-items-center">
          <h3>Start message now...</h3>
        </div>
      </div>
    </div>
  </div>

  <!--  -->
  <!-- <p>{{ chatStore.chats }}</p> -->
</template>
<script setup>
import { onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
onMounted(() => {
  chatStore.fetchChats()
  console.log(chatStore.chats)
})
</script>
<style scoped>
.main-content {
  /* max-height: 100vh; */
  height: 100%;
}
.chat-section {
  background: #f5f1f1;
  height: calc(100vh - 32px);
  padding: 16px ;
}
.chat-list {
  background: rgb(255, 255, 255);
  height: calc(100vh - 64px);
  /* margin: 16px 0; */
  border-radius: 10px;
}
.message {
  color: gray;
  font-size: 14px;
}
</style>
