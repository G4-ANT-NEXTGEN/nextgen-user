import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from '@/api/api';
export const useChatStore = defineStore('chat', () => {
  const chats = ref([]);
  const receivedChats=ref([]);
  const fetchChats = async () => {
    try {

      const res = await api.get(`/api/profile/sent-messages`)
      chats.value = res.data.data;
    }
    catch (e) {
      console.log("Error in fetching chat list", e);
    }
  }
  const fetchReceivedChats = async () => {
    try{
      const res=await api.get(`/api/profile/received-messages`);
      receivedChats.value=res.data.data;
    }
    catch(e){
      console.log("Error in fetching received chat list", e);
    }
  }
  //get messages by chatId
  const getOwnMessages = (chatId) => {
    return chats.value
      .filter(chat => chat.receiver.id === chatId).sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      )

  }
   const getReceivedMessages = (chatId) => {
    return receivedChats.value
      .filter(chat => chat.sender.id === chatId).sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      )

  }

  const sendMessage= async (payload) => {
    try{
      const res = await api.post(`/api/messages`,payload);
    }
    catch(e){
      console.log("Error in sending message", e);
    }
  }
  const chatList = computed(() => {
    const map = new Map()

    chats.value.forEach(chat => {
      if (!chat.receiver) return   // ✅ safety

      const rid = chat.receiver.id

      if (!map.has(rid)) {
        map.set(rid, {
          receiver: chat.receiver,
          messages: []
      })
      }

      map.get(rid).messages.push(chat)
    })



    return Array.from(map.values())
  })

  return {
    chats,
    fetchChats,
    getOwnMessages,
    getReceivedMessages,
    fetchReceivedChats,
    sendMessage,
    chatList
  }
})
