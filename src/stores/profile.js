import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/api";
import {showSuccess,showError,showWarning} from '@/utils/toast'

export const useProfileStore = defineStore("profile", () => {
  const user = ref(null);
  const isLoading = ref(false);
  const isProcessing = ref(false);

  const fetchProfile = async () => {
    isLoading.value = true;
    try {
      const res = await api.get("/api/profile");
      user.value = res.data.data;
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const uploadAvatar = async (file) => {
    isProcessing.value = true;
    try {

      const formData = new FormData();
      formData.append("avatar", file);
      const res = await api.post("/api/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showSuccess('Avatar Upload Successful')
      await fetchProfile();
      return res.data;
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      showError('Fail to Upload Avatar!')
      throw error;
    } finally {
      isProcessing.value = false;
    }
  }; const uploadCover = async (file) => {
    isProcessing.value = true;

    try {
      const formData = new FormData();
      formData.append("cover", file);
      const res = await api.post("/api/profile/cover", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchProfile();
      showSuccess('Avatar Upload Successful')
      return res.data;
    } catch (error) {
      console.error("Failed to upload cover:", error);
      showError('Fail to upload avatar!')
      throw error;
    } finally {
      isProcessing.value = false;
    }
  };
  const uploadCv = async(payload) => {
    isLoading.value=true
    try{
      const formData = new FormData()
      formData.append('cv',payload)
      const res = await api.post(`/api/profile/cv`,formData,{
         headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      showSuccess('CV Upload Successful')
      return res
    }
    catch(e){
      showError('Only *.pdf file!')
      console.log(e)
    }
    finally
    {
      isLoading.value=false
    }
  }
  const addCollaboration = async (payload) =>{
    isLoading.value = true
    try{
      const res = api.post(`/api/profile/collaboration`,payload,{
         headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      showSuccess('Collaboration Upload Successful')
      return res
    }
    catch(e){
      console.log(e)
      showError('Can not Upload Collaboration!')
    }
    finally{
      isLoading.value=false
    }
  }
  const removeAvatar = async () => {
    isProcessing.value = true;
    try {
      const res = await api.delete("/api/profile/avatar");
      await fetchProfile();
      showSuccess('Avatar Deleted')
      return res.data;
    } catch (error) {
      console.error("Failed to remove avatar:", error);
      throw error;
    } finally {
      isProcessing.value = false;
    }
  };
  const removeCover = async() => {
    try{
      isLoading.value=true
      await api.delete(`/api/profile/cover`)
      await fetchProfile()
      showSuccess('Cover Deleted')
    }
    catch(e){
      console.log(e)
      showError('can not delete')
    }
    finally{
      isLoading.value=false
    }
  }
  const updatePersonalInfo = async (payload) => {
    isProcessing.value = true;
    try {
      const params = new URLSearchParams();
      Object.keys(payload).forEach(key => {
        if (payload[key] !== null && payload[key] !== undefined && payload[key] !== '') {
          params.append(key, payload[key]);
        }
      });

      const res = await api.put("/api/profile/info", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      await fetchProfile();
      return res.data;
    } catch (error) {
      console.error("Failed to update personal info:", error);
      throw error;
    } finally {
      isProcessing.value = false;
    }
  };

  const updateProfessionalInfo = async (payload) => {
    isProcessing.value = true;
    try {
      const res = await api.put("/api/profile/professional", payload);
      // Refresh to get nested professional data correctly
      await fetchProfile();
      return res.data;
    } catch (error) {
      console.error("Failed to update professional info:", error);
      throw error;
    } finally {
      isProcessing.value = false;
    }
  };

  const changePassword = async (payload) => {
    isProcessing.value = true;
    try {
      const params = new URLSearchParams();
      params.append("old_pass", payload.old_pass);
      params.append("new_pass", payload.new_pass);
      params.append("new_pass_confirmation", payload.new_pass_confirmation);

      const res = await api.put("/api/profile/change-pass", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      await fetchProfile();
      return res.data;
    } catch (error) {
      console.error("Failed to change password:", error);
      throw error;
    } finally {
      isProcessing.value = false;
    }
  };
  const uploadAvatarBase64 = async (myImage) => {
    try {
      const response = await fetch(myImage);
      const blob = await response.blob();
      const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
      return await uploadAvatar(file);
    } catch (err) {
      console.log("Failed to upload avatar (base64):", err);
    }
  }
  const uploadCoverBase64 = async (myImage) => {
    try {
      const response = await fetch(myImage);
      const blob = await response.blob();
      const file = new File([blob], "cover.jpg", { type: "image/jpeg" });
      return await uploadCover(file);
    } catch (err) {
      console.log("Failed to upload cover (base64):", err);
    }
  }
  return {
    user,
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
    uploadCv
  };
});
