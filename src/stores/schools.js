import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useSchoolStore = defineStore("school", () => {
  const schools = ref([]);
  const school = ref(null);
  const isLoading = ref(false);

  const fetchSchools = async (options = {}) => {
    const { force = false } = options;
    if (!force && schools.value.length > 0) return;

    try {
      isLoading.value = true;
      const res = await api.get(`/api/schools`);
      const data = res.data?.data?.items || res.data?.data || res.data || [];
      schools.value = [...data].sort((a, b) => b.id - a.id);
    } catch (err) {
      console.error("Error fetching schools:", err);
    } finally {
      isLoading.value = false;
    }
  };


  return {
    schools,
    isLoading,
    school,
    fetchSchools,
  };
});
