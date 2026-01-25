<template>

  <div class="row">

    <div class="col-3">

      <ChatListView />
    </div>
    <div class="col-9">

      <router-view />
    </div>
  </div>
</template>
<script setup>
  import ChatListView from '@/views/chat/ChatListView.vue';
</script>
