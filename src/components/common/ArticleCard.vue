<template>
  <article class="post-card">
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
            <span class="meta-dot">•</span>
            <span class="meta-scope">Public</span>
          </div>
        </div>
      </div>

      <div class="post-actions" v-if="post.creator.id == currentUserId">
        <button @click="$emit('get-id', post.id)" class="action-trigger" type="button" data-bs-toggle="dropdown"
          aria-expanded="false">
          <i class="bi bi-three-dots"></i>
        </button>
        <ul class="action-dropdown dropdown-menu">
          <li>
            <button @click="$emit('edit', post.id)" type="button" class="action-item">
              <i class="bi bi-pencil"></i>
              <span>Edit Post</span>
            </button>
          </li>
          <li>
            <button @click="$emit('delete', post.id)" type="button" class="action-item action-item--danger">
              <i class="bi bi-trash"></i>
              <span>Delete Post</span>
            </button>
          </li>
          <li>
            <button @click="$emit('hide', post.id)" type="button" class="action-item action-item--danger">
              <i class="bi bi-eye-slash"></i>
              <span>Hide Post</span>
            </button>
          </li>
        </ul>
      </div>
    </header>

    <!-- Content Section -->
    <div class="post-content">
      <p class="post-text">{{ post.text }}</p>
    </div>

    <!-- Image Section -->
    <div class="post-media" v-if="post.image && post.image !== 'http://novia2.csm.linkpc.net/storage/posts'">
      <div class="media-container">
        <img class="media-image" :src="post.image" alt="Post image">
      </div>
    </div>

    <!-- Engagement Stats Row -->
    <div class="engagement-stats">
      <div class="reactions-display">
        <div class="reaction-icons">
          <span class="reaction-icon bg-danger text-white"><i class="bi bi-heart-fill"></i></span>
          <span class="reaction-icon bg-primary text-white"><i class="bi bi-hand-thumbs-up-fill"></i></span>
        </div>
        <span class="reaction-count">{{ likeCount }} reactions</span>
      </div>
      <div class="comment-share-stats">
        <span>32 comments</span>
        <span>18 shares</span>
      </div>
    </div>

    <!-- Footer Actions -->
    <footer class="post-footer">
      <button @click="$emit('like', post.id)" class="action-btn" :class="{ 'is-active': isLiked }">
        <i v-if="isLiked" class="bi bi-heart-fill"></i>
        <i v-else class="bi bi-heart"></i>
        <span>Like</span>
      </button>

      <button class="action-btn">
        <i class="bi bi-chat"></i>
        <span>Comment</span>
      </button>

      <button class="action-btn">
        <i class="bi bi-share"></i>
        <span>Share</span>
      </button>

      <button class="action-btn bookmark-btn">
        <i class="bi bi-bookmark"></i>
        <span>Save</span>
      </button>
    </footer>
  </article>
</template>

<script setup>
import router from '@/router';
import moment from 'moment-timezone';

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  currentUserId: {
    type: Number,
    required: false
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  likeCount: {
    type: Number,
    default: 0
  }
});

defineEmits(['edit', 'delete', 'like', 'get-id', 'hide']);

const formatDate = (date) => {
  return moment.utc(date).local().fromNow();
}

const handleAvatarClick = () => {
  // alert(props.post.creator.id)
  router.push({ name: 'profileuser', params: { id: props.post.creator.id } });
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
}

/* Media Section */
.post-media {
  margin-bottom: 16px;
}

.media-container {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-border, #f0f0f0);
}

.media-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Engagement Stats */
.engagement-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
  font-size: 14px;
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
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-accent);
  margin-right: -6px;
  font-size: 10px;
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
}

/* Footer / Action Buttons */
.post-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-muted, #6b7280);
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  justify-content: center;
}

.action-btn:hover {
  background: var(--color-secondary, rgba(0, 0, 0, 0.05));
  color: var(--color-text);
}

.action-btn i {
  font-size: 20px;
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
    padding: 8px;
    font-size: 14px;
    gap: 6px;
  }

  .action-btn i {
    font-size: 18px;
  }
}
</style>
