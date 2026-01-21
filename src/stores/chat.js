import { defineStore } from "pinia";
import { ref } from "vue";
import api from '@/api/api';
export const useChatStore = defineStore('chat', () => {
    const chats = ref();
    const fetchChats = async()=>{
        try{

            const res= await api.get(`/api/profile/sent-messages`)
            chats.value=res.data.data;
        }
        catch(e){
            console.log("Error in fetching chat list",e);
        }
    }
    return{chats,
        fetchChats
    }
});