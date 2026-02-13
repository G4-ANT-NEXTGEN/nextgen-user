<template>
  <div class="professional-info-wrapper">
    <!-- Card When view own profile -->
    <InfoCard v-if="isOwnProfile" title="Professional Experience" icon="bi bi-briefcase-fill" :showCreate="false"
      :showUpdate="true" :showDelete="false" @update="UpdateProfessional">

      <div v-if="profileStore.user?.professional" class="professional-content">
        <div class="professional-item">
          <div class="item-icon">
            <i class="bi bi-person-workspace"></i>
          </div>
          <div class="item-body">
            <h4 class="item-title">{{ profileStore.user.professional.job_title }}</h4>
            <div class="item-company">
              <i class="bi bi-building me-1"></i>
              {{ profileStore.user.professional.company_name }}
            </div>
          </div>
        </div>

        <div v-if="profileStore.user.professional.responsibility" class="responsibility-section">
          <h5 class="section-label">Main Responsibilities</h5>
          <p class="responsibility-text">
            {{ profileStore.user.professional.responsibility }}
          </p>
        </div>
      </div>

      <div v-else class="empty-professional">
        <div class="empty-icon">
          <i class="bi bi-briefcase"></i>
        </div>
        <p>No professional history has been recorded yet.</p>
      </div>
    </InfoCard>

    <!-- Card When view other user's profile -->
    <InfoCard v-else title="Professional Experience" icon="bi bi-briefcase-fill" :showCreate="false" :showUpdate="false"
      :showDelete="false">
      <div v-if="userData?.professional" class="professional-content">
        <div class="professional-item">
          <div class="item-icon">
            <i class="bi bi-person-workspace"></i>
          </div>
          <div class="item-body">
            <h4 class="item-title">{{ userData.professional.job_title }}</h4>
            <div class="item-company">
              <i class="bi bi-building me-1"></i>
              {{ userData.professional.company_name }}
            </div>
          </div>
        </div>

        <div v-if="userData.professional.responsibility" class="responsibility-section">
          <h5 class="section-label">Main Responsibilities</h5>
          <p class="responsibility-text">
            {{ userData.professional.responsibility }}
          </p>
        </div>
      </div>

      <div v-else class="empty-professional">
        <div class="empty-icon">
          <i class="bi bi-briefcase"></i>
        </div>
        <p>This user hasn't shared their professional history yet.</p>
      </div>
    </InfoCard>

    <!-- Update Professional Info Modal -->
    <BaseModal size="lg" v-if="showUpdateModal" title="Update Professional Info" @close="closeUpdateModal">
      <div class="professional-form">
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <BaseInput label="Job Title" placeholder="e.g. Senior Product Designer" v-model="form.job_title"
              :error="errors.job_title" @input="validateJobTitle" />
          </div>
          <div class="col-md-6">
            <BaseInput label="Company Name" placeholder="e.g. Acme Corporation" v-model="form.company_name"
              :error="errors.company_name" @input="validateCompanyName" />
          </div>
        </div>
        <div class="mb-0">
          <label class="form-label fw-bold small text-uppercase">Responsibilities</label>
          <textarea class="form-control" rows="5" placeholder="Describe your key responsibilities and achievements..."
            v-model="form.responsibility"></textarea>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="closeUpdateModal">Cancel</BaseButton>
        <BaseButton variant="primary" @click="HandleSaveProfessional" :isLoading="isSaving">
          Save Changes
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, reactive } from 'vue'
import { useProfileStore } from '@/stores/profile'
import InfoCard from '../InfoCard.vue'
import BaseModal from '@/components/ui/base/BaseModal.vue'
import BaseInput from '@/components/ui/base/BaseInput.vue'
import BaseButton from '@/components/ui/base/BaseButton.vue'
import { useRequiredValidator } from '@/composables/useRequiredValidator'
import { showError } from '@/utils/toast'

const props = defineProps({
  userData: {
    type: Object,
    default: null
  }
})

const profileStore = useProfileStore()
const showUpdateModal = ref(false)
const isSaving = ref(false)

const { errors, validateField } = useRequiredValidator()

const form = reactive({
  job_title: '',
  company_name: '',
  responsibility: ''
})

const validateJobTitle = () => validateField('job_title', form.job_title, 'Job title is required')
const validateCompanyName = () => validateField('company_name', form.company_name, 'Company name is required')

const isOwnProfile = computed(() => {
  return !props.userData
})

const UpdateProfessional = () => {
  const p = profileStore.user?.professional
  form.job_title = p?.job_title || ''
  form.company_name = p?.company_name || ''
  form.responsibility = p?.responsibility || ''
  showUpdateModal.value = true
}

const closeUpdateModal = () => {
  showUpdateModal.value = false
}

const HandleSaveProfessional = async () => {
  const isJobTitleValid = validateJobTitle()
  const isCompanyNameValid = validateCompanyName()

  if (!isJobTitleValid || !isCompanyNameValid) {
    return
  }

  try {
    isSaving.value = true
    await profileStore.updateProfessionalInfo({
      job_title: form.job_title,
      company_name: form.company_name,
      responsibility: form.responsibility
    })
    showUpdateModal.value = false
  } catch {
    showError('Failed to update professional info')
  } finally {
    isSaving.value = false
  }
}

onMounted(async () => {
  if (isOwnProfile.value && !profileStore.user) {
    try {
      await profileStore.fetchProfile()
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }
})
</script>

<style scoped>
.professional-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.professional-item {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.item-icon {
  width: 48px;
  height: 48px;
  background: var(--color-accent);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-size: 1.25rem;
  flex-shrink: 0;
}

.item-body {
  flex: 1;
}

.item-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.item-company {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
}

.responsibility-section {
  padding: 1.25rem;
  background: var(--color-accent);
  border-radius: 16px;
  border-left: 4px solid var(--color-primary);
}

.section-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-primary);
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.responsibility-text {
  font-size: 0.925rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 0;
  white-space: pre-line;
}

.empty-professional {
  text-align: center;
  padding: 2.5rem 1rem;
  background: var(--color-accent);
  border-radius: 20px;
  border: 2px dashed var(--color-border);
}

.empty-icon {
  font-size: 2rem;
  color: var(--color-muted);
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-professional p {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin: 0;
}

/* Form Styles */
.professional-form textarea {
  border-radius: 12px;
  border: 1px solid var(--color-border);
  padding: 12px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: var(--color-surface);
  color: var(--color-text);
}

.professional-form textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.1);
  outline: none;
}

.form-label {
  margin-bottom: 0.5rem;
  display: block;
}
</style>
