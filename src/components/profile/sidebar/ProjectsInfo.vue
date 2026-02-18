<template>
  <section class="projects-section">
    <div class="section-header-row mb-4" v-if="isOwnProfile">
      <h3 class="section-title">Project Portfolio</h3>
      <BaseButton variant="primary" size="sm" @click="onCreate">
        <i class="bi bi-plus-lg me-2"></i>
        <span>Add Project</span>
      </BaseButton>
    </div>

    <!-- Project Grid -->
    <div v-if="projectsList.length" class="projects-grid">
      <div v-for="project in projectsList" :key="project.id" class="project-modern-card">
        <div class="project-card-inner">
          <div class="project-card-header">
            <div class="project-icon-box">
              <i class="bi bi-folder-fill"></i>
            </div>

            <div class="project-actions" v-if="isOwnProfile">
              <button class="action-btn-circle" @click="onUpdate(project)" v-tippy="'Edit Project'">
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button class="action-btn-circle danger" @click="openDeleteModal(project)" v-tippy="'Delete Project'">
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>

          <div class="project-card-body">
            <h4 class="project-title">{{ project.title || 'Untitled Project' }}</h4>
            <div v-if="project.link" class="project-link-wrapper">
              <div class="link-label">Project URL</div>
              <a :href="project.link" target="_blank" class="project-url-pill">
                <i class="bi bi-globe2"></i>
                <span class="url-text">{{ project.link }}</span>
                <i class="bi bi-box-arrow-up-right ms-auto"></i>
              </a>
            </div>
          </div>

          <div class="project-card-footer">
            <div class="status-badge">
              <span class="dot"></span>
              Live Link
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state-card-premium" @click="isOwnProfile ? onCreate() : null">
      <div class="empty-visual">
        <div class="icon-circle">
          <i class="bi bi-layers"></i>
        </div>
        <div class="sparkles">
          <span class="sparkle"></span>
          <span class="sparkle"></span>
          <span class="sparkle"></span>
        </div>
      </div>
      <div class="empty-content">
        <h4>No Projects Yet</h4>
        <p v-if="isOwnProfile">Showcase your best work here. Start by adding your first project to highlight your
          expertise.</p>
        <p v-else>This user hasn't shared any projects yet.</p>
        <BaseButton v-if="isOwnProfile" variant="primary" class="mt-4">
          <i class="bi bi-plus-lg me-2"></i>
          Add Your First Project
        </BaseButton>
      </div>
    </div>

    <!-- UPDATE/CREATE MODAL -->
    <BaseModal v-if="projectUpdate" :title="isEditMode ? 'Update Project' : 'Add New Project'"
      @close="closeProjectUpdate">
      <div class="p-3">
        <BaseInput label="Project Title" v-model="projectTitle" placeholder="Enter project title" :error="errors.title"
          @input="validateTitle" :required="true" />
        <div class="mt-4">
          <BaseInput label="Project Link" v-model="projectLink" placeholder="https://your-project.com"
            :error="errors.link" @input="validateLink" :required="true" />
          <p class="form-hint mt-1 small light-dark">
            <i class="bi bi-info-circle me-1"></i>
            Provide a link to the live project, repository, or case study.
          </p>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="closeProjectUpdate">Cancel</BaseButton>
        <BaseButton variant="primary" @click="handleUpdateProject" :isLoading="isLoading">
          {{ isEditMode ? 'Save Changes' : 'Create Project' }}
        </BaseButton>
      </template>
    </BaseModal>

    <!-- DELETE CONFIRMATION MODAL -->
    <BaseModal v-if="deleteModal" title="Delete Project" @close="closeDeleteModal">
      <div class="text-center p-4">
        <div class="delete-warning-icon mb-3">
          <i class="bi bi-exclamation-triangle-fill"></i>
        </div>
        <h4 class="light-dark">Are you sure?</h4>
        <p class="light-dark">
          You are about to delete <strong>{{ selectedProjectForDelete?.title }}</strong>.
          This action cannot be undone.
        </p>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="closeDeleteModal">Cancel</BaseButton>
        <BaseButton variant="danger" @click="confirmDeleteProject">Delete Project</BaseButton>
      </template>
    </BaseModal>
  </section>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseModal from '@/components/ui/base/BaseModal.vue'
import BaseButton from '@/components/ui/base/BaseButton.vue'
import BaseInput from '@/components/ui/base/BaseInput.vue'
import { useProfileStore } from '@/stores/profile'
import { useProjectStore } from '@/stores/project'

const profileStore = useProfileStore()
const projectStore = useProjectStore()

/* ===== DATA ===== */
const isOwnProfile = computed(() => {
  return profileStore.viewUser === null
})

const projectsList = computed(() => {
  return isOwnProfile.value ? profileStore.user?.projects || [] : profileStore.viewUser?.projects || []
})

const projectUpdate = ref(false)
const projectTitle = ref('')
const projectLink = ref('')
const selectedProjectId = ref(null)
const isLoading = ref(false)

const errors = ref({
  title: '',
  link: '',
})

const isEditMode = computed(() => !!selectedProjectId.value)

const deleteModal = ref(false)
const selectedProjectForDelete = ref(null)

/* ===== HANDLERS ===== */
const onCreate = () => {
  resetForm()
  projectUpdate.value = true
}

const onUpdate = (project) => {
  selectedProjectId.value = project.id
  projectTitle.value = project.title || ''
  projectLink.value = project.link || ''
  projectUpdate.value = true
}

const resetForm = () => {
  selectedProjectId.value = null
  projectTitle.value = ''
  projectLink.value = ''
  errors.value = { title: '', link: '' }
}

const validateTitle = () => {
  if (!projectTitle.value.trim()) {
    errors.value.title = 'Project title is required'
    return false
  }
  errors.value.title = ''
  return true
}

const validateLink = () => {
  if (!projectLink.value.trim()) {
    errors.value.link = 'Project link is required'
    return false
  }


  const pattern = new RegExp(
    '^(https?:\\/\\/)' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$',
    'i'
  )

  if (!pattern.test(projectLink.value)) {
    errors.value.link = 'URL must start with http:// or https://'
    return false
  }

  errors.value.link = ''
  return true
}

/* DELETE MODAL HANDLERS */
const openDeleteModal = (project) => {
  selectedProjectForDelete.value = project
  deleteModal.value = true
}

const closeDeleteModal = () => {
  deleteModal.value = false
  selectedProjectForDelete.value = null
}

const confirmDeleteProject = async () => {
  try {
    await projectStore.DeleteProject(selectedProjectForDelete.value.id)
    await profileStore.fetchProfile()
    closeDeleteModal()
  } catch (error) {
    console.error('Failed to delete project:', error)
  }
}

/* UPDATE HANDLERS */
const closeProjectUpdate = () => {
  projectUpdate.value = false
  resetForm()
}

const handleUpdateProject = async () => {
  const titleValid = validateTitle()
  const linkValid = validateLink()

  if (!titleValid || !linkValid) return

  try {
    isLoading.value = true
    const payload = {
      title: projectTitle.value.trim(),
      link: projectLink.value.trim(),
    }

    if (isEditMode.value) {
      await projectStore.UpdateProject(selectedProjectId.value, payload)
    } else {
      await projectStore.CreateProject(payload)
    }

    await profileStore.fetchProfile()
    closeProjectUpdate()
  } catch (error) {
    console.error('Failed to save project:', error)
  } finally {
    isLoading.value = false
  }
}

/* ===== LIFECYCLE ===== */
onMounted(async () => {
  if (!profileStore.user && isOwnProfile.value) {
    await profileStore.fetchProfile()
  }
})
</script>

<style scoped>
.projects-section {
  animation: fadeIn 0.6s ease-out;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.02em;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-modern-card {
  height: 100%;
}

.project-card-inner {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.project-card-inner:hover {
  border-color: var(--color-primary);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.project-icon-box {
  width: 48px;
  height: 48px;
  background: var(--color-accent);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.project-card-inner:hover .project-icon-box {
  transform: rotate(-10deg) scale(1.1);
}

.project-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.project-card-inner:hover .project-actions {
  opacity: 1;
  transform: translateY(0);
}

.action-btn-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.action-btn-circle:hover {
  background: var(--color-primary);
  color: var(--color-background);
  border-color: var(--color-primary);
}

.action-btn-circle.danger:hover {
  background: #ef4444;
  border-color: #ef4444;
}

.project-card-body {
  flex: 1;
}

.project-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 1.25rem;
  line-height: 1.3;
}

.project-link-wrapper {
  margin-top: auto;
}

.link-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.project-url-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--color-accent);
  padding: 10px 14px;
  border-radius: 12px;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.project-url-pill:hover {
  background: var(--color-surface);
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.url-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.project-card-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 10px;
  border-radius: 20px;
}

.status-badge .dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

/* Premium Empty State */
.empty-state-card-premium {
  padding: 5rem 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.empty-state-card-premium:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.empty-visual {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 2rem;
}

.icon-circle {
  width: 100px;
  height: 100px;
  background: var(--color-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-primary);
  position: relative;
  z-index: 2;
}

.sparkles .sparkle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  animation: sparkle-float 3s infinite;
}

.sparkle:nth-child(1) {
  top: -10px;
  left: -10px;
  animation-delay: 0s;
}

.sparkle:nth-child(2) {
  top: 20px;
  right: -20px;
  animation-delay: 1s;
}

.sparkle:nth-child(3) {
  bottom: -10px;
  left: 20px;
  animation-delay: 2s;
}

.empty-content h4 {
  font-size: 1.75rem;
  font-weight: 850;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.empty-content p {
  color: var(--color-muted);
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Delete Warning Icon */
.delete-warning-icon {
  width: 64px;
  height: 64px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto;
}

@keyframes pulse-dot {
  0% {
    transform: scale(0.9);
    opacity: 0.7;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(0.9);
    opacity: 0.7;
  }
}

@keyframes sparkle-float {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.5;
  }

  50% {
    transform: translate(5px, -10px) rotate(15deg);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
