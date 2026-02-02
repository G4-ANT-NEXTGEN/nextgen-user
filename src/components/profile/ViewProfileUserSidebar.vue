<template>
  <aside>
    <!-- ======== Personal Info - Read Only ======== -->
    <InfoCard
      title="Personal"
      icon="bi bi-person"
      :showCreate="false"
      :showUpdate="false"
      :showDelete="false"
    >
      <p v-if="userData?.email">Email: {{ userData.email }}</p>
      <p v-if="userData?.current_city">City: {{ userData.current_city }}</p>
      <p v-if="userData?.home_town">Hometown: {{ userData.home_town }}</p>
      <p v-if="!userData?.email && !userData?.current_city && !userData?.home_town">
        No personal information available
      </p>
    </InfoCard>

    <!-- ======== Professional Info - Read Only ======== -->
    <InfoCard
      title="Professional"
      icon="bi bi-briefcase"
      :showCreate="false"
      :showUpdate="false"
      :showDelete="false"
    >
      <p v-if="userData?.professional?.job_title">{{ userData.professional.job_title }}</p>
      <p v-if="userData?.professional?.company_name">{{ userData.professional.company_name }}</p>
      <p v-if="userData?.professional?.responsibility">
        {{ userData.professional.responsibility }}
      </p>
      <p
        v-if="
          !userData?.professional?.job_title &&
          !userData?.professional?.company_name &&
          !userData?.professional?.responsibility
        "
      >
        No professional information available
      </p>
    </InfoCard>

    <!-- ======== Skills - Read Only ======== -->
    <InfoCard
      title="Skills"
      icon="bi bi-lightning"
      :showCreate="false"
      :showUpdate="false"
      :showDelete="false"
    >
      <span v-if="userData?.skills && userData.skills.length > 0">
        <span v-for="skill in userData.skills" :key="skill.id" class="badge bg-secondary me-1">
          {{ skill.name }}
        </span>
      </span>
      <p v-else>No skills listed</p>
    </InfoCard>

    <!-- ======== Projects - Read Only ======== -->
    <InfoCard
      title="Projects"
      icon="bi bi-folder"
      :showCreate="false"
      :showUpdate="false"
      :showDelete="false"
    >
      <p v-if="userData?.projects && userData.projects.length > 0">
        {{ userData.projects.length }} Projects
      </p>
      <p v-else>No projects</p>
    </InfoCard>

    <!-- ======== Education - Read Only ======== -->
    <InfoCard
      title="Education"
      icon="bi bi-mortarboard"
      :showCreate="false"
      :showUpdate="false"
      :showDelete="false"
    >
      <p v-if="userData?.educations && userData.educations.length > 0">
        {{ userData.educations.length }} Degree(s)
      </p>
      <p v-else>No education information</p>
    </InfoCard>
  </aside>
</template>

<script setup>
import InfoCard from '@/components/profile/InfoCard.vue'

defineProps({
  userData: {
    type: Object,
    required: true,
  },
})
</script>
