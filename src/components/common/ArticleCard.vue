<template>
  <article class="post-card" :id="`post-${post.id}`">
    <!-- Header Section -->
    <header class="post-header">
      <div class="author-info">
        <div class="avatar-wrapper" @click="handleAvatarClick">
          <img class="avatar-image" :src="post.creator.avatar" :alt="post.creator.full_name">
          <span class="online-status"></span>
        </div>
        <div class="author-details">
          <div class="name-row">
            <h3 class="author-name" @click="handleAvatarClick">{{ post.creator.full_name }}</h3>
            <i class="bi bi-patch-check-fill verified-badge"></i>
          </div>
          <div class="post-meta">
            <time class="post-date">{{ formatDate(post.created_at) }}</time>
            <span class="meta-dot" v-if="post.categories?.length > 0">•</span>
            <div class="category-badge" v-if="post.categories?.length > 0">
              <i class="bi bi-tag-fill me-1"></i>
              {{ post.categories[0].name }}
            </div>
          </div>
        </div>
      </div>

      <div class="post-actions" v-if="post.creator && post.creator.id == currentUserId">
        <button @click="emit('get-id', post.id)" class="action-trigger" type="button" data-bs-toggle="dropdown"
          aria-expanded="false">
          <i class="bi bi-three-dots"></i>
        </button>
        <ul class="action-dropdown dropdown-menu">
          <li>
            <button @click="emit('edit', post.id)" type="button" class="action-item">
              <i class="bi bi-pencil"></i>
              <span>Edit Post</span>
            </button>
          </li>
          <li>
            <button @click="emit('delete', post.id)" type="button" class="action-item action-item--danger">
              <i class="bi bi-trash"></i>
              <span>Delete Post</span>
            </button>
          </li>
          <!-- <li>
            <button @click="$emit('hide', post.id)" type="button" class="action-item action-item--danger">
              <i class="bi bi-eye-slash"></i>
              <span>Hide Post</span>
            </button>
          </li> -->
        </ul>
      </div>
    </header>

    <!-- Content Section -->
    <div class="post-content">
      <p ref="textRef" class="post-text" :class="{ 'is-clamped': !isExpanded }">{{ post.text }}</p>
      <button v-if="shouldShowReadMore" @click="isExpanded = !isExpanded" class="read-more-btn">
        {{ isExpanded ? 'See Less' : 'See More' }}
      </button>
    </div>

    <!-- Image Section -->
    <div class="post-media" v-if="post.image && post.image !== 'https://novia2.csm.linkpc.net/storage/posts'">
      <div class="media-container" @click="showPreview = true">
        <img class="media-image" :src="post.image" alt="Post image" />
        <div class="media-overlay">
          <i class="bi bi-zoom-in"></i>
        </div>
      </div>
    </div>

    <!-- Image Preview Modal -->
    <Teleport to="body">
      <Transition name="scale">
        <div v-if="showPreview" class="image-preview-overlay" @click="showPreview = false">
          <button class="close-preview" @click="showPreview = false">
            <i class="bi bi-x-lg"></i>
          </button>
          <div class="preview-content" @click.stop>
            <img :src="post.image" alt="Preview" class="preview-image" />
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Engagement Stats Row -->
    <div class="engagement-stats ">
      <div class="reactions-display " v-if="likeCount > 0">
        <div class="reaction-icons">
          <span class="reaction-icon bg-danger text-white"><i class="bi bi-heart-fill"></i></span>
        </div>
        <span class="reaction-count">{{ likeCount }} reactions</span>
      </div>
    </div>

    <!-- Footer Actions -->
    <footer class="post-footer">
      <div class="engagement-actions">
        <button @click="emit('like', post.id)" class="action-btn" :class="{ 'is-active': isLiked }">
          <i v-if="isLiked" class="bi bi-heart-fill"></i>
          <i v-else class="bi bi-heart"></i>
          <span class="action-label">Like</span>
        </button>

        <div class="share-wrapper">
          <button class="action-btn" @click.stop="toggleShareMenu">
            <i class="bi bi-share"></i>
            <span class="action-label">Share</span>
          </button>

          <div v-if="isShareOpen" class="share-menu" @click.stop>
            <button class="share-item" type="button" @click="shareNative">
              <i class="bi bi-share-fill"></i>
              <span>Share...</span>
            </button>
            <button class="share-item" type="button" @click="shareTo('telegram')">
              <i class="bi bi-telegram"></i>
              <span>Telegram</span>
            </button>
            <button class="share-item" type="button" @click="shareTo('facebook')">
              <i class="bi bi-facebook"></i>
              <span>Facebook</span>
            </button>
            <button class="share-item" type="button" @click="shareTo('whatsapp')">
              <i class="bi bi-whatsapp"></i>
              <span>WhatsApp</span>
            </button>
            <button class="share-item" type="button" @click="shareTo('x')">
              <i class="bi bi-twitter"></i>
              <span>X (Twitter)</span>
            </button>
            <button class="share-item" type="button" @click="shareTo('linkedin')">
              <i class="bi bi-linkedin"></i>
              <span>LinkedIn</span>
            </button>
            <button class="share-item" type="button" @click="copyShareLink">
              <i class="bi bi-link-45deg"></i>
              <span>Copy Link</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  </article>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router'
import moment from 'moment-timezone'
import { showError, showSuccess } from '@/utils/toast'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  currentUserId: {
    type: Number,
    required: false,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['edit', 'delete', 'like', 'get-id', 'hide'])
const router = useRouter()

const showPreview = ref(false);
const isShareOpen = ref(false);
const isExpanded = ref(false);
const shouldShowReadMore = ref(false);
const textRef = ref(null);

const checkOverflow = async () => {
  await nextTick();
  if (textRef.value) {
    const element = textRef.value;
    shouldShowReadMore.value = element.scrollHeight > element.clientHeight;
  }
};

onMounted(checkOverflow);

watch(() => props.post?.text, checkOverflow);

const formatDate = (date) => {
  if (!date) return ''
  const m = moment.utc(date).local()
  return m.format('hh:mm A')
}

const handleAvatarClick = () => {
  if (props.post.creator.id == props.currentUserId) {
    router.push({ name: 'profile' })
  } else {
    router.push({ name: 'view-profile', params: { id: props.post.creator.id } })
  }
}

const shareUrl = computed(() => {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}${window.location.pathname}#post-${props.post.id}`
})

const shareText = computed(() => {
  const text = props.post.text || ''
  return text.length > 200 ? `${text.slice(0, 200)}…` : text
})

const toggleShareMenu = () => {
  isShareOpen.value = !isShareOpen.value
}

const closeShareMenu = () => {
  isShareOpen.value = false
}

const handleDocumentClick = () => {
  if (isShareOpen.value) closeShareMenu()
}

if (typeof document !== 'undefined') {
  document.addEventListener('click', handleDocumentClick)
}

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleDocumentClick)
  }
})

const shareNative = async () => {
  if (!navigator.share) {
    showError('Sharing is not supported in this browser.')
    return
  }

  try {
    await navigator.share({
      title: props.post.creator?.full_name || 'Post',
      text: shareText.value,
      url: shareUrl.value,
    })
    closeShareMenu()
  } catch(e) {
    console.log(e)
  }
}

const shareTo = (platform) => {
  const url = encodeURIComponent(shareUrl.value)
  const text = encodeURIComponent(shareText.value)
  let shareLink = ''

  switch (platform) {
    case 'telegram':
      shareLink = `https://t.me/share/url?url=${url}&text=${text}`
      break
    case 'facebook':
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      break
    case 'whatsapp':
      shareLink = `https://wa.me/?text=${text}%20${url}`
      break
    case 'x':
      shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
      break
    case 'linkedin':
      shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
      break
    default:
      return
  }

  window.open(shareLink, '_blank', 'noopener,noreferrer')
  closeShareMenu()
}

const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    showSuccess('Link copied to clipboard')
    closeShareMenu()
  } catch {
    showError('Failed to copy link')
  }
}


</script>

<style scoped>
/* Post Card Container */
.post-card {
  background: var(--color-accent);
  border: none !important;
  outline: none !important;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1) !important;
  border-radius: 20px;
  padding: 24px;
  padding-bottom: 2px !important;
  margin-bottom: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.5s ease-out;
}


@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header Section */
.post-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.avatar-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  cursor: pointer;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /* Ensuring full circle */
  object-fit: cover;
}

.online-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background-color: #22c55e;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
}

.author-details {
  flex: 1;
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}

.author-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text, #1a1a1a);
  margin: 0;
  line-height: 1.2;
  cursor: pointer;
}

.verified-badge {
  color: #1d9bf0;
  font-size: 14px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-muted, #6b7280);
}

.meta-dot {
  font-weight: bold;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  background: rgba(var(--color-primary-rgb, 59, 130, 246), 0.1);
  color: var(--color-primary, #3b82f6);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-badge i {
  font-size: 10px;
}

/* Post Actions Dropdown */
.post-actions {
  position: relative;
}

.action-trigger {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 50%;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-trigger:hover {
  background: var(--color-secondary);
  color: var(--color-text);
}

.action-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  min-width: 180px;
  background-color: var(--color-accent);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 6px;
}

.action-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.action-item:hover {
  background: var(--color-secondary);
}

.action-item--danger {
  color: #dc2626;
}

.action-item--danger:hover {
  background: rgba(220, 38, 38, 0.05);
}

/* Content Section */
.post-content {
  margin-bottom: 16px;
}

.post-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  transition: all 0.3s ease;
}

.post-text.is-clamped {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more-btn {
  background: none;
  border: none;
  color: var(--color-primary, #3b82f6);
  font-size: 14px;
  font-weight: 600;
  padding: 4px 0;
  margin-top: 4px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.read-more-btn:hover {
  color: var(--color-primary-dark, #2563eb);
  text-decoration: underline;
}

/* Media Section */
.post-media {
  margin-bottom: 16px;
}

.media-container {
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  border-radius: 20px !important;
  /* background: var(--color-border, #f0f0f0); */
}

.media-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Engagement Stats */
.engagement-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 4px;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(var(--color-border-rgb, 229, 231, 235), 0.5);
  font-size: 13.5px;
  color: var(--color-muted);
}

.reactions-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reaction-icons {
  display: flex;
  align-items: center;
}

.reaction-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-accent);
  margin-right: -8px;
  font-size: 11px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reaction-icons .reaction-icon:first-child {
  z-index: 2;
}

.reaction-count {
  margin-left: 8px;
  color: var(--color-text);
  font-weight: 500;
}

.comment-share-stats {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-left: auto;
  /* Ensures it stays right when reactions are hidden */
}

.comment-share-stats span {
  cursor: pointer;
  transition: color 0.2s ease;
}

.comment-share-stats span:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

/* Footer / Action Buttons */
.post-footer {
  margin-top: 8px;
  margin-bottom: 16px;
  padding-bottom: 0px;
}

.engagement-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 12px;
  border: none;
  background: transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-muted, #6b7280);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  flex: 1;
  justify-content: center;
}

.action-btn:hover {
  background: rgba(var(--color-primary-rgb, 59, 130, 246), 0.08);
  color: var(--color-primary, #3b82f6);
  transform: translateY(-1px);
}

.action-label {
  font-weight: 600;
}

.action-btn:hover {
  background: var(--color-secondary, rgba(0, 0, 0, 0.05));
  color: var(--color-text);
}

.action-btn i {
  font-size: 20px;
}

.share-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
}

.share-menu {
  position: absolute;
  bottom: 48px;
  right: 0;
  background: var(--color-accent);
  border: 1px solid var(--color-border);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  padding: 10px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 5;
}

.share-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 0;
  background: transparent;
  color: var(--color-text);
  font-weight: 600;
  padding: 8px 10px;
  border-radius: 10px;
  transition: background 0.2s ease;
}

.share-item:hover {
  background: var(--color-secondary);
}

.share-item i {
  font-size: 1.1rem;
}

.action-btn.is-active {
  color: #ef4444;
}

.action-btn.is-active i {
  animation: heartBeat 0.4s ease-in-out;
}

@keyframes heartBeat {

  0%,
  100% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.2);
  }

  50% {
    transform: scale(1.1);
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .post-card {
    padding: 16px;
    border-radius: 12px;
  }

  .avatar-wrapper {
    width: 40px;
    height: 40px;
  }

  .author-name {
    font-size: 15px;
  }

  .engagement-stats {
    font-size: 13px;
  }

  .action-btn {
    padding: 8px 4px;
    font-size: 13px;
    gap: 4px;
  }

  .action-label {
    display: none;
  }

  .action-btn i {
    font-size: 20px;
  }
}

/* Image Preview Styles */
.media-container {
  cursor: pointer;
  position: relative;
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 2rem;
}

.media-container:hover .media-overlay {
  opacity: 1;
}

.image-preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: zoom-out;
}

.preview-content {
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
  cursor: default;
}

.preview-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.close-preview {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  z-index: 10001;
}

.close-preview:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

/* Transitions */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Highlight Targeted Post */
.post-card.highlight-post {
  animation: highlight-pulse 2s ease-out;
  border-color: var(--color-primary) !important;
}

@keyframes highlight-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.4);
    transform: scale(1.02);
  }

  70% {
    box-shadow: 0 0 0 15px rgba(var(--color-primary-rgb), 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0);
    transform: scale(1);
  }
}
</style>
