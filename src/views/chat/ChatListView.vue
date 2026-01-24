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
        <div v-if="isSelectChat" class="main-content p-3">
          

            <h1>{{ chatStore.getOwnMessages(receiverId)[0].receiver.full_name }}</h1>
            <div>
              <div>receiver from </div>
              <div v-for="receive in chatStore.getReceivedMessages(receiverId)" :key="receive.id">
                <p class="receive-message">{{ receive.message }}</p>
              </div>
              <div class="text-end">
                <div v-for="message in chatStore.getOwnMessages(receiverId)" :key="message.id">
                  <!-- <p>Receiver : {{ message.receiver.full_name }}</p> -->
                  <p class="send-message">{{ message.message }}</p>
                  <!-- <p v-for="m in message.messages" :key="m.id">{{ m.message }}</p> -->
                </div>
           
          </div>
            <div class="input-message d-flex">
              
               <base-input v-model="message" class="w-100" placeholder="send message..."></base-input>
               <base-button class="btn-send-message" @click="sendMessage"><i class="bi bi-send"></i></base-button>
             </div>
            <!-- <input type="text" class="form-control"> -->
             
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


const message = ref('')
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
const sendMessage=async()=>{
  const formData=new FormData();
  formData.append('message',message.value);
  formData.append('receiver_id',receiverId.value);
  await chatStore.sendMessage(formData);
  message.value='';
  
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
  /* width: 80%; */
  background: #f5f5f5;
  border-radius: 10px;
  height: calc(100vh - 32px);
  /* padding: 10px 16px; */
  /* margin-bottom: 46px; */
  overflow-y: scroll;
}

.chat-section {
  background: #f5f5f5;
  height: 100vh;
  padding: 16px;
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
  background: white;

}
.input-message{
  position: fixed;
  align-self: center;
  padding-top:16px;
  padding-inline: 16px;
  border-radius: 0px 0px 16px 16px;
  bottom: 16px;
  width: 72%;
  margin-left:-16px;
  background: white;
}

.receive-message{
  background: white;
  /* color: white; */
  padding: 8px 12px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 5px;
}
.send-message{
  background: #131313;
  color: white;
  padding: 8px 12px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 5px;
}
.message {
  color: gray;
  font-size: 14px;
}
.btn-send-message{
  margin-left: 8px;
  /* color:red; */
  font-size: 24px;
  /* margin-top:-14px; */
  width: 8%;
  height: 60px;
  padding: 10px;
  /* align-self: center; */
}
</style>
