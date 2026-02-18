<template>
  <div class="education-info-wrapper">
    <!-- Education Cards - Own Profile -->
    <template v-if="isOwnProfile">
      <div v-if="educations.length" class="education-list">
        <div v-for="edu in educations" :key="edu.id" class="education-item-group">
          <InfoCard :title="edu.school?.name || 'Education'" icon="bi bi-briefcase-fill" :showCreate="false"
            :showUpdate="true" :showDelete="true" @update="onUpdate(edu)" @delete="onDelete(edu)">

            <div class="education-entry-content">
              <div class="entry-main-info">
                <div class="degree-highlight">
                  <span class="degree-title">{{ edu.degree?.name }}</span>
                  <span v-if="edu.subject?.name" class="entry-dot"></span>
                  <span v-if="edu.subject?.name" class="subject-title">{{ edu.subject?.name }}</span>
                </div>

                <div class="date-badge">
                  <i class="bi bi-calendar3"></i>
                  <span>{{ formatDate(edu.start_date) }} — {{ formatDate(edu.end_date) || 'Present' }}</span>
                </div>
              </div>


              <div v-if="edu.description" class="entry-description">
                <p>{{ edu.description }}</p>
              </div>
            </div>
          </InfoCard>
        </div>

        <BaseButton variant="secondary" block class="mt-2 add-edu-action" @click="onCreate">
          <i class="bi bi-plus-lg me-2"></i>
          Add Education History
        </BaseButton>
      </div>

      <!-- Empty State - Own Profile -->
      <div v-else class="empty-state-card" @click="onCreate">
        <div class="empty-icon-circle">
          <i class="bi bi-mortarboard"></i>
        </div>
        <h4>Academic Background</h4>
        <p>Share your educational journey and achievements here.</p>
        <BaseButton variant="primary" class="mt-4">Add Education</BaseButton>
      </div>
    </template>

    <!-- Education Cards - Viewing Other User's Profile (Read-Only) -->
    <template v-else>
      <div v-if="viewEducations.length" class="education-list">
        <div v-for="edu in viewEducations" :key="edu.id" class="education-item-group">
          <InfoCard :title="edu.school?.name || 'Education'" icon="bi bi-mortarboard-fill" :showCreate="false"
            :showUpdate="false" :showDelete="false">
            <div class="education-entry-content">
              <div class="entry-main-info">
                <div class="degree-highlight">
                  <span class="degree-title">{{ edu.degree?.name }}</span>
                  <span v-if="edu.subject?.name" class="entry-dot"></span>
                  <span v-if="edu.subject?.name" class="subject-title">{{ edu.subject?.name }}</span>
                </div>
                <div class="date-badge">
                  <i class="bi bi-calendar3"></i>
                  <span>{{ formatDate(edu.start_date) }} — {{ formatDate(edu.end_date) || 'Present' }}</span>
                </div>
              </div>
              <div v-if="edu.description" class="entry-description">
                <p>{{ edu.description }}</p>
              </div>
            </div>
          </InfoCard>
        </div>
      </div>

      <div v-else class="empty-state-card guest">
        <div class="empty-icon-circle">
          <i class="bi bi-mortarboard light-dark"></i>
        </div>
        <p>No education history available for this user.</p>
      </div>
    </template>

    <!-- UPDATE MODAL -->
    <BaseModal v-if="addNewEducation" :title="isEditMode ? 'Update Education' : 'Add New Education'"
      @close="closeAddNewEducation" size="lg">
      <div class="education-form-container">
        <div class="mb-4">
          <BaseSelect v-model="school" label="School / University" placeholder="Search school..."
            :options="schoolStore.schools.map((s) => ({ value: s.id, label: s.name }))" :error="errors.school"
            @change="validateSchool" :required="true" />
        </div>

        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <BaseSelect v-model="degree" label="Degree" placeholder="Select degree"
              :options="degreeStore.degrees.map((d) => ({ value: d.id, label: d.name }))" :error="errors.degree"
              @change="validateDegree" :required="true" />
          </div>
          <div class="col-md-6">
            <BaseSelect v-model="subject" label="Field of Study" placeholder="Select subject"
              :options="subjectStore.subjects.map((s) => ({ value: s.id, label: s.name }))" :error="errors.subject"
              @change="validateSubject" :required="true" />
          </div>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <BaseInput type="date" label="Start Date" placeholder="YYYY-MM" v-model="start_date"
              :error="errors.start_date" @input="validateStartDate" :required="true" />
          </div>
          <div class="col-md-6">
            <BaseInput type="date" label="End Date" placeholder="YYYY-MM or Present" v-model="end_date" />
          </div>
        </div>

        <div class="mb-0">
          <label class="form-label d-block mb-2 fw-bold small text-uppercase light-dark">Description</label>
          <textarea class="form-control light-dark "
            placeholder="Describe your achievements, participation or relevant courses..." rows="5"
            v-model="description"></textarea>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="closeAddNewEducation">Cancel</BaseButton>
        <BaseButton variant="primary" @click="HandleAddNewEducation" :isLoading="isLoading">
          {{ isEditMode ? 'Update Education' : 'Save Education' }}
        </BaseButton>
      </template>
    </BaseModal>

    <!-- DELETE CONFIRMATION MODAL -->
    <BaseModal v-if="deleteModal" title="Confirm Removal" @close="closeDeleteModal">
      <div class="delete-confirmation-body">
        <div class="warning-ring">
          <i class="bi bi-trash3-fill"></i>
        </div>
        <h4 class="light-dark">Are you sure?</h4>
        <p class="light-dark">You are about to remove your education details at <strong>{{
          selectedEducationForDelete?.school?.name
            }}</strong>.</p>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="closeDeleteModal">Cancel</BaseButton>
        <BaseButton variant="danger" @click="confirmDeleteEducation" :isLoading="isDeleting">Yes, Remove</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseModal from '@/components/ui/base/BaseModal.vue'
import BaseButton from '@/components/ui/base/BaseButton.vue'
import BaseInput from '@/components/ui/base/BaseInput.vue'
import BaseSelect from '@/components/ui/base/BaseSelect.vue'
import InfoCard from '../InfoCard.vue'
import { useProfileStore } from '@/stores/profile'
import { useEducationStore } from '@/stores/education'
import { useSchoolStore } from '@/stores/schools'
import { useDegreeStore } from '@/stores/degrees'
import { useSubjectStore } from '@/stores/subjects'
import { useRequiredValidator } from '@/composables/useRequiredValidator'

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
const isDeleting = ref(false)
const selectedEducation = ref(null)
const deleteModal = ref(false)
const selectedEducationForDelete = ref(null)

const { errors, validateField } = useRequiredValidator()

const school = ref(null)
const degree = ref(null)
const subject = ref(null)
const start_date = ref('')
const end_date = ref('')
const description = ref('')

const validateSchool = () => validateField('school', school.value, 'School is required')
const validateDegree = () => validateField('degree', degree.value, 'Degree is required')
const validateSubject = () => validateField('subject', subject.value, 'Field of study is required')
const validateStartDate = () => validateField('start_date', start_date.value, 'Start date is required')

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
  start_date.value = edu.start_date && edu.start_date.length === 7 ? `${edu.start_date}-01` : (edu.start_date || '')
  end_date.value = edu.end_date && edu.end_date.length === 7 ? `${edu.end_date}-01` : (edu.end_date || '')
  description.value = edu.description || ''

  addNewEducation.value = true
}

const onDelete = (edu) => {
  selectedEducationForDelete.value = edu
  deleteModal.value = true
}

const closeDeleteModal = () => {
  deleteModal.value = false
  selectedEducationForDelete.value = null
}

const confirmDeleteEducation = async () => {
  try {
    isDeleting.value = true
    await educationStore.DeleteEducation(selectedEducationForDelete.value.id)
    await profileStore.fetchProfile()
    closeDeleteModal()
  } catch (e) {
    console.log(e)
  } finally {
    isDeleting.value = false
  }
}

const HandleAddNewEducation = async () => {
  const isSchoolValid = validateSchool()
  const isDegreeValid = validateDegree()
  const isSubjectValid = validateSubject()
  const isStartDateValid = validateStartDate()

  if (!isSchoolValid || !isDegreeValid || !isSubjectValid || !isStartDateValid) {
    return
  }

  isLoading.value = true

  const payload = {
    school_id: school.value,
    degree_id: degree.value,
    subject_id: subject.value,
    start_date: start_date.value ? start_date.value.slice(0, 7) : '',
    end_date: end_date.value ? end_date.value.slice(0, 7) : '',
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

const formatDate = (date) => {
  if (!date || date === '') return ''

  const dateStr = String(date)

  if (dateStr.length === 7 && dateStr.includes('-')) return dateStr

  if (dateStr.length > 7) return dateStr.slice(0, 7)

  return dateStr
}

onMounted(async () => {
  if (isOwnProfile.value && !profileStore.user) {
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
textarea::placeholder {
  color: var(--input-placeholder);
}

.education-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.education-entry-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.entry-main-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.degree-highlight {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.degree-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
}

.entry-dot {
  width: 5px;
  height: 5px;
  background: var(--color-primary);
  border-radius: 50%;
  opacity: 0.5;
}

.subject-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
}

.date-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--color-accent);
  border-radius: 10px;
  font-size: 0.825rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  width: fit-content;
}

.date-badge i {
  color: var(--color-primary);
}

/* THE PROFESSIONAL EDIT BUTTON */
.entry-actions-row {
  margin-top: 0.5rem;
}

.professional-edit-btn {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 8px 16px 8px 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #ffffff;
}

.professional-edit-btn:hover {
  background: #252525;
  border-color: var(--color-primary);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-icon-square {
  width: 36px;
  height: 36px;
  background: #333333;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

.btn-label {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.entry-description {
  background: var(--color-accent);
  padding: 1.25rem;
  border-radius: 16px;
  border-left: 4px solid var(--color-primary);
}

.entry-description p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
  white-space: pre-line;
}

.empty-state-card {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--color-accent);
  border-radius: 24px;
  border: 2px dashed var(--color-border);
  cursor: pointer;
}

.empty-icon-circle {
  width: 80px;
  height: 80px;
  background: var(--color-surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--color-primary);
  margin: 0 auto 1.5rem;
  box-shadow: var(--shadow-md);
}

.empty-state-card h4 {
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.empty-state-card p {
  color: var(--color-muted);
}

.add-new-edu-btn {
  border-radius: 16px !important;
  font-weight: 700 !important;
  padding: 1.25rem !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.85rem !important;
}

.education-form-container textarea {
  border-radius: 14px;
  border: 1px solid var(--color-border);
  padding: 16px;
  background: var(--color-surface);
  line-height: 1.6;
}

/* Delete Modal Styling */
.delete-confirmation-body {
  text-align: center;
  padding: 1rem 0;
}

.warning-ring {
  width: 72px;
  height: 72px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  color: var(--color-danger);
  margin: 0 auto 1.5rem;
  animation: pulse-danger 2s infinite;
}

@keyframes pulse-danger {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
  }

  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

@media (max-width: 768px) {
  .degree-highlight {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .entry-dot {
    display: none;
  }
}
</style>
