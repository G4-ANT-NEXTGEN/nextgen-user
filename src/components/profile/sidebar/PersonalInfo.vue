<template>
  <div>
    <InfoCard
      title="Personal"
      icon="bi bi-person"
      :showCreate="false"
      :showUpdate="true"
      :showDelete="false"
      @update="UpdatePersonal"
    >
      <p>Email: simvin@mail.com</p>
      <p>Cambodia</p>
    </InfoCard>
  </div>
</template>

<script setup>
import InfoCard from '../InfoCard.vue'
</script>
