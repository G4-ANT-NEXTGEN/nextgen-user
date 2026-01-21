<template>
    <div class="container">
        <div class="row">
            <div class="col-3 ">
                <div class="chat " v-for="chat in chatStore.chats" :key="chat.id">
                   
                        
                        <base-button class="m-1 border text-start" type="button" variant="white">
                        <img src="https://i.abcnewsfe.com/a/0a1c6627-6fdd-4cc3-8edf-d80790509c5a/emoji-1-abc-221220_1671573538915_hpEmbed_1x1.jpg" class="pe-2" width="50" alt="">{{ chat.receiver.full_name }}</base-button>
                    
                </div>
            </div>
            <div class="col-9"></div>
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
   
</style>