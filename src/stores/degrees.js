import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useDegreeStore = defineStore("degree", () => {
  const degrees = ref([]);
  const degree = ref(null);
  const isLoading = ref(false);

  const fetchDegrees = async (options = {}) => {
    const { force = false } = options;
    if (!force && degrees.value.length > 0) return;

    try {
      isLoading.value = true;
      const res = await api.get(`/api/degrees`);
      const data = res.data?.data?.items || res.data?.data || res.data || [];
      degrees.value = [...data].sort((a, b) => b.id - a.id);
    } catch (err) {
      console.error("Error fetching degrees:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    degrees,
    isLoading,
    degree,
    fetchDegrees,
  };
});
