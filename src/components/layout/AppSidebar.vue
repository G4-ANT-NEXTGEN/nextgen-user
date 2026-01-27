<template>
  <div class="sidebar-left">
    <div class="sidebar-content">
      <!-- Profile Card -->
      <div class="card-custom mb-3">
        <div class="d-flex align-items-center gap-3 mb-3">
          <div class="avatar overflow-hidden rounded-circle">
            <img class="img-fluid" :src="authStore.user?.avatar" alt="">
          </div>
          <div>
            <h6 class="mb-0 fw-bold">
              {{ authStore.user?.full_name }}
              <i class="bi bi-check-circle-fill text-primary-custom"></i>
            </h6>
            <small style="color: var(--color-muted);">
              @{{ authStore.user?.full_name?.toLowerCase().replace(/ /g, '.') }}
            </small>
          </div>
        </div>
        <div class="row text-center profile-stats">
          <div class="col-4">
            <div class="fw-bold fs-5">2.3k</div>
            <small style="color: var(--color-muted);">Follower</small>
          </div>
          <div class="col-4">
            <div class="fw-bold fs-5">235</div>
            <small style="color: var(--color-muted);">Following</small>
          </div>
          <div class="col-4">
            <div class="fw-bold fs-5">80</div>
            <small style="color: var(--color-muted);">Post</small>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="nav-menu mb-3">
        <router-link :to="{ name: 'home' }" class="nav-item" active-class="active">
          <i class="bi bi-house-door-fill"></i>
          <span>Feed</span>
        </router-link>
        <router-link :to="{ name: 'events' }" class="nav-item" active-class="active">
          <i class="bi bi-calendar-event-fill"></i>
          <span>Events</span>
        </router-link>
        <router-link :to="{ name: 'about' }" class="nav-item" active-class="active">
          <i class="bi bi-info-circle-fill"></i>
          <span>About us</span>
        </router-link>
        <router-link :to="{ name: 'help' }" class="nav-item" active-class="active">
          <i class="bi bi-question-circle-fill"></i>
          <span>help</span>
        </router-link>
      </div>

      <!-- Pages You Like -->
      <div class="card-custom">
        <h6 class="fw-bold mb-3" style="color: var(--color-muted); letter-spacing: 0.5px;">PAGES YOU LIKE</h6>
        <div class="page-item-custom">
          <div class="page-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">UI
          </div>
          <span class="fw-medium">UI/UX Community</span>
        </div>
        <div class="page-item-custom">
          <div class="page-icon" style="background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%);">WD
          </div>
          <span class="fw-medium">Web Designer</span>
        </div>
        <div class="page-item-custom">
          <div class="page-icon" style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);">D
          </div>
          <span class="fw-medium">Dribbble Community</span>
        </div>
        <div class="page-item-custom">
          <div class="page-icon" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);">B
          </div>
          <span class="fw-medium">Behance <i class="bi bi-patch-check-fill text-primary-custom"
              style="font-size: 12px;"></i></span>
        </div>
        <a href="#" class="link-custom small mt-2 d-inline-block">View All</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

defineOptions({
  name: 'AppSidebar'
})
</script>

<style scoped>
.sidebar-left {
  width: 25%;
  position: sticky;
  top: 85px;
  height: calc(100vh - 85px);
}

.card-custom {
  background: var(--color-accent);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.nav-menu {
  background: var(--color-accent);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  color: var(--color-text);
  margin-bottom: 4px;
}

.nav-item:hover {
  background: var(--color-secondary);
  color: var(--color-primary);
}

.nav-item.active {
  background: var(--color-primary);
  color: var(--color-on-primary) !important;
  box-shadow: var(--shadow-sm);
}

.nav-item.active i {
  color: var(--color-on-primary) !important;
}

.nav-item i {
  font-size: 20px;
  color: var(--color-muted);
  transition: all 0.2s ease;
}

.page-item-custom {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  cursor: pointer;
}

.page-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 13px;
}

.text-primary-custom {
  color: #0d6efd;
}

.link-custom {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
}
</style>
