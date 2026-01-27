<template>
  <article class="post-card">
    <!-- Header Section -->
    <header class="post-header">
      <div class="author-info">
        <div class="avatar-wrapper">
          <img class="avatar-image" :src="post.creator.avatar" :alt="post.creator.full_name">
        </div>
        <div class="author-details">
          <h3 class="author-name">{{ post.creator.full_name }}</h3>
          <div class="post-meta">
            <i class="bi bi-globe-americas"></i>
            <time class="post-date">{{ formatDate(post.created_at) }}</time>
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
            <button @click="$emit('pin', post.id)" type="button" class="action-item">
              <i class="bi bi-pin"></i>
              <span>Pin Post</span>
            </button>
          </li>
          <li>
            <button @click="$emit('report', post.id)" type="button" class="action-item action-item--danger">
              <i class="bi bi-flag"></i>
              <span>Report Post</span>
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
    <div class="post-media" v-if="post.image && post.image !== 'http://novia.csm.linkpc.net/storage/posts'">
      <div class="media-container">
        <img class="media-image" :src="post.image" alt="Post image">
      </div>
    </div>

    <!-- Engagement Section -->
    <footer class="post-footer">
      <div class="engagement-actions">
        <button @click="$emit('like', post.id)" class="engagement-btn engagement-btn--like"
          :class="{ 'is-active': isLiked }">
          <i v-if="isLiked" class="bi bi-heart-fill"></i>
          <i v-else class="bi bi-heart"></i>
          <span class="engagement-count">{{ likeCount }}</span>
          <span class="engagement-label">Like</span>
        </button>

        <button class="engagement-btn">
          <i class="bi bi-chat"></i>
          <span class="engagement-count">12</span>
          <span class="engagement-label">Comment</span>
        </button>

        <button class="engagement-btn">
          <i class="bi bi-share"></i>
          <span class="engagement-count">3</span>
          <span class="engagement-label">Share</span>
        </button>
      </div>

      <button class="bookmark-btn" aria-label="Bookmark post">
        <i class="bi bi-bookmark"></i>
      </button>
    </footer>
  </article>
</template>

<script setup>
import moment from 'moment-timezone';

defineProps({
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

defineEmits(['edit', 'delete', 'like', 'get-id', 'pin', 'report', 'hide']);

const formatDate = (date) => {
  return moment.utc(date).local().fromNow();
}
</script>

<style scoped>
/* Post Card Container */
.post-card {
  background: var(--color-accent, #ffffff);
  border: 1px solid var(--color-border, #f0f0f0);
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: 24px;
  margin-bottom: 24px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.5s ease-out;
}

.post-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
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
  margin-bottom: 20px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.avatar-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.avatar-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-details {
  flex: 1;
  min-width: 0;
}

.author-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text, #1a1a1a);
  margin: 0 0 4px 0;
  line-height: 1.4;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-muted, #6b7280);
}

.post-meta i {
  font-size: 12px;
}

.post-date {
  font-weight: 400;
}

/* Post Actions Dropdown */
.post-actions {
  position: relative;
}

.action-trigger {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-trigger:hover {
  background: var(--color-secondary);
  color: var(--color-text);
}

.action-trigger i {
  font-size: 20px;
}

.action-dropdown {
  min-width: 180px;
  background-color: var(--color-accent);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 8px;
}

.action-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
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
  color: var(--color-text);
}

.action-item i {
  font-size: 16px;
}

.action-item--danger {
  color: #dc2626;
}

.action-item--danger:hover {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
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
  word-wrap: break-word;
}

/* Media Section */
.post-media {
  margin-bottom: 20px;
}

.media-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-border, #f0f0f0);
}

.media-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: all 0.2s ease;
}

.media-image:hover {
  transform: scale(1.02);
}

/* Footer / Engagement Section */
.post-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--color-border, #e5e7eb);
}

.engagement-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.engagement-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-muted, #6b7280);
  cursor: pointer;
  transition: all 0.2s ease;
}

.engagement-btn:hover {
  background: var(--color-secondary, rgba(0, 0, 0, 0.05));
  color: var(--color-text, #1a1a1a);
}

.engagement-btn i {
  font-size: 18px;
}

.engagement-btn--like.is-active {
  color: #ef4444;
}

.engagement-btn--like.is-active i {
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

.engagement-count {
  font-weight: 600;
  color: var(--color-text, #1a1a1a);
}

.engagement-label {
  font-weight: 500;
}

.bookmark-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: var(--color-muted, #6b7280);
  cursor: pointer;
  transition: all 0.2s ease;
}

.bookmark-btn:hover {
  background: var(--color-secondary, rgba(0, 0, 0, 0.05));
  color: #2563eb;
}

.bookmark-btn i {
  font-size: 20px;
}

/* Responsive Design */
@media (max-width: 640px) {
  .post-card {
    padding: 20px;
    border-radius: 12px;
  }

  .avatar-wrapper {
    width: 42px;
    height: 42px;
  }

  .author-name {
    font-size: 14px;
  }

  .post-meta {
    font-size: 12px;
  }

  .engagement-actions {
    gap: 4px;
  }

  .engagement-btn {
    padding: 6px 12px;
    font-size: 13px;
  }

  .engagement-label {
    display: none;
  }

  .engagement-btn i {
    font-size: 16px;
  }
}
</style>
