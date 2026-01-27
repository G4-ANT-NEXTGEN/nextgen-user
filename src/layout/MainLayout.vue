<template>
  <main class="main-content">
    <slot></slot>
  </main>
</template>

<script setup>
defineOptions({
  name: 'MainLayout'
});
</script>

<style scoped>
.main-content {
  margin-top: 0;
  width: 100%;
}

@media (max-width: 991px) {
  .main-content {
    width: 100%;
  }
}
</style>
