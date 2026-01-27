<template>
  <div class="sidebar-right">
    <div class="sidebar-content">
      <!-- Messages -->
      <div class="card-custom mb-3">
        <!-- Header -->
        <div class="messages-header">
          <h6 class="messages-title">Messages</h6>
          <button class="icon-btn" aria-label="New message">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="search-container">
          <i class="bi bi-search search-icon"></i>
          <input type="text" class="search-input" placeholder="Search messages..." v-model="searchQuery">
          <button class="filter-btn" aria-label="Filter">
            <i class="bi bi-funnel"></i>
          </button>
        </div>

        <!-- Tabs -->
        <div class="tabs-container">
          <button v-for="tab in tabs" :key="tab.id" :class="['tab-btn', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id">
            {{ tab.label }}
            <span v-if="tab.count" class="tab-badge">{{ tab.count }}</span>
          </button>
        </div>

        <!-- Messages List -->
        <div class="messages-list">
          <div v-for="chat in filteredChats" :key="chat.id" class="message-item" @click="navigateToChat(chat)">
            <div class="avatar-wrapper">
              <img :src="chat.otherUser?.avatar || 'https://via.placeholder.com/40'" :alt="chat.otherUser?.full_name"
                class="avatar-img">
              <span v-if="chat.isOnline" class="online-dot"></span>
            </div>

            <div class="message-content">
              <div class="message-header">
                <span class="user-name">{{ chat.otherUser?.full_name }}</span>
                <span v-if="chat.time" class="message-time">{{ chat.time }}</span>
              </div>
              <p v-if="chat.lastMessage" class="last-message">
                {{ chat.lastMessage }}
              </p>
            </div>

            <div v-if="chat.unreadCount" class="unread-badge">
              {{ chat.unreadCount }}
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="chatStore.chatList.length === 0" class="empty-state">
            <i class="bi bi-chat-dots empty-icon"></i>
            <p class="empty-text">No messages yet</p>
            <p class="empty-subtext">Start a conversation to see your messages here</p>
          </div>
        </div>

        <!-- View All Link -->
        <button @click="viewAll" class="view-all-btn">
          View All Messages
        </button>
      </div>

      <!-- Events -->
      <!-- <div class="card-custom">
        <div class="sidebar-header-row mb-3">
          <h6 class="sidebar-section-title mb-0">Events</h6>
          <i class="bi bi-three-dots icon-btn"></i>
        </div>
        <div class="event-item">
          <i class="bi bi-calendar3 event-icon"></i>
          <div>
            <small class="event-title">10 Events Invites</small>
          </div>
        </div>
        <div class="event-item">
          <i class="bi bi-calendar3 event-icon"></i>
          <div>
            <small class="event-title">Design System Collaboration</small>
            <small class="event-detail">Thu - Harpoon Mall, YK</small>
          </div>
        </div>
        <div class="event-item">
          <i class="bi bi-calendar3 event-icon"></i>
          <div>
            <small class="event-title">Web Dev 2.0 Meetup</small>
            <small class="event-detail">Yoshkar-Ola, Russia</small>
          </div>
        </div>
        <div class="event-item">
          <i class="bi bi-calendar3 event-icon"></i>
          <div>
            <small class="event-title">Prada's Invitation Birthday</small>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useChatStore } from '@/stores/chat';
import moment from 'moment-timezone';

const router = useRouter();
const chatStore = useChatStore();

const searchQuery = ref('');
const activeTab = ref('primary');
const tabs = [
  { id: 'primary', label: 'Primary' },
  { id: 'general', label: 'General' }
];

const filteredChats = computed(() => {
  let chats = chatStore.chatList;

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    chats = chats.filter(chat => {
      const name = (chat.otherUser?.full_name || '').toLowerCase();
      return name.includes(query);
    });
  }

  return chats.map(chat => {
    const lastMsg = chat.messages[0]; // Newest message is at index 0 after store refactor
    return {
      ...chat,
      lastMessage: lastMsg?.message || '',
      time: lastMsg ? moment(lastMsg.created_at).format('h:mm A') : '',
      isOnline: true,
      unreadCount: 0
    };
  });
});

const navigateToChat = (chat) => {
  const id = chat.otherUser?.id;
  if (id) {
    router.push({ name: 'chat-room', params: { id } });
  }
};

const viewAll = () => {
  router.push({ name: 'chat-layout' });
};

onMounted(async () => {
  try {
    await chatStore.fetchChats();
    await chatStore.fetchReceivedChats();
  } catch (error) {
    console.error('Error fetching chats in sidebar:', error);
  }
});

defineOptions({
  name: 'RightSidebar'
});
</script>

<style scoped>
.sidebar-right {
  width: 100%;
  height: 100%;
}

.sidebar-content {
  height: 100%;
  overflow-y: auto;
  padding-right: 4px;
}

.sidebar-content::-webkit-scrollbar {
  width: 4px;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: var(--sidebar-border);
  border-radius: 10px;
}

.sidebar-content:hover::-webkit-scrollbar-thumb {
  background: var(--sidebar-muted);
}

.card-custom {
  background: var(--sidebar-bg);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--sidebar-border);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

/* Header */
.messages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.messages-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: var(--sidebar-hover);
  color: var(--sidebar-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: var(--sidebar-hover);
  color: var(--color-primary);
  transform: translateY(-1px);
}

/* Search Bar */
.search-container {
  position: relative;
  margin-bottom: 16px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-muted);
  font-size: 14px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 40px;
  border: 1px solid var(--sidebar-border);
  border-radius: 12px;
  background: var(--sidebar-hover);
  font-size: 14px;
  color: var(--sidebar-text);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: var(--color-accent);
}

.filter-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--color-muted);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Tabs */
.tabs-container {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  background: var(--sidebar-hover);
  padding: 4px;
  border-radius: 12px;
}

.tab-btn {
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px 12px;
  color: var(--color-muted);
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.2s ease;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.tab-btn.active {
  background: var(--sidebar-bg);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.tab-btn.active .tab-badge {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.tab-badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 6px;
  background: var(--color-muted-light);
  color: var(--color-muted);
}

/* Messages List */
.messages-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 4px;
}

.message-item:hover {
  background: var(--sidebar-hover);
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-accent);
}

.online-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.user-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.message-time {
  font-size: 11px;
  color: var(--color-muted);
}

.last-message {
  font-size: 13px;
  color: var(--color-muted);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-badge {
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

/* View All Btn */
.view-all-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--sidebar-border);
  border-radius: 12px;
  background: transparent;
  color: var(--color-text);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-all-btn:hover {
  background: var(--sidebar-hover);
  color: var(--color-primary);
}

.sidebar-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-section-title {
  font-weight: 700;
  color: var(--color-text);
  font-size: 0.95rem;
}

/* Event Item */
.event-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  transition: all 0.2s ease;
}

.event-item:not(:last-child) {
  border-bottom: 1px solid var(--sidebar-border);
}

.event-icon {
  background: var(--sidebar-hover);
  padding: 10px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: var(--color-primary);
  min-width: 40px;
  text-align: center;
}

.event-title {
  font-weight: 600;
  display: block;
  color: var(--color-text);
  font-size: 0.85rem;
}

.event-detail {
  color: var(--color-muted);
  display: block;
  font-size: 0.75rem;
  margin-top: 2px;
}

.empty-state {
  padding: 30px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 32px;
  color: var(--color-muted);
  margin-bottom: 12px;
}

.empty-text {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.empty-subtext {
  font-size: 0.8rem;
  color: var(--color-muted);
}
</style>
