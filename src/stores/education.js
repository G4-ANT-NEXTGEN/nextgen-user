import { defineStore } from "pinia";
import api from "@/api/api";
import { showSuccess, showError } from '@/utils/toast'

export const useEducationStore = defineStore("education", () => {

  const CreateEducation = async (payload) => {
    try {
      const responce = await api.post("/api/educations", payload);
      showSuccess("Education created successfully");
      return responce.data;
    } catch (err) {
      console.log("Create Education Error:", err);
      showError("Failed to create Education");
      throw err;
    }
  };

  const UpdateEducation = async (id, payload) => {
    try {
        const responce = await api.put(`/api/educations/${id}`, payload);
        showSuccess("Education updated successfully");
        return responce.data;
    } catch (err) {
        showError("Failed to Update Education");
        throw err;
    }
  }

  const DeleteEducation = async (id) => {
    try {
        const responce = await api.delete(`/api/educations/${id}`);
        showSuccess("Education deleted successfully");
        return responce.data;
    } catch (err) {
        showError("Failed to delete Education");
        throw err;
    }
  }


  return {
    CreateEducation,
    UpdateEducation,
    DeleteEducation
  };
});
