import { defineStore } from "pinia";
import { computed, ref,  } from "vue";

import api from '@/api/api';
export const useChatStore = defineStore('chat', () => {
  const chats = ref([]);
  const receivedChats = ref([]);
  const isSelectChat = ref(true)

  //own messages
  const fetchChats = async () => {
    try {

      const res = await api.get(`/api/profile/sent-messages`)
      chats.value = res.data.data;
    }
    catch (e) {
      console.log("Error in fetching chat list", e);
    }
  }
  //received messages
  const fetchReceivedChats = async () => {
    try {
      const res = await api.get(`/api/profile/received-messages`);
      receivedChats.value = res.data.data;
    }
    catch (e) {
      console.log("Error in fetching received chat list", e);
    }
  }
  // get messages for a specific conversation by sender/receiver id
  const getConversationMessages = (chatId) => {
    const sent = chats.value
      .filter(chat => chat.receiver && chat.receiver.id == chatId)
      .map(chat => ({
        ...chat,
        isMine: true
      }))

    const received = receivedChats.value
      .filter(chat => chat.sender && chat.sender.id == chatId)
      .map(chat => ({
        ...chat,
        isMine: false
      }))

    return [...sent, ...received].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at) // older first
    )
  }
  const getAllConversationMessages = () => {
    const sent = chats.value
      // .filter(chat => chat.receiver.id === chatId)
      .map(chat => ({
        ...chat,
        // isMine: true
      }))

    const received = receivedChats.value
      // .filter(chat => chat.sender.id === chatId)
      .map(chat => ({
        ...chat,

      }))

    return [...sent, ...received]
  }


  const sendMessage = async (payload) => {
    try {
      const res = await api.post(`/api/messages`, payload);
      await fetchChats();
      await fetchReceivedChats();
      return res.data.data;
    }
    catch (e) {
      console.log("Error in sending message", e);
    }
  }
  const chatList = computed(() => {
    const map = new Map()
    // you messages
    chats.value.forEach(chat => {
      if (!chat.receiver) return   // ✅ safety

      const uid = chat.receiver.id

      if (!map.has(uid)) {
        map.set(uid, {
          receiver: chat.receiver,
          messages: []
        })
      }

      map.get(uid).messages.push({
        ...chat,
        isMine:true

      })
    })
    receivedChats.value.forEach(receive => {
      if (!receive.sender) return;
      const rid = receive.sender.id
      if (!map.has(rid)) {
        map.set(rid, {
          sender: receive.sender,
          messages: []
        })
      }
      map.get(rid).messages.push({
        ...receive,
        isMine:false
      })

    })
     map.forEach(conversation => {
    conversation.messages.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )
  })
    return Array.from(map.values())
  })

  return {
    chats,
    fetchChats,
    fetchReceivedChats,
    receivedChats,
    sendMessage,
    getConversationMessages,
    chatList,
    getAllConversationMessages,
    isSelectChat
  }
})
