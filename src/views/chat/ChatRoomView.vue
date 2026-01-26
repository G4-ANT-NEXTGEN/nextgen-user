<template>
  <div class="chat-section container-fluid">
    <div class="row">
     
      
        <div v-if="chatStore.isSelectChat" class="main-content">
          <div class="receiver-name">
            <router-link :to="{ name: 'profile'}" class="text-decoration-none text-dark">
              <div class="d-flex align-items-center h-100 px-3">
                <img class="rounded-5 me-2" :src="conversationMessage[0]?.isMine ? conversationMessage[0]?.receiver.avatar : conversationMessage[0]?.sender.avatar" alt="" width="60" height="60">
                <h4 class="m-0">{{ conversationMessage[0]?.isMine ? conversationMessage[0]?.receiver.full_name : conversationMessage[0]?.sender.full_name }}</h4>
              </div>
            </router-link>
          </div>
          <div class="px-3 pt-5" >
            <div v-for="receive in conversationMessage" :key="receive.id">
              <div v-if="!receive.isMine">

                <img class="bg-danger rounded-5 me-2" :src="conversationMessage[0]?.isMine ? conversationMessage[0]?.receiver.avatar : conversationMessage[0]?.sender.avatar" alt="" width="30" height="30">
                <p class="receive-message">{{ receive.message }} <br> <span class="" style="font-size: 11px;">{{ formatLocalTime(receive.created_at) }}</span></p>
              </div>
              <div class="text-end" v-else>
                <p class="send-message">{{ receive.message }} <br> <span class="" style="font-size: 11px; color: gray;">{{ formatLocalTime(receive.created_at) }}</span></p>
              </div>
            </div>
            <div class="input-message d-flex">

              <base-input class="w-100" v-model="message" placeholder="send message..."></base-input>
              <base-button class="btn-send-message" @click="sendMessage"><i class="bi bi-send"></i></base-button>
            </div>
            <!-- <input type="text" class="form-control"> -->

          </div>

        </div>
        
      </div>
  </div>

</template>
<script setup>

import { useChatStore } from '@/stores/chat'
import { ref,computed,onMounted } from 'vue'
import { useRoute } from 'vue-router'




const route=useRoute()
// const id =ref();
const message = ref('')
const chatStore = useChatStore()
// const isSelectChat = ref(true)
const receiverId = ref(null)
// const id=ref()
// console.log('route id : ',id.value)

const formatLocalTime =(time) => {
  if(!time) return '';
  const date =new Date (time)
  date.setHours(date.getHours()+7)
  return date.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  })
}
const conversationMessage=computed(()=>{
  const id=Number(route.params.id)
  return chatStore.getConversationMessages(id)
})


const sendMessage = async () => {
  const formData = new FormData();
  formData.append('message', message.value);
  formData.append('receiver_id', route.params.id);
  await chatStore.sendMessage(formData);
  await chatStore.fetchChats()
  await chatStore.fetchReceivedChats()
  // await chatStore.conversationMessages;
  console.log('after send message conversation message : ',await chatStore.getConversationMessages(route.params.id))
  message.value = '';

}
onMounted(async() => {
  console.log('chat open ?',chatStore.isSelectChat)
  await chatStore.fetchChats()
  await chatStore.fetchReceivedChats()
 chatStore.isSelectChat=false;
  console.log('all conversation : ',chatStore.chatList)
  
})
</script>
<style scoped>
.main-content {
  /* max-height: 100vh; */
  /* width: 80%; */
  background: #f5f5f5;
  border-radius: 10px;
  height: calc(100vh - 108px);
  padding-bottom: 36px;
  /* margin-bottom: 46px; */
  overflow-y: scroll;
}

.chat-section {
  background: #f5f5f5;
  height: 100vh;
  padding: 16px 0;
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

.receiver-name {
  position: sticky;
  background: white;
  border-radius: 16px 16px 0px 0px;
  height: 80px;
  margin-top:-36px;
  top: 0;

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
  background: white;
}
.receive-message {
  max-width: 60%;
  height: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  background: white;
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
  background: #131313;
  color: white;
  padding: 8px 12px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 5px;
}

.message {
  /* background: red; */
  max-width: 250px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: auto;
  /* overflow-x: scroll; */
  color: gray;
  font-size: 14px;
}

.btn-send-message {
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
