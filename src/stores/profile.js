import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/api'
import { showSuccess, showError } from '@/utils/toast'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const useProfileStore = defineStore('profile', () => {
  const user = ref(null)
  const router = useRouter()
  const authStore = useAuthStore()
  const viewUser = ref(null)
  const isLoading = ref(false)
  const isProcessing = ref(false)
  const collaboration = ref(null)

  const fetchProfile = async () => {
    isLoading.value = true
    try {
      const res = await api.get('/api/profile')
      user.value = res.data.data
      return res.data.data
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const uploadAvatar = async (file) => {
    isProcessing.value = true
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const res = await api.post('/api/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      showSuccess(res.data.message)
      await fetchProfile()
      return res.data
    } catch (error) {
      showError(error.response?.data?.message || 'Fail to Upload Avatar!')
      throw error
    } finally {
      isProcessing.value = false
    }
  }
  const uploadCover = async (file) => {
    isProcessing.value = true

    try {
      const formData = new FormData()
      formData.append('cover', file)
      const res = await api.post('/api/profile/cover', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      await fetchProfile()
      showSuccess(res.data.message)
      return res.data
    } catch (error) {
      showError(error.response?.data?.message || 'Fail to upload cover!')
      throw error
    } finally {
      isProcessing.value = false
    }
  }
  const uploadCv = async (paylaod) => {
    isProcessing.value = true
    try {
      const formData = new FormData()
      formData.append('cv', paylaod)

      const res = await api.post(`/api/profile/cv`, formData, {
        headers: {
          Accept: 'application/pdf',
          'Content-Type': 'multipart/form-data',
        },
      })
      showSuccess(res.data.message)
    } catch (e) {
      showError(e.response?.data?.message || 'Only *.pdf file!')
    } finally {
      isProcessing.value = false
    }
  }

  const addCollaboration = async (payload) => {
    isProcessing.value = true
    try {
      const res = await api.post(`/api/profile/collaboration`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      showSuccess(res.data.message)
      await fetchProfile()
      return res
    } catch (e) {
      showError(e.response?.data?.message || 'Can not Upload Collaboration!')
    } finally {
      isProcessing.value = false
    }
  }

  const removeAvatar = async () => {
    isProcessing.value = true
    try {
      const res = await api.delete('/api/profile/avatar')
      await fetchProfile()
      showSuccess(res.data.message)
      return res.data
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to remove avatar!')
      throw error
    } finally {
      isProcessing.value = false
    }
  }
  const removeCover = async () => {
    try {
      isProcessing.value = true
      const res = await api.delete(`/api/profile/cover`)
      await fetchProfile()
      showSuccess(res.data.message)
    } catch (e) {
      showError(e.response?.data?.message || 'can not delete')
    } finally {
      isProcessing.value = false
    }
  }
  const updatePersonalInfo = async (payload) => {
    isProcessing.value = true
    try {
      const params = new URLSearchParams()
      Object.keys(payload).forEach((key) => {
        if (payload[key] !== null && payload[key] !== undefined && payload[key] !== '') {
          params.append(key, payload[key])
        }
      })

      const res = await api.put('/api/profile/info', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      await fetchProfile()
      showSuccess(res.data.message)
      return res.data
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update personal info!')
      throw error
    } finally {
      isProcessing.value = false
    }
  }

  const updateProfessionalInfo = async (payload) => {
    isProcessing.value = true
    try {
      const res = await api.put('/api/profile/professional', payload)
      // Refresh to get nested professional data correctly
      await fetchProfile()
      showSuccess(res.data.message)
      return res.data
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update professional info!')
      throw error
    } finally {
      isProcessing.value = false
    }
  }

  const changePassword = async (payload) => {
    try {
      isProcessing.value = true
      const params = new URLSearchParams()
      params.append('old_pass', payload.old_pass)
      params.append('new_pass', payload.new_pass)
      params.append('new_pass_confirmation', payload.new_pass_confirmation)

      const res = await api.put('/api/profile/change-pass', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      if (!res.data.result) {
        showError(res.data.message)

        isProcessing.value = true
        return
      }
      showSuccess(res.data.message)
      await fetchProfile()
      return res.data
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to change password!')
      throw error
    } finally {
      isProcessing.value = false
    }
  }

  const uploadAvatarBase64 = async (myImage) => {
    try {
      const response = await fetch(myImage)
      const blob = await response.blob()
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' })
      return await uploadAvatar(file)
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to upload avatar (base64)!')
    }
  }

  const uploadCoverBase64 = async (myImage) => {
    try {
      const response = await fetch(myImage)
      const blob = await response.blob()
      const file = new File([blob], 'cover.jpg', { type: 'image/jpeg' })
      return await uploadCover(file)
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to upload cover (base64)!')
    }
  }

  const userProfile = async (id) => {
    isLoading.value = true
    try {
      const res = await api.get(`/api/profile/users/${id}`)
      viewUser.value = res.data.data
      return res.data.data
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to fetch user profile!')
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const deleteAccount = async () => {
    try {
      isLoading.value = true
      await api.delete(`/api/profile/delete-acc`)
      showSuccess('Delete Account Successful')
      authStore.clearAuth()
      router.push({ name: 'landing' })
    } catch (e) {
      showError(e.response?.data?.message || 'Fail to delete account!')
    } finally {
      isLoading.value = false
    }
  }

  const downloadCv = async () => {
    try {
      isProcessing.value = true
      const cvUrl = user.value?.cv?.file_url || user.value?.cv
      if (!cvUrl) {
        showError('No CV available to download')
        return
      }
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a')
      link.href = cvUrl
      link.download = user.value?.cv?.name || `${user.value?.full_name || 'CV'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      showSuccess('CV downloaded successfully')
    } catch (error) {
      showError('Failed to download CV!')
    } finally {
      isProcessing.value = false
    }
  }
  const shareCv = async (method = 'link', cvUrlParam = null, nameParam = null) => {
    try {
      const cvUrl =
        cvUrlParam ||
        user.value?.cv?.file_url ||
        user.value?.cv ||
        viewUser.value?.cv?.file_url ||
        viewUser.value?.cv
      if (!cvUrl) {
        showError('No CV available to share')
        return
      }
      const fullName =
        nameParam || user.value?.full_name || viewUser.value?.full_name || 'Professional'
      const shareText = `Check out ${fullName}'s CV`

      const openPopup = (url, title = 'Share', w = 600, h = 600) => {
        const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - w) / 2))
        const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - h) / 2))
        const features = `toolbar=0,status=0,width=${w},height=${h},top=${top},left=${left}`
        window.open(url, title, features)
      }

      if (method === 'link') {
        // Copy link to clipboard
        await navigator.clipboard.writeText(cvUrl)
        showSuccess('CV link copied to clipboard!')
      } else if (method === 'email') {
        const subject = `${fullName}'s CV`
        const body = `Please check this CV: ${cvUrl}`
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      } else if (method === 'whatsapp') {
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + cvUrl)}`
        openPopup(shareUrl, 'WhatsApp', 600, 700)
      } else if (method === 'twitter') {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(cvUrl)}`
        openPopup(twitterUrl, 'Twitter', 600, 500)
      } else if (method === 'linkedin') {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cvUrl)}`
        openPopup(linkedinUrl, 'LinkedIn', 800, 600)
      } else if (method === 'facebook') {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cvUrl)}`
        openPopup(facebookUrl, 'Facebook', 800, 600)
      }
    } catch (error) {
      console.error('Failed to share CV:', error)
      showError('Failed to share CV')
    }
  }
  return {
    user,
    viewUser,
    isLoading,
    isProcessing,
    fetchProfile,
    uploadAvatar,
    removeAvatar,
    updatePersonalInfo,
    updateProfessionalInfo,
    changePassword,
    uploadAvatarBase64,
    uploadCoverBase64,
    uploadCover,
    removeCover,
    uploadCv,
    downloadCv,
    shareCv,
    userProfile,
    addCollaboration,
    deleteAccount,
    collaboration
  }
})
