<template>
  <div class="body">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid px-4">
        <div class="d-flex align-items-center gap-4">
          <div class="d-flex align-items-center gap-2">
            <div class="logo-box">
              <div class="logo-inner">
                <img class="img-fluid" src="../../public/logo.jpg" alt="">
              </div>
            </div>
            <span class="fs-5 fw-bold">NextGen</span>
          </div>
        </div>
        <div class="position-relative ms-4">
          <i class="bi bi-search search-icon"></i>
          <input type="text" class="search-box" placeholder="Search" style="width: 420px;">
        </div>
        <div class="d-flex align-items-center gap-3">
          <button @click="toggleTheme" class="theme-btn">
            <i v-if="theme === 'light'" class="bi bi-moon-fill"></i>
            <i v-else class="bi bi-brightness-high-fill"></i>
          </button>
          <button class="theme-btn">
            <i class="bi bi-bell"></i>
          </button>
          <button class="theme-btn">
            <i class="bi bi-bookmark"></i>
          </button>
          <div class="d-flex align-items-center gap-2" style="cursor: pointer;">
            <div class="small-avatar overflow-hidden rounded-circle">
              <img class="img-fluid" :src="authStore.user.avatar" alt="">
            </div>
            <span class="fw-semibold">{{ authStore.user.full_name }}</span>
          </div>
        </div>
      </div>
    </nav>

    <div class="container-fluid px-4 py-4 container-wrapper">
      <div class="row g-4">
        <!-- Left Sidebar -->
        <div class="sidebar-left">
          <div class="sidebar-content">
            <!-- Profile Card -->
            <div class="card-custom mb-3">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="avatar overflow-hidden rounded-circle">
                  <img class="img-fluid" :src="authStore.user.avatar" alt="">
                </div>
                <div>
                  <h6 class="mb-0 fw-bold">
                    {{ authStore.user.full_name }}
                    <i class="bi bi-check-circle-fill text-primary-custom"></i>
                  </h6>
                  <small style="color: var(--color-muted);">
                    @{{ authStore.user.full_name.toLowerCase().replace(/ /g, '.') }}
                  </small>
                </div>
              </div>
              <div class="row text-center profile-stats">
                <div class="col-4">
                  <div class="fw-bold fs-5">2.3k</div>
                  <small style="color: var(--color-muted);">Follower</small>
                </div>
                <div class="col-4">
                  <div class="fw-bold fs-5">235</div>
                  <small style="color: var(--color-muted);">Following</small>
                </div>
                <div class="col-4">
                  <div class="fw-bold fs-5">80</div>
                  <small style="color: var(--color-muted);">Post</small>
                </div>
              </div>
            </div>

            <!-- Navigation Menu -->
            <div class="nav-menu mb-3">
              <a href="#" class="nav-item active">
                <i class="bi bi-house-door-fill"></i>
                <span>Feed</span>
              </a>
              <a href="#" class="nav-item">
                <i class="bi bi-people-fill"></i>
                <span>Friends</span>
              </a>
              <a href="#" class="nav-item position-relative">
                <i class="bi bi-calendar-event"></i>
                <span>Event</span>
                <span class="badge bg-danger badge-custom">1</span>
              </a>
              <a href="#" class="nav-item">
                <i class="bi bi-play-circle-fill"></i>
                <span>Watch Videos</span>
              </a>
              <a href="#" class="nav-item">
                <i class="bi bi-image-fill"></i>
                <span>Photos</span>
              </a>
              <a href="#" class="nav-item">
                <i class="bi bi-shop"></i>
                <span>Marketplace</span>
              </a>
              <a href="#" class="nav-item position-relative">
                <i class="bi bi-file-earmark-text"></i>
                <span>Files</span>
                <span class="badge badge-custom" style="background-color: #8b5cf6;">7</span>
              </a>
            </div>

            <!-- Pages You Like -->
            <div class="card-custom">
              <h6 class="fw-bold mb-3" style="color: var(--color-muted); letter-spacing: 0.5px;">PAGES YOU
                LIKE</h6>
              <div class="page-item-custom">
                <div class="page-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">UI</div>
                <span class="fw-medium">UI/UX Community</span>
              </div>
              <div class="page-item-custom">
                <div class="page-icon" style="background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%);">WD</div>
                <span class="fw-medium">Web Designer</span>
              </div>
              <div class="page-item-custom">
                <div class="page-icon" style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);">D</div>
                <span class="fw-medium">Dribbble Community</span>
              </div>
              <div class="page-item-custom">
                <div class="page-icon" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);">B</div>
                <span class="fw-medium">Behance <i class="bi bi-patch-check-fill text-primary-custom"
                    style="font-size: 12px;"></i></span>
              </div>
              <a href="#" class="link-custom small mt-2 d-inline-block">View All</a>
            </div>
          </div>
        </div>

        <!-- Main Feed -->
        <div class="col-lg-6 main-feed ">

          <!-- Create Post -->
          <div class="post-card mb-3 create-post">
            <div class="d-flex gap-4 mb-4 align-items-center ">
              <div>
                <div class="small-avatar overflow-hidden rounded-circle">
                  <img class="img-fluid" :src="authStore.user.avatar" alt="">
                </div>
              </div>
              <div class="create-post-input" @click="openCreatePostModal">
                <input type="text" placeholder="what on your mind?" class="form-control">
              </div>
            </div>
            <div class="d-flex state-post mb-2">
              <div class="btn-tag" @click="openCreatePostModal">
                <i class="bi bi-image icon-image"></i>
                <span>Image/Video</span>
              </div>
              <div class="btn-tag" @click="openCreatePostModal">
                <i class="bi bi-paperclip icon-attachment"></i>
                <span>Attachment</span>
              </div>
              <div class="btn-tag" @click="openCreatePostModal">
                <i class="bi bi-camera-video icon-live"></i>
                <span>Live</span>
              </div>
              <div class="btn-tag" @click="openCreatePostModal">
                <span class="icon-hashtag">#</span>
                <span>Hashtag</span>
              </div>
              <div class="btn-tag" @click="openCreatePostModal">
                <span class="icon-mention">@</span>
                <span>Mention</span>
              </div>
            </div>
          </div>

          <!-- Post -->
          <div class="post-card" v-for="post in postStore.posts" :key="post.id">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="d-flex align-items-center gap-3">
                <div class="small-avatar rounded-circle overflow-hidden">
                  <img class="img-fluid w-100 h-100 object-fit-cover" :src="post.creator.avatar" alt="">
                </div>
                <div>
                  <h6 class="mb-0 fw-bold">{{ post.creator.full_name }}</h6>
                  <small style="color: var(--color-muted);">
                    <i class="bi bi-globe-americas"></i>
                    {{ formatDate(post.created_at) }}
                  </small>
                </div>
              </div>

              <div class="dropdown" v-if="post.creator.id == authStore.user?.id">
                <button @click="GetpostId(post.id)" class="btn btn-edit-post" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i class="bi bi-three-dots cursor-pointer"></i>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <button @click="OpenModeledit" type="button" class="dropdown-item">
                      <i class="bi bi-pencil"></i>
                      <span>Edit</span>
                    </button>
                  </li>
                  <li>
                    <button @click="OpenModeldelete" type="button" class="dropdown-item text-danger">
                      <i class="bi bi-trash"></i>
                      <span>Delete</span>
                    </button>
                  </li>
                  <!-- <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li>
                    <button type="button" class="dropdown-item">
                      <i class="bi bi-flag"></i>
                      <span>Report</span>
                    </button>
                  </li> -->
                </ul>
              </div>

            </div>
            <div>
              <p>{{ post.text }}</p>
            </div>

            <div class="row g-3 mb-3" v-if="post.image && post.image !== 'http://novia.csm.linkpc.net/storage/posts'">
              <div class="col-12">
                <div class="w-100">
                  <img class="img-fluid poduct-post" :src="post.image" alt="">
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center pt-3 divider">
              <button @click="reactLike(post.id)" class="btn-post-action d-flex align-items-center gap-2">
                <i v-if="isLiked(post.id)" class="bi bi-heart-fill"></i>
                <i v-else class="bi bi-heart"></i>
                <span>{{ getLikeCount(post.id) }} Like</span>
              </button>
              <button class="btn-post-action d-flex align-items-center gap-2">
                <i class="bi bi-chat"></i>
                <span>12 Comment</span>
              </button>
              <button class="btn-post-action d-flex align-items-center gap-2">
                <i class="bi bi-share"></i>
                <span>3 Share</span>
              </button>
              <div>
                <i class="bi bi-bookmark icon-btn" style="color: var(--color-muted);"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="col-lg-3 sidebar-right">
          <div class="sidebar-content">
            <!-- Messages -->
            <!-- <div class="card-custom mb-3">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold mb-0">Messages</h6>
                <i class="bi bi-plus-lg icon-btn-massage"></i>
              </div>
              <div class="position-relative mb-3">
                <i class="bi bi-search position-absolute"
                  style="left: 12px; top: 50%; transform: translateY(-50%); color: var(--color-muted);"></i>
                <input type="text" class="form-control"
                  style="padding-left: 38px; background-color: var(--color-secondary); border: 1px solid var(--color-border); border-radius: 10px;"
                  placeholder="Search">
                <i class="bi bi-funnel position-absolute icon-btn-massage"
                  style="right: 8px; top: 50%; transform: translateY(-50%); color: var(--color-muted);"></i>
              </div>
              <div class="d-flex gap-2 mb-3">
                <button class="tab-filter active">Primary</button>
                <button class="tab-filter">General</button>
              </div>

              <div v-for="chat in chatStore.chatList" :key="chat.id" class="message-item mb-2 cursor-pointer"
                @click="$router.push({ name: 'chat-room', params: { id: chat.receiver?.id || chat.sender?.id } })">
                <div class="position-relative">
                  <div class="small-avatar overflow-hidden rounded-circle">
                    <img :src="chat.receiver?.avatar || chat.sender?.avatar || 'https://via.placeholder.com/40'"
                      class="img-fluid" alt="">
                  </div>
                  <div class="online-indicator"></div>
                </div>
                <small class="fw-medium">{{ chat.receiver?.full_name || chat.sender?.full_name }}</small>
              </div>
              <div v-if="chatStore.chatList.length === 0" class="text-center py-3">
                <small style="color: var(--color-muted);">No messages yet</small>
              </div>
              <button @click="$router.push({ name: 'chat-layout' })" class="link-custom small d-block text-center mt-3">
                View All
              </button>
            </div> -->


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
                    <img :src="chat.receiver?.avatar || chat.sender?.avatar || 'https://via.placeholder.com/40'"
                      :alt="chat.receiver?.full_name || chat.sender?.full_name" class="avatar-img">
                    <span v-if="chat.isOnline" class="online-dot"></span>
                  </div>

                  <div class="message-content">
                    <div class="message-header">
                      <span class="user-name">{{ chat.receiver?.full_name || chat.sender?.full_name }}</span>
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
            <div class="card-custom">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold mb-0">Events</h6>
                <i class="bi bi-three-dots icon-btn"></i>
              </div>
              <div class="event-item">
                <i class="bi bi-calendar3 fs-2" style="color: var(--color-muted);"></i>
                <div>
                  <small class="fw-semibold d-block">10 Events Invites</small>
                </div>
              </div>
              <div class="event-item">
                <i class="bi bi-calendar3 fs-2" style="color: var(--color-muted);"></i>
                <div>
                  <small class="fw-semibold d-block">Design System Collaboration</small>
                  <small style="color: var(--color-muted);">Thu - Harpoon Mall, YK</small>
                </div>
              </div>
              <div class="event-item">
                <i class="bi bi-calendar3 fs-2" style="color: var(--color-muted);"></i>
                <div>
                  <small class="fw-semibold d-block">Web Dev 2.0 Meetup</small>
                  <small style="color: var(--color-muted);">Yoshkar-Ola, Russia</small>
                </div>
              </div>
              <div class="event-item">
                <i class="bi bi-calendar3 fs-2" style="color: var(--color-muted);"></i>
                <div>
                  <small class="fw-semibold d-block">Prada's Invitation Birthday</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BaseModal v-if="showModal" title="Create Post" size="lg" @close="showModal = false">
    <div class="p-2">
      <!-- BODY -->
      <div class="d-flex align-items-center gap-3 mb-4">
        <div class="avatar overflow-hidden rounded-circle">
          <img class="img-fluid" :src="authStore.user.avatar" alt="">
        </div>
        <div>
          <h5 class="mb-0 fw-bold d-flex align-items-center gap-2 name-creator">
            {{ authStore.user.full_name }}
            <i class="bi bi-check-circle-fill text-primary-custom"></i>
          </h5>
          <small style="color: var(--color-muted);">
            {{ authStore.user.positions[0].name }}
          </small>
        </div>
      </div>
      <div class="my-3">
        <textarea v-model="titlePost" class="title-post" :class="{ 'is-invalid': errorTitle }" rows="4"
          placeholder="What's on your mind?" @input="validateTitle"></textarea>
        <div v-if="errorTitle" class="invalid-feedback d-block">{{ errorTitle }}</div>
        <small v-if="titlePost" class="text-muted d-block mt-2">{{ titlePost.length }}/500 characters</small>
      </div>
      <div class="category-selection">
        <p class="text-category fw-semibold">Select Category</p>
      </div>
      <div>
        <div class="pill-container">
          <div v-for="category in categoryStore.categories" :key="category.id"
            :class="['category', { active: category.id == selected?.id }]" @click="selectPill(category)">
            {{ category.name }}
          </div>
        </div>
        <!-- <p class="text-category">Selected: <span>{{ selected?.id || 'None' }}</span></p> -->
      </div>
    </div>
    <div class=" w-100 category-selection d-flex justify-content-between align-items-center mb-3 px-2">
      <p class="text-category fw-semibold">Add to your post</p>
      <div class="text-category d-flex gap-3">
        <input type="file" ref="fileInput" class="d-none" accept="image/jpeg,image/png,image/jpg"
          @change="handleFileChange" />
        <input type="file" ref="attachmentInput" class="d-none" accept=".jpeg,.png,.jpg,.pdf,.mp4,.mp3,.zip"
          @change="handleAttachmentChange" />
        <i class="bi bi-image icon-post" @click="openFilePicker" title="Add image"></i>
        <i class="bi bi-paperclip icon-post" @click="openAttachmentPicker" title="Add attachment"></i>
      </div>
    </div>
    <div class="post-img position-relative" v-if="imgPost">
      <button @click="removeImage" class="btn-remove-img" type="button">
        <i class="bi bi-x-lg"></i>
      </button>
      <img class="img-fluid" :src="imgPost" alt="">
    </div>

    <!-- FOOTER -->
    <template #footer>
      <div class="group-btn-modal d-flex justify-content-end gap-3 align-items-center">
        <BaseButton variant="primary" @click="publishPost" :disabled="isLoading">
          Publish
        </BaseButton>
      </div>
    </template>
  </BaseModal>

  <BaseModal v-if="showModalDelete" title="Delete Post" size="md" @close="showModalDelete = false">
    <div class="p-2">
      <p>Are you sure you want to delete this post?</p>
    </div>
    <template #footer>
      <div class="group-btn-modal d-flex justify-content-end gap-3 align-items-center">
        <BaseButton variant="primary" @click="deletePost" :disabled="isLoading">
          Delete
        </BaseButton>
      </div>
    </template>
  </BaseModal>


</template>

<script setup>

import { useAuthStore } from '@/stores/auth';
import { usePostStore } from '@/stores/post';
import { useCategoryStore } from '@/stores/category';
import { useChatStore } from '@/stores/chat';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme'
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import moment from 'moment-timezone';
import { ref, computed } from 'vue';

const { theme, toggleTheme } = useTheme()
const router = useRouter();
const authStore = useAuthStore();
const categoryStore = useCategoryStore();
const postStore = usePostStore();
const chatStore = useChatStore();
const { errors: validationErrors, validateField } = useRequiredValidator();
const isLoading = ref(false);
const likedPosts = ref(new Set());
const postLikeCounts = ref({});
const showModal = ref(false);
const titlePost = ref('');
const selected = ref(null)
const file = ref(null)
const attachment = ref(null);
const imgPost = ref(null);
const errorTitle = ref(null);
const PostId = ref(null);
const showModalDelete = ref(false);

// Messages Sidebar State
const searchQuery = ref('');
const activeTab = ref('primary');
const tabs = [
  { id: 'primary', label: 'Primary' },
  { id: 'general', label: 'General' }
];

const filteredChats = computed(() => {
  let chats = chatStore.chatList;

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    chats = chats.filter(chat => {
      const name = (chat.receiver?.full_name || chat.sender?.full_name || '').toLowerCase();
      // Check last message text if needed, but for now just name
      return name.includes(query);
    });
  }

  // Add helper fields for the template
  return chats.map(chat => {
    const lastMsg = chat.messages[chat.messages.length - 1];
    return {
      ...chat,
      lastMessage: lastMsg?.message || '',
      time: lastMsg ? moment(lastMsg.created_at).format('h:mm A') : '',
      isOnline: true, // Placeholder for online status
      unreadCount: 0  // Placeholder for unread count
    };
  });
});

const navigateToChat = (chat) => {
  const id = chat.receiver?.id || chat.sender?.id;
  if (id) {
    router.push({ name: 'chat-room', params: { id } });
  }
};

const viewAll = () => {
  router.push({ name: 'chat-layout' });
};


authStore.fetchProfile();
postStore.fetchPosts();
categoryStore.fetchCategorys();
chatStore.fetchChats();
chatStore.fetchReceivedChats();

const fileInput = ref(null)
const attachmentInput = ref(null)

const GetpostId = (id) => {
  PostId.value = id;

}

const OpenModeldelete = () => {
  showModalDelete.value = true;
}

const deletePost = async () => {
  if (!PostId.value) return;

  isLoading.value = true;
  try {
    await postStore.deletePost(PostId.value);
    showModalDelete.value = false;
    PostId.value = null; // Reset after deletion
  } catch (error) {
    console.error('Error deleting post:', error);
  } finally {
    isLoading.value = false;
  }
}

const OpenModeledit = async () => {
  try {
    await postStore.fetchPostsById(PostId.value);
    const post = postStore.post;

    if (!post) {
      console.error('Post not found');
      return;
    }

    // Populate form fields with existing post data
    titlePost.value = post.text || '';

    // Only show image if it's a real image URL, not just the storage path
    const isDefaultPath = post.image === 'http://novia.csm.linkpc.net/storage/posts';
    file.value = isDefaultPath ? null : (post.image || null);
    imgPost.value = isDefaultPath ? null : (post.image || null);

    attachment.value = null;

    // Set selected category - category_ids is an array, get the first one
    if (post.category_ids && post.category_ids.length > 0) {
      const categoryId = post.category_ids[0];
      selected.value = categoryStore.categories.find(cat => cat.id == categoryId) || null;
    } else {
      selected.value = null;
    }

    // Clear any validation errors
    errorTitle.value = null;

    // Open modal
    openCreatePostModal();
  } catch (error) {
    console.error('Error loading post for edit:', error);
  }
}

const openFilePicker = () => {
  fileInput.value.click()
}

const openAttachmentPicker = () => {
  attachmentInput.value.click()
}

const handleFileChange = (event) => {
  file.value = event.target.files[0]
  if (file.value) {
    console.log('Image file:', file.value.name)
    // Create preview URL
    imgPost.value = URL.createObjectURL(file.value)
  }
}

const handleAttachmentChange = (event) => {
  attachment.value = event.target.files[0]
  if (attachment.value) {
    console.log('Attachment file:', attachment.value.name)
  }
}

const openCreatePostModal = () => {
  showModal.value = true;
}

const removeImage = () => {
  imgPost.value = null;
  file.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

function validateTitle() {
  // Real-time validation with character limit
  const maxLength = 500;
  if (titlePost.value.length > maxLength) {
    titlePost.value = titlePost.value.substring(0, maxLength);
  }

  // Validate field using composable
  if (titlePost.value.trim()) {
    errorTitle.value = null;
    validationErrors.title = '';
  } else {
    errorTitle.value = 'Post content is required';
    validationErrors.title = 'Post content is required';
  }
}

function selectPill(category) {
  if (selected.value?.id == category.id) {
    selected.value = null;
  } else {
    selected.value = category;
  }
}

// Function to prepare FormData
const prepareFormData = () => {
  const data = new FormData();

  // Add text content
  if (titlePost.value.trim()) {
    data.append('text', titlePost.value.trim());
  }

  // Add image file (required by API)
  if (file.value && file.value instanceof File) {
    data.append('image', file.value);
  }

  // Add attachment file (optional)
  if (attachment.value && attachment.value instanceof File) {
    data.append('attachment', attachment.value);
  }

  // Add category IDs as JSON string array
  const categoryIds = selected.value ? [selected.value.id] : [];
  data.append('category_ids', JSON.stringify(categoryIds));

  return data;
};

const formatDate = (date) => {
  return moment.utc(date).local().fromNow();
}


setTimeout(() => {
  postStore.posts.forEach(post => {
    if (!(post.id in postLikeCounts.value)) {
      postLikeCounts.value[post.id] = 10;
    }
  });
}, 100);

function reactLike(postId) {
  if (!postLikeCounts.value[postId]) {
    postLikeCounts.value[postId] = 10;
  }

  if (likedPosts.value.has(postId)) {
    likedPosts.value.delete(postId);
    postLikeCounts.value[postId]--;
  } else {
    likedPosts.value.add(postId);
    postLikeCounts.value[postId]++;
  }
}

function isLiked(postId) {
  return likedPosts.value.has(postId);
}

function getLikeCount(postId) {
  return postLikeCounts.value[postId] || 10;
}

const publishPost = async () => {
  isLoading.value = true;
  try {
    // Validation before publish
    if (!validateField('title', titlePost.value.trim(), 'Post content is required')) {
      errorTitle.value = validationErrors.title;
      return;
    }

    const data = prepareFormData();

    // Log FormData contents for debugging
    console.log('FormData contents:');
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    // Send to API
    await postStore.createPost(data);
    showModal.value = false;
    // Reset form
    titlePost.value = '';
    file.value = null;
    attachment.value = null;
    selected.value = null;
    imgPost.value = null;
    errorTitle.value = null;

    await postStore.fetchPosts();
  } catch (error) {
    console.error('Error publishing post:', error);
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped>
.messages-card {
  background: var(--color-secondary);
  border-radius: 16px;
  padding: 20px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); */
  border: 1px solid var(--color-border);
  margin-bottom: 20px;
}

/* Header */
.messages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.messages-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: var(--color-secondary);
  color: var(--color-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: var(--color-hover);
  color: var(--color-text);
  transform: translateY(-1px);
}

.icon-btn:active {
  transform: translateY(0);
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
  font-size: 16px;
}

.search-input {
  width: 100%;
  padding: 12px 44px 12px 44px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-secondary);
  font-size: 14px;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.search-input::placeholder {
  color: #adb5bd;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
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
  color: #868e96;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: var(--color-hover);
  color: var(--color-text);
}

/* Tabs */
.tabs-container {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  background: var(--color-secondary);
  padding: 4px;
  border-radius: 12px;
}

.tab-btn {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 16px;
  color: var(--color-muted);
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  position: relative;
}

.tab-btn:hover {
  color: #495057;
}

.tab-btn.active {
  background: var(--color-accent);
  color: var(--color-primary);
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.tab-badge {
  background: #0d6efd;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

.tab-btn.active .tab-badge {
  background: var(--color-primary);
}

/* Messages List */
.messages-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.messages-list::-webkit-scrollbar {
  width: 6px;
}

.messages-list::-webkit-scrollbar-track {
  background: transparent;
}

.messages-list::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}

.messages-list::-webkit-scrollbar-thumb:hover {
  background: var(--color-muted);
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
  background: var(--color-hover);
}

.message-item:active {
  transform: scale(0.98);
}

/* Avatar */
.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-background);
}

.online-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #28a745;
  border: 2px solid var(--color-background);
  border-radius: 50%;
}

/* Message Content */
.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-time {
  font-size: 12px;
  color: var(--color-muted);
  flex-shrink: 0;
  margin-left: 8px;
}

.last-message {
  font-size: 13px;
  color: var(--color-muted);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread-badge {
  background: var(--color-primary);
  color: var(--color-background);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 24px;
  text-align: center;
  flex-shrink: 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 48px;
  color: var(--color-border);
  margin-bottom: 12px;
}

.empty-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 6px 0;
}

.empty-subtext {
  font-size: 13px;
  color: var(--color-muted);
  margin: 0;
}

/* View All Button */
.view-all-btn {
  width: 100%;
  padding: 12px;
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.view-all-btn:hover {
  background: var(--color-hover);
}

.view-all-btn i {
  font-size: 14px;
  transition: transform 0.2s ease;
}

.view-all-btn:hover i {
  transform: translateX(3px);
}

/* Responsive */
@media (max-width: 576px) {
  .messages-card {
    padding: 16px;
    border-radius: 12px;
  }

  .messages-title {
    font-size: 16px;
  }

  .avatar-img {
    width: 40px;
    height: 40px;
  }

  .user-name {
    font-size: 13px;
  }

  .last-message {
    font-size: 12px;
  }
}

.theme-btn {
  border: 1px solid var(--border-color);
  background: var(--color-secondary);
  color: var(--color-text);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}


.pill-container {
  display: flex;
  gap: 10px;
  margin: 20px;
  margin-left: 0px;
  flex-wrap: wrap;
}

.category {
  padding: 10px 16px;
  border-radius: 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: var(--bg-tag);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.category:hover {
  background-color: var(--color-hover);
}

.category.active {
  background-color: var(--color-primary);
  color: var(--color-background);
  border-color: var(--color-primary);
}

.group-btn-modal {
  width: 200px;
}

.body {
  background-color: var(--color-background);
  color: var(--color-text);
}

.navbar {
  background-color: var(--color-accent);
  border-bottom: 1px solid var(--color-border);
  padding: 16px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.logo-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(10, 10, 10, 0.15);
}

.post-img {
  width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.post-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove-img {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.btn-remove-img:hover {
  background-color: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.btn-remove-img i {
  font-size: 14px;
}

.name-creator {
  color: var(--color-text);
}

.text-category {
  color: var(--color-text);
}

.text-category .icon-post {
  color: var(--color-text);
  cursor: pointer;
}

.text-category .icon-post:hover {
  cursor: pointer;
}

.btn-edit-post {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none !important;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.btn-edit-post:hover {
  background-color: var(--color-secondary);
  cursor: pointer;

}


/* Dropdown Toggle Button */
.btn-edit-post {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-edit-post:hover {
  background-color: var(--bg-dropdown-hover);
}

.btn-edit-post i {
  color: var(--color-muted);
  font-size: 20px;
  transition: color 0.2s ease;
}

.btn-edit-post:hover i {
  color: var(--color-text);
}

/* Dropdown Menu */
.dropdown-menu {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
  background-color: var(--color-accent);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 8px;
  min-width: 200px;
  margin-top: 8px;
}

/* Dropdown Items */
.dropdown-menu .dropdown-item {
  color: var(--color-text);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
}

.dropdown-menu .dropdown-item i {
  font-size: 16px;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu .dropdown-item:hover {
  background-color: var(--bg-dropdown-hover);
  transform: translateX(2px);
}

.dropdown-menu .dropdown-item:active {
  transform: scale(0.98);
}

/* Delete Item - Danger State */
.dropdown-menu .dropdown-item.text-danger {
  color: #dc3545;
}

.dropdown-menu .dropdown-item.text-danger:hover {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

/* Dropdown Divider */
.dropdown-divider {
  margin: 8px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  opacity: 1;
}

/* Focus State for Accessibility */
.dropdown-menu .dropdown-item:focus-visible {
  outline: 2px solid var(--color-primary, #0d6efd);
  outline-offset: -2px;
}

/* Dark Mode Support (Optional) */
@media (prefers-color-scheme: dark) {
  .dropdown-menu {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .dropdown-divider {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
}

.title-post {
  border: 2px solid #e5e7eb;
  width: 100%;
  background-color: var(--color-secondary);
  font-size: 15px;
  border-radius: 10px;
  color: var(--color-text);
  padding: 20px;
  transition: all 0.2s ease;
}

.title-post:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(10, 100, 235, 0.1);
}

.title-post.is-invalid {
  border-color: #dc2626;
  background-color: rgba(220, 38, 38, 0.05);
}

.title-post.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.logo-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.search-box {
  background-color: var(--color-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 10px 16px 10px 42px;
  transition: all 0.3s ease;
}

.search-box:focus {
  outline: none;
  border-color: var(--color-primary);
  color: var(--color-text);
  background-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.05);
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-muted);
}


.card-custom {
  background: var(--color-accent);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s ease;
}

.card-custom:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.poduct-post {
  border-radius: 20px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav-menu {
  background: var(--color-accent);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 6px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
}

.nav-item:hover {
  background-color: var(--bg-hover);
  transform: translateX(4px);
}

.nav-item.active {
  background-color: var(--color-secondary);
  color: var(--color-text);
}

.badge-custom {
  position: absolute;
  right: 16px;
  width: 22px;
  height: 22px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.story-item {
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.story-item:hover {
  transform: translateY(-4px);
}

.story-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  margin: 0 auto 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.story-avatar.active {
  border-color: var(--color-blue);
  border-width: 3px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.post-card {
  background: var(--color-accent);
  box-shadow: 3px 10px 67px 0px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 26px;
  margin-bottom: 26px;
}

.small-avatar {
  width: 40px;
  height: 40px;
}


.create-post-input input {
  border: none;
  width: 400px;
  background-color: var(--color-secondary);
  font-size: 15px;
  border-radius: 10px;
  color: #6b7280;
  padding: 8px 0;
  padding-left: 20px;
}

.create-post-input input:focus {
  outline: none;
  box-shadow: none;
  color: var(--color-text);
}

.create-post-input input::placeholder {
  color: #9ca3af;
}

.state-post {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  gap: 12px;
}

/* Tag Button Styles */
.btn-tag {
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
}

.btn-tag:hover {
  background: var(--bg-hover);
  border-color: var(--color-primary);
  cursor: pointer;
}

.btn-tag i {
  font-size: 16px;
}

/* Icon Colors */
.btn-tag .icon-image {
  color: var(--color-text);
  cursor: pointer;
}

.btn-tag .icon-attachment {
  color: #8b5cf6;
}

.btn-tag .icon-live {
  color: #ef4444;
}

.btn-tag .icon-hashtag {
  color: #10b981;
  font-weight: 700;
  font-size: 18px;
}

.btn-tag .icon-mention {
  color: #ec4899;
  font-weight: 700;
  font-size: 16px;
}

.message-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.message-item:hover {
  background-color: var(--color-hover);
  /* transform: translateX(4px); */
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background-color: #10b981;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.page-item-custom {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.page-item-custom:hover {
  background-color: var(--color-hover);
  transform: translateX(4px);
}

.page-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.event-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.event-item:hover {
  background-color: var(--color-hover);
  border-color: var(--color-border);
}

.btn-post-action {
  border: none;
  background: none;
  color: var(--color-muted);
  transition: all 0.2s ease;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
}

.btn-post-action:hover {
  color: var(--color-primary);
  background-color: var(--color-hover);
}

.tab-filter {
  border: none;
  background: none;
  padding: 10px 16px;
  color: var(--color-muted);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.tab-filter:hover {
  background-color: var(--color-hover);
}

.tab-filter.active {
  color: var(--color-primary);
  background-color: var(--color-hover);
  font-weight: 600;
}

.small-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #a8a8a8 0%, #c0c0c0 100%);
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.icon-btn {
  cursor: pointer;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.icon-btn:hover {
  background-color: var(--color-hover);
  transform: scale(1.1);
}

.btn-light-custom {
  background-color: var(--color-secondary);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
  font-weight: 500;
}

.btn-light-custom:hover {
  background-color: var(--color-hover);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.profile-stats {
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
  margin-top: 16px;
}

.text-primary-custom {
  color: var(--color-blue) !important;
}

.link-custom {
  color: var(--color-text);
  background-color: var(--color-hover);
  cursor: pointer;
  border: none;
  font-weight: 600;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  transition: color 0.2s ease;
}

.link-custom:hover {
  color: var(--color-background);
  background-color: var(--color-primary);
}

.divider {
  border-top: 1px solid var(--color-border);
}

/* Facebook-style Scrolling */
.container-wrapper {
  position: relative;
}

.sidebar-left,
.sidebar-right {
  position: fixed;
  top: 88px;

  height: calc(100vh - 88px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 20px;
}

.sidebar-left {
  width: 350px;
  left: 20px;
}

.sidebar-right {
  width: 350px;
  right: 0;

}

@media (max-width: 1399px) {
  .sidebar-left {
    width: calc((100% - 960px) / 2 + 240px);
    padding-left: calc((100% - 960px) / 2);
  }

  .sidebar-right {
    width: calc((100% - 960px) / 2 + 240px);
    padding-right: calc((100% - 960px) / 2);
  }
}

@media (max-width: 1199px) {

  .sidebar-left,
  .sidebar-right {
    position: relative;
    top: 0;
    height: auto;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
}

.sidebar-left,
.sidebar-right {
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.sidebar-left:hover,
.sidebar-right:hover {
  scrollbar-color: rgba(0, 0, 0, 0.35) transparent;
}

.sidebar-left::-webkit-scrollbar,
.sidebar-right::-webkit-scrollbar {
  width: 8px;
}

.sidebar-left::-webkit-scrollbar-track,
.sidebar-right::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-left::-webkit-scrollbar-thumb,
.sidebar-right::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 10px;
  transition: background-color 0.25s ease;
}

.sidebar-left:hover::-webkit-scrollbar-thumb,
.sidebar-right:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.25);
}

.sidebar-left::-webkit-scrollbar-thumb:hover,
.sidebar-right::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

.sidebar-left::-webkit-scrollbar-thumb:active,
.sidebar-right::-webkit-scrollbar-thumb:active {
  background-color: rgba(0, 0, 0, 0.6);
}


.main-feed {
  margin-bottom: 40px;
  margin-top: 110px;
  margin-inline: auto;
}

.sidebar-content {
  padding-right: 12px;
  width: 100%;
}

.invalid-feedback {
  color: #dc2626;
  font-size: 13px;
  font-weight: 500;
  margin-top: 8px;
  display: block;
}

.text-muted {
  color: var(--color-muted);
  font-size: 13px;
}
</style>
