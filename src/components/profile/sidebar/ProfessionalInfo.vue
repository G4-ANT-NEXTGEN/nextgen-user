<template>
  <div>
    <InfoCard
      title="Professional"
      icon="bi bi-person"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @update="UpdatePersonal"
    >
      <h6>Job Title: <span></span> </h6>
      <h6>Company Name: <span></span> </h6>
      <h6>Responsibilities: <span></span> </h6>
    </InfoCard>
  </div>
</template>

<script setup>
import InfoCard from '../InfoCard.vue'
</script>