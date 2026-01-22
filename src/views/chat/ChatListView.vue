<template>
    <div class="chat-section container-fluid">
        <div class="row">
            <div class="col-3">
                <div class="chat-list">
                    <div class="chat" v-for="chat in chatStore.chats" :key="chat.id">    
                            <base-button class=" text-start" type="button" variant="white">
                            <div class="d-flex">
    
                                <img :src="chat.receiver.avatar" class="rounded-5" width="60" height="60" alt="">
                                <div>
                                    <p class="mb-0 fw-bold">{{ chat.receiver.full_name }}</p>
                                    <span class="message">You : {{ chat.message }}</span>
                                </div>
                            </div></base-button>
                        
                    </div>
                </div>
            </div>
            <div class="col-9 bg-warning" style="height: 100vh;">
                <div class="d-flex justify-content-center align-items-center" style="height: 100vh;"><h3>Start message now...</h3></div>
            </div>
        </div>
    </div>
    <div>
        <ul>
            <!-- <li v-for="chat in chatStore.chats" :key="chat.id">{{ chat.receiver.full_name }}</li> -->
        </ul>
    </div>
    <!-- <p>{{ chatStore.chats }}</p> -->
</template>
<script setup>
    import { onMounted } from 'vue';
    import { useChatStore } from '@/stores/chat';

    const chatStore = useChatStore();
    onMounted(() => {
        chatStore.fetchChats();
        console.log(chatStore.chats);
    });
</script>
<style scoped>
    .chat-section{
        background: #f5f5f5;
    }
    .chat-list{
        background: white;
        height: 100vh;
        /* margin: 16px; */
        
    }
   .message{
    color:gray;
    font-size: 14px;
   }
</style>