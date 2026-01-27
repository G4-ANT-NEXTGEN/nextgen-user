<template>
  <div>
    <InfoCard
      title="Education"
      icon="bi bi-person"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="true"
      @update="UpdatePersonal"
    >
      <h6>School: <span></span> </h6>
      <h6>Degree: <span></span> </h6>
      <h6>Subject: <span></span> </h6>
      <h6>Start Date: <span></span> </h6>
      <h6>End Date: <span></span> </h6>
      <h6>Desciption: <span></span> </h6>
    </InfoCard>
  </div>
</template>

<script setup>
import InfoCard from '../InfoCard.vue'
</script>