<template>
  <aside>
    <!-- ======== Personal Info - Only UPDATE ======== -->
    <InfoCard
      title="Personal"
      icon="bi bi-person"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @update="UpdatePersonal"
    >
      <div class="personal-info-data">
        <p class="mb-2"><i class="bi bi-person me-2"></i>{{ profileStore.user?.full_name }}</p>
        <p class="mb-2"><i class="bi bi-calendar3 me-2"></i>{{ profileStore.user?.dob }}</p>
        <p class="mb-2">
          <i class="bi bi-gender-ambiguous me-2"></i
          >{{ profileStore.user?.gender === 1 ? 'Male' : 'Female' }}
        </p>
        <p class="mb-2"><i class="bi bi-envelope me-2"></i>{{ profileStore.user?.email }}</p>
        <p class="mb-2"><i class="bi bi-telephone me-2"></i>{{ profileStore.user?.phone }}</p>
        <p class="mb-2"><i class="bi bi-geo-alt me-2"></i>{{ profileStore.user?.current_city }}</p>
        <p class="mb-0"><i class="bi bi-house me-2"></i>{{ profileStore.user?.home_town }}</p>
      </div>
    </InfoCard>

    <!-- Modal for Update Personal Info -->
    <BaseModal v-if="personalUpdate" title="Update Personal Info" @close="closePersonalUpdate">
      <BaseInput label="Full Name" placeholder="Enter Your Full Name" v-model="full_name" />
      <BaseInput label="Email" placeholder="Enter Your Email" v-model="email" />
      <BaseInput label="Phone" placeholder="Enter Your Phone Number" v-model="phone" />
      <BaseInput label="Date of Birth" placeholder="Enter Your Date of Birth" v-model="DOB" />
      <BaseInput label="Gender" placeholder="Enter Your Gender" v-model="gender" />
      <BaseInput
        label="Current City"
        placeholder="Enter Your Current City"
        v-model="current_city"
      />
      <BaseInput label="Hometown" placeholder="Enter Your Hometown" v-model="home_town" />
      <BaseInput
        label="Portfolio Link"
        placeholder="Enter Your Portfolio Link"
        v-model="portfolio_link"
      />

      <template #footer>
        <button class="btn btn-outline-dark" @click="closePersonalUpdate">Cancel</button>
        <button class="btn btn-dark" @click="HandleUpdatePersonal">Save Changes</button>
      </template>
    </BaseModal>

    <!-- ======== Professional Info - Only UPDATE ======== -->
    <InfoCard
      title="Professional"
      icon="bi bi-briefcase"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @update="UpdateProfessional"
    >
      <div class="professional-info-data">
        <p class="mb-2">
          <i class="bi bi-person-badge me-2"></i>{{ profileStore.user?.professional.job_title }}
        </p>
        <p class="mb-2">
          <i class="bi bi-building me-2"></i>{{ profileStore.user?.professional.company_name }}
        </p>
        <p class="mb-0 text-muted small">
          <i class="bi bi-card-text me-2"></i>{{ profileStore.user?.professional.responsibility }}
        </p>
      </div>
    </InfoCard>

    <!-- Modal for Update Professional Info -->
    <BaseModal
      v-if="professionalUpdate"
      title="Update Profession Info"
      @close="closeProfessionalUpdate"
    >
      <BaseInput label="Job Title" placeholder="e.g Software Engineering" v-model="job_title" />
      <BaseInput label="Company Name" placeholder="e.g Chipmong Group" v-model="company_name" />
      <div class="mb-2">
        <label class="mb-2 fw-semibold">Responsibilities</label>
        <textarea
          class="form-control"
          placeholder="Responsibilities"
          style="height: 100px"
          v-model="responsibility"
        ></textarea>
      </div>

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeProfessionalUpdate">Cancel</button>
        <button class="btn btn-dark" @click="HandleUpdateProfessional">Save Changes</button>
      </template>
    </BaseModal>

    <!-- ======== Skills - UPDATE ======== -->
    <InfoCard
      title="Skills"
      icon="bi bi-lightning-charge"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @update="UpdateSkill"
    >
      <div class="skills-info-data d-flex flex-wrap gap-2">
        <span
          class="badge bg-light text-dark border d-flex align-items-center"
          v-for="skill in profileStore.user?.skills"
          :key="skill.id"
        >
          <i class="bi bi-patch-check-fill text-primary me-1"></i>
          {{ skill.name }}
        </span>
      </div>
    </InfoCard>

    <!-- Modal for Update Skill -->
    <BaseModal v-if="skillUpdate" title="Update Your Skill" @close="closeSkillUpdate">
      <div class="pb-5 mb-5">
        <TomSelect
          v-model="skills"
          :options="skillOptions"
          multiple
          placeholder="Select skills..."
        />
      </div>

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeSkillUpdate">Cancel</button>
        <button class="btn btn-dark" @click="HandleUpdateSkill">Save Changes</button>
      </template>
    </BaseModal>

    <!-- ======== Projects - CREATE, UPDATE, DELETE ======== -->
    <InfoCard
      title="Projects"
      icon="bi bi-folder2-open"
      :showCreate="true"
      :showUpdate="false"
      :showDelete="false"
      @create="AddProject"
    >
      <div class="projects-info-data">
        <p v-for="project in profileStore.user?.projects" :key="project.id" class="mb-2">
          <i class="bi bi-folder2 me-2"></i>{{ project.title }}
        </p>
      </div>
    </InfoCard>

    <!-- Modal for Project -->
    <!-- Add New Project -->
    <BaseModal v-if="addNewProject" title="Create New Project" @close="closeAddNewProject">
      <BaseInput
        label="Project Title"
        placeholder="Enter Your Project Title"
        v-model="projectTitle"
      />
      <BaseInput
        label="Project Link "
        placeholder="Enter Your Project Link"
        v-model="projectLink"
      />

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeAddNewProject">Cancel</button>
        <button class="btn btn-dark" @click="HandleAddNewProject">
          {{ isLoading ? 'Adding New' : 'Add New' }}
        </button>
      </template>
    </BaseModal>

    <!-- ======== Education - CREATE, UPDATE, DELETE ======== -->
    <InfoCard
      title="Education"
      icon="bi bi-mortarboard"
      :showCreate="true"
      :showUpdate="false"
      :showDelete="false"
      @create="createEducation"
    >
      <div class="education-info-data">
        <p v-for="education in profileStore.user?.educations" :key="education.id" class="mb-2">
          <i class="bi bi-book me-2"></i>{{ education.school.name }}
        </p>
      </div>
    </InfoCard>

    <!-- Modal for Education -->
    <!-- Add New Education -->
    <BaseModal v-if="addNewEducation" title="Add New Education" @close="closeAddNewEducation">
      <BaseSelect
        v-model="school"
        label="School/University"
        placeholder="Select School"
        :options="[
          ...schoolStore.schools.map((school) => ({ value: school.id, label: school.name })),
        ]"
      />
      <div class="d-flex my-2">
        <div class="col-6 me-1">
          <BaseSelect
            v-model="degree"
            label="Degree"
            placeholder="Select Degree"
            :options="[
              ...degreeStore.degrees.map((degree) => ({ value: degree.id, label: degree.name })),
            ]"
          />
        </div>
        <div class="col-6 ms-1">
          <BaseSelect
            v-model="subject"
            label="Subject"
            placeholder="Select Subject"
            :options="[
              ...subjectStore.subjects.map((subject) => ({
                value: subject.id,
                label: subject.name,
              })),
            ]"
          />
        </div>
      </div>
      <div class="d-flex my-2">
        <div class="col-6 me-1">
          <BaseInput label="Start Date" placeholder="Year-Month" v-model="start_date" />
        </div>
        <div class="col-6 ms-1">
          <BaseInput label="End Date " placeholder="Year-Month" v-model="end_date" />
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
        <button class="btn btn-dark" @click="HandleAddNewEducation">
          {{ isLoading ? 'Adding New' : 'Add New' }}
        </button>
      </template>
    </BaseModal>
  </aside>
</template>

<script setup>
import InfoCard from '@/components/profile/InfoCard.vue'
import TomSelect from '@/components/ui/base/BaseTomSelect.vue'
import { useProfileStore } from '@/stores/profile'
import { ref, onMounted, computed } from 'vue'
import { useProjectStore } from '@/stores/project'
import { useEducationStore } from '@/stores/education'
import { useSchoolStore } from '@/stores/schools'
import { useDegreeStore } from '@/stores/degrees'
import { useSubjectStore } from '@/stores/subjects'
import { useSkillStore } from '@/stores/skills'
import { showSuccess, showError, showWarning } from '@/utils/toast'

const profileStore = useProfileStore()

onMounted(async () => {
  if (!profileStore.user) {
    try {
      const data = await profileStore.fetchProfile()
      console.log('Fetched Profile Data:', data)
      console.log('edu', await profileStore.user.educations[0].degree.name)
      // console.log(data.full_name)
    } catch (error) {
      console.error('Error fetching profile in header:', error)
    }
  } else {
    console.log('Profile Data already in store:', profileStore.user)
  }
})

/* ---------------- Personal Info ---------------- */
const personalUpdate = ref(false)
const full_name = ref('')
const email = ref('')
const phone = ref('')
const DOB = ref('')
const gender = ref('')
const current_city = ref('')
const home_town = ref('')
const portfolio_link = ref('')

function UpdatePersonal() {
  // Pre-fill current values from store
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

function closePersonalUpdate() {
  personalUpdate.value = false
}

const HandleUpdatePersonal = async () => {
  // Validation
  if (!full_name.value || !email.value) {
    showWarning('Full Name and Email are required!')
    return
  }

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

  try {
    await profileStore.updatePersonalInfo(payload)
    showSuccess('Personal info updated successfully!')
    personalUpdate.value = false
  } catch (error) {
    console.error(error)
    showError('Failed to update personal info!')
  }
}

/* ---------------- Professional Info ---------------- */
const professionalUpdate = ref(false)
const job_title = ref('')
const company_name = ref('')
const responsibility = ref('')

function UpdateProfessional() {
  const p = profileStore.user?.professional || {}
  job_title.value = p.job_title || ''
  company_name.value = p.company_name || ''
  responsibility.value = p.responsibility || ''
  professionalUpdate.value = true
}

function closeProfessionalUpdate() {
  professionalUpdate.value = false
}

const HandleUpdateProfessional = async () => {
  if (!job_title.value || !company_name.value) {
    showWarning('Job Title and Company Name are required!')
    return
  }

  const payload = {
    job_title: job_title.value,
    company_name: company_name.value,
    responsibility: responsibility.value,
  }

  try {
    await profileStore.updateProfessionalInfo(payload)
    showSuccess('Professional info updated successfully!')
    professionalUpdate.value = false
  } catch (error) {
    console.error(error)
    showError('Failed to update professional info!')
  }
}

/* ---------------- Stores ---------------- */
const skillStore = useSkillStore()

/* ---------------- Skill Modal State ---------------- */
const skillUpdate = ref(false)
const skills = ref([])

/* ---------------- Fetch Skills from API ---------------- */
onMounted(async () => {
  try {
    await skillStore.fetchSkills()
  } catch (error) {
    console.error('Failed to fetch skills:', error)
    showError('Failed to load skills from server!')
  }
})

/* ---------------- Convert Skills into TomSelect Options ---------------- */
const skillOptions = computed(() => {
  return skillStore.skills.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }))
})

/* ---------------- Open Skill Modal + Show Current Skills ---------------- */
function UpdateSkill() {
  // Pre-fill selected skills (IDs)
  skills.value = profileStore.user?.skills?.map((s) => s.id) || []

  skillUpdate.value = true
}

/* ---------------- Close Modal ---------------- */
function closeSkillUpdate() {
  skillUpdate.value = false
}

/* ---------------- Save Updated Skills ---------------- */
const HandleUpdateSkill = async () => {
  // Validation
  if (!skills.value.length) {
    showWarning('Please select at least one skill!')
    return
  }

  // Payload to backend
  const payload = {
    skill_ids: skills.value,
  }

  try {
    // ⚠️ Change this API method if your backend uses different endpoint
    await profileStore.updateProfessionalInfo(payload)

    showSuccess('Skills updated successfully!')
    skillUpdate.value = false
  } catch (error) {
    console.error('Skill update failed:', error)
    showError('Failed to update skills!')
  }
}

// Projects Add New
const projectStore = useProjectStore()

const projectTitle = ref('')
const projectLink = ref('')

const isLoading = ref(false)
const addNewProject = ref(false)
function closeAddNewProject() {
  addNewProject.value = false
}

function AddProject() {
  addNewProject.value = true
}

const HandleAddNewProject = async () => {
  if (!projectTitle.value || !projectLink.value) {
    alert('Please fill all fields!')
    return
  }
  isLoading.value = true

  try {
    const payload = {
      title: projectTitle.value,
      link: projectLink.value,
    }

    await projectStore.CreateProject(payload)

    addNewProject.value = false
    projectTitle.value = ''
    projectLink.value = ''
  } catch (error) {
    console.log('Fail to Create Prooject')
  } finally {
    isLoading.value = false
  }
}

// Education Add New
const educationStore = useEducationStore()

const schoolStore = useSchoolStore()
const degreeStore = useDegreeStore()
const subjectStore = useSubjectStore()

onMounted(() => {
  schoolStore.fetchSchools()
  degreeStore.fetchDegrees()
  subjectStore.fetchSubjects()
})

const school = ref('')
const degree = ref('')
const subject = ref('')
const start_date = ref('')
const end_date = ref('')
const description = ref('')

const addNewEducation = ref(false)
const closeAddNewEducation = () => {
  addNewEducation.value = false
}

function createEducation() {
  addNewEducation.value = true
}

const HandleAddNewEducation = async () => {
  if (!school.value || !degree.value || !subject.value) {
    alert('Please select all fields!')
    return
  }

  if (!start_date.value || !end_date.value) {
    alert('Please enter start and end date!')
    return
  }

  isLoading.value = true

  const payload = {
    school_id: school.value,
    degree_id: degree.value,
    subject_id: subject.value,
    start_date: start_date.value,
    end_date: end_date.value,
    description: description.value,
  }

  console.log('Education Payload:', payload)

  try {
    await educationStore.CreateEducation(payload)

    addNewEducation.value = false

    school.value = ''
    degree.value = ''
    subject.value = ''
    start_date.value = ''
    end_date.value = ''
    description.value = ''
  } catch (error) {
    console.log('Failed to Create Education:', error.response?.data)
    isLoading.value = true
  }
}
</script>
