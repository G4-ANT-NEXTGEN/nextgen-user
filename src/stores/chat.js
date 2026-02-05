import { defineStore } from "pinia";
import { computed, ref, } from "vue";

import api from '@/api/api';
export const useChatStore = defineStore('chat', () => {
  const chats = ref([]);
  const receivedChats = ref([]);
  const isSelectChat = ref(false)
  const isLoading = ref(false);

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
      .map(chat => ({
        ...chat,
      }))

    const received = receivedChats.value
      .map(chat => ({
        ...chat,
      }))
    return [...sent, ...received]
  }


  const sendMessage = async (payload) => {
    try {
      isLoading.value = true;
      const res = await api.post(`/api/messages`, payload);
      await fetchChats();
      await fetchReceivedChats();
      return res.data.data;
    }
    catch (e) {
      console.log("Error in sending message", e);
    }
    finally {
      isLoading.value = false;
    }
  }

  // To support adding a user to the chat list even without messages
  const temporaryChatUser = ref(null);

  const startConversation = (user) => {
    temporaryChatUser.value = user;
    isSelectChat.value = true;
  }
  const chatList = computed(() => {
    const map = new Map()
    // Process sent messages
    chats.value.forEach(chat => {
      if (!chat.receiver) return

      const uid = chat.receiver.id

      if (!map.has(uid)) {
        map.set(uid, {
          id: uid,
          otherUser: chat.receiver,
          receiver: chat.receiver,
          messages: []
        })
      }

      map.get(uid).messages.push({
        ...chat,
        isMine: true
      })
    })
    // Process received messages
    receivedChats.value.forEach(receive => {
      if (!receive.sender) return;
      const rid = receive.sender.id
      if (!map.has(rid)) {
        map.set(rid, {
          id: rid,
          otherUser: receive.sender,
          sender: receive.sender,
          messages: []
        })
      }
      map.get(rid).messages.push({
        ...receive,
        isMine: false
      })

    })
    map.forEach(conversation => {
      conversation.messages.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
      conversation.lastUpdate = conversation.messages[0]?.created_at;
    })

    // Add temporary user if they aren't already in the list
    if (temporaryChatUser.value && !map.has(temporaryChatUser.value.id)) {
      map.set(temporaryChatUser.value.id, {
        id: temporaryChatUser.value.id,
        otherUser: temporaryChatUser.value,
        messages: [],
        lastUpdate: new Date().toISOString()
      })
    }

    return Array.from(map.values()).sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
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
    isSelectChat,
    isLoading,
    startConversation,
    temporaryChatUser

  }
})
