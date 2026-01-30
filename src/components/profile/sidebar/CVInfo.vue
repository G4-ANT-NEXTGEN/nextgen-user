<template>
  <div>
    <InfoCard
      title="CV / Resume"
      icon="bi bi-file-earmark-person"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @update="UpdateCV"
    >
      <div v-if="profileStore.user?.cv" class="cv-post-card">
        <!-- CV Preview Section -->
        <div class="cv-preview">
          <div class="bg-pattern"></div>
          <img :src="cvData.image" class="cv-image" alt="CV Preview" />
          <div class="cv-overlay">
            <button @click="showModal = true" class="view-btn">
              <i class="bi bi-eye"></i> View Full CV
            </button>
          </div>
        </div>

        <!-- CV Info Section -->
        <div class="cv-details">
          <div class="header-info">
            <h5 class="file-name">{{ cvData.name }}</h5>
            <span class="status-badge">Active</span>
          </div>

          <div class="meta-row">
            <div class="meta-item">
              <i class="bi bi-calendar3 meta-icon"></i>
              <span>{{ cvData.updated_at }}</span>
            </div>
            <div class="meta-item">
              <i class="bi bi-file-earmark-pdf meta-icon"></i>
              <span>PDF Document</span>
            </div>
          </div>
        </div>
      </div>
    </InfoCard>

    <!-- Modal for PDF Viewing -->
    <Teleport to="body">
      <div v-if="showModal" class="pdf-modal-overlay" @click.self="showModal = false">
        <div class="pdf-modal-container">
          <!-- Floating Close Button -->
          <button class="modal-close-tab" @click="showModal = false" title="Close">
            <i class="bi bi-x-lg"></i>
          </button>

          <div class="modal-content-wrapper">
            <iframe
              v-if="cvData?.file"
              :src="cvData.file + '#toolbar=0&navpanes=0&scrollbar=0'"
              class="pdf-viewer-clean"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import InfoCard from '../InfoCard.vue'
import { ref, onMounted, computed, watch } from 'vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()
const showModal = ref(false)

watch(showModal, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const cvData = computed(() => {
  const cv = profileStore.user?.cv
  if (!cv) return null

  // Helper to extract clean filename
  const getCleanName = (url) => {
    if (!url) return 'My_Resume.pdf'
    const filename = url.split('/').pop()
    // If it looks like a hash (e.g. NP4a...), we could potentially just return "My_Resume.pdf"
    // or keep it but for "Fix Data" let's just use a clean name if it's too long.
    return filename && filename.length < 30 ? filename : 'Professional_CV.pdf'
  }

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
.cv-post-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
}
.cv-post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1);
}
.cv-preview {
  position: relative;
  height: 220px;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 30px;
}
.bg-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background: radial-gradient(#1f2937 0.5px, transparent 0.5px) 0 0/15px 15px;
}
.cv-image {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
}
.cv-post-card:hover .cv-image {
  transform: scale(1.1) rotate(2deg);
}
.cv-overlay {
  position: absolute;
  inset: 0;
  background: rgba(31, 41, 55, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.3s;
}
.cv-preview:hover .cv-overlay {
  opacity: 1;
}
.view-btn {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  color: #000;
  padding: 12px 24px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  font: 700 0.9rem inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.3s;
}
.view-btn:hover {
  background: #fff;
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}
.cv-details {
  padding: 20px;
}
.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.file-name {
  font: 700 1.1rem inherit;
  color: #000;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  padding-right: 10px;
}
.status-badge {
  background: #ecfdf5;
  color: #059669;
  padding: 4px 10px;
  border-radius: 20px;
  font: 700 0.7rem inherit;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid #d1fae5;
}
.meta-row {
  display: flex;
  gap: 15px;
  border-top: 1px solid #f3f4f6;
  padding-top: 15px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font: 500 0.8rem inherit;
}
.meta-icon {
  font-size: 0.9rem;
  color: #9ca3af;
}
.pdf-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
  padding: 20px;
}
.pdf-modal-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 92vh;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  animation: modal-zoom 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
@keyframes modal-zoom {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.modal-close-tab {
  position: absolute;
  top: -50px;
  right: 0;
  background: #fff;
  color: #1f2937;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.modal-close-tab:hover {
  background: #ef4444;
  color: #fff;
  transform: rotate(90deg) scale(1.1);
}
.modal-content-wrapper {
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
}
.pdf-viewer-clean {
  width: 100%;
  height: 100%;
  display: block;
}
.no-cv-container {
  padding: 40px;
  background: #f8fafc;
  border-radius: 20px;
  border: 2px dashed #e2e8f0;
  text-align: center;
}
.empty-icon {
  font-size: 3rem;
  color: #cbd5e1;
  margin-bottom: 20px;
  display: block;
}
.empty-state p {
  color: #64748b;
  margin-bottom: 15px;
  font: 500 inherit;
}
.upload-link {
  background: #1f2937;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  font: 600 inherit;
  cursor: pointer;
  border: none;
  transition: 0.3s;
}
.upload-link:hover {
  background: #000;
  transform: translateY(-2px);
}
</style>
