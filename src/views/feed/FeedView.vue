<template>
  <div class="feed-view">
    <!-- Main Feed -->
    <div class="main-feed">
      <!-- Create Post -->
      <div class="post-card mb-4 create-post">
        <div class="d-flex gap-4 mb-4 align-items-center ">
          <div>
            <div class="small-avatar overflow-hidden rounded-circle">
              <img class="img-fluid w-100 h-100 " :src="authStore.user.avatar" alt="">
            </div>
          </div>
          <div class="create-post-input" @click="openCreatePostModal">
            <input type="text" placeholder="what on your mind?" class="form-control">
          </div>
        </div>
        <div class="d-flex flex-wrap justify-content-evenly state-post mb-2">
          <div class="btn-tag" @click="openCreatePostModal">
            <i class="bi bi-image icon-image"></i>
            <span>Image</span>
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

      <!-- Post Skeleton -->
      <template v-if="postStore.loading && postStore.posts.length === 0">
        <ArticleCardSkeleton v-for="n in 3" :key="n" />
      </template>

      <!-- No Data State -->
      <NoData v-if="!postStore.loading && visiblePosts.length === 0" />

      <!-- Post -->
      <ArticleCard v-for="post in visiblePosts" :key="post.id" :post="post" :currentUserId="authStore.user?.id"
        :isLiked="isLiked(post.id)" :likeCount="getLikeCount(post.id)" @get-id="GetpostId" @edit="OpenModeledit"
        @delete="OpenModeldelete" @like="reactLike" @hide="hidePost" />
    </div>

    <!-- Modals -->
    <BaseModal v-if="showModal" :title="PostId ? 'Edit Post' : 'Create Post'" size="lg" @close="closeModal">
      <div class="p-2">
        <!-- BODY -->
        <div class=" d-flex align-items-center gap-3 mb-4">
          <div class="avatar-post overflow-hidden rounded-circle">
            <img class="img-fluid w-100 h-100" :src="authStore.user.avatar" alt="">
          </div>
          <div>
            <h5 class="creator-name">
              {{ authStore.user.full_name }}
              <i class="bi bi-check-circle-fill text-primary-custom"></i>
            </h5>
            <small class="creator-position">
              {{ authStore.user.positions?.[0]?.name }}
            </small>
          </div>
        </div>
        <div class="my-3">
          <textarea v-model="titlePost" class="title-post form-control" :class="{ 'is-invalid': errorTitle }" rows="4"
            placeholder="What's on your mind?" @input="validateTitle"></textarea>
          <div v-if="errorTitle" class="invalid-feedback d-block">{{ errorTitle }}</div>
          <small v-if="titlePost" class="text-muted d-block mt-2">{{ titlePost.length }}/500
            characters</small>
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
          <BaseButton variant="primary" @click="publishPost" :disabled="isLoading" :isLoading="isLoading">
            {{ PostId ? 'Update' : 'Publish' }}
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
          <BaseButton variant="primary" @click="deletePost" :disabled="isLoading" :isLoading="isLoading">
            Delete
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { usePostStore } from '@/stores/post';
import { useCategoryStore } from '@/stores/category';
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import ArticleCard from '@/components/common/ArticleCard.vue';
import ArticleCardSkeleton from '@/components/common/ArticleCardSkeleton.vue';
import NoData from '@/components/common/NoData.vue';

const authStore = useAuthStore();
const categoryStore = useCategoryStore();
const postStore = usePostStore();
const { errors: validationErrors, validateField } = useRequiredValidator();

const isLoading = ref(false);
const likedPosts = ref(new Set());
const postLikeCounts = ref({});
const showModal = ref(false);
const titlePost = ref('');
const selected = ref(null);
const file = ref(null);
const attachment = ref(null);
const imgPost = ref(null);
const errorTitle = ref(null);
const PostId = ref(null);
const showModalDelete = ref(false);
const hiddenPosts = ref(new Set());

const fileInput = ref(null);
const attachmentInput = ref(null);

const hidePost = (postId) => {
  hiddenPosts.value.add(postId);
};

const visiblePosts = computed(() => {
  return postStore.posts.filter(post => !hiddenPosts.value.has(post.id));
});


authStore.fetchProfile();
postStore.fetchPosts();
categoryStore.fetchCategorys();

const GetpostId = (id) => {
  PostId.value = id;
};

const OpenModeldelete = () => {
  showModalDelete.value = true;
};

const deletePost = async () => {
  if (!PostId.value) return;
  isLoading.value = true;
  try {
    await postStore.deletePost(PostId.value);
    showModalDelete.value = false;
    PostId.value = null;
  } catch (error) {
    console.error('Error deleting post:', error);
  } finally {
    isLoading.value = false;
  }
};

const OpenModeledit = async () => {
  try {
    await postStore.fetchPostsById(PostId.value);
    const post = postStore.post;
    if (!post) return;

    titlePost.value = post.text || '';
    const isDefaultPath = post.image === 'http://novia2.csm.linkpc.net/storage/posts';
    file.value = isDefaultPath ? null : (post.image || null);
    imgPost.value = isDefaultPath ? null : (post.image || null);
    attachment.value = null;

    if (post.category_ids && post.category_ids.length > 0) {
      const categoryId = post.category_ids[0];
      selected.value = categoryStore.categories.find(cat => cat.id == categoryId) || null;
    } else {
      selected.value = null;
    }
    errorTitle.value = null;
    showModal.value = true; // Open modal directly without resetting PostId
  } catch (error) {
    console.error('Error loading post for edit:', error);
  }
};

const openFilePicker = () => {
  fileInput.value.click();
};

const openAttachmentPicker = () => {
  attachmentInput.value.click();
};

const handleFileChange = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    imgPost.value = URL.createObjectURL(file.value);
  }
};

const handleAttachmentChange = (event) => {
  attachment.value = event.target.files[0];
};

const openCreatePostModal = () => {
  PostId.value = null; // Reset PostId when creating new post
  titlePost.value = '';
  file.value = null;
  imgPost.value = null;
  attachment.value = null;
  selected.value = null;
  errorTitle.value = null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  PostId.value = null; // Reset PostId when closing modal
  titlePost.value = '';
  file.value = null;
  imgPost.value = null;
  attachment.value = null;
  selected.value = null;
  errorTitle.value = null;
};

const removeImage = () => {
  imgPost.value = null;
  file.value = null;
  if (fileInput.value) fileInput.value.value = '';
};

function validateTitle() {
  const maxLength = 500;
  if (titlePost.value.length > maxLength) {
    titlePost.value = titlePost.value.substring(0, maxLength);
  }

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

const prepareFormData = () => {
  const data = new FormData();
  if (titlePost.value.trim()) data.append('text', titlePost.value.trim());
  if (file.value && file.value instanceof File) data.append('image', file.value);
  if (attachment.value && attachment.value instanceof File) data.append('attachment', attachment.value);
  const categoryIds = selected.value ? [selected.value.id] : [];
  data.append('category_ids', JSON.stringify(categoryIds));
  return data;
};

function reactLike(postId) {
  if (postLikeCounts.value[postId] === undefined) {
    // Initialize from post data if available, otherwise default to 0
    const post = postStore.posts.find(p => p.id === postId);
    postLikeCounts.value[postId] = post?.likes_count || 0;
  }

  if (likedPosts.value.has(postId)) {
    likedPosts.value.delete(postId);
    postLikeCounts.value[postId] = Math.max(0, postLikeCounts.value[postId] - 1);
  } else {
    likedPosts.value.add(postId);
    postLikeCounts.value[postId]++;
  }
}

function isLiked(postId) {
  return likedPosts.value.has(postId);
}

function getLikeCount(postId) {
  if (postLikeCounts.value[postId] !== undefined) {
    return postLikeCounts.value[postId];
  }
  const post = postStore.posts.find(p => p.id === postId);
  return post?.likes_count || 0;
}

const publishPost = async () => {
  isLoading.value = true;
  try {
    if (!validateField('title', titlePost.value.trim(), 'Post content is required')) {
      errorTitle.value = validationErrors.title;
      return;
    }
    const data = prepareFormData();

    if (PostId.value) {
      // Update existing post
      await postStore.updatePost(PostId.value, data);
    } else {
      // Create new post
      await postStore.createPost(data);
    }

    closeModal();
    await postStore.fetchPosts();
  } catch (error) {
    console.error('Error publishing post:', error);
  } finally {
    isLoading.value = false;
  }
};

defineOptions({
  name: 'FeedView'
});
</script>

<style scoped>
.pill-container {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.category {
  padding: 8px 18px;
  border-radius: 50px;
  background-color: var(--bg-tag);
  color: var(--color-text);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  border: 1px solid var(--color-border);
}

.category:hover {
  background-color: var(--color-secondary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.category.active {
  background-color: var(--sidebar-bg);
  color: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
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
  background-color: rgba(0, 0, 0, 0.7);
}

.main-feed {
  padding-bottom: 20px;
}

.post-card {
  background: var(--color-accent);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1) !important;
}

.avatar-post {
  background-color: var(--sidebar-bg);
  width: 56px;
  height: 56px;
  border-radius: 50%;
}

.main-feed .post-card .small-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.create-post-input {
  flex: 1;
  width: 100%;
}

.create-post-input input {
  background-color: var(--nav-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 12px;
  padding: 12px 20px;
  width: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
}

.create-post-input input:hover {
  background-color: var(--color-secondary);
  border-color: var(--color-primary);
}

.create-post-input input::placeholder {
  color: var(--color-muted);
}

.btn-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--color-text);
  font-weight: 600;
}

.btn-tag:hover {
  background-color: var(--color-secondary);
  color: var(--color-primary);
  transform: translateY(-2px);
}

.icon-image {
  padding-top: 5px;
  color: #10b981;
}

.icon-attachment {
  padding-top: 5px;
  color: #3b82f6;
}

.icon-live {
  padding-top: 5px;
  color: #ef4444;
}

.icon-hashtag {
  padding-top: 5px;
  color: #f59e0b;
  font-weight: bold;
}

.icon-mention {
  padding-top: 5px;
  color: #8b5cf6;
  font-weight: bold;
}

.title-post {
  width: 100%;
  border-radius: 12px;
  padding: 12px 16px;
  background: transparent;
  border: 1px solid var(--color-border);
  font-size: 1.1rem;
  color: var(--color-text);
  resize: none;
}

.title-post:focus {
  outline: none;
  border-color: var(--color-border) !important;
}

.creator-name {
  margin-bottom: 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
}

.creator-position {
  color: var(--color-muted);
  font-size: 0.85rem;
}

.text-category {
  font-size: 0.95rem;
  color: var(--color-text);
  margin: 0;
}

.category-selection {
  margin-top: 1.5rem;
}

.title-post::placeholder {
  color: var(--color-muted);
  opacity: 0.6;
}

.icon-post {
  font-size: 1.25rem;
  color: var(--color-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-post:hover {
  color: var(--color-primary);
}

.text-primary-custom {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .post-card {
    padding: 16px;
  }

  .small-avatar {
    width: 40px;
    height: 40px;
  }

  .btn-tag {
    padding: 8px 12px;
    font-size: 0.85rem;
  }

  .btn-tag span {
    display: none;
    /* Optional: hide text on very small screens to keep icons only */
  }
}

@media (max-width: 576px) {
  .btn-tag {
    padding: 8px;
  }

  .state-post {
    justify-content: space-between !important;
  }
}
</style>
