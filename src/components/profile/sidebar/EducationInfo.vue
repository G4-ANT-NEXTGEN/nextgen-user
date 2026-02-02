<template>
  <div class="education-section">
    <!-- Education Cards - Own Profile -->
    <template v-if="isOwnProfile && educations.length">
      <div v-for="edu in educations" :key="edu.id" class="education-item">
        <InfoCard
          :title="edu.school?.name || 'Education'"
          icon="bi bi-mortarboard"
          :showCreate="false"
          :showUpdate="true"
          :showDelete="true"
          @update="() => onUpdate(edu)"
          @delete="() => onDelete(edu.id)"
        >
          <div claInfoCardss="edu-content">
            <div class="info-row">
              <i class="bi bi-mortarboard icon"></i>
              <span class="text-medium">{{ edu.degree?.name }}</span>
            </div>

            <div v-if="edu.subject?.name" class="info-row">
              <i class="bi bi-book icon"></i>
              <span class="text-regular">{{ edu.subject?.name }}</span>
            </div>

            <div class="info-row">
              <i class="bi bi-calendar3 icon"></i>
              <span class="text-muted">
                {{ edu.start_date }} - {{ edu.end_date || 'Present' }}
              </span>
            </div>

            <div v-if="edu.description" class="info-row description">
              <i class="bi bi-info-circle icon"></i>
              <p class="description-text">{{ edu.description }}</p>
            </div>
          </div>
        </InfoCard>
      </div>
    </template>

    <!-- Empty State - Own Profile -->
    <InfoCard
      v-else-if="isOwnProfile"
      title="Education"
      icon="bi bi-mortarboard"
      :showCreate="true"
      :showUpdate="false"
      :showDelete="false"
      @create="onCreate"
    >
      <div class="no-data">
        <p>No education info available</p>
      </div>
    </InfoCard>

    <!-- Education Cards - Viewing Other User's Profile (Read-Only) -->
    <template v-else-if="!isOwnProfile && viewEducations.length">
      <div v-for="edu in viewEducations" :key="edu.id" class="education-item">
        <InfoCard
          :title="edu.school?.name || 'Education'"
          icon="bi bi-mortarboard"
          :showCreate="false"
          :showUpdate="false"
          :showDelete="false"
        >
          <div claInfoCardss="edu-content">
            <div class="info-row">
              <i class="bi bi-mortarboard icon"></i>
              <span class="text-medium">{{ edu.degree?.name }}</span>
            </div>

            <div v-if="edu.subject?.name" class="info-row">
              <i class="bi bi-book icon"></i>
              <span class="text-regular">{{ edu.subject?.name }}</span>
            </div>

            <div class="info-row">
              <i class="bi bi-calendar3 icon"></i>
              <span class="text-muted">
                {{ edu.start_date }} - {{ edu.end_date || 'Present' }}
              </span>
            </div>

            <div v-if="edu.description" class="info-row description">
              <i class="bi bi-info-circle icon"></i>
              <p class="description-text">{{ edu.description }}</p>
            </div>
          </div>
        </InfoCard>
      </div>
    </template>

    <!-- Empty State - Viewing Other User's Profile -->
    <InfoCard
      v-else
      title="Education"
      icon="bi bi-mortarboard"
      :showCreate="false"
      :showUpdate="false"
      :showDelete="false"
    >
      <div class="no-data">
        <p>No education info available</p>
      </div>
    </InfoCard>

    <!-- Update Modal -->
    <!-- UPDATE MODAL -->
    <BaseModal
      v-if="addNewEducation"
      :title="isEditMode ? 'Update Education' : 'Add New Education'"
      @close="closeAddNewEducation"
    >
      <BaseSelect
        v-model="school"
        label="School/University"
        placeholder="Select School"
        :options="schoolStore.schools.map((s) => ({ value: s.id, label: s.name }))"
      />

      <div class="d-flex my-2">
        <div class="col-6 me-1">
          <BaseSelect
            v-model="degree"
            label="Degree"
            placeholder="Select Degree"
            :options="degreeStore.degrees.map((d) => ({ value: d.id, label: d.name }))"
          />
        </div>
        <div class="col-6 ms-1">
          <BaseSelect
            v-model="subject"
            label="Subject"
            placeholder="Select Subject"
            :options="subjectStore.subjects.map((s) => ({ value: s.id, label: s.name }))"
          />
        </div>
      </div>

      <div class="d-flex my-2">
        <div class="col-6 me-1">
          <BaseInput label="Start Date" placeholder="Year-Month" v-model="start_date" />
        </div>
        <div class="col-6 ms-1">
          <BaseInput label="End Date" placeholder="Year-Month" v-model="end_date" />
        </div>
      </div>

      <div class="mb-2">
        <label class="mb-2 fw-semibold">Description</label>
        <textarea
          class="form-control"
          placeholder="Description"
          style="height: 100px"
          v-model="description"
        ></textarea>
      </div>

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeAddNewEducation">Cancel</button>
        <button class="btn btn-dark" @click="HandleAddNewEducation" :disabled="isLoading">
          {{
            isLoading
              ? isEditMode
                ? 'Updating...'
                : 'Adding...'
              : isEditMode
              ? 'Update'
              : 'Add New'
          }}
        </button>
      </template>
    </BaseModal>

    <!-- DELETE CONFIRMATION MODAL -->
    <BaseModal v-if="deleteModal" title="Delete Education" @close="closeDeleteModal">
      <p class="mb-0">
        Are you sure you want to delete
        <strong>{{ selectedEducationForDelete?.school?.name }}</strong
        >? This action cannot be undone.
      </p>

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeDeleteModal">Cancel</button>
        <button class="btn btn-danger" @click="confirmDeleteEducation">Delete</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseModal from '@/components/ui/base/BaseModal.vue'
import InfoCard from '../InfoCard.vue'
import { useProfileStore } from '@/stores/profile'
import { useEducationStore } from '@/stores/education'
import { useSchoolStore } from '@/stores/schools'
import { useDegreeStore } from '@/stores/degrees'
import { useSubjectStore } from '@/stores/subjects'

const profileStore = useProfileStore()
const educationStore = useEducationStore()
const schoolStore = useSchoolStore()
const degreeStore = useDegreeStore()
const subjectStore = useSubjectStore()

const isOwnProfile = computed(() => {
  return profileStore.viewUser === null
})

const educations = computed(() => profileStore.user?.educations || [])
const viewEducations = computed(() => profileStore.viewUser?.educations || [])

const addNewEducation = ref(false)
const isEditMode = ref(false)
const isLoading = ref(false)
const selectedEducation = ref(null)
const deleteModal = ref(false)
const selectedEducationForDelete = ref(null)

const school = ref(null)
const degree = ref(null)
const subject = ref(null)
const start_date = ref('')
const end_date = ref('')
const description = ref('')

const onCreate = () => {
  resetForm()
  isEditMode.value = false
  addNewEducation.value = true
}

const onUpdate = (edu) => {
  isEditMode.value = true
  selectedEducation.value = edu

  school.value = edu.school?.id || null
  degree.value = edu.degree?.id || null
  subject.value = edu.subject?.id || null
  start_date.value = edu.start_date || ''
  end_date.value = edu.end_date || ''
  description.value = edu.description || ''

  addNewEducation.value = true
}

const onDelete = (id) => {
  const edu = educations.value.find((e) => e.id === id)
  selectedEducationForDelete.value = edu
  deleteModal.value = true
}

const closeDeleteModal = () => {
  deleteModal.value = false
  selectedEducationForDelete.value = null
}

const confirmDeleteEducation = async () => {
  try {
    await educationStore.DeleteEducation(selectedEducationForDelete.value.id)
    await profileStore.fetchProfile()
    closeDeleteModal()
  } catch (error) {
    console.error(error)
  }
}

const HandleAddNewEducation = async () => {
  isLoading.value = true

  const payload = {
    school_id: school.value,
    degree_id: degree.value,
    subject_id: subject.value,
    start_date: start_date.value,
    end_date: end_date.value,
    description: description.value,
  }

  try {
    if (isEditMode.value && selectedEducation.value) {
      await educationStore.UpdateEducation(selectedEducation.value.id, payload)
    } else {
      await educationStore.CreateEducation(payload)
    }

    await profileStore.fetchProfile()
    closeAddNewEducation()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const closeAddNewEducation = () => {
  addNewEducation.value = false
  isEditMode.value = false
  selectedEducation.value = null
  resetForm()
}

const resetForm = () => {
  school.value = null
  degree.value = null
  subject.value = null
  start_date.value = ''
  end_date.value = ''
  description.value = ''
}

onMounted(async () => {
  if (!profileStore.user) {
    await profileStore.fetchProfile()
  }

  await Promise.all([
    schoolStore.fetchSchools?.(),
    degreeStore.fetchDegrees?.(),
    subjectStore.fetchSubjects?.(),
  ])
})
</script>

<style scoped>
.education-item {
  margin-bottom: 1rem;
}

.education-item:last-child {
  margin-bottom: 0;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.icon {
  width: 20px;
  text-align: center;
  font-size: 1rem;
  color: var(--color-text-muted, #64748b);
  flex-shrink: 0;
}

.text-medium {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text, #334155);
}

.text-regular {
  font-size: 0.875rem;
  color: var(--color-text-muted, #475569);
}

.text-muted {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text-muted, #64748b);
}

.info-row.description {
  align-items: flex-start;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color, #e5e7eb);
}

.description .icon {
  margin-top: 2px;
}

.description-text {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted, #475569);
  margin: 0;
}

.no-data {
  text-align: center;
  padding: 1rem;
  color: var(--color-text-muted, #64748b);
}
</style>