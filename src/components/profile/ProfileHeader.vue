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
          <span>Edit Cover</span>
        </button>

        <div class="identity-container">
          <div class="avatar-box">
            <div class="avatar-ring">
              <img :src="profileStore.user?.avatar" alt="Profile Avatar" class="profile-avatar" />
              <div class="status-indicator"></div>
            </div>
            <button class="avatar-edit-trigger" @click="showImageCropper = true">
              <i class="bi bi-camera-fill"></i>
            </button>
          </div>

          <div class="identity-details">
            <h1 class="display-name">{{ profileStore.user?.full_name || 'Loading...' }}</h1>
            <p class="role-text">{{ profileStore.user?.positions?.[0]?.name || 'Freelancer' }}</p>
          </div>

          <div class="identity-actions">
            <BaseButton @click="openChangePassAndDeleteAcc" variant="primary" class="chat-btn"
              :isLoading="profileStore.isLoading">
              <!-- <i class="bi bi-chat-dots-fill"></i> -->
              <span>Change Password</span>
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
              <span class="primary-text">Drop your CV here or click to browse</span>
              <span class="secondary-text">PDF files only • Max 10MB</span>
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
        <BaseButton @click="closeEditCV" variant="secondary" :isLoading="profileStore.isLoading">Cancel</BaseButton>
        <BaseButton @click="handleSaveCv" :isLoading="profileStore.isLoading" variant="primary" :disabled="!cvFile">
          <span>{{ profileStore.isLoading ? 'Uploading...' : 'Upload CV' }}</span>
        </BaseButton>
      </template>
    </BaseModal>

    <!-- Collaboration Modal -->
    <BaseModal v-if="editCollaboration" title="Add Collaboration" @close="closeEditCollaboration">

      <div class="collaboration-form">
        <div class="form-group">
          <div class="d-flex justify-content-between">

            <label class="form-label">Company Logo</label>
            <p v-if="companyLogo" v-tippy="'click to cancel image'" @click="companyLogo = null"><i
                class="fs-4 bi bi-x-circle"></i></p>
          </div>
          <div class="file-upload-area small" v-if="!companyLogo">

            <input class="file-input" type="file" id="collabFile" multiple accept="image/*" @change="CompanyLogoSelect" />
            <label for="collabFile" class="file-upload-label">
              <i class="bi bi-image"></i>
              <span>Upload Logo</span>
            </label>
          </div>
          <img v-if="CompanyLogoSelect" :src="companyLogoPreview" alt="">
        </div>
        <BaseInput label="Company Website" placeholder="https://example.com" @input="validateCompanyLink"
          :error="errors.companyLink" v-model="companyLink" />
      </div>

      <template #footer>
        <BaseButton @click="closeEditCollaboration" variant="secondary">Cancel
        </BaseButton>
        <base-button type="button" @click="addCollaboration"  variant="primary" :isLoading="profileStore.isLoading">
          <span>{{ profileStore.isLoading ? 'Saving...' : 'Save' }}</span>
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

              <div class="form-actions">
                <BaseButton variant="primary" type="submit" :isLoading="profileStore.isLoading">Update Password
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

            <div class="form-group">
              <BaseInput label="Type 'DELETE' to confirm" placeholder="DELETE" />
            </div>

            <div class="form-actions">
              <BaseButton variant="danger" :isLoading="profileStore.isLoading">
                <i class="bi bi-trash"></i>
                <span>Permanently Delete Account</span>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
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
                <span class="sub-msg">PNG, JPG or GIF up to 10MB</span>
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <label for="coverUpload" class="upload-btn">
              <i class="bi bi-upload"></i>
              Choose Image
            </label>
            <input id="coverUpload" type="file" class="d-none" accept="image/*" @change="handleFileSelect" />

            <!-- <button class="delete-btn" @click="deleteCover = true">
              <i class="bi bi-trash"></i>
              Remove Cover
            </button> -->
            <BaseButton @click="deleteCover = true" variant="danger" class="delete-btn"
              :isLoading="profileStore.isLoading">
              <i class="bi bi-trash"></i>
              <span>Remove Cover</span>
            </BaseButton>
          </div>
        </div>

        <template #footer>
          <BaseButton @click="closeEditCover" variant="secondary" :isLoading="profileStore.isLoading">Cancel
          </BaseButton>
          <BaseButton @click="applyChageCover" :isLoading="profileStore.isProcessing" variant="primary">
            <span>{{ profileStore.isProcessing ? 'Saving...' : 'Save Changes' }}</span>
          </BaseButton>
        </template>
      </BaseModal>

      <!-- Crop Avatar Modal -->
      <BaseModal v-if="showImageCropper" title="Update Profile Photo" @close="showImageCropper = false">
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
                <span class="sub-msg">PNG or JPG up to 5MB</span>
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
          <BaseButton @click="showImageCropper = false" variant="secondary" :isLoading="profileStore.isProcessing">
            Cancel
          </BaseButton>
          <BaseButton @click="applyCrop" :isLoading="profileStore.isProcessing" variant="primary">
            <span>{{ profileStore.isProcessing ? 'Saving...' : 'Save Changes' }}</span>
          </BaseButton>
        </template>
      </BaseModal>

      <!-- Delete Avatar Confirmation -->
      <BaseModal v-if="deleteAvatar" title="Remove Profile Photo">
        <div class="confirmation-content">
          <div class="warning-icon">
            <i class="bi bi-exclamation-triangle"></i>
          </div>
          <p>Are you sure you want to remove your profile photo?</p>
        </div>

        <template #footer>
          <BaseButton @click="deleteAvatar = false" variant="secondary" :isLoading="profileStore.isLoading">Cancel
          </BaseButton>
          <BaseButton @click="handleAvatarDelete" variant="danger" :isLoading="profileStore.isLoading">
            <span>{{ profileStore.isLoading ? 'Removing...' : 'Remove' }}</span>
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
          <BaseButton @click="deleteCover = false" variant="secondary" :isLoading="profileStore.isLoading">Cancel
          </BaseButton>
          <BaseButton @click="handleDeleteCover" variant="danger" :isLoading="profileStore.isLoading">
            <span>{{ profileStore.isLoading ? 'Removing...' : 'Remove' }}</span>
          </BaseButton>
        </template>
      </BaseModal>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { Cropper } from 'vue-advanced-cropper'
import ProfileHeaderSkeleton from '@/components/profile/ProfileHeaderSkeleton.vue'
import 'vue-advanced-cropper/dist/style.css'
import BaseButton from '../ui/base/BaseButton.vue'
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import { usePasswordValidator } from '@/composables/usePasswordValidator';

const { errors, validateField } = useRequiredValidator()
const { validatePassword: checkPassword, validatePasswordMatch } = usePasswordValidator()

defineProps({
  activeTab: {
    type: String,
    default: 'overview',
  },
})

defineEmits(['change-tab'])

const profileStore = useProfileStore()


const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'professional', label: 'Professional' },
  { key: 'education', label: 'Education' },
  { key: 'project', label: 'Project' },
  { key: 'cv', label: 'CV' },
]

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
const companyLogo = ref()
const companyLogoPreview = ref()
const companyLink = ref()

onMounted(async () => {
  await profileStore.fetchProfile()
})
const addCollaboration = async () => {
  if (!validateCompanyLink())
    return
  const formData = new FormData()
  formData.append('company_logo', companyLogo.value)
  formData.append('company_link', companyLink.value)
  await profileStore.addCollaboration(formData)
  editCollaboration.value=false

}
const validateCompanyLink = () => {
  if (!companyLink.value) {
    errors.companyLink = 'Company link is required'
    return false
  }
  errors.companyLink = ''
  return true
}
// const validateFormCollaboration = () => {
//   const validCompanyLink = validateCompanyLink()
// }
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
const changePassword = async () => {
  if (!validateForm())
    return
  await profileStore.changePassword({
    'old_pass': currentPass.value,
    'new_pass': newPass.value,
    'new_pass_confirmation': comfirmPass.value
  })
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
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (ev) => (uploadedImage.value = ev.target.result)
  reader.readAsDataURL(file)
}
const CompanyLogoSelect = (e) => {
  const logo = e.target.files[0]
  if (!logo)
    return false
  companyLogo.value=logo
  const reader = new FileReader()
  reader.onload = (ev) => (companyLogoPreview.value = ev.target.result)
  reader.readAsDataURL(logo)
  return true
}

const applyCrop = async () => {
  const canvas = cropperRef.value.getResult().canvas
  const avatar = canvas.toDataURL('image/jpeg', 0.9)
  await profileStore.uploadAvatarBase64(avatar)
  showImageCropper.value = false
  uploadedImage.value = null
}

const applyChageCover = async () => {
  const canvas = cropperCoverRef.value.getResult().canvas
  const cover = canvas.toDataURL('image/jpeg', 0.9)
  await profileStore.uploadCoverBase64(cover)
  editCover.value = false
  uploadedImage.value = null
}

const handleDeleteCover = async () => {
  editCover.value = false
  await profileStore.removeCover()
  if (!profileStore.isLoading) deleteCover.value = false
}

const handleAvatarDelete = async () => {
  showImageCropper.value = false
  await profileStore.removeAvatar()
  if (!profileStore.isLoading) {
    deleteAvatar.value = false
  }
}

const cvOnChangeFile = (e) => {
  const cv = e.target.files[0]
  if (!cv) return
  if (cv.type !== 'application/pdf') {
    alert('Only PDF files are allowed')
    return
  }
  if (cv.size > 10 * 1024 * 1024) {
    alert('File size must be less than 10MB')
    return
  }
  cvFile.value = cv
}

const handleSaveCv = async () => {
  if (!cvFile.value) return
  await profileStore.uploadCv(cvFile.value)
  console.log('this is cv file : ', cvFile.value)
  editCV.value = false
  cvFile.value = null
  profileStore.fetchProfile()
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
  editCollaboration.value = true
}

function closeEditCollaboration() {
  editCollaboration.value = false
}

function HandleEditCollaboration() {
  alert('Collaboration added successfully')
  editCollaboration.value = false
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
  IDENTITY OVERLAY
   ==================================== */
.identity-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 2rem 2.5rem;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  z-index: 5;
}

.avatar-box {
  position: relative;
  transform: translateY(2rem);
}

.avatar-ring {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  padding: 6px;
  background: var(--color-surface);
  box-shadow: var(--shadow-xl);
  position: relative;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.status-indicator {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  background: #10b981;
  border: 4px solid var(--color-surface);
  border-radius: 50%;
}

.avatar-edit-trigger {
  position: absolute;
  bottom: 0;
  right: 10px;
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  color: var(--color-surface);
  border: 4px solid var(--color-surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.avatar-edit-trigger:hover {
  transform: scale(1.1);
}

.identity-details {
  flex: 1;
  padding-bottom: 0.5rem;
}

.display-name {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.25rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.role-text {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-weight: 500;
}

.identity-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.75rem;
}

.chat-btn {
  padding: 0.875rem 2rem !important;
  font-weight: 700 !important;
  border-radius: 16px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
}

.settings-trigger {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.settings-trigger:hover {
  background: rgba(255, 255, 255, 0.2);
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
  .cover-area {
    height: 280px;
  }

  .identity-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 1.5rem;
  }

  .avatar-box {
    transform: translateY(0);
  }

  .avatar-ring {
    width: 140px;
    height: 140px;
  }

  .nav-links {
    margin-left: 0;
    justify-content: center;
    gap: 1rem;
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
  cursor: pointer;
  min-height: 240px;
}

.upload-placeholder:hover {
  background: var(--color-hover);
  border-color: var(--color-primary);
  transform: scale(0.99);
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
