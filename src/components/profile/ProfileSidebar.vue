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
      <p>Email: simvin@mail.com</p>
      <p>Cambodia</p>
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
      <p>Web Developer</p>
      <p>Researcher</p>
    </InfoCard>

    <!-- Modal for Update Professional Info -->
    <BaseModal
      v-if="professionalUpdate"
      title="Update Profession Info"
      @close="closeProfessionalUpdate"
    >
      <BaseInput label="Job Title" placeholder="e.g Software Engineering" />
      <BaseInput label="Company Name" placeholder="e.g Chipmong Group" />
      <BaseInput
        label="Responsibilities"
        placeholder="Describe your Responsibilities and achivements.."
      />

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeProfessionalUpdate">Cancel</button>
        <button class="btn btn-dark" @click="HandleUpdateProfessional">Save Changes</button>
      </template>
    </BaseModal>

    <!-- ======== Skills - UPDATE ======== -->
    <InfoCard
      title="Skills"
      icon="bi bi-lightning"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @update="UpdateSkill"
    >
      <span class="badge bg-secondary me-1">Vue</span>
      <span class="badge bg-secondary">Nuxt</span>
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
      icon="bi bi-folder"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @create="AddProject"
    >
      <p>8 Projects</p>
    </InfoCard>

    <!-- Modal for Project -CUD -->
    <!-- Add New Project -->
    <BaseModal v-if="addNewProject" title="Create New Project" @close="closeAddNewProject">
      <BaseInput label="Project Title" placeholder="Enter Your Project Title" />
      <BaseInput label="Project Link " placeholder="Enter Your Project Link" />

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeAddNewProject">Cancel</button>
        <button class="btn btn-dark" @click="HandleAddNewProject">Save Changes</button>
      </template>
    </BaseModal>

    <!-- ======== Education - CREATE, UPDATE, DELETE ======== -->
    <InfoCard
      title="Education"
      icon="bi bi-mortarboard"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @update="updateEducation"
    >
      <p>Bachelor Degree</p>
    </InfoCard>

    <!-- Modal for Education -CUD -->
    <!-- Add New Education -->
    <BaseModal v-if="addNewEducation" title="Add New Education" @close="closeAddNewEducation">
      <BaseSelect
        v-model="level"
        label="Skill Level"
        placeholder="Select level"
        :options="[
          { value: 'junior', label: 'Junior' },
          { value: 'mid', label: 'Mid' },
          { value: 'senior', label: 'Senior' },
        ]"
      />
      <BaseInput label="Project Link " placeholder="Enter Your Project Link" />

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeAddNewEducation">Cancel</button>
        <button class="btn btn-dark" @click="HandleAddNewEducation">Save Changes</button>
      </template>
    </BaseModal>
  </aside>
</template>

<script setup>
import InfoCard from '@/components/profile/InfoCard.vue'
import TomSelect from '@/components/ui/base/BaseTomSelect.vue'
import { ref } from 'vue'

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
const addNewProject = ref(false)
function closeAddNewProject() {
  addNewProject.value = false
}

function AddProject() {
  addNewProject.value = true
}

const HandleAddNewProject = () => {
  alert('Successfully')
  addNewProject.value = false
}

// Education Add New
const addNewEducation = ref(false)
const closeAddNewEducation = () => {
  addNewEducation.value = false;
}

function AddEducation() {
  addNewEducation.value = true;
}

const HandleAddNewEducation = () => {
  alert('Successfully');
  addNewEducation.value = false
}

</script>