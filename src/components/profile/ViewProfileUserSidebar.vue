<template>
  <div class="profile-sidebar-wrapper">
    <!-- Skeleton State -->
    <template v-if="!userData">
      <div v-for="i in 2" :key="i" class="sidebar-card skeleton-card">
        <div class="skeleton-title mb-4"></div>
        <div class="skeleton-content">
          <div v-for="j in 3" :key="j" class="skeleton-row mb-3">
            <div class="skeleton-icon"></div>
            <div class="skeleton-line"></div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <!-- Card 1: Contact Information (Read Only) -->
      <div class="sidebar-card contact-card">
        <h3 class="card-title mb-5">Contact Information</h3>

        <div class="contact-list">
          <div class="contact-item">
            <i class="bi bi-envelope-fill"></i>
            <span>{{ userData?.email || 'email@example.com' }}</span>
          </div>
          <div class="contact-item">
            <i class="bi bi-telephone-fill"></i>
            <span>{{ userData?.phone || '+855 123 456 789' }}</span>
          </div>
          <div class="contact-item" v-if="userData?.current_city">
            <i class="bi bi-geo-alt-fill"></i>
            <span>{{ userData.current_city }}</span>
          </div>
        </div>

      </div>

      <!-- Card 2: Professional Skills -->
      <div class="sidebar-card skills-card" v-if="userData?.skills?.length">
        <h3 class="card-title">
          <i class="bi bi-code-slash me-2 text-primary"></i>
          Professional Skills
        </h3>

        <div class="skills-list">
          <span v-for="skill in userData.skills" :key="skill.id" class="skill-tag">
            <i class="bi bi-lightning-charge-fill me-1 text-warning small"></i>
            {{ skill.name }}
          </span>
        </div>
      </div>

      <!-- Card 3: Education Summary -->
      <div class="sidebar-card info-summary" v-if="userData?.educations?.length">
        <h3 class="card-title">Education</h3>
        <div class="summary-list">
          <div v-for="edu in userData.educations.slice(0, 3)" :key="edu.id" class="summary-item">
            <i class="bi bi-mortarboard-fill"></i>
            <div class="d-flex flex-column gap-1">
              <div class="item-title">{{ edu.school?.name }}</div>
              <div class="item-sub">{{ edu.degrees?.name }} • {{ edu.start_date?.split('-')[0] }} - {{
                edu.end_date?.split('-')[0] || 'Present' }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  userData: {
    type: Object,
    required: true,
  },
})

defineEmits(['change-tab'])
</script>

<style scoped>
.profile-sidebar-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: var(--color-surface);
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sidebar-card:hover {
  box-shadow: var(--shadow-md);
}

.card-title {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

/* Contact Details */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 1.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
}

.contact-item i {
  width: 32px;
  height: 32px;
  background: var(--color-accent);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-size: 1rem;
}

/* Skills Section */
.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  background: var(--color-accent);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  display: flex;
  align-items: center;
}

/* Summary Items */
.summary-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.summary-item {
  display: flex;
  gap: 1rem;
}

.summary-item i {
  font-size: 1.5rem;
  color: var(--color-primary);
  opacity: 0.7;
}

.item-title {
  font-weight: 700;
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.4;
}

.item-sub {
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-top: 0.15rem;
}

/* Skeleton Styles */
.skeleton-card {
  pointer-events: none;
}

.skeleton-title {
  width: 60%;
  height: 24px;
  background: var(--color-accent);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.skeleton-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skeleton-icon {
  width: 32px;
  height: 32px;
  background: var(--color-accent);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.skeleton-line {
  flex: 1;
  height: 16px;
  background: var(--color-accent);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.skeleton-title::before,
.skeleton-icon::before,
.skeleton-line::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 2s infinite;
}

[data-theme="dark"] .skeleton-title::before,
[data-theme="dark"] .skeleton-icon::before,
[data-theme="dark"] .skeleton-line::before {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

@keyframes shimmer {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

@media (max-width: 991px) {
  .profile-sidebar-column {
    position: static;
    margin-bottom: 2rem;
  }
}
</style>
