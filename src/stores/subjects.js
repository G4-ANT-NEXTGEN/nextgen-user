import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useSubjectStore = defineStore("subject", () => {
  const subjects = ref([]);
  const subject = ref(null);
  const isLoading = ref(false);

  const fetchSubjects = async (options = {}) => {
    const { force = false } = options;
    if (!force && subjects.value.length > 0) return;

    try {
      isLoading.value = true;
      const res = await api.get(`/api/subjects`);
      const data = res.data?.data?.items || res.data?.data || res.data || [];
      subjects.value = [...data].sort((a, b) => b.id - a.id);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    } finally {
      isLoading.value = false;
    }
  };


  return {
    subjects,
    isLoading,
    subject,
    fetchSubjects,
  };
});
