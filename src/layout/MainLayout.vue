<template>
  <div class="main-layout">
    <AppNavbar />

    <div class="container-fluid px-4 py-4 container-wrapper" style="margin-top: 70px;">
      <div class="row g-4">
        <!-- Sidebar -->
        <AppSidebar />

        <!-- Main Content -->
        <main class="col-lg-6 main-content">
          <slot></slot>
        </main>

        <!-- Optional Right Sidebar (can be a slot or specific component) -->
        <div class="col-lg-3 sidebar-right" v-if="$slots.right">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/layout/AppSidebar.vue';
</script>

<style scoped>
.main-layout {
  background-color: var(--color-background);
  min-height: 100vh;
}

.main-content {
  margin-top: 15px;
}

@media (max-width: 991px) {

  .sidebar-left,
  .sidebar-right {
    display: none;
  }

  .main-content {
    width: 100%;
  }
}
</style>
