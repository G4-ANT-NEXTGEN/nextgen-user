<template>
  <ProfileHeaderSkeleton v-if="profileStore.isLoading" />
  <div v-else class="profile-header-wrapper">
    <!-- Cover & Identity Section -->
    <div class="header-main">
      <div class="cover-area">
        <div v-if="!profileStore.user?.cover" class="cover-grid"></div>
        <img v-else-if="profileStore.user?.cover" :src="profileStore.user?.cover" alt="Profile Cover"
          class="cover-image" />
        <div class="cover-overlay"></div>

        <button class="cover-edit-trigger" @click="openEditCover">
          <i class="bi bi-camera-fill"></i>
          <span>Add cover photo</span>
        </button>
      </div>

      <!-- Profile Info Section - Below Cover -->
      <div class="profile-info-section mt-3">
        <div class="profile-container">
          <!-- Avatar - Overlapping Cover -->
          <div class="avatar-box">
            <div class="avatar-ring">
              <img :src="profileStore.user?.avatar" alt="Profile Avatar" class="profile-avatar" />
            </div>
            <button class="avatar-edit-trigger" @click="showImageCropper = true">
              <i class="bi bi-camera-fill"></i>
            </button>
          </div>

          <!-- Name and Info -->
          <div class="identity-details">
            <h1 class="display-name">{{ profileStore.user?.full_name || 'Loading...' }}</h1>
            <p class="role-text">{{ profileStore.user?.positions?.[0]?.name || 'Freelancer' }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="identity-actions">
            <BaseButton @click="openChangePassAndDeleteAcc" variant="secondary" class="settings-btn">
              <i class="bi bi-gear-fill"></i>
            </BaseButton>

          </div>
        </div>
      </div>

      <!-- Navigation Bar -->
      <div class="header-nav">
        <div class="nav-links">
          <button v-for="tab in tabs" :key="tab.key" :class="['nav-link-btn', { active: activeTab === tab.key }]"
            @click="$emit('change-tab', tab.key)">
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Upload CV Modal -->
    <BaseModal v-if="editCV" title="Upload Your CV" @close="closeEditCV">
      <div class="upload-section">
        <div class="file-upload-area" :class="{ 'has-file': cvFile }">
          <input class="file-input" type="file" id="cvFile" @change="cvOnChangeFile" accept="application/pdf" />
          <label for="cvFile" class="file-upload-label">
            <div class="upload-icon">
              <i class="bi bi-cloud-arrow-up"></i>
            </div>
            <div class="upload-text">
              <span class="primary-text light-dark">Drop your CV here or click to browse</span>
              <span class="secondary-text light-dark">PDF files only • Max 3MB</span>
            </div>
          </label>
        </div>

        <div v-if="cvFile" class="file-preview">
          <div class="file-icon">
            <i class="bi bi-file-earmark-pdf"></i>
          </div>
          <div class="file-info">
            <span class="file-name">{{ cvFile.name }}</span>
            <span class="file-size">{{ formatFileSize(cvFile.size) }}</span>
          </div>
          <button @click="cvFile = null" class="remove-file">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <template #footer>
        <BaseButton @click="closeEditCV" variant="secondary">Cancel</BaseButton>
        <BaseButton @click="handleSaveCv" :isLoading="profileStore.isProcessing" variant="primary" :disabled="!cvFile">
          <span>{{ profileStore.isProcessing ? 'Uploading...' : 'Upload CV' }}</span>
        </BaseButton>
      </template>
    </BaseModal>

    <!-- Collaboration Modal -->
    <BaseModal v-if="editCollaboration"
      :title="(profileStore.user?.collaboration?.company_logo && profileStore.user?.collaboration?.company_link) ? 'Update Collaboration' : 'Collaboration'"
      @close="closeEditCollaboration">

      <div class="collaboration-form">
        <div class="form-group">
          <div class="d-flex justify-content-between">

            <label class="form-label">
              Company Logo
              <span class="required-mark">*</span>
            </label>
            <p v-if="companyLogoPreview" v-tippy="'click to cancel image'"
              @click="companyLogo = null; companyLogoPreview = null" style="cursor: pointer;">
              <i class="fs-4 bi bi-x-circle light-dark"></i>
            </p>
          </div>
          <div class="file-upload-area small" v-if="!companyLogoPreview">

            <input class="file-input" type="file" id="collabFile" multiple accept="image/*"
              @change="CompanyLogoSelect" />
            <label for="collabFile" class="file-upload-label light-dark">
              <i class="bi bi-image"></i>
              <span class="light-dark">Upload Logo</span>
            </label>
          </div>
          <img v-if="companyLogoPreview" :src="companyLogoPreview" alt="Company Logo Preview" class="logo-preview">
          <div v-if="errors.companyLogo" class="text-danger small mt-1">
            <i class="bi bi-exclamation-circle me-1"></i>
            {{ errors.companyLogo }}
          </div>
        </div>
        <BaseInput label="Company Website" placeholder="https://example.com" @input="validateCompanyLink"
          :error="errors.companyLink" v-model="companyLink" :required="true" />
      </div>

      <template #footer>
        <BaseButton @click="closeEditCollaboration" variant="secondary">Cancel
        </BaseButton>
        <base-button type="button" @click="addCollaboration" variant="primary" :isLoading="profileStore.isProcessing">
          <span>{{ profileStore.isProcessing ? 'Saving...' : ((profileStore.user?.collaboration?.company_logo &&
            profileStore.user?.collaboration?.company_link) ? 'Update' : 'Save') }}</span>
        </base-button>
      </template>

    </BaseModal>

    <!-- Settings Modal -->
    <BaseModal v-if="openSetting" title="Account Settings" @close="closeSetting" size="lg">
      <div class="settings-container">
        <!-- Settings Tabs -->
        <div class="settings-tabs">
          <button :class="['settings-tab', { active: settingTab === 'password' }]" @click="settingTab = 'password'">
            <i class="bi bi-shield-lock"></i>
            <span>Security</span>
          </button>
          <button :class="['settings-tab danger', { active: settingTab === 'delete' }]" @click="settingTab = 'delete'">
            <i class="bi bi-exclamation-triangle"></i>
            <span>Danger Zone</span>
          </button>
        </div>

        <!-- Tab Content -->
        <div class="settings-content">
          <!-- Change Password Tab -->
          <div v-if="settingTab === 'password'" class="password-section">
            <div class="section-header">
              <h3>Change Password</h3>
              <p>Update your password to keep your account secure</p>
            </div>
            <form @submit.prevent="changePassword">
              <div class="form-group">
                <BaseInput @input="validateCurrentPassword()" v-model="currentPass" :error="errors.currentPass"
                  label="Current Password" type="password" placeholder="Enter current password" />
              </div>

              <div class="form-group">
                <BaseInput @input="validateNewPassword()" v-model="newPass" :error="errors.newPass" label="New Password"
                  type="password" placeholder="Enter new password" />
              </div>

              <div class="form-group">
                <BaseInput @input="validateComfirmPassword()" v-model="comfirmPass" :error="errors.comfirmPass"
                  label="Confirm New Password" type="password" placeholder="Confirm new password" />
              </div>

              <div class="password-requirements">
                <span class="requirements-title">Password must contain:</span>
                <ul>
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One number</li>
                </ul>
              </div>

              <div class="form-actions mt-4">
                <BaseButton variant="primary" type="submit" :isLoading="profileStore.isProcessing">Update Password
                </BaseButton>
              </div>
            </form>
          </div>

          <!-- Delete Account Tab -->
          <div v-else class="delete-section">
            <div class="danger-zone">
              <div class="danger-icon">
                <i class="bi bi-exclamation-triangle-fill"></i>
              </div>
              <div class="danger-content">
                <h3>Delete Account</h3>
                <p>
                  Once you delete your account, there is no going back. All your data including
                  profile, projects, and settings will be permanently removed.
                </p>
              </div>
            </div>
            <div class="form-actions">
              <BaseButton variant="danger" :isLoading="profileStore.isLoading" @click="deleteAccount = true">
                <i class="bi bi-trash"></i>
                <span>Permanently Delete Account</span>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
    <!-- modal comfirm delete account -->
    <BaseModal v-if="deleteAccount" title="Comfirm Delete Account" @close="deleteAccount = false">
      <p class="light-dark">Are you sure?</p>
      <template #footer>
        <div class="d-flex justify-content-end">
          <!-- <base-button>Cancel</base-button> -->
          <BaseButton variant="danger" @click="comfirmDeleteAcc" :isLoading="profileStore.isLoading">
            <i class="bi bi-trash"></i>
            <span> Confirm</span>
          </BaseButton>

        </div>
      </template>
    </BaseModal>
    <!-- Original Modal Logic (Restored) -->
    <div class="modals-container">
      <!-- Update Cover Modal -->
      <BaseModal v-if="editCover" title="Update Cover Photo" size="lg" @close="closeEditCover">
        <div class="modal-content-wrapper">
          <div class="cropper-container">
            <Cropper v-if="uploadedImage" ref="cropperCoverRef" :src="uploadedImage"
              :stencil-props="{ aspectRatio: null, resizable: true, movable: true }" />
            <div v-else class="upload-placeholder">
              <div class="placeholder-icon">
                <i class="bi bi-image"></i>
              </div>
              <div class="placeholder-text">
                <span class="main-msg">Select an image to crop</span>
                <span class="sub-msg">PNG, JPG or GIF up to 3MB</span>
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <label for="coverUpload" class="upload-btn">
              <i class="bi bi-upload"></i>
              Choose Image
            </label>
            <input id="coverUpload" type="file" class="d-none" accept="image/*" @change="handleFileSelect" />

            <BaseButton @click="deleteCover = true" variant="danger" class="delete-btn"
              :isLoading="profileStore.isLoading">
              <i class="bi bi-trash"></i>
              <span>Remove Cover</span>
            </BaseButton>
          </div>
        </div>

        <template #footer>
          <BaseButton @click="closeEditCover" variant="secondary">Cancel
          </BaseButton>
          <BaseButton @click="applyChageCover" :isLoading="profileStore.isProcessing" variant="primary">
            <span>
              {{ profileStore.isProcessing ? 'Saving ...' : 'Save Changes' }}
            </span>
          </BaseButton>
        </template>
      </BaseModal>

      <!-- Crop Avatar Modal -->
      <BaseModal v-if="showImageCropper" title="Update Profile Photo" @close="closeEditAvatar">
        <div class="modal-content-wrapper">
          <div class="cropper-container circle">
            <Cropper v-if="uploadedImage" ref="cropperRef" :src="uploadedImage" :stencil-props="{ aspectRatio: 1 }"
              :stencil-component="CircleStencil" />
            <div v-else class="upload-placeholder">
              <div class="placeholder-icon">
                <i class="bi bi-person-circle"></i>
              </div>
              <div class="placeholder-text">
                <span class="main-msg">Select a photo to crop</span>
                <span class="sub-msg">PNG or JPG up to 3MB</span>
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <label for="avatarUpload" class="upload-btn">
              <i class="bi bi-upload"></i>
              Choose Photo
            </label>
            <input id="avatarUpload" type="file" class="d-none" accept="image/*" @change="handleFileSelect" />

            <button class="delete-btn" @click="deleteAvatar = true">
              <i class="bi bi-trash"></i>
              Remove Photo
            </button>
          </div>
        </div>

        <template #footer>
          <BaseButton @click="closeEditAvatar" variant="secondary">
            Cancel
          </BaseButton>
          <BaseButton @click="applyCrop" variant="primary" :isLoading="profileStore.isProcessing">
            <span>{{ profileStore.isProcessing ? 'Saving...' : 'Save Changes' }}</span>
          </BaseButton>
        </template>
      </BaseModal>

      <!-- Delete Avatar Confirmation -->
      <BaseModal v-if="deleteAvatar" title="Remove Profile Photo" @close="deleteAvatar = false">
        <div class="confirmation-content">
          <div class="warning-icon">
            <i class="bi bi-exclamation-triangle"></i>
          </div>
          <p>Are you sure you want to remove your profile photo?</p>
        </div>

        <template #footer>
          <BaseButton @click="deleteAvatar = false" variant="secondary">
            <span>Cancel</span>
          </BaseButton>
          <BaseButton @click="handleAvatarDelete" variant="danger" :isLoading="profileStore.isProcessing">
            <span>{{ profileStore.isProcessing ? 'Removing...' : 'Remove' }}</span>
          </BaseButton>
        </template>
      </BaseModal>

      <!-- Delete Cover Confirmation -->
      <BaseModal v-if="deleteCover" title="Remove Cover Photo" @close="deleteCover = false">
        <div class="confirmation-content">
          <div class="warning-icon">
            <i class="bi bi-exclamation-triangle"></i>
          </div>
          <p>Are you sure you want to remove your cover photo?</p>
        </div>

        <template #footer>
          <BaseButton @click="deleteCover = false" variant="secondary">
            Cancel
          </BaseButton>
          <BaseButton @click="handleDeleteCover" variant="danger" :isLoading="profileStore.isProcessing">
            <span>{{ profileStore.isProcessing ? 'Removing...' : 'Remove' }}</span>
          </BaseButton>
        </template>
      </BaseModal>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { usePostStore } from '@/stores/post'
import { useAuthStore } from '@/stores/auth'
import { Cropper } from 'vue-advanced-cropper'
import ProfileHeaderSkeleton from '@/components/profile/ProfileHeaderSkeleton.vue'
import 'vue-advanced-cropper/dist/style.css'
import BaseButton from '../ui/base/BaseButton.vue'
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import { usePasswordValidator } from '@/composables/usePasswordValidator';
import { showWarning, showError } from '@/utils/toast'
import router from '@/router'

const { errors } = useRequiredValidator()
const { validatePassword: checkPassword, validatePasswordMatch } = usePasswordValidator()

defineProps({
  activeTab: {
    type: String,
    default: 'overview',
  },
})

defineEmits(['change-tab'])

const profileStore = useProfileStore()
const postStore = usePostStore()


const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'professional', label: 'Professional' },
  { key: 'education', label: 'Education' },
  { key: 'project', label: 'Project' },
  { key: 'collaboration', label: 'Collaboration' },
  { key: 'cv', label: 'CV' },
]

const authStore = useAuthStore()
const cropperRef = ref()
const cropperCoverRef = ref(null)
const showImageCropper = ref(false)
const deleteAvatar = ref(false)
const deleteCover = ref(false)
const uploadedImage = ref(null)
const editCover = ref(false)
const editCV = ref(false)
const editCollaboration = ref(false)
const openSetting = ref(false)
const settingTab = ref('password')
const cvFile = ref(null)
const currentPass = ref()
const newPass = ref()
const comfirmPass = ref()
const deleteAccount = ref(false)
const companyLogo = ref()
const companyLogoPreview = ref()
const companyLink = ref()

onMounted(async () => {
  await profileStore.fetchProfile()
})

const addCollaboration = async () => {
  const isLinkValid = validateCompanyLink()
  const isLogoValid = validateCompanyLogo()

  if (!isLinkValid || !isLogoValid)
    return

  let link = companyLink.value
  if (link && !/^https?:\/\//i.test(link)) {
    link = `https://${link}`
  }

  const formData = new FormData()
  if (companyLogo.value) {
    formData.append('company_logo', companyLogo.value)
  }
  formData.append('company_link', link)
  await profileStore.addCollaboration(formData)

  editCollaboration.value = false
  await profileStore.fetchProfile()
}

const validateCompanyLink = () => {
  if (!companyLink.value) {
    errors.companyLink = 'Company website link is required'
    return false
  }

  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$',
    'i'
  )

  if (!pattern.test(companyLink.value)) {
    errors.companyLink = 'Please enter a valid URL'
    return false
  }

  errors.companyLink = ''
  return true
}

const validateCompanyLogo = () => {
  if (!companyLogo.value && !companyLogoPreview.value) {
    errors.companyLogo = 'Company logo is required'
    return false
  }
  errors.companyLogo = ''
  return true
}

const closeEditAvatar = () => {
  showImageCropper.value = false
  uploadedImage.value = null
}

const validateCurrentPassword = () => {
  if (!currentPass.value) {

    errors.currentPass = `Current Password is required`
    return false
  }
  errors.currentPass = ''
  return true
}
const validateNewPassword = () => {
  const result = checkPassword(newPass.value)
  errors.newPass = result.message
  return result.isValid
}
const validateComfirmPassword = () => {
  if (!comfirmPass.value) {
    errors.comfirmPass = 'Confirm Password is required'
    return false
  }
  errors.comfirmPass = ''
  return true
}

const comfirmDeleteAcc = async () => {
  await profileStore.deleteAccount()
  openSetting.value = false
  deleteAccount.value = false
  authStore.clearAuth()
  router.push({ name: 'landing' })
}

const changePassword = async () => {
  if (!validateForm())
    return
  await profileStore.changePassword({
    'old_pass': currentPass.value,
    'new_pass': newPass.value,
    'new_pass_confirmation': comfirmPass.value
  })
  openSetting.value = false
  currentPass.value = null
  newPass.value = null
  comfirmPass.value = null
}
const validateForm = () => {
  const currentPassValid = validateCurrentPassword()
  const passwordValid = validateNewPassword()
  const comfirmPasswordValid = validateComfirmPassword()

  let isValid = currentPassValid && passwordValid && comfirmPasswordValid

  if (isValid && newPass.value !== comfirmPass.value) {
    const matchResult = validatePasswordMatch(newPass.value, comfirmPass.value)
    errors.comfirmPass = matchResult.message
    isValid = false
  }

  return isValid
}
const handleFileSelect = (e) => {
  const selectedFile = e.target.files[0]
  if (!selectedFile) return

  const maxSize = 3072 * 1024;
  if (selectedFile.size > maxSize) {
    showError('File size exceeds 3072 KB. Please upload a smaller image.')
    e.target.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = (ev) => (uploadedImage.value = ev.target.result)
  reader.readAsDataURL(selectedFile)
}
const CompanyLogoSelect = (e) => {
  const logo = e.target.files[0]
  if (!logo)
    return false

  const maxSize = 3072 * 1024;
  if (logo.size > maxSize) {
    showError('Logo size exceeds 3072 KB. Please upload a smaller image.')
    e.target.value = ''
    return false
  }

  companyLogo.value = logo
  errors.companyLogo = ''
  const reader = new FileReader()
  reader.onload = (ev) => (companyLogoPreview.value = ev.target.result)
  reader.readAsDataURL(logo)
  return true
}

const applyCrop = async () => {
  if (!uploadedImage.value) {
    showWarning('Please select an image')
    return
  }
  const canvas = cropperRef.value.getResult().canvas
  const avatar = canvas.toDataURL('image/jpeg', 0.9)
  await profileStore.uploadAvatarBase64(avatar)
  showImageCropper.value = false
  uploadedImage.value = null
  await postStore.fetchPosts()
}

const applyChageCover = async () => {
  if (!uploadedImage.value) {
    showWarning('Please select an image')
    return
  }
  const canvas = cropperCoverRef.value.getResult().canvas
  const cover = canvas.toDataURL('image/jpeg', 0.9)
  await profileStore.uploadCoverBase64(cover)
  editCover.value = false
  uploadedImage.value = null
}

const handleDeleteCover = async () => {
  editCover.value = false
  await profileStore.removeCover()
  if (!profileStore.isProcessing) deleteCover.value = false
}

const handleAvatarDelete = async () => {
  if (uploadedImage.value == null) {
    showWarning("You can't delete default image")
    return
  }
  showImageCropper.value = false
  await profileStore.removeAvatar()
  if (!profileStore.isProcessing) deleteAvatar.value = false
}

const cvOnChangeFile = (e) => {
  const cv = e.target.files[0]
  if (!cv) return
  if (cv.type !== 'application/pdf') {
    showError('Only PDF files are allowed')
    e.target.value = ''
    return
  }
  const maxSize = 3072 * 1024;
  if (cv.size > maxSize) {
    showError('CV size exceeds 3072 KB. Please upload a smaller file.')
    e.target.value = ''
    return
  }
  cvFile.value = cv
}

const handleSaveCv = async () => {
  if (!cvFile.value) return
  profileStore.isProcessing = true
  try {
    await profileStore.uploadCv(cvFile.value)
    editCV.value = false
    cvFile.value = null
  } catch (error) {
    showError(error.message)
  } finally {
    profileStore.isProcessing = false
    profileStore.fetchProfile()
  }
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function openEditCover() {
  editCover.value = true
}

function closeEditCover() {
  editCover.value = false
  uploadedImage.value = null
}

function openEditCV() {
  editCV.value = true
}

function closeEditCV() {
  editCV.value = false
  cvFile.value = null
}

function openEditCollaboration() {
  const collab = profileStore.user?.collaboration
  if (collab) {
    companyLink.value = collab.company_link || ''
    companyLogoPreview.value = collab.company_logo || null
  }
  editCollaboration.value = true
}

function closeEditCollaboration() {
  editCollaboration.value = false
  companyLogo.value = null
  companyLogoPreview.value = null
  companyLink.value = null
  errors.companyLink = ''
}

function openChangePassAndDeleteAcc() {
  openSetting.value = true
}

function closeSetting() {
  openSetting.value = false
  settingTab.value = 'password'
}

defineExpose({
  openEditCV,
  openEditCollaboration
})
</script>

<style scoped>
/* ====================================
   MAIN HEADER CONTAINER
   ==================================== */
.profile-header-wrapper {
  margin-bottom: 2rem;
  border-radius: 24px;
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

/* ====================================
   COVER AREA
   ==================================== */
.cover-area {
  position: relative;
  height: 380px;
  background-color: var(--color-background);
  overflow: hidden;
}

.cover-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
}

.cover-edit-trigger {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--color-background);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: var(--color-text);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  z-index: 10;
}

.cover-edit-trigger:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

/* ====================================
  PROFILE INFO SECTION (Below Cover)
   ==================================== */
.profile-info-section {
  background: var(--color-surface);
  padding: 0 2rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.profile-container {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  position: relative;
}

.avatar-box {
  position: relative;
  transform: translateY(-50%);
  flex-shrink: 0;
}

.avatar-ring {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  padding: 6px;
  background: var(--color-surface);
  box-shadow: var(--shadow-xl);
  position: relative;
  border: 4px solid var(--color-surface);
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-edit-trigger {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: var(--color-background);
  color: var(--color-text);
  border: 3px solid var(--color-surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.avatar-edit-trigger:hover {
  transform: scale(1.1);
  background: var(--color-hover);
}

.identity-details {
  margin-top: -80px;
  margin-left: -180px;
  flex: 1;
  padding-bottom: 0.5rem;
}

.display-name {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.role-text {
  font-size: 1rem;
  color: var(--color-muted);
  margin-bottom: 0;
  font-weight: 500;
}

.identity-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.5rem;
}

.settings-btn {
  width: 44px !important;
  height: 44px !important;
  padding: 0 !important;
  border-radius: 10px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 1.125rem !important;
}

.more-btn {
  width: 44px;
  height: 44px;
  background: var(--color-accent);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 1.125rem;
}

.more-btn:hover {
  background: var(--color-hover);
  border-color: var(--color-primary);
}


/* ====================================
   NAVIGATION
   ==================================== */
.header-nav {
  padding: 0 2rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.nav-links {
  display: flex;
  gap: 2rem;
  margin-left: 220px;
  /* Offset for avatar */
}

.nav-link-btn {
  padding: 1.5rem 0.5rem;
  background: none;
  border: none;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-muted);
  position: relative;
  transition: color 0.3s ease;
}

.nav-link-btn:hover {
  color: var(--color-text);
}

.nav-link-btn.active {
  color: var(--color-primary);
}

.nav-link-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-primary);
  border-radius: 4px 4px 0 0;
}

/* ====================================
  RESPONSIVE
   ==================================== */
@media (max-width: 991px) {

  .identity-details {
    margin-left: 0;
    flex: 1;
  }

  .cover-area {
    height: 280px;
  }

  .profile-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .avatar-box {
    transform: translateY(-50%);
    margin-bottom: 0;
  }

  .avatar-ring {
    width: 140px;
    height: 140px;
  }

  .avatar-edit-trigger {
    right: 5px;
    bottom: 5px;
    width: 36px;
    height: 36px;
  }

  .display-name {
    font-size: 1.75rem;
  }

  .role-text {
    font-size: 0.95rem;
  }

  .identity-actions {
    justify-content: center;
  }

  .settings-btn {
    width: 40px !important;
    height: 40px !important;
  }

  .more-btn {
    width: 40px;
    height: 40px;
  }

  .nav-links {
    margin-left: 0;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .nav-link-btn {
    font-size: 0.9rem;
    padding: 1.25rem 0.5rem;
  }
}

@media (max-width: 768px) {
  .cover-area {
    height: 220px;
  }

  .profile-info-section {
    padding: 0 1.5rem 1.25rem;
  }

  .avatar-ring {
    width: 120px;
    height: 120px;
  }

  .avatar-edit-trigger {
    width: 32px;
    height: 32px;
  }

  .avatar-edit-trigger i {
    font-size: 0.85rem;
  }

  .display-name {
    font-size: 1.5rem;
  }

  .role-text {
    font-size: 0.9rem;
  }

  .settings-btn {
    width: 38px !important;
    height: 38px !important;
    font-size: 1rem !important;
  }

  .more-btn {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }

  .header-nav {
    padding: 0 1rem;
  }

  .nav-links {
    gap: 0.5rem;
  }

  .nav-link-btn {
    padding: 1rem 0.4rem;
    font-size: 0.85rem;
  }

  .cover-edit-trigger {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    top: 1rem;
    right: 1rem;
  }

  .cover-edit-trigger span {
    display: none;
  }
}

@media (max-width: 576px) {
  .cover-area {
    height: 180px;
  }

  .profile-info-section {
    padding: 0 1rem 1rem;
  }

  .avatar-ring {
    width: 100px;
    height: 100px;
    padding: 4px;
  }

  .avatar-edit-trigger {
    width: 28px;
    height: 28px;
  }

  .display-name {
    font-size: 1.35rem;
  }

  .role-text {
    font-size: 0.85rem;
  }

  .settings-btn {
    width: 36px !important;
    height: 36px !important;
    font-size: 0.95rem !important;
  }

  .more-btn {
    width: 36px;
    height: 36px;
    font-size: 0.95rem;
  }

  .nav-links {
    gap: 0.25rem;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 0.5rem;
  }

  .nav-link-btn {
    padding: 1rem 0.75rem;
    font-size: 0.8rem;
    white-space: nowrap;
  }
}



.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 3rem 2rem;
  background: var(--color-accent);
  border: 2px dashed var(--color-border);
  border-radius: 20px;
  transition: all 0.3s ease;
  min-height: 240px;
}

.upload-placeholder:hover {
  background: var(--color-hover);
}

.placeholder-icon {
  width: 64px;
  height: 64px;
  background: var(--color-surface);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.placeholder-text {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.placeholder-text .main-msg {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.placeholder-text .sub-msg {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.upload-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-btn:hover {
  background: var(--color-hover);
  border-color: var(--color-primary);
}

.delete-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--color-surface);
  color: var(--color-danger);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--color-danger);
}

/* ====================================
   CONFIRMATION MODAL
   ==================================== */
.confirmation-content {
  padding: 20px 0;
  text-align: center;
}

.warning-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  margin-bottom: 16px;
}

.warning-icon i {
  font-size: 32px;
  color: var(--color-danger);
}

.confirmation-content p {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* ====================================
   FILE UPLOAD SECTION
   ==================================== */
.upload-section {
  padding: 8px 0;
}

.file-upload-area {
  position: relative;
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
}

.file-upload-area:hover {
  border-color: var(--color-primary);
  background: var(--color-hover);
}

.file-upload-area.small {
  padding: 24px;
}

.file-upload-area.has-file {
  border-color: var(--color-primary);
  background: var(--color-hover);
}

.file-input {
  display: none;
}

.file-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--color-accent);
  border-radius: 50%;
  color: var(--color-primary);
  font-size: 24px;
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.primary-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
}

.secondary-text {
  font-size: 13px;
  color: var(--color-muted);
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--color-accent);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  margin-top: 16px;
}

.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  color: var(--color-danger);
  font-size: 20px;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.file-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 12px;
  color: var(--color-muted);
}

.remove-file {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--color-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-file:hover {
  background: var(--color-hover);
  color: var(--color-danger);
}

/* ====================================
   COLLABORATION FORM
   ==================================== */
.collaboration-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0;
}

.required-mark {
  color: var(--color-danger);
  margin-left: 4px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

/* ====================================
   SETTINGS MODAL
   ==================================== */
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.settings-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--color-border);
}

.settings-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px;
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-muted);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.settings-tab:hover {
  color: var(--color-text);
  background: var(--color-hover);
}

.settings-tab.active {
  color: var(--color-text);
}

.settings-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-text);
}

.settings-tab.danger.active {
  color: var(--color-danger);
}

.settings-tab.danger.active::after {
  background: var(--color-danger);
}

.settings-content {
  padding: 24px 0;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 8px 0;
}

.section-header p {
  font-size: 14px;
  color: var(--color-muted);
  margin: 0;
  line-height: 1.5;
}

.password-section,
.delete-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.password-requirements {
  padding: 16px;
  background: var(--color-accent);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.requirements-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  display: block;
  margin-bottom: 8px;
}

.password-requirements ul {
  margin: 0;
  padding-left: 20px;
}

.password-requirements li {
  font-size: 13px;
  color: var(--color-muted);
  line-height: 1.8;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
}

/* ====================================
   DANGER ZONE
   ==================================== */
.danger-zone {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
}

.danger-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 10px;
}

.danger-icon i {
  font-size: 24px;
  color: var(--color-danger);
}

.upload-container {
  max-width: 600px;
  margin: 0 auto;
}

.upload-header {
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}

.upload-box {
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  background-color: #fafafa;
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}

.upload-box:hover {
  border-color: #999;
  background-color: #f5f5f5;
}

.upload-icon {
  font-size: 48px;
  color: #999;
  margin-bottom: 20px;
}

.browse-link {
  color: #0d6efd;
  text-decoration: underline;
  cursor: pointer;
}

.browse-link:hover {
  color: #0a58ca;
}

.upload-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.upload-limit {
  font-size: 12px;
  color: #999;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--color-accent);
  border-radius: 12px;
  margin-top: 24px;
}

.file-info {
  flex: 1;
}

.file-name {
  display: block;
  font-weight: 700;
  font-size: 14px;
  color: var(--color-text);
}

.file-size {
  font-size: 12px;
  color: var(--color-muted);
}

.remove-file {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  border: none;
  background: var(--color-hover);
  color: var(--color-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.remove-file:hover {
  background: #fee2e2;
  color: #ef4444;
  transform: rotate(90deg) scale(1.1);
}

.danger-content h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 8px 0;
}

.danger-content p {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* ====================================
   UTILITY CLASSES
   ==================================== */
.d-none {
  display: none !important;
}

/* ====================================
   RESPONSIVE DESIGN
   ==================================== */
@media (max-width: 968px) {
  .profile-info-section {
    flex-direction: column;
    align-items: flex-start;
    padding: 64px 24px 20px;
  }

  .profile-actions {
    width: 100%;
  }

  .profile-btn {
    flex: 1;
  }

  .profile-nav-tabs {
    padding: 0 24px;
  }
}

@media (max-width: 768px) {
  .cover-section {
    height: 200px;
  }

  .avatar-container {
    left: 20px;
    bottom: -40px;
  }

  .avatar-image {
    width: 100px;
    height: 100px;
  }

  .avatar-edit-btn {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }

  .profile-info-section {
    padding: 52px 20px 20px;
  }

  .user-name {
    font-size: 20px;
  }

  .user-role {
    font-size: 14px;
  }

  .profile-actions {
    flex-direction: column;
  }

  .profile-btn {
    width: 100%;
    justify-content: center;
  }

  .profile-nav-tabs {
    padding: 0 20px;
  }

  .nav-tab {
    padding: 14px 16px;
    font-size: 14px;
  }

  .edit-cover-btn {
    top: 12px;
    right: 12px;
    padding: 6px 10px;
    font-size: 12px;
  }

  .edit-cover-btn span {
    display: none;
  }

  .cropper-container,
  .cropper-container.circle {
    height: 300px;
  }

  .modal-actions {
    flex-direction: column;
  }

  .settings-tabs {
    flex-direction: column;
    gap: 4px;
    border-bottom: none;
  }

  .settings-tab {
    justify-content: flex-start;
  }

  .settings-tab.active::after {
    display: none;
  }

  .danger-zone {
    flex-direction: column;
  }

  .form-actions {
    justify-content: stretch;
  }

  .form-actions button {
    width: 100%;
  }

}
</style>
