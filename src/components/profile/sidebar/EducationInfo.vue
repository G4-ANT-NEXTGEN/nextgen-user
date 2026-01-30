<template>
  <div>
    <InfoCard
      title="Education"
      icon="bi bi-mortarboard"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="true"
      @update="UpdateEducation"
    >
      <div
        v-for="education in profileStore.user?.educations"
        :key="education.id"
        class="education-card mb-3"
      >
        <!-- School Name -->
        <div class="info-row school">
          <i class="bi bi-building icon"></i>
          <h4 class="school-name">{{ education.school?.name }}</h4>
        </div>

        <!-- Degree -->
        <div class="info-row">
          <i class="bi bi-mortarboard icon"></i>
          <span class="degree-text">{{ education.degree?.name }}</span>
        </div>

        <!-- Subject -->
        <div v-if="education.subject?.name" class="info-row">
          <i class="bi bi-book icon"></i>
          <span class="subject-text">{{ education.subject?.name }}</span>
        </div>

        <!-- Date Range -->
        <div class="info-row">
          <i class="bi bi-calendar3 icon"></i>
          <span class="date-text"
            >{{ education.start_date }} - {{ education.end_date || 'Present' }}</span
          >
        </div>

        <!-- Description -->
        <div v-if="education.description" class="info-row description-row">
          <i class="bi bi-info-circle icon"></i>
          <p class="description-text">{{ education.description }}</p>
        </div>
      </div>

      <div v-if="!profileStore.user?.educations?.length" class="no-data">
        <p>No education info available</p>
      </div>
    </InfoCard>

    <BaseModal v-if="educationUpdate" title="Update Education Info" @close="closeEducationUpdate">
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
          <BaseInput label="Start Date" placeholder="2023/02" v-model="start_date" />
        </div>
        <div class="col-6 ms-1">
          <BaseInput label="End Date " placeholder="2023/02" v-model="end_date" />
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
        <button class="btn btn-outline-dark" @click="closeEducationUpdate">Cancel</button>
        <button class="btn btn-dark" @click="HandleUpdateEducation">Save Changes</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import BaseModal from '@/components/ui/base/BaseModal.vue'
import InfoCard from '../InfoCard.vue'
import { onMounted, ref } from 'vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()

onMounted(async () => {
  if (!profileStore.user) {
    try {
      await profileStore.fetchProfile()
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }
})
const educationUpdate = ref(false)
function UpdateEducation() {
  educationUpdate.value = true
}

function closeEducationUpdate() {
  educationUpdate.value = false
}

function HandleUpdateEducation() {
  alert('Successfully')
  educationUpdate.value = false
}

function DeleteEducation() {
  alert('Are you want to delete this shit?')
}
</script>

<style scoped>
.education-card {
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
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

.info-row.school {
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.icon {
  font-size: 1rem;
  color: #000;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.school-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.degree-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.subject-text {
  font-size: 0.875rem;
  color: #4b5563;
}

.date-text {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
}

.description-row {
  align-items: flex-start;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.description-row .icon {
  margin-top: 2px;
}

.description-text {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
  line-height: 1.6;
}
</style>

