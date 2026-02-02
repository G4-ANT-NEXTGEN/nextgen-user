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
      <p v-if="userData?.city">{{ userData.city }}</p>
      <p v-if="userData?.country">{{ userData.country }}</p>
      <p v-if="!userData?.email && !userData?.city && !userData?.country">
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
      <p v-if="userData?.job_title">{{ userData.job_title }}</p>
      <p v-if="userData?.company_name">{{ userData.company_name }}</p>
      <p v-if="userData?.responsibilities">{{ userData.responsibilities }}</p>
      <p v-if="!userData?.job_title && !userData?.company_name && !userData?.responsibilities">
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
      <p v-if="userData?.education && userData.education.length > 0">
        {{ userData.education.length }} Degree(s)
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
