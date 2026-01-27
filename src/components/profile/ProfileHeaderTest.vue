<template>
  <div class="profile-header-wrapper">
    <!-- Cover -->
    <div class="cover position-relative">
      <button class="btn btn-light btn-sm edit-cover" @click="openEditCover">
        <i class="bi bi-pencil-square"></i>
        Edit Cover Photo
      </button>
    </div>

    <!-- Update Cover -->
    <BaseModal v-if="editCover" title="Update Your Cover" @close="closeEditCover">
      <div class="mb-3">
        <label for="formFile" class="form-label">Update Your Cover</label>
        <input class="form-control" type="file" id="formFile" />
      </div>

      <template #footer>
        <button class="btn btn-outline-dark" @click="closeEditCover">Cancel</button>
        <button class="btn btn-dark" @click="HandleEditCover">Save Changes</button>
      </template>
    </BaseModal>

    <!-- Profile Content -->
    <div class="container-fluid p-0">
      <div class="profile-content px-3">
        <!-- Avatar positioned to overlap cover -->
        <div class="avatar-wrapper">
          <img class="avatar" src="../../assets/avatar.jpg" alt="Profile" />

          <!-- Edit Avatar Button -->
          <button class="avatar-edit" @click="openAvatarModal">
            <i class="bi bi-camera"></i>
          </button>
        </div>

        <!-- Modal for Update and Delete Avatar -->
        <BaseModal v-if="editAvatar" title="Profile Photo" @close="closeAvatarModal">
          <div class="avatar-actions">
            <label class="avatar-action upload">
              <i class="bi bi-upload"></i>
              Upload New Photo
              <input type="file" hidden @change="onFileChange" />
              <Cropper
                v-if="image"
                :src="image"
                :stencil-props="{ aspectRatio: 1 }"
                class="cropper"
                @change="crop"
              />

              <img v-if="croppedImage" :src="croppedImage" class="preview" />
            </label>

            <button class="avatar-action delete" @click="handleAvatarDelete">
              <i class="bi bi-trash"></i>
              Remove Photo
            </button>
          </div>
        </BaseModal>

        <!-- Info and Actions -->
        <div class="info-section">
          <div class="user-info">
            <h4 class="user-name">Sim Vin</h4>
            <small class="user-role">Web Developer • Freelancer</small>
          </div>

          <div class="actions">
            <button class="btn btn-outline" @click="openEditCV">
              <i class="bi bi-file-earmark-richtext"></i>
              Upload CV
            </button>

            <!-- Update CV -->
            <BaseModal v-if="editCV" title="Upload Your CV" @close="closeEditCV">
              <div class="mb-3">
                <label for="formFile" class="form-label">Upload Your CV</label>
                <input class="form-control" type="file" id="formFile" />
              </div>

              <template #footer>
                <button class="btn btn-outline-dark" @click="closeEditCV">Cancel</button>
                <button class="btn btn-dark" @click="HandleEditCV">Save Changes</button>
              </template>
            </BaseModal>

            <button class="btn btn-outline" @click="openEditCollaboration">
              <i class="bi bi-people"></i>
              Collaboration
            </button>

            <!-- Update Collaboration -->
            <BaseModal
              v-if="editCollaboration"
              title="Upload Your Collaboration"
              @close="closeEditCollaboration"
            >
              <div class="mb-3">
                <label for="formFile" class="form-label">Upload Your Collaboration</label>
                <input class="form-control" type="file" id="formFile" />
              </div>
              <BaseInput label="Company Link" />

              <template #footer>
                <button class="btn btn-outline-dark" @click="closeEditCollaboration">Cancel</button>
                <button class="btn btn-dark" @click="HandleEditCollaboration">Save Changes</button>
              </template>
            </BaseModal>

            <button class="btn btn-icon" @click="openChangePassAndDeleteAcc">
              <i class="bi bi-gear"></i>
            </button>

            <!-- Modal Change Password And Delete Account -->
            <BaseModal v-if="openSetting" title="Account Settings" @close="closeSetting">
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
                  <BaseInput label="Current Password" type="password" />
                  <BaseInput label="New Password" type="password" />
                  <BaseInput label="Confirm New Password" type="password" />

                  <div class="footer">
                    <button class="btn btn-dark">Update Password</button>
                  </div>
                </div>

                <!-- Delete Account -->
                <div v-else>
                  <div class="warning-box">
                    ⚠️ <strong>Warning:</strong> This action cannot be undone. Deleting your account
                    will permanently remove all data.
                  </div>

                  <BaseInput label="Type DELETE to confirm" />

                  <div class="footer">
                    <button class="btn btn-danger">Delete My Account</button>
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
import { ref } from 'vue'
import { Cropper } from 'vue-advanced-cropper'

const image = ref(null)
const cropedImage = ref(null)
const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  image.value = URL.createObjectURL(file)
}
const crop = (cropper) => {
  const canvas = cropper.getResult().canvas
  if (canvas) {
    cropedImage.value = canvas.toDataURL('image/png')
  }
}
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

const editAvatar = ref(false)

function openAvatarModal() {
  editAvatar.value = true
}
function closeAvatarModal() {
  editAvatar.value = false
}

function handleAvatarUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  // TODO: upload API
  alert('Avatar uploaded')
  editAvatar.value = false
}

function handleAvatarDelete() {
  if (confirm('Remove profile photo?')) {
    // TODO: delete API
    alert('Avatar removed')
    editAvatar.value = false
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
const HandleEditCollaboration = () => {
  alert('Successfully')
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

.cover {
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: url('../../assets/R.png');
  background-size: cover;
  background-position: center;
  position: relative;
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
  .cropper {
  height: 300px;
  background: #000;
}

.preview {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

}
</style>
