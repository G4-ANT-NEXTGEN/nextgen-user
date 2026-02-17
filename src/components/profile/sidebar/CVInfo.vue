<template>
  <div class="cv-page-container">
    <!-- CV Card - Shown when data exists -->
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
          <div class="deco-grid"></div>
          <div class="deco-gradient"></div>

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
          <button class="btn-download secondary" @click="handleDownloadCv" :disabled="isDownloading">
            <i class="bi bi-download"></i>
            <span>{{ isDownloading ? 'Downloading...' : 'Download CV' }}</span>
          </button>
          <button class="btn-share" @click="showShareModal = true">
            <i class="bi bi-share"></i>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State CV Card - Shown when no data exists -->
    <div v-else class="empty-cv-card">
      <div class="empty-grid"></div>
      <div class="empty-content">
        <div class="empty-icon-wrapper">
          <div class="main-icon">
            <i class="bi bi-file-earmark-pdf"></i>
          </div>
          <div class="sub-icon">
            <i class="bi bi-plus-circle-fill"></i>
          </div>
        </div>

        <div class="empty-text">
          <h3 class="empty-title">No CV Uploaded</h3>
          <p class="empty-description">
            {{ isOwnProfile ? 'Upload your professional CV to showcase your skills and experience to the community.' :
              'This user hasn\'t uploaded a CV yet.' }}
          </p>
        </div>

        <div v-if="isOwnProfile" class="empty-actions">
          <button class="upload-btn-premium" @click="UpdateCV">
            <i class="bi bi-cloud-arrow-up"></i>
            <span>Upload My CV</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modals & Teleports -->

    <!-- Full Screen PDF Modal -->
    <Teleport to="body" v-if="currentCvData">
      <Transition name="modal">
        <div v-if="showModal" class="pdf-modal-overlay" @click.self="showModal = false">
          <div class="pdf-modal-content">
            <div class="modal-header-bar">
              <div class="modal-title-section">
                <i class="bi bi-file-earmark-pdf"></i>
                <div class="title-text">
                  <h3>{{ currentCvData.name }}</h3>
                  <span>PDF Document</span>
                </div>
              </div>
              <div class="modal-header-actions">
                <button class="modal-action-btn" @click="handleDownloadCv" :disabled="isDownloading" title="Download">
                  <i class="bi bi-download"></i>
                </button>
                <button class="modal-action-btn" @click="handlePrintCv" title="Print">
                  <i class="bi bi-printer"></i>
                </button>
                <button class="modal-close-btn" @click="showModal = false" title="Close">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <div class="modal-pdf-viewer">
              <iframe v-if="currentCvData.file" :src="currentCvData.file + '#toolbar=0&navpanes=0&scrollbar=0'"
                class="pdf-iframe" frameborder="0"></iframe>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Upload CV Modal -->
    <BaseModal v-if="cvUpdateModal" title="Upload Your CV" @close="closeEditCV">
      <div class="upload-section cursor-pointer">
        <div class="file-upload-area" :class="{ 'has-file': cvFile }">
          <input class="file-input" type="file" id="cvFile" @change="cvOnChangeFile" accept="application/pdf" />
          <label for="cvFile" class="file-upload-label">
            <div class="upload-icon">
              <i class="bi bi-cloud-arrow-up"></i>
            </div>
            <div class="upload-text">
              <span class="primary-text light-dark ">Drop your CV here or click to browse</span>
              <span class="secondary-text">PDF files only • Max 10MB</span>
            </div>
          </label>
        </div>

        <div v-if="cvFile" class="file-preview">
          <div class="file-icon light-dark">
            <i class="bi bi-file-earmark-pdf"></i>
          </div>
          <div class="file-info">
            <span class="file-name light-dark">{{ cvFile.name }}</span>
            <span class="file-size">{{ formatFileSize(cvFile.size) }}</span>
          </div>
          <button @click="cvFile = null" class="remove-file">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <template #footer>
        <BaseButton @click="closeEditCV" variant="secondary">Cancel</BaseButton>
        <BaseButton @click="handleSaveCv" :isLoading="profileStore.isProcessing" variant="primary" :disabled="!cvFile">
          <span>{{ profileStore.isProcessing ? 'Uploading...' : 'Upload CV' }}</span>
        </BaseButton>
      </template>
    </BaseModal>

    <!-- Share CV Modal -->
    <Teleport to="body" v-if="currentCvData">
      <Transition name="modal">
        <div v-if="showShareModal" class="share-overlay" @click.self="showShareModal = false">
          <div class="share-modal improved">
            <header class="share-header">
              <div class="share-header-left">
                <h3 class="label primary">Share CV</h3>
                <p class=" label light-dark">Share your CV quickly via link, email, or social platforms.</p>
              </div>
              <div class="share-header-right">
                <button class="modal-close-btn light-dark" @click="showShareModal = false">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </header>

            <div class="share-body">
              <div class="share-left">
                <div class="cv-preview-card">
                  <img :src="currentCvData.image" alt="CV preview" />
                  <div class="cv-meta">
                    <strong class="cv-name">{{ currentCvData.name }}</strong>
                    <span class="cv-updated">{{ currentCvData.updated_at }}</span>
                  </div>
                  <div class="cv-actions">
                    <button class="btn small" @click="handleDownloadCv" :disabled="isDownloading">
                      <i class="bi bi-download"></i>
                      <span>{{ isDownloading ? 'Downloading...' : 'Download' }}</span>
                    </button>
                    <button class="btn small" @click="showModal = true">
                      <i class="bi bi-arrows-fullscreen"></i>
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>

              <div class="share-right">
                <label class="share-label label primary">Shareable link</label>
                <div class="share-link-row">
                  <input class="share-input label primary" :value="currentCvData.file" readonly />
                  <button class="btn copy-btn" @click="handleShareCv('link')">
                    <i class="bi bi-clipboard"></i>
                    <span>{{ copyLinkSuccess ? 'Copied' : 'Copy' }}</span>
                  </button>
                </div>

                <div class="share-grid">
                  <button class="share-action whatsapp" @click="handleShareCv('whatsapp')">
                    <i class="bi bi-whatsapp"></i>
                    <span>WhatsApp</span>
                  </button>
                  <button class="share-action linkedin" @click="handleShareCv('linkedin')">
                    <i class="bi bi-linkedin"></i>
                    <span>LinkedIn</span>
                  </button>
                  <button class="share-action twitter" @click="handleShareCv('twitter')">
                    <i class="bi bi-twitter-x"></i>
                    <span>Twitter</span>
                  </button>
                  <button class="share-action facebook" @click="handleShareCv('facebook')">
                    <i class="bi bi-facebook"></i>
                    <span>Facebook</span>
                  </button>
                  <button class="share-action email" @click="handleShareCv('email')">
                    <i class="bi bi-envelope-fill"></i>
                    <span>Email</span>
                  </button>
                </div>
                <p class="share-help muted label primary light-dark">NOTE: If a popup is blocked, allow popups for this
                  site.</p>
              </div>
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
const showShareModal = ref(false)
const cvUpdateModal = ref(false)
const cvFile = ref(null)
const isDownloading = ref(false)
const copyLinkSuccess = ref(false)

watch(showModal, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

watch(showShareModal, (value) => {
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
  cvUpdateModal.value = true
}

const closeEditCV = () => {
  cvUpdateModal.value = false
  cvFile.value = null
}

const cvOnChangeFile = (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (file.type !== 'application/pdf') {
    alert('Only PDF files are allowed')
    return
  }
  if (file.size > 10 * 1024 * 1024) {
    alert('File size must be less than 10MB')
    return
  }
  cvFile.value = file
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const handleSaveCv = async () => {
  if (!cvFile.value) return
  profileStore.isProcessing = true
  try {
    await profileStore.uploadCv(cvFile.value)
    cvUpdateModal.value = false
    cvFile.value = null
  } catch (error) {
    console.error('Error uploading CV:', error)
  } finally {
    profileStore.isProcessing = false
    profileStore.fetchProfile()
  }
}

const handleDownloadCv = async () => {
  isDownloading.value = true
  try {
    await profileStore.downloadCv()
  } catch (error) {
    console.error('Error downloading CV:', error)
  } finally {
    isDownloading.value = false
  }
}

const handlePrintCv = () => {
  const iframe = document.querySelector('.pdf-iframe')
  if (iframe) {
    try {
      iframe.contentWindow.print()
    } catch (error) {
      console.error('Print error:', error)
      window.print()
    }
  }
}

const handleShareCv = async (method) => {
  try {
    await profileStore.shareCv(method, currentCvData.value?.file, currentCvData.value?.name)
    if (method === 'link') {
      copyLinkSuccess.value = true
      setTimeout(() => {
        copyLinkSuccess.value = false
        showShareModal.value = false
      }, 1500)
    } else {
      showShareModal.value = false
    }
  } catch (error) {
    console.error('Error sharing CV:', error)
  }
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
  background: var(--color-text);
  color: var(--color-background);
  box-shadow: var(--shadow-sm);
}

.label.primary {
  color: var(--color-primary)
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
  color: var(--color-background);
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
  color: var(--color-background);
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
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Action Buttons in Info Section */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.btn-download,
.btn-share {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-download.secondary {
  background: var(--color-hover);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-download:hover {
  background: var(--color-border);
}

.btn-share {
  background: var(--color-text);
  color: var(--color-background);
}

.btn-share:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* ====================================
   EMPTY STATE STYLING
   ==================================== */
.empty-cv-card {
  position: relative;
  background: var(--color-surface);
  border: 2px dashed var(--color-border);
  border-radius: 24px;
  padding: 60px 40px;
  overflow: hidden;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-cv-card:hover {
  border-color: var(--color-primary);
  background: var(--color-accent);
}

.empty-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.1;
  pointer-events: none;
}

.empty-content {
  position: relative;
  z-index: 2;
  max-width: 320px;
}

.empty-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
}

.main-icon {
  width: 100%;
  height: 100%;
  background: var(--color-hover);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: var(--color-muted);
  transition: all 0.4s ease;
}

.empty-cv-card:hover .main-icon {
  background: var(--color-primary);
  color: var(--color-background);
  transform: scale(1.1) rotate(-5deg);
}

.sub-icon {
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 30px;
  height: 30px;
  background: var(--color-surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--color-primary);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.empty-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.empty-description {
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: 32px;
}

.upload-btn-premium {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 32px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.upload-btn-premium:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
  filter: brightness(1.1);
}

.upload-btn-premium i {
  font-size: 1.2rem;
}

/* ====================================
   MODAL & SHARE STYLING (General)
   ==================================== */
.pdf-modal-overlay,
.share-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.pdf-modal-content {
  width: 95%;
  height: 90%;
  max-width: 1000px;
  background: var(--color-surface);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header-bar {
  padding: 16px 24px;
  background: var(--color-accent);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title-section {
  display: flex;
  align-items: center;
  gap: 14px;
}

.modal-title-section i {
  font-size: 24px;
  color: #ef4444;
}

.title-text h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.title-text span {
  font-size: 12px;
  color: var(--color-muted);
}

.modal-header-actions {
  display: flex;
  gap: 8px;
}

.modal-pdf-viewer {
  flex: 1;
  background: #525659;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
}

.modal-action-btn,
.modal-close-btn {
  width: 40px;
  height: 40px;
  background: var(--color-hover);
  color: var(--color-text);
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-action-btn:hover,
.modal-close-btn:hover {
  background: var(--color-border);
  transform: scale(1.05);
}

.modal-close-btn:hover {
  color: #ef4444;
}

/* Upload Modal Form */
.upload-section {
  padding: 24px;
}

.file-upload-area {
  border: 2px dashed var(--color-border);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-upload-area:hover {
  border-color: var(--color-primary);
  background: var(--color-accent);
}

.file-input {
  display: none;
}

.upload-icon {
  font-size: 40px;
  color: var(--color-primary);
  margin-bottom: 16px;
}

.primary-text {
  display: block;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}

.secondary-text {
  font-size: 13px;
  color: var(--color-muted);
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--color-accent);
  border-radius: 12px;
  margin-top: 24px;
}

.file-info {
  flex: 1;
}

.file-name {
  display: block;
  font-weight: 700;
  font-size: 14px;
}

.file-size {
  font-size: 12px;
  color: var(--color-muted);
}

.remove-file {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
}

.remove-file:hover {
  background: #ff4757;
  color: white;
  border-color: #ff4757;
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
}

.remove-file i {
  font-size: 14px;
}

.copy-btn {
  padding: 0 24px;
  background: var(--color-primary);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.2);
}

.copy-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(var(--color-primary-rgb), 0.3);
}

/* Share Modal Improved */
.share-modal.improved {
  width: 90%;
  max-width: 650px;
  background: var(--color-surface);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.share-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.share-body {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
}

.cv-preview-card {
  background: var(--color-accent);
  padding: 16px;
  border-radius: 16px;
  text-align: center;
}

.cv-preview-card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
}

.cv-meta {
  margin-bottom: 16px;
}

.cv-name {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
}

.cv-updated {
  font-size: 12px;
  color: var(--color-muted);
}

.cv-actions {
  display: flex;
  gap: 8px;
}

.cv-actions .btn.small {
  flex: 1;
  padding: 8px;
  font-size: 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.share-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
  margin-top: 24px;
}

.share-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-hover);
  cursor: pointer;
  transition: all 0.2s;
}

.share-action:hover {
  transform: translateY(-3px);
  background: var(--color-border);
}

.share-action i {
  font-size: 20px;
}

.share-link-row {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.share-input {
  flex: 1;
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-accent);
  font-size: 13px;
}

.share-help {
  margin-top: 20px;
  font-size: 11px;
}

@media (max-width: 600px) {
  .share-body {
    grid-template-columns: 1fr;
  }
}
</style>
