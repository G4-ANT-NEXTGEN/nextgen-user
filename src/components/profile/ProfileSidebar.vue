<template>
  <div class="profile-sidebar-wrapper">
    <!-- Show skeleton while loading -->
    <InfoCardSkeleton v-if="isLoadingProfile" />

    <template v-else>
      <!-- Card 1: Contact Information -->
      <div class="sidebar-card contact-card">
        <div class="card-header-flex">
          <h3 class="card-title">Contact Information</h3>
          <button class="edit-btn-minimal" @click="UpdatePersonal">
            <i class="bi bi-pencil-square"></i>
          </button>
        </div>

        <div class="contact-list">
          <div class="contact-item">
            <i class="bi bi-envelope-fill"></i>
            <span>{{ profileStore.user?.email || 'email@example.com' }}</span>
          </div>
          <div class="contact-item">
            <i class="bi bi-telephone-fill"></i>
            <span>{{ profileStore.user?.phone || '+855 123 456 789' }}</span>
          </div>
          <div class="contact-item">
            <i class="bi bi-geo-alt-fill"></i>
            <span>{{ profileStore.user?.current_city || 'Not set' }}</span>
          </div>
        </div>

        <div class="contact-actions">
          <BaseButton variant="primary" class="action-btn" @click="openEditCollaboration">
            <i class="bi bi-people-fill"></i>
            <span>Collaboration</span>
          </BaseButton>
          <BaseButton variant="secondary" class="action-btn" @click="openEditCV">
            <i class="bi bi-file-earmark-arrow-up-fill"></i>
            <span>Upload CV</span>
          </BaseButton>
        </div>
      </div>

      <!-- Card 3: Professional Skills -->
      <div class="sidebar-card skills-card">
        <div class="card-header-flex">
          <h3 class="card-title">
            <i class="bi bi-code-slash me-2 text-primary"></i>
            Professional Skills
          </h3>
          <button class="edit-btn-minimal" @click="UpdateSkill">
            <i class="bi bi-pencil-square"></i>
          </button>
        </div>

        <div class="skills-list">
          <span v-for="skill in profileStore.user?.skills" :key="skill.id" class="skill-tag">
            <i class="bi bi-lightning-charge-fill me-1 text-warning small"></i>
            {{ skill.name }}
          </span>
          <div v-if="!profileStore.user?.skills?.length" class="empty-state">
            <p>No skills added yet.</p>
          </div>
        </div>
      </div>

      <!-- Card 4: More Details (Education & Projects Link) -->
      <div class="sidebar-card info-summary">
        <h3 class="card-title">Education Summary</h3>
        <div class="summary-list">
          <div v-for="edu in profileStore.user?.educations?.slice(0, 2)" :key="edu.id" class="summary-item">
            <i class="bi bi-mortarboard-fill"></i>
            <div>
              <div class="item-title">{{ edu.school?.name }}</div>
              <div class="item-sub">{{ edu.degree?.name }} • {{ edu?.end_date }}</div>
            </div>
          </div>
          <div v-if="!profileStore.user?.educations?.length" class="text-muted small italic">
            No education history added.
          </div>
        </div>
        <button class="view-more-btn" @click="openAddNewEducation">
          <i class="bi bi-plus-circle me-2"></i> Add Education
        </button>
      </div>
    </template>

    <!-- ======== Modals (Restored Functionality) ======== -->

    <!-- Update Personal Info Modal -->
    <BaseModal size="lg" v-if="personalUpdate" title="Update Personal Info" @close="closePersonalUpdate">
      <div class="row g-3">
        <div class="col-md-6">
          <BaseInput label="Full Name" placeholder="Enter Your Full Name" v-model="full_name" @input="validateFullName" :error="errors.full_name" />
        </div>
        <div class="col-md-6">
          <BaseInput label="Email" placeholder="Enter Your Email" v-model="email" type="email"  @input="validateEmail" :error="errors.email"/>
        </div>
        <div class="col-md-6">
          <BaseInput label="Phone" placeholder="Enter Your Phone Number" v-model="phone" />
        </div>
        <div class="col-md-6">
          <BaseInput label="Date of Birth" placeholder="Enter Your Date of Birth" v-model="DOB" />
        </div>
        <div class="col-md-6">
          <label class="form-label">Gender</label>
          <select v-model="gender" class="form-control">
            <option value="" disabled>Select Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="col-md-6">
          <BaseInput label="Current City" placeholder="Enter Your Current City" v-model="current_city" />
        </div>
        <div class="col-md-6">
          <BaseInput label="Hometown" placeholder="Enter Your Hometown" v-model="home_town" />
        </div>
        <div class="col-md-6">
          <BaseInput label="Portfolio Link" placeholder="Enter Your Portfolio Link" v-model="portfolio_link" />
        </div>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="closePersonalUpdate">Cancel</BaseButton>
        <BaseButton variant="primary" @click="HandleUpdatePersonal">Save Changes</BaseButton>
      </template>
    </BaseModal>

    <!-- Update Skill Modal -->
    <BaseModal v-if="skillUpdate" title="Update Your Skills" @close="closeSkillUpdate">
      <div class="pb-5 mb-5">
        <TomSelect v-model="skills" :options="skillOptions" multiple placeholder="Select skills..." />
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="closeSkillUpdate">Cancel</BaseButton>
        <BaseButton variant="primary" @click="HandleUpdateSkill">Save Changes</BaseButton>
      </template>
    </BaseModal>

    <!-- Add Education Modal -->
    <BaseModal v-if="addNewEducation" title="Add New Education" @close="closeAddNewEducation">
      <BaseSelect v-model="school" label="School/University" placeholder="Select School" :options="schoolOptions" />
      <div class="row g-3 my-2">
        <div class="col-6">
          <BaseSelect v-model="degree" label="Degree" placeholder="Select Degree" :options="degreeOptions" />
        </div>
        <div class="col-6">
          <BaseSelect v-model="subject" label="Subject" placeholder="Select Subject" :options="subjectOptions" />
        </div>
      </div>
      <div class="row g-3 my-2">
        <div class="col-6">
          <BaseInput label="Start Date" placeholder="Year-Month" v-model="start_date" />
        </div>
        <div class="col-6">
          <BaseInput label="End Date " placeholder="Year-Month" v-model="end_date" />
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Description</label>
        <textarea class="form-control" placeholder="Description" style="height: 100px" v-model="description"></textarea>
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="closeAddNewEducation">Cancel</BaseButton>
        <BaseButton variant="primary" @click="HandleAddNewEducation" :isLoading="isLoading">
          Add Education
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useSkillStore } from '@/stores/skills'
import { useSchoolStore } from '@/stores/schools'
import { useDegreeStore } from '@/stores/degrees'
import { useSubjectStore } from '@/stores/subjects'
import { useEducationStore } from '@/stores/education'
import { showSuccess, showError, showWarning } from '@/utils/toast'
import BaseButton from '@/components/ui/base/BaseButton.vue'
import BaseModal from '@/components/ui/base/BaseModal.vue'
import BaseInput from '@/components/ui/base/BaseInput.vue'
import BaseSelect from '@/components/ui/base/BaseSelect.vue'
import TomSelect from '@/components/ui/base/BaseTomSelect.vue'
import InfoCardSkeleton from './InfoCardSkeleton.vue'
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import { usePasswordValidator } from '@/composables/usePasswordValidator';

const { errors, validateField } = useRequiredValidator()
const { validatePassword: checkPassword, validatePasswordMatch } = usePasswordValidator()

const profileStore = useProfileStore()
const skillStore = useSkillStore()
const schoolStore = useSchoolStore()
const degreeStore = useDegreeStore()
const subjectStore = useSubjectStore()
const educationStore = useEducationStore()

const isLoadingProfile = ref(true)
const isLoading = ref(false)

const emit = defineEmits(['open-cv', 'open-collab'])

onMounted(async () => {
  try {
    isLoadingProfile.value = true
    if (!profileStore.user) await profileStore.fetchProfile()
    await Promise.all([
      skillStore.fetchSkills(),
      schoolStore.fetchSchools(),
      degreeStore.fetchDegrees(),
      subjectStore.fetchSubjects()
    ])
  } catch (error) {
    console.error('Error initializing sidebar:', error)
  } finally {
    isLoadingProfile.value = false
  }
})

/* --- CV & Collaboration (Emitted to Header) --- */
const openEditCV = () => emit('open-cv')
const openEditCollaboration = () => emit('open-collab')


/* --- Personal Info --- */
const personalUpdate = ref(false)
const full_name = ref('')
const email = ref('')
const phone = ref('')
const DOB = ref('')
const gender = ref('')
const current_city = ref('')
const home_town = ref('')
const portfolio_link = ref('')

const UpdatePersonal = () => {
  const u = profileStore.user
  full_name.value = u?.full_name || ''
  email.value = u?.email || ''
  phone.value = u?.phone || ''
  DOB.value = u?.dob || ''
  gender.value = u?.gender || ''
  current_city.value = u?.current_city || ''
  home_town.value = u?.home_town || ''
  portfolio_link.value = u?.portfolio_link || ''
  personalUpdate.value = true
}
const validateFullName = () =>{
  if(!full_name.value){
    errors.full_name='Name is required'
    return false
  }
  errors.full_name=''
  return true

}
const validateEmail = () => {
  if(!email.value){
    errors.email='Email is required, example@gmail.com'
    return false
  }
  errors.email=''
  return true
}

const closePersonalUpdate = () => personalUpdate.value = false

const HandleUpdatePersonal = async () => {
  if (!validateEmail() || !validateFullName())
    return

  try {
    const payload = {
      full_name: full_name.value,
      email: email.value,
      phone: phone.value,
      dob: DOB.value,
      gender: gender.value,
      current_city: current_city.value,
      home_town: home_town.value,
      portfolio_link: portfolio_link.value,
    }
    await profileStore.updatePersonalInfo(payload)
    showSuccess('Profile updated successfully!')
    personalUpdate.value = false
  } catch {
    showError('Failed to update profile!')
  }
}

/* --- Skills --- */
const skillUpdate = ref(false)
const skills = ref([])
const skillOptions = computed(() => skillStore.skills.map(s => ({ value: s.id, label: s.name })))

const UpdateSkill = () => {
  skills.value = profileStore.user?.skills?.map(s => s.id) || []
  skillUpdate.value = true
}
const closeSkillUpdate = () => skillUpdate.value = false
const HandleUpdateSkill = async () => {
  if (!skills.value.length) return showWarning('Select a skill!')
  try {
    await profileStore.updateProfessionalInfo({ skill_ids: skills.value })
    showSuccess('Skills updated!')
    skillUpdate.value = false
  } catch {
    showError('Failed to update skills!')
  }
}

/* --- Education --- */
const addNewEducation = ref(false)
const school = ref('')
const degree = ref('')
const subject = ref('')
const start_date = ref('')
const end_date = ref('')
const description = ref('')

const schoolOptions = computed(() => schoolStore.schools.map(s => ({ value: s.id, label: s.name })))
const degreeOptions = computed(() => degreeStore.degrees.map(d => ({ value: d.id, label: d.name })))
const subjectOptions = computed(() => subjectStore.subjects.map(s => ({ value: s.id, label: s.name })))

const openAddNewEducation = () => addNewEducation.value = true
const closeAddNewEducation = () => addNewEducation.value = false

const HandleAddNewEducation = async () => {
  if (!school.value || !degree.value) return showWarning('Required fields missing!')
  try {
    isLoading.value = true
    await educationStore.CreateEducation({
      school_id: school.value,
      degree_id: degree.value,
      subject_id: subject.value,
      start_date: start_date.value,
      end_date: end_date.value,
      description: description.value,
    })
    showSuccess('Education added!')
    addNewEducation.value = false
  } catch {
    showError('Failed to add education!')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.profile-sidebar-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: var(--color-surface);
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sidebar-card:hover {
  box-shadow: var(--shadow-md);
}

.card-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

/* Contact Details */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  margin-bottom: 1.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
}

.contact-item i {
  width: 32px;
  height: 32px;
  background: var(--color-accent);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-size: 1rem;
}

.contact-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem !important;
  border-radius: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em;
}

/* Skills Section */
.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  background: var(--color-accent);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  display: flex;
  align-items: center;
}

.edit-btn-minimal {
  width: 32px;
  height: 32px;
  background: var(--color-accent);
  border: none;
  border-radius: 8px;
  color: var(--color-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.edit-btn-minimal:hover {
  background: var(--color-primary);
  color: #fff;
}

/* Summary Items */
.summary-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.summary-item {
  display: flex;
  gap: 1rem;
}

.summary-item i {
  font-size: 1.5rem;
  color: var(--color-primary);
  opacity: 0.7;
}

.item-title {
  font-weight: 700;
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.4;
}

.item-sub {
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-top: 0.15rem;
}

.view-more-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--color-accent);
  border: 1px dashed var(--color-border);
  border-radius: 12px;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.view-more-btn:hover {
  background: var(--color-border);
  border-style: solid;
}

.empty-state {
  padding: 1rem 0;
  text-align: center;
  color: var(--color-muted);
  font-size: 0.9rem;
  font-style: italic;
}
</style>
