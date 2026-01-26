<template>

<body style="background-color: #f5f5f5;">


  <div class="row">

    <div class="col-3">

      <ChatListView />
    </div>
    <div class="col-9">

      <router-view />
    </div>
  </div>
</body>
</template>
<script setup>
  import ChatListView from '@/views/chat/ChatListView.vue';
</script>
