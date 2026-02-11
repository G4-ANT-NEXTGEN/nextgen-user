import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";
import { showSuccess, showError } from '@/utils/toast'

export const useEducationStore = defineStore("education", () => {

  const isLoading = ref(false)

  const handleApiError = (error, defaultMsg) => {
    let errorMsg = defaultMsg
    const responseData = error.response?.data

    if (responseData?.data && typeof responseData.data === 'object' && !Array.isArray(responseData.data)) {
      const keys = Object.keys(responseData.data)
      if (keys.length > 0) {
        const firstKey = keys[0]
        const firstError = responseData.data[firstKey]
        if (Array.isArray(firstError) && firstError.length > 0) {
          errorMsg = firstError[0]
        } else {
          errorMsg = String(firstError)
        }
      } else if (responseData?.message) {
        errorMsg = responseData.message
      }
    } else if (responseData?.errors) {
      const firstErrorKey = Object.keys(responseData.errors)[0]
      errorMsg = responseData.errors[firstErrorKey][0]
    } else if (responseData?.message) {
      errorMsg = responseData.message
    }
    showError(errorMsg)
    console.error(defaultMsg + ' Error:', error)
  }

  const CreateEducation = async (payload) => {
    isLoading.value = true
    try {
      const responce = await api.post("/api/educations", payload);
      showSuccess(responce.data.message || "Education created successfully");
      return responce.data;
    } catch (err) {
      handleApiError(err, "Failed to create Education")
      throw err;
    }
    finally {
      isLoading.value = false
    }
  };

  const UpdateEducation = async (id, payload) => {
    try {
      const responce = await api.put(`/api/educations/${id}`, payload);
      showSuccess(responce.data.message || "Education updated successfully");
      return responce.data;
    } catch (err) {
      handleApiError(err, "Failed to Update Education")
      throw err;
    }
  }

  const DeleteEducation = async (id) => {
    try {
      const responce = await api.delete(`/api/educations/${id}`);
      showSuccess(responce.data.message || "Education deleted successfully");
      return responce.data;
    } catch (err) {
      handleApiError(err, "Failed to delete Education")
      throw err;
    }
  }


  return {
    isLoading,
    CreateEducation,
    UpdateEducation,
    DeleteEducation
  };
});
