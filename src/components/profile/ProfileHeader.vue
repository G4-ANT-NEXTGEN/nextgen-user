<template>
  <div class="profile-header-wrapper">
    <!-- Cover -->
    <div class="cover position-relative">
      <img :src="profileStore.user?.cover" alt="Profile Cover" class="cover-img" />
      <button class="btn btn-light btn-sm edit-cover" @click="openEditCover">
        <i class="bi bi-pencil-square"></i>
        Edit Cover Photo
      </button>
    </div>

    <!-- Update Cover -->
    <BaseModal v-if="editCover" title="Update Your Cover" size="lg" @close="closeEditCover">
      <div class="cropper-container">
        <Cropper
          v-if="uploadedImage"
          ref="cropperCoverRef"
          :src="uploadedImage"
          :stencil-props="{ aspectRatio: null, resizable: true }"
          :stencil-component="CircleStencil"
        />
      </div>

      <div class="mt-3">
        <label for="imageUpload" class="btn"> Choose Image </label>
        <input
          id="imageUpload"
          type="file"
          class="d-none"
          accept="image/*"
          @change="handleFileSelect"
        />
      </div>
      <div class="mt-3">
        <label
          for="deleteCover"
          class="btn"
          style="color: var(--color-danger)"
          @click="deleteCover = true"
        >
          Delete Cover
        </label>
      </div>

      <template #footer>
        <base-button @click="cancelCrop" variant="secondary">Cancel</base-button>
        <base-button
          @click="applyChageCover"
          :isLoading="profileStore.isLoading"
          variant="dark"
          style="color: var(--color-surface)"
          ><span>{{ profileStore.isLoading ? 'Saving...' : 'Save' }}</span></base-button
        >
      </template>
    </BaseModal>

    <!-- Profile Content -->
    <div class="container-fluid p-0">
      <div class="profile-content px-3">
        <!-- Avatar positioned to overlap cover -->
        <div class="avatar-wrapper">
          <img class="avatar" :src="profileStore.user?.avatar" alt="Profile" />

          <!-- Edit Avatar Button -->
          <button class="avatar-edit" @click="showImageCropper = true">
            <i class="bi bi-camera"></i>
          </button>
        </div>

        <!-- Crop Modal update avatar-->
        <BaseModal
          v-if="showImageCropper"
          title="Crop Profile Image"
          @close="showImageCropper = false"
        >
          <div class="cropper-container">
            <Cropper
              v-if="uploadedImage"
              ref="cropperRef"
              :src="uploadedImage"
              :stencil-props="{ aspectRatio: 1 }"
              :stencil-component="CircleStencil"
            />
          </div>

          <div class="mt-3">
            <label for="imageUpload" class="btn"> Choose Image </label>
            <input
              id="imageUpload"
              type="file"
              class="d-none"
              accept="image/*"
              @change="handleFileSelect"
            />
          </div>
          <div class="mt-3">
            <label
              for="imageDelete"
              class="btn"
              style="color: var(--color-danger)"
              @click="deleteAvatar = true"
            >
              Delete Avatar
            </label>
            <!-- <input id="imageUpload" type="file" class="d-none" accept="image/*" @change="handleFileSelect" /> -->
          </div>

          <template #footer>
            <base-button @click="showImageCropper = false" variant="secondary">Cancel</base-button>
            <base-button
              @click="applyCrop"
              :isLoading="profileStore.isLoading"
              variant="dark"
              style="background-color: var(--color-surface)"
              ><span>{{ profileStore.isLoading ? 'Saving...' : 'Save' }}</span></base-button
            >
          </template>
        </BaseModal>
        <!-- delete avatar modal  -->
        <base-modal v-if="deleteAvatar" title="Delete Avatar">
          <p>Are you sure!</p>
          <template #footer>
            <base-button @click="deleteAvatar = false" variant="secondary">Cancel</base-button>
            <base-button
              @click="handleAvatarDelete"
              variant="dark"
              :isLoading="profileStore.isLoading"
              style="background-color: var(--color-danger)"
              ><span>{{ profileStore.isLoading ? 'Saving...' : 'Save' }}</span></base-button
            >
          </template>
        </base-modal>
        <!-- delete cover modal  -->
        <base-modal v-if="deleteCover" title="Delete Cover" @close="deleteCover = false">
          <p>Are you sure!</p>
          <template #footer>
            <base-button @click="deleteCover = false" variant="secondary">Cancel</base-button>
            <base-button
              @click="handleDeleteCover"
              variant="dark"
              :isLoading="profileStore.isLoading"
              style="background-color: var(--color-danger)"
              ><span>{{ profileStore.isLoading ? 'Saving...' : 'Save' }}</span></base-button
            >
          </template>
        </base-modal>

        <!-- Info and Actions -->
        <div class="info-section">
          <div class="user-info">
            <h4 class="user-name">{{ profileStore.user?.full_name || 'Loading...' }}</h4>
            <small class="user-role">
              {{ profileStore.user?.positions?.[0]?.name || 'Web Developer • Freelancer' }}
            </small>
          </div>

          <div class="actions">
            <button class="btn btn-outline" @click="openEditCV">
              <i class="bi bi-file-earmark-richtext"></i>
              Upload CV
            </button>

            <!-- Update CV -->
            <BaseModal v-if="editCV" title="Upload Your CV" @close="editCV = false">
              <div class="mb-3">
                <!-- <label for="formFile" class="form-label">Upload Your CV</label>      -->
                <div class="card-body ">
                  <div class="upload-box mx-2 p-4">
                    <div class="text-center w-100">
                      <div class="upload-icon">
                        <i class="bi bi-cloud-arrow-up"></i>
                      </div>
                      <div class="upload-text">
                        Drop your files here or
                        <label class="browse-link"
                          ><input
                            type="file"
                            hidden

                            @change="cvOnChangeFile"
                           multiple
                          />Browse</label
                        >
                        <p v-if="cvFile">{{ cvFile.name }}</p>
                      </div>
                      <div v-if="!cvFile" class="upload-limit">Max CV size 5 MB</div>
                    </div>
                  </div>
                </div>
                <!-- <BaseInput/> -->
              </div>

              <template #footer>
                <button class="btn btn-outline-dark" @click="closeEditCV">Cancel</button>
                <base-button
                  class="btn btn-dark"
                  @click="handleSaveCv"
                  :isLoading="profileStore.isLoading"
                  style="color: var(--color-surface)"
                >
                  <span>{{ profileStore.isLoading ? 'Saving...' : 'Save' }}</span>
                </base-button>
              </template>
            </BaseModal>

            <button class="btn btn-outline" @click="editCollaboration = true">
              <i class="bi bi-people"></i>
              Collaboration
            </button>

            <!-- Update Collaboration -->
            <BaseModal
              v-if="editCollaboration"
              title="Upload Your Collaboration"
              @close="editCollaboration =false"
            >
            <label for="formFile" class="form-label">Company Logo</label>
            <div class="card-body">
                  <div class="upload-box mx-2 pt-2 mb-3">
                    <div class="text-center w-100">
                      <div class="upload-icon">
                        <i class="bi bi-cloud-arrow-up"></i>
                      </div>
                      <div class="upload-text">
                        Drop your files here or
                        <label class="browse-link"
                          ><input

                            type="file"
                            hidden
                            @change="onCompanyLogoChange"
                           multiple
                          />Browse</label
                        >
                        <p v-if="companyLogo">{{ companyLogo.name }}</p>
                      </div>
                      <div v-if="!companyLogo" class="upload-limit">Max CV size 5 MB</div>
                    </div>
                  </div>
                </div>
                <label for="formFile" class="form-label">Company Link</label>
                <div class="mx-2">

                  <base-input  v-model="companyLink"></base-input>
                </div>

              <template #footer>
                <base-button class="btn btn-outline-dark" @click="editCollaboration = false">Cancel</base-button>
                <base-button class="btn btn-dark" @click="HandleEditCollaboration" style="color:var(--color-surface)">Save Changes</base-button>
              </template>
            </BaseModal>

            <base-button class="btn btn-icon" @click="seting = true">
              <i class="bi bi-gear"></i>
            </base-button>

            <!-- Modal Change Password And Delete Account -->
            <BaseModal v-if="seting" title="Account Settings" @close="seting = false">
              <!-- Tabs -->
              <div class="setting-tabs">
                <button
                  :class="['tab', { active: settingTab === 'password' }]"
                  @click="settingTab = 'password'"
                >
                  Change Password
                </button>
                <button
                  :class="['tab danger', { active: settingTab === 'delete' }]"
                  @click="settingTab = 'delete'"
                >
                  Delete Account
                </button>
              </div>

              <!-- Tab Content -->
              <div class="tab-content">
                <!-- Change Password -->
                <div v-if="settingTab === 'password'">
                  <form @submit.prevent="changePassword">

                    <div class="mb-3 position-relative">
                    <BaseInput @input="validateCurrentPassword" v-model="currentPass" :type="showCurrentPass ? 'text' : 'password'"
                      :error="errors.currentPass" id="password-input" placeholder="Enter your password" label="Current Password" />
                    <i class="bi" :class="showPass ? 'bi-eye-slash' : 'bi-eye'" @click="showCurrentPass = !showCurrentPass"
                      style="cursor: pointer; position: absolute; right: 20px; top: 65px; transform: translateY(-50%);"></i>
                  </div>
                     <div class="mb-3 position-relative">
                    <BaseInput @input="validatePassword" v-model="newPass" :type="showNewPass ? 'text' : 'password'"
                      :error="errors.newPass" id="password-input" placeholder="Enter your password" label="New Password" />
                    <i class="bi" :class="showPass ? 'bi-eye-slash' : 'bi-eye'" @click="showNewPass = !showNewPass"
                      style="cursor: pointer; position: absolute; right: 20px; top: 65px; transform: translateY(-50%);"></i>
                  </div>
                    <div class="mb-3 position-relative">
                    <BaseInput @blur="validateComfirmPassword" v-model="comfirmPass" :type="showComfirmPass ? 'text' : 'password'"
                      :error="errors.comfirmPass" id="password-input" placeholder="Enter your password" label="Comfirm Password" />
                    <i class="bi" :class="showPass ? 'bi-eye-slash' : 'bi-eye'" @click="showComfirmPass = !showComfirmPass"
                      style="cursor: pointer; position: absolute; right: 20px; top: 65px; transform: translateY(-50%);"></i>
                  </div>
                  <div class="footer">
                    <base-button class="btn" type="submit" variant="secondary">Update Password</base-button>
                  </div>
                  </form>

                </div>

                <!-- Delete Account -->
                <div v-else>
                  <div class="warning-box">
                    ⚠️ <strong>Warning:</strong> This action cannot be undone. Deleting your account
                    will permanently remove all data.
                  </div>

                  <BaseInput label="Type DELETE to confirm" />

                  <div class="footer">
                    <base-button class="btn btn-danger">Delete My Account</base-button>
                  </div>
                </div>
              </div>
            </BaseModal>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="profile-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-btn', { active: activeTab === tab.key }]"
          @click="$emit('change-tab', tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref,computed } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { Cropper } from 'vue-advanced-cropper'
import { useRequiredValidator } from '@/composables/useRequiredValidator';
import { usePasswordValidator } from '@/composables/usePasswordValidator';

defineProps({
  activeTab: {
    type: String,
    default: 'overview',
  },
})

defineEmits(['change-tab'])


const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'professional', label: 'Professional' },
  { key: 'education', label: 'Education' },
  { key: 'project', label: 'Project' },
  { key: 'cv', label: 'CV' },
]
const {errors,validateField} =useRequiredValidator()
const { validatePassword: checkPassword, validatePasswordMatch } = usePasswordValidator()
const profileStore = useProfileStore()
const image = ref(null)
const cropperRef = ref()
const cropperCoverRef = ref(null)
const showImageCropper = ref(false)
const deleteAvatar = ref(false)
const deleteCover = ref(false)
const uploadedImage = ref(null)
const cvFile = ref()
const companyLogo = ref()
const seting = ref(false)
const password = ref()
const showCurrentPass = ref(false)
const showNewPass = ref(false)
const showComfirmPass = ref(false)
const currentPass=ref()
const newPass=ref()
const comfirmPass=ref()

onMounted(async () => {
  await profileStore.fetchProfile()
})
const validateCurrentPassword = () => {
    if (!currentPass.value) {
        errors.currentPass = 'Current Password is required'
        return false
    }
    errors.currentPass = ''
    return true
}
const validatePassword = () => {
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

const validateForm = () => {
    const currentPassValid = validateCurrentPassword()
    const passwordValid = validatePassword()
    const comfirmPasswordValid = validateComfirmPassword()

    let isValid = passwordValid && comfirmPasswordValid && currentPassValid

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

const applyCrop = async () => {
  const canvas = cropperRef.value.getResult().canvas
  const avatar = canvas.toDataURL('image/jpeg', 0.9)
  console.log(avatar)
  await profileStore.uploadAvatarBase64(avatar)
  showImageCropper.value = false
  uploadedImage.value = null
}
const applyChageCover = async () => {
  const canvas = cropperCoverRef.value.getResult().canvas
  const cover = canvas.toDataURL('image/jpeg', 0.9)
  console.log(cover)
  await profileStore.uploadCoverBase64(cover)
  editCover.value = false
  uploadedImage.value = null
}

const handleDeleteCover = async () => {
  editCover.value = false
  await profileStore.removeCover()
  if (!(await profileStore.isLoading)) deleteCover.value = false
}

const companyLink = ref()
const onCompanyLogoChange = (e) =>{
  const logo = e.target.files[0]
  if(!logo) return
  companyLogo.value=logo
}

const cvOnChangeFile = (e) => {
  const cv = e.target.files[0]
  if (!cv) return
  if (cv.type !== 'application/pdf') {
    alert('Only PDF allowed')
    return
  }
  cvFile.value = cv
}

const changePassword = () =>{
  validateForm()
  alert(`current p :${currentPass.value} new p : ${newPass.value} comf p : ${comfirmPass.value}`)
}
const handleSaveCv = async () => {
  if (!cvFile.value) return
  await profileStore.uploadCv(cvFile.value)
  console.log('this is cv file : ',cvFile.value)
  editCV.value = false
  cvFile.value=null
}

onMounted(async () => {
  await profileStore.fetchProfile()
  console.table(profileStore.user)
})

const editAvatar = ref(false)

function openAvatarModal() {
  editAvatar.value = true
}
function closeAvatarModal() {
  editAvatar.value = false
}

async function handleAvatarUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    await profileStore.uploadAvatar(file)
    editAvatar.value = false
  } catch (error) {
    console.error('Failed to upload avatar:', error)
  }
}

const handleAvatarDelete = async () => {
  showImageCropper.value = false
  await profileStore.removeAvatar()
  if (!(await profileStore.isLoading)) {
    deleteAvatar.value = false
  }
}

const editCover = ref(false)
function openEditCover() {
  editCover.value = true
}
function closeEditCover() {
  editCover.value = false
}
const HandleEditCover = () => {
  alert('Successfully')
  editCover.value = false
}

const editCV = ref(false)
function openEditCV() {
  editCV.value = true
}
function closeEditCV() {
  editCV.value = false
}
const HandleEditCV = () => {
  alert('Successfully')
  editCV.value = false
}

const editCollaboration = ref(false)
function openEditCollaboration() {
  editCollaboration.value = true
}
function closeEditCollaboration() {
  editCollaboration.value = false
}
const onChangeCompanyLogo = (e) =>{
  const logo = e.target.files[0]
  if(!logo) return
  companyLogo.value=logo

}
const HandleEditCollaboration = async() => {
  const companyLink = ref()
  const formData = new FormData()
  formData.append('company_logo',companyLogo.value)
  formData.append('company_link',companyLink.value)
  await profileStore.addCollaboration(formData)
  console.log(await profileStore.addCollaboration(formData))
  editCollaboration.value = false
}

const openSetting = ref(false)
function openChangePassAndDeleteAcc() {
  openSetting.value = true
}
function closeSetting() {
  openSetting.value = false
}

const settingTab = ref('password') // 'password' | 'delete'

onMounted(async () => {
  if (!profileStore.user) {
    try {
      const data = await profileStore.fetchProfile()
      console.log('Fetched Profile Data:', data)
      console.log(data.full_name)
    } catch (error) {
      console.error('Error fetching profile in header:', error)
    }
  } else {
    console.log('Profile Data already in store:', profileStore.user)
  }
})
</script>

<style scoped>
.profile-header-wrapper {
  background: var(--color-accent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 0;
  border-radius: 10px;
  overflow: hidden;
}

.avatar-wrapper {
  position: relative;
  width: fit-content;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--color-accent);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.avatar-edit:hover {
  opacity: 0.9;
}

/* Avatar modal actions */
.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.avatar-action {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--color-accent);
  font-size: 14px;
  cursor: pointer;
}

.avatar-action.upload:hover {
  background: var(--bg-hover);
}

.avatar-action.delete {
  color: var(--toastify-color-error);
  border-color: var(--toastify-color-error);
}

.avatar-action.delete:hover {
  background: rgba(239, 68, 68, 0.12);
}

.cover,
img {
  width: 100%;
  height: 400px;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  /* background-image: url('../../assets/R.png'); */
  background-size: cover;
  background-position: center;
  position: relative;

}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.edit-cover {
  position: absolute;
  right: 16px;
  bottom: 16px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--border-color);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.edit-cover:hover {
  background: var(--color-accent);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
  color: var(--color-text);
}

.profile-content {
  position: relative;
}

.avatar-wrapper {
  position: relative;
  padding-top: 1rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid var(--color-accent);
  margin-top: -50px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: var(--color-accent);
}

.info-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0.75rem;
  gap: 1rem;
  padding-bottom: 1rem;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 2px 0;
}

.user-role {
  color: var(--color-gray);
  font-size: 13px;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-outline {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  color: var(--color-text);
  background: var(--color-accent);
}

.btn-outline:hover {
  background: var(--color-primary);
  border-color: var(--border-color-hover);
  color: white;
}

.btn-icon {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  color: var(--color-primary);
  background: var(--color-accent);
}

.btn-icon:hover {
  background: var(--color-primary);
  border-color: var(--border-color-hover);
  color: white;
}

/* Add missing dark/outline-dark variants used in modal footer */
.btn-outline-dark {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  color: var(--color-text);
  background: var(--color-accent);
}

.btn-outline-dark:hover {
  background: var(--color-primary);
  border-color: var(--border-color-hover);
  color: var(--color-text);
}

.btn-dark {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: var(--color-primary);
  color: var(--color-text);
}

.btn svg {
  flex-shrink: 0;
}

.profile-tabs {
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid var(--border-color);
  padding-top: 0;
}

.tab-btn {
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gray);
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab-btn:hover {
  color: var(--color-text);
}

.tab-btn.active {
  color: var(--color-text);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-text);
}

.setting-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1rem;
}

.setting-tabs .tab {
  flex: 1;
  padding: 10px;
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  color: var(--color-gray);
  border-bottom: 2px solid transparent;
}

.setting-tabs .tab.active {
  color: var(--color-text);
  border-bottom-color: var(--color-text);
}

.setting-tabs .tab.danger.active {
  color: var(--toastify-color-error);
  border-bottom-color: var(--toastify-color-error);
}

.warning-box {
  background: #fee2e2;
  color: var(--toastify-color-error);
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  margin-bottom: 12px;
}

.btn-danger {
  background: var(--toastify-color-error);
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .info-section {
    flex-direction: column;
  }

  .actions {
    width: 100%;
  }

  .btn-outline {
    flex: 1;
  }

  .profile-tabs {
    overflow-x: auto;
  }

  .tab-btn {
    white-space: nowrap;
  }

}
</style>
