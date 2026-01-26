<template>
  <div>
    <InfoCard
      title="Project"
      icon="bi bi-person"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="true"
      @update="UpdatePersonal"
    >
      <h6>Project Title:  
        <span>NEXTGEN</span>
      </h6>
      <p>Kon khmer 5 nek</p>
    </InfoCard>
  </div>
</template>

<script setup>
import InfoCard from '../InfoCard.vue'
</script>