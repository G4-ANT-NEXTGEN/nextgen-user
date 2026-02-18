<template>
  <div class="overview-container">
    <div class="section-title-wrapper mb-4">
      <h2 class="section-title">Recent Activity</h2>
      <p class="section-subtitle">Catch up on the latest updates and publications</p>
    </div>

    <!-- Category Filter -->
    <div class="category-filter-section mb-4">
      <div class="pill-container">
        <div :class="['category', { active: postStore.category === 0 }]" @click="updateCategory(0)">
          All Posts
        </div>
        <div v-for="category in categoryStore.categories" :key="category.id"
          :class="['category', { active: postStore.category == category.id }]" @click="updateCategory(category.id)">
          {{ category.name }}
        </div>
      </div>
    </div>

    <!-- Post Skeleton -->
    <template v-if="postStore.loading && postStore.posts.length === 0">
      <ArticleCardSkeleton v-for="n in 3" :key="n" />
    </template>

    <!-- No Data State -->
    <NoData v-if="!postStore.loading && visiblePosts.length === 0" />

    <!-- ArticleCard list (only user's own posts) -->
    <ArticleCard v-for="post in visiblePosts" :key="post.id" :post="post" :currentUserId="authStore.user?.id"
      :isLiked="likedSet.has(post.id)" :likeCount="post.likes_count ?? 0" @get-id="activePostId = $event"
      @like="toggleLike" @edit="openEditModal" @delete="openDeleteModal" @hide="hidePost" />

    <!-- Edit/Create Modal -->
    <BaseModal v-if="showModal" :title="PostId ? 'Edit Post' : 'Create Post'" size="lg" @close="closeModal">
      <div class="p-2">
        <div class="d-flex align-items-center gap-3 mb-4">
          <div class="avatar-post overflow-hidden rounded-circle">
            <img class="img-fluid w-100 h-100" :src="authStore.user.avatar" alt="" />
          </div>
          <div>
            <h5 class="creator-name">
              {{ authStore.user.full_name }}
              <i class="bi bi-check-circle-fill text-primary-custom"></i>
            </h5>
            <small class="creator-position">{{ authStore.user.positions?.[0]?.name }}</small>
          </div>
        </div>
        <div class="my-3">
          <textarea v-model="titlePost" class="title-post form-control" :class="{ 'is-invalid': errorTitle }" rows="4"
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
        </div>
      </div>
      <div class="w-100 category-selection d-flex justify-content-between align-items-center mb-3 px-2">
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
        <img class="img-fluid" :src="imgPost" alt="" />
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

    <!-- Delete Modal -->
    <BaseModal v-if="showModalDelete" title="Delete Post" size="md" @close="showModalDelete = false">
      <div class="p-2">
        <p>Are you sure you want to delete this post?</p>
      </div>
      <template #footer>
        <div class="group-btn-modal d-flex justify-content-end gap-3 align-items-center">
          <BaseButton variant="primary" @click="deletePost" :disabled="isLoading" :isLoading="isLoading">Delete
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profile'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import { useCategoryStore } from '@/stores/category'
import { useRequiredValidator } from '@/composables/useRequiredValidator'
import ArticleCardSkeleton from '@/components/common/ArticleCardSkeleton.vue'
import ArticleCard from '@/components/common/ArticleCard.vue'
import NoData from '@/components/common/NoData.vue'
import BaseButton from '@/components/ui/base/BaseButton.vue'
import BaseModal from '@/components/ui/base/BaseModal.vue'
import { showError } from '@/utils/toast'

const profileStore = useProfileStore()
const authStore = useAuthStore()
const postStore = usePostStore()
const categoryStore = useCategoryStore()
const { errors: validationErrors, validateField } = useRequiredValidator()

const route = useRoute()
const routeUserId = computed(() => {
  const raw = route.params.id ?? null
  const n = raw ? Number(raw) : null
  return Number.isInteger(n) ? n : null
})

const hiddenPosts = ref(new Set())

const posts = computed(() => {
  const targetId = routeUserId.value ?? authStore.user?.id ?? profileStore.viewUser?.id
  if (!targetId) return []
  return postStore.posts.filter((p) => p?.creator?.id === targetId)
})

const visiblePosts = computed(() => {
  let filtered = posts.value.filter((p) => !hiddenPosts.value.has(p.id))
  const categoryId = postStore.category
  if (categoryId !== 0) {
    filtered = filtered.filter((p) => {
      if (Array.isArray(p.category_ids) && p.category_ids.includes(categoryId)) return true
      if (Array.isArray(p.categories) && p.categories.some(cat => (typeof cat === 'object' ? cat.id : cat) == categoryId)) return true
      return false
    })
  }
  return filtered
})

const updateCategory = async (categoryId) => {
  postStore.category = categoryId
  await postStore.fetchPosts()
}

authStore.fetchProfile()
postStore.fetchPosts()
categoryStore.fetchCategorys()

const activePostId = ref(null)
const PostId = ref(null)
const showModal = ref(false)
const showModalDelete = ref(false)
const isLoading = ref(false)

const titlePost = ref('')
const selected = ref(null)
const file = ref(null)
const attachment = ref(null)
const imgPost = ref(null)
const errorTitle = ref(null)

const fileInput = ref(null)
const attachmentInput = ref(null)

const likedSet = ref(new Set())

const toggleLike = (postId) => {
  if (likedSet.value.has(postId)) {
    likedSet.value.delete(postId)
  } else {
    likedSet.value.add(postId)
  }
}

const openEditModal = async (postId) => {
  try {
    PostId.value = postId
    await postStore.fetchPostsById(PostId.value)
    const post = postStore.post
    if (!post) return

    titlePost.value = post.text || ''
    const isDefaultPath = post.image === 'https://novia2.csm.linkpc.net/storage/posts'
    file.value = isDefaultPath ? null : post.image || null
    imgPost.value = isDefaultPath ? null : post.image || null
    attachment.value = null

    if (post.category_ids && post.category_ids.length > 0) {
      const categoryId = post.category_ids[0]
      selected.value = categoryStore.categories.find((cat) => cat.id == categoryId) || null
    } else {
      selected.value = null
    }
    errorTitle.value = null
    showModal.value = true
  } catch (e) {
    console.error(e)
  }
}

const openDeleteModal = (postId) => {
  PostId.value = postId
  showModalDelete.value = true
}

const deletePost = async () => {
  if (!PostId.value) return
  isLoading.value = true
  try {
    await postStore.deletePost(PostId.value)
    showModalDelete.value = false
    PostId.value = null
  } catch (error) {
    console.error('Error deleting post:', error)
  } finally {
    isLoading.value = false
  }
}

const hidePost = (postId) => {
  hiddenPosts.value.add(postId)
}

const openFilePicker = () => {
  if (fileInput.value) fileInput.value.click()
}
const openAttachmentPicker = () => {
  if (attachmentInput.value) attachmentInput.value.click()
}

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0]
  if (!selectedFile) return

  const maxSize = 3072 * 1024;
  if (selectedFile.size > maxSize) {
    showError('File size exceeds 3072 KB. Please upload a smaller image.')
    event.target.value = ''
    return
  }

  file.value = selectedFile
  imgPost.value = URL.createObjectURL(file.value)
}

const handleAttachmentChange = (event) => {
  const selectedFile = event.target.files[0]
  if (!selectedFile) return

  const maxSize = 3072 * 1024;
  if (selectedFile.size > maxSize) {
    showError('Attachment size exceeds 3072 KB. Please upload a smaller file.')
    event.target.value = ''
    return
  }

  attachment.value = selectedFile
}

const removeImage = () => {
  imgPost.value = null
  file.value = null
  if (fileInput.value) fileInput.value.value = ''
}

function validateTitle() {
  const maxLength = 500
  if (titlePost.value.length > maxLength) {
    titlePost.value = titlePost.value.substring(0, maxLength)
  }

  if (titlePost.value.trim()) {
    errorTitle.value = null
    validationErrors.title = ''
  } else {
    errorTitle.value = 'Post content is required'
    validationErrors.title = 'Post content is required'
  }
}

function selectPill(category) {
  if (selected.value?.id == category.id) {
    selected.value = null
  } else {
    selected.value = category
  }
}

const prepareFormData = () => {
  const data = new FormData()
  if (titlePost.value.trim()) data.append('text', titlePost.value.trim())
  if (file.value && file.value instanceof File) data.append('image', file.value)
  if (attachment.value && attachment.value instanceof File)
    data.append('attachment', attachment.value)
  const categoryIds = selected.value ? [selected.value.id] : []
  data.append('category_ids', JSON.stringify(categoryIds))
  return data
}

const publishPost = async () => {
  isLoading.value = true
  try {
    if (!validateField('title', titlePost.value.trim(), 'Post content is required')) {
      errorTitle.value = validationErrors.title
      return
    }
    const data = prepareFormData()
    if (PostId.value) {
      await postStore.updatePost(PostId.value, data)
    } else {
      await postStore.createPost(data)
    }
    closeModal()
    await postStore.fetchPosts()
  } catch (error) {
    console.error('Error publishing post:', error)
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  PostId.value = null
  titlePost.value = ''
  file.value = null
  imgPost.value = null
  attachment.value = null
  selected.value = null
  errorTitle.value = null
}
</script>

<style scoped>
.overview-container {
  padding-bottom: 2rem;
}

.section-title-wrapper {
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 4px;
}

.section-subtitle {
  font-size: 0.95rem;
  color: var(--color-muted);
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  background: var(--color-accent);
  border-radius: 16px;
  border: 2px dashed var(--color-border);
}

.empty-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border-radius: 50%;
  margin-bottom: 16px;
}

.empty-icon i {
  font-size: 28px;
  color: var(--color-muted);
}

.empty-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 6px;
}

.empty-desc {
  font-size: 14px;
  color: var(--color-muted);
  margin: 0;
  text-align: center;
  max-width: 280px;
}

.avatar-post {
  width: 45px;
  height: 45px;
}

.creator-name {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.creator-position {
  font-size: 0.8rem;
  color: var(--color-muted);
}

.pill-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.category {
  padding: 0.5rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category:hover {
  background: var(--color-accent);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
}

.category.active {
  background: var(--color-primary);
  color: var(--color-secondary);
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}

.icon-post {
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--color-muted);
}

.icon-post:hover {
  color: var(--color-primary);
}

.post-img {
  margin-top: 1rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.btn-remove-img {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
}
</style>
