<template>
  <section class="projects-section">
    <!-- Project List -->
    <template v-if="projects.length">
      <InfoCard
        v-for="project in projects"
        :key="project.id"
        :title="project.title || 'Project'"
        icon="bi bi-folder"
        class="project-card"
        @create="onCreate"
        @update="onUpdate(project)"
        @delete="onDelete(project.id)"
      >
        <div v-if="project.link" class="info-row">
          <i class="bi bi-link-45deg icon"></i>
          <a :href="project.link" target="_blank" class="project-link">{{ project.link }}</a>
        </div>
      </InfoCard>
    </template>

    <!-- Empty State -->
    <InfoCard
      v-else
      title="Projects"
      icon="bi bi-folder"
      :showUpdate="false"
      :showDelete="false"
      @create="onCreate"
    >
      <div class="no-data">
        <p>No projects available</p>
      </div>
    </InfoCard>

    <!-- Modal For Add New Project -->
    <BaseModal
      v-if="projectUpdate"
      title="Update Profession Info"
      @close="closeProjectUpdate"
    >
      <BaseInput label="Project Title" placeholder="e.g Software Engineering" v-model="projectTitle" />
      <BaseInput label="Project Link" placeholder="e.g www.facebook.com" v-model="projectLink"/>

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeProjectUpdate">Cancel</button>
        <button class="btn btn-dark" @click="HandleUpdateProject">Save Changes</button>
      </template>
    </BaseModal>

    
  </div>
</template>

<script setup>
import BaseModal from '@/components/ui/base/BaseModal.vue'
import InfoCard from '../InfoCard.vue'
import { onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import InfoCard from '../InfoCard.vue'

const profileStore = useProfileStore()
const projects = computed(() => profileStore.user?.projects || [])

const onCreate = () => console.log('Create project triggered')
const onUpdate = (project) => console.log('Update project triggered', project)
const onDelete = (id) => console.log('Delete project triggered', id)

onMounted(async () => {
  if (!profileStore.user) {
    try {
      await profileStore.fetchProfile()
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }
})
import { ref } from 'vue'
import { useProjectStore } from '@/stores/project';

const projectStore = useProjectStore()

const projectTitle = ref('');
const projectLink = ref('');  

const projectUpdate = ref(false);
function UpdateProject() {
  projectUpdate.value = true;
}
function closeProjectUpdate(){
  projectUpdate.value = false;
}

function HandleUpdateProject(){
  if(projectTitle.value === '' || projectLink.value === ''){
    alert("Please fill in all fields")
    return;
  }

  try{
    projectStore.UpdateProject({
      title: projectTitle.value,
      link: projectLink.value
    });
    projectUpdate.value = false;
    projectTitle.value = '';
    projectLink.value = '';
  } catch (error) {
    console.log('Failed to Update Project:', error.response?.data);
  }

}

function DeleteProject(){
  try{
    projectStore.DeleteProject();
  } catch (error) {
    console.log('Failed to Delete Project:', error.response?.data);
  }
}

</script>

<style scoped>
.project-card {
  margin-bottom: 1rem;
}

.project-card:last-child {
  margin-bottom: 0;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  width: 20px;
  text-align: center;
  font-size: 1.1rem;
  color: var(--color-text-muted, #64748b);
  flex-shrink: 0;
}

.project-link {
  font-size: 0.875rem;
  color: var(--color-primary, #2563eb);
  text-decoration: none;
  word-break: break-all;
  transition: opacity 0.2s ease;
}

.project-link:hover {
  text-decoration: underline;
  opacity: 0.8;
}

.no-data {
  text-align: center;
  padding: 0.5rem;
  color: var(--color-text-muted, #64748b);
}
</style>

