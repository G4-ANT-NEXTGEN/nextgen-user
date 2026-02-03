<template>
  <section class="projects-section">
    <!-- Own Profile - Projects with Edit/Delete -->
    <template v-if="isOwnProfile && projects.length">
      <InfoCard v-for="project in projects" :key="project.id" :title="project.title || 'Project'" icon="bi bi-folder"
        class="project-card" :showCreate="false" :showUpdate="true" :showDelete="true" @create="onCreate"
        @update="() => onUpdate(project)" @delete="() => openDeleteModal(project)">
        <div v-if="project.link" class="info-row">
          <i class="bi bi-link-45deg icon"></i>
          <a :href="project.link" target="_blank" class="project-link">
            {{ project.link }}
          </a>
        </div>
      </InfoCard>
    </template>

    <!-- Own Profile - Empty State -->
    <InfoCard v-else-if="isOwnProfile" title="Projects" icon="bi bi-folder" :showCreate="true" :showUpdate="false"
      :showDelete="false" @create="onCreate">
      <div class="no-data text-center">
        <p>No projects available</p>
      </div>
    </InfoCard>

    <!-- Viewing Other User - Projects Read-Only -->
    <template v-else-if="!isOwnProfile && viewProjects.length">
      <InfoCard v-for="project in viewProjects" :key="project.id" :title="project.title || 'Project'"
        icon="bi bi-folder" class="project-card" :showCreate="false" :showUpdate="false" :showDelete="false">
        <div v-if="project.link" class="info-row">
          <i class="bi bi-link-45deg icon"></i>
          <a :href="project.link" target="_blank" class="project-link">
            {{ project.link }}
          </a>
        </div>
      </InfoCard>
    </template>

    <!-- Viewing Other User - Empty State -->
    <InfoCard v-else title="Projects" icon="bi bi-folder" :showCreate="false" :showUpdate="false" :showDelete="false">
      <div class="no-data text-center">
        <p>No projects available</p>
      </div>
    </InfoCard>

    <!-- UPDATE MODAL -->
    <BaseModal v-if="projectUpdate" title="Update Project" @close="closeProjectUpdate">
      <BaseInput label="Project Title" v-model="projectTitle" />
      <BaseInput label="Project Link" v-model="projectLink" />

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeProjectUpdate">Cancel</button>
        <button class="btn btn-dark" @click="handleUpdateProject">Save Changes</button>
      </template>
    </BaseModal>

    <!-- DELETE CONFIRMATION MODAL -->
    <BaseModal v-if="deleteModal" title="Delete Project" @close="closeDeleteModal">
      <p class="mb-0">
        Are you sure you want to delete
        <strong>{{ selectedProjectForDelete?.title }}</strong>? This action cannot be undone.
      </p>

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeDeleteModal">Cancel</button>
        <button class="btn btn-danger" @click="confirmDeleteProject">Delete</button>
      </template>
    </BaseModal>
  </section>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseModal from '@/components/ui/base/BaseModal.vue'
import InfoCard from '../InfoCard.vue'
import { useProfileStore } from '@/stores/profile'
import { useProjectStore } from '@/stores/project'

const profileStore = useProfileStore()
const projectStore = useProjectStore()

/* ===== DATA ===== */
const isOwnProfile = computed(() => {
  return profileStore.viewUser === null
})

const projects = computed(() => profileStore.user?.projects || [])
const viewProjects = computed(() => profileStore.viewUser?.projects || [])

const projectUpdate = ref(false)
const projectTitle = ref('')
const projectLink = ref('')
const selectedProjectId = ref(null)

const deleteModal = ref(false)
const selectedProjectForDelete = ref(null)

/* ===== HANDLERS ===== */
const onCreate = () => {
  projectUpdate.value = true
}

const onUpdate = (project) => {
  selectedProjectId.value = project.id
  projectTitle.value = project.title || ''
  projectLink.value = project.link || ''
  projectUpdate.value = true
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
  selectedProjectId.value = null
  projectTitle.value = ''
  projectLink.value = ''
}

const handleUpdateProject = async () => {
  if (!projectTitle.value || !projectLink.value) return

  try {
    await projectStore.UpdateProject(selectedProjectId.value, {
      title: projectTitle.value,
      link: projectLink.value,
    })

    await profileStore.fetchProfile()
    closeProjectUpdate()
  } catch (error) {
    console.error('Failed to update project:', error)
  }
}

/* ===== LIFECYCLE ===== */
onMounted(async () => {
  if (!profileStore.user) {
    await profileStore.fetchProfile()
  }
})
</script>
