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
      <BaseInput label="Full Name" placeholder="Enter Your Full Name" />
      <BaseInput label="Email" placeholder="Enter Your Email" />
      <BaseInput label="Phone" placeholder="Enter Your Phone Number" />
      <BaseInput label="Date of Birth" placeholder="Enter Your Date of Birth" />
      <BaseInput label="Gender" placeholder="Enter Your Gender" />
      <BaseInput label="Current City" placeholder="Enter Your Current City" />
      <BaseInput label="Hometown" placeholder="Enter Your Hometown" />
      <BaseInput label="Portfolio Link" placeholder="Enter Your Phone Number" />

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
      <BaseInput label="Job Title" placeholder="e.g Software Engineering" />
      <BaseInput label="Company Name" placeholder="e.g Chipmong Group" />
      <div class="mb-2">
        <label class="mb-2 fw-semibold">Responsibilities</label>
        <textarea
          class="form-control"
          placeholder="Responsibilities"
          style="height: 100px"
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
import { ref, onMounted } from 'vue'

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
import { useProjectStore } from '@/stores/project'
import { useEducationStore } from '@/stores/education'
import { useSchoolStore } from '@/stores/schools'
import { useDegreeStore } from '@/stores/degrees'
import { useSubjectStore } from '@/stores/subjects'

// Personal Info - Update
const personalUpdate = ref(false)
function closePersonalUpdate() {
  personalUpdate.value = false
}
function UpdatePersonal() {
  personalUpdate.value = true
}
const HandleUpdatePersonal = () => {
  alert('Successfully')
  personalUpdate.value = false
}

// Professional Info - Update
const professionalUpdate = ref(false)
function closeProfessionalUpdate() {
  professionalUpdate.value = false
}

function UpdateProfessional() {
  professionalUpdate.value = true
}

const HandleUpdateProfessional = () => {
  alert('Successfully')
  professionalUpdate.value = false
}

// Skill - Update
const skills = ref([])

const skillOptions = [
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'node', label: 'Node.js' },
  { value: 'php', label: 'PHP' },
]
const skillUpdate = ref(false)
function closeSkillUpdate() {
  skillUpdate.value = false
}

function UpdateSkill() {
  skillUpdate.value = true
}

const HandleUpdateSkill = () => {
  alert('Successfully')
  skillUpdate.value = false
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
