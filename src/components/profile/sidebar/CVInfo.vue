
<template>
  <div class="cv-page-container">
    <!-- CV Card -->
    <div v-if="currentCvData" class="modern-cv-card">
      <!-- Header Section -->
      <div class="cv-card-header">
        <div class="header-content">
          <div class="document-badge">
            <div class="badge-icon">
              <i class="bi bi-file-earmark-text"></i>
            </div>
            <div class="badge-info">
              <span class="badge-label">Professional Document</span>
              <h2 class="document-title">CV / Resume</h2>
            </div>
          </div>

          <div class="header-actions">
            <button class="action-btn secondary" @click="UpdateCV" v-if="isOwnProfile">
              <i class="bi bi-pencil"></i>
              <span>Update</span>
            </button>
            <button class="action-btn primary" @click="showModal = true">
              <i class="bi bi-eye"></i>
              <span>View Full</span>
            </button>
          </div>
        </div>
      </div>

      <!-- PDF Preview Section -->
      <div class="pdf-preview-section">
        <div class="preview-container">
          <!-- Decorative Elements -->
          <div class="deco-grid"></div>
          <div class="deco-gradient"></div>

          <!-- PDF Preview Card -->
          <div class="pdf-preview-card">
            <div class="pdf-icon-bg">
              <i class="bi bi-file-earmark-pdf"></i>
            </div>
            <div class="pdf-thumbnail">
              <img :src="currentCvData.image" alt="CV Preview" />
              <div class="thumbnail-overlay">
                <button @click="showModal = true" class="quick-view-btn">
                  <i class="bi bi-arrows-fullscreen"></i>
                  <span>Quick View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Section -->
      <div class="cv-info-section">
        <div class="info-grid">
          <div class="info-item">
            <div class="info-icon">
              <i class="bi bi-file-text"></i>
            </div>
            <div class="info-content">
              <span class="info-label">File Name</span>
              <span class="info-value">{{ currentCvData.name }}</span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <i class="bi bi-calendar-check"></i>
            </div>
            <div class="info-content">
              <span class="info-label">Last Updated</span>
              <span class="info-value">{{ currentCvData.updated_at }}</span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <i class="bi bi-file-earmark-pdf"></i>
            </div>
            <div class="info-content">
              <span class="info-label">Format</span>
              <span class="info-value">PDF Document</span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="info-content">
              <span class="info-label">Status</span>
              <span class="info-value status-active">
                <span class="status-dot"></span>
                Active
              </span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-download">
            <i class="bi bi-download"></i>
            <span>Download CV</span>
          </button>
          <button class="btn-share">
            <i class="bi bi-share"></i>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>

    <!-- No CV State -->
    <div v-else class="no-cv-state">
      <div class="empty-illustration">
        <div class="illustration-bg">
          <i class="bi bi-file-earmark-x"></i>
        </div>
      </div>
      <h3>No CV Available</h3>
      <p v-if="isOwnProfile">Upload your CV to showcase your professional experience</p>
      <p v-else>This user hasn't uploaded their CV yet</p>
      <BaseButton v-if="isOwnProfile" variant="primary" class="d-flex align-item-center gap-2" @click="UpdateCV">
        <i class="bi bi-cloud-upload"></i>
        <span>Upload CV</span>
      </BaseButton>
    </div>

    <!-- Full Screen PDF Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="pdf-modal-overlay" @click.self="showModal = false">
          <div class="pdf-modal-content">
            <!-- Modal Header -->
            <div class="modal-header-bar">
              <div class="modal-title-section">
                <i class="bi bi-file-earmark-pdf"></i>
                <div class="title-text">
                  <h3>{{ currentCvData?.name }}</h3>
                  <span>PDF Document</span>
                </div>
              </div>
              <div class="modal-header-actions">
                <button class="modal-action-btn" title="Download">
                  <i class="bi bi-download"></i>
                </button>
                <button class="modal-action-btn" title="Print">
                  <i class="bi bi-printer"></i>
                </button>
                <button class="modal-close-btn" @click="showModal = false" title="Close">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <!-- PDF Viewer -->
            <div class="modal-pdf-viewer">
              <iframe v-if="currentCvData?.file" :src="currentCvData.file + '#toolbar=0&navpanes=0&scrollbar=0'"
                class="pdf-iframe" frameborder="0"></iframe>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useProfileStore } from '@/stores/profile'
import BaseButton from '@/components/ui/base/BaseButton.vue'

const profileStore = useProfileStore()
const showModal = ref(false)

watch(showModal, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const isOwnProfile = computed(() => {
  return profileStore.viewUser === null
})

const getCleanName = (url) => {
  if (!url) return 'My_Resume.pdf'
  const filename = url.split('/').pop()
  return filename && filename.length < 30 ? filename : 'Professional_CV.pdf'
}

// Single computed property that returns current CV data (own or viewing)
const currentCvData = computed(() => {
  const cv = isOwnProfile.value ? profileStore.user?.cv : profileStore.viewUser?.cv
  if (!cv) return null

  if (typeof cv === 'string') {
    return {
      file: cv,
      image: 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
      name: getCleanName(cv),
      updated_at: 'Recently Updated',
    }
  }

  return {
    file: cv.file_url || '#',
    image: cv.image_url || 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
    name: cv.name || getCleanName(cv.file_url),
    updated_at: cv.updated_at || 'Recently Updated',
  }
})

const UpdateCV = () => {
  console.log('Update CV triggered')
}

onMounted(async () => {
  if (!profileStore.user) {
    try {
      await profileStore.fetchProfile()
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }
})
</script>

<style scoped>
.cv-page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

/* ====================================
   MODERN CV CARD
   ==================================== */
.modern-cv-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-cv-card:hover {
  box-shadow: var(--shadow-lg);
}

/* ====================================
   HEADER SECTION
   ==================================== */
.cv-card-header {
  padding: 20px 24px;
  background: var(--color-accent);
  border-bottom: 1px solid var(--color-border);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.document-badge {
  display: flex;
  align-items: center;
  gap: 12px;
}

.badge-icon {
  width: 40px;
  height: 40px;
  background: var(--color-hover);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  font-size: 20px;
  transition: all 0.3s ease;
}

.modern-cv-card:hover .badge-icon {
  transform: rotate(-5deg) scale(1.05);
}

.badge-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.badge-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-muted);
}

.document-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.02em;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  white-space: nowrap;
}

.action-btn.primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
  box-shadow: var(--shadow-sm);
}

.action-btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.action-btn.secondary {
  background: var(--color-hover);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.action-btn.secondary:hover {
  background: var(--color-border);
}

.action-btn i {
  font-size: 14px;
}

/* ====================================
   PDF PREVIEW SECTION
   ==================================== */
.pdf-preview-section {
  padding: 40px 24px;
  position: relative;
  background: var(--color-accent);
}

.preview-container {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.deco-grid {
  position: absolute;
  inset: -30px;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  pointer-events: none;
}

.deco-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, var(--color-hover) 0%, transparent 70%);
  opacity: 0.5;
  pointer-events: none;
}

.pdf-preview-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.pdf-preview-card:hover {
  box-shadow: var(--shadow-md);
}

[data-theme="dark"] .pdf-preview-card {
  box-shadow: var(--shadow-sm);
}

[data-theme="dark"] .pdf-preview-card:hover {
  box-shadow: var(--shadow-md);
}

.pdf-icon-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  color: var(--color-hover);
  opacity: 0.15;
  transition: all 0.5s ease;
}

.pdf-preview-card:hover .pdf-icon-bg {
  transform: translate(-50%, -50%) scale(1.1) rotate(-5deg);
  opacity: 0.25;
}

.pdf-thumbnail {
  position: relative;
  aspect-ratio: 1 / 1.414;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-accent);
  z-index: 1;
}

.pdf-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.pdf-preview-card:hover .pdf-thumbnail img {
  transform: scale(1.05);
}

.thumbnail-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.pdf-thumbnail:hover .thumbnail-overlay {
  opacity: 1;
}

.quick-view-btn {
  background: var(--color-surface);
  color: var(--color-text);
  padding: 10px 18px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(8px);
}

.quick-view-btn:hover {
  background: var(--color-primary);
  color: var(--color-on-primary);
  transform: translateY(0) scale(1.05);
}

.quick-view-btn i {
  font-size: 14px;
}

/* ====================================
   INFO SECTION
   ==================================== */
.cv-info-section {
  padding: 24px;
  background: var(--color-surface);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: var(--color-accent);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: var(--color-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.info-icon {
  width: 36px;
  height: 36px;
  background: var(--color-hover);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  font-size: 16px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.info-item:hover .info-icon {
  background: var(--color-primary);
  color: var(--color-on-primary);
  transform: rotate(-5deg) scale(1.05);
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.info-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--color-muted);
}

.info-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-active {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--toastify-color-success);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: var(--toastify-color-success);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn-download,
.btn-share {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
}

.btn-download {
  background: var(--color-primary);
  color: var(--color-on-primary);
  box-shadow: var(--shadow-sm);
}

.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-share {
  background: var(--color-hover);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-share:hover {
  background: var(--color-border);
}

.btn-download i,
.btn-share i {
  font-size: 14px;
}

/* ====================================
   NO CV STATE
   ==================================== */
.no-cv-state {
  background: var(--color-surface);
  border: 2px dashed var(--color-border);
  border-radius: 16px;
  padding: 60px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.empty-illustration {
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
}

.illustration-bg {
  width: 100%;
  height: 100%;
  background: var(--color-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

.illustration-bg i {
  font-size: 40px;
  color: var(--color-muted);
  opacity: 0.5;
}

.no-cv-state h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.no-cv-state p {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 400px;
}

.upload-cv-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--color-primary);
  color: var(--color-on-primary);
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.upload-cv-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.upload-cv-btn i {
  font-size: 14px;
}

/* ====================================
   PDF MODAL
   ==================================== */
.pdf-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.pdf-modal-content {
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  background: var(--color-surface);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.modal-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: var(--color-accent);
  border-bottom: 1px solid var(--color-border);
  gap: 16px;
}

.modal-title-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.modal-title-section>i {
  font-size: 20px;
  color: var(--color-text);
  flex-shrink: 0;
}

.title-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.title-text h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-text span {
  font-size: 12px;
  color: var(--color-muted);
  font-weight: 500;
}

.modal-header-actions {
  display: flex;
  gap: 6px;
}

.modal-action-btn,
.modal-close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-hover);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.modal-action-btn:hover {
  background: var(--color-border);
  transform: scale(1.05);
}

.modal-close-btn:hover {
  background: var(--toastify-color-error);
  color: #ffffff;
  border-color: var(--toastify-color-error);
  transform: rotate(90deg) scale(1.05);
}

.modal-pdf-viewer {
  flex: 1;
  background: var(--color-accent);
  overflow: hidden;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* ====================================
   MODAL TRANSITIONS
   ==================================== */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .pdf-modal-content,
.modal-leave-to .pdf-modal-content {
  transform: scale(0.95) translateY(20px);
}

/* ====================================
   RESPONSIVE DESIGN
   ==================================== */
@media (max-width: 968px) {
  .cv-page-container {
    padding: 20px;
  }

  .cv-card-header {
    padding: 24px 28px;
  }

  .document-title {
    font-size: 20px;
  }

  .pdf-preview-section {
    padding: 40px 28px;
  }

  .cv-info-section {
    padding: 28px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
  }

  .action-btn {
    flex: 1;
    justify-content: center;
  }

  .badge-icon {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }

  .document-title {
    font-size: 18px;
  }

  .pdf-preview-section {
    padding: 32px 20px;
  }

  .pdf-preview-card {
    padding: 24px;
  }

  .pdf-icon-bg {
    font-size: 80px;
  }

  .cv-info-section {
    padding: 24px 20px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .no-cv-state {
    padding: 60px 24px;
  }

  .modal-header-bar {
    padding: 16px 20px;
  }

  .title-text h3 {
    font-size: 16px;
  }

  .modal-action-btn span {
    display: none;
  }
}

@media (max-width: 480px) {
  .cv-card-header {
    padding: 20px;
  }

  .action-btn span {
    display: none;
  }

  .action-btn {
    padding: 12px;
  }

  .info-item {
    padding: 16px;
  }

  .info-icon {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
}
</style>
