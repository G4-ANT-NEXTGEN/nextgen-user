<template>
  <div class="contact-page p-4">
    <!-- Hero Section -->
    <div class="contact-hero py-5 mb-5 position-relative overflow-hidden">
      <div class="hero-bg-overlay"></div>
      <div class="container-fluid px-4 position-relative z-1">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center reveal-up">
            <h1 class="display-4 fw-bold mb-3 hero-title text-white">Get in Touch</h1>
            <p class="lead text-white-50 mb-0">
              We'd love to hear from you. Please fill out this form or shoot us an email.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid px-4 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-11 col-xl-10">
          <div class="row g-5">
            <!-- Contact Form -->
            <div class="col-lg-7">
              <div class="card contact-card border-0 p-4 p-md-5 h-100 reveal-left">
                <div class="card-header-custom mb-4">
                  <h3 class="fw-bold mb-2 contect-card-title">Send us a Message</h3>
                  <div class="header-line"></div>
                </div>
                <form @submit.prevent="submitForm">
                  <div class="row g-4">
                    <div class="col-md-6">
                      <div class="form-group-custom">
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-control" placeholder="Jane" required>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group-custom">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-control" placeholder="Doe" required>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group-custom">
                        <label class="form-label">Email Address</label>
                        <input type="email" class="form-control" placeholder="jane@example.com" required>
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-group-custom">
                        <label class="form-label">Message</label>
                        <textarea class="form-control" rows="5" placeholder="How can we help you?" required></textarea>
                      </div>
                    </div>
                    <div class="col-12 pt-2">
                      <div class="d-flex justify-content-end">
                        <BaseButton type="button" variant="primary" @click="submitForm" :isLoading="isSubmitting">
                          <span v-if="!isSubmitting">Send Message</span>
                          <span v-else>Sending...</span>
                          <i v-if="!isSubmitting" class="bi bi-send-fill ms-2"></i>
                        </BaseButton>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="col-lg-5">
              <div class="d-flex flex-column gap-4 h-100 reveal-right">
                <!-- Info Cards -->
                <div class="info-card p-4 rounded-4">
                  <div class="d-flex align-items-center gap-4">
                    <div class="icon-circle text-white">
                      <i class="bi bi-geo-alt-fill"></i>
                    </div>
                    <div>
                      <h5 class="fw-bold mb-1">Visit Us</h5>
                      <p class="text-secondary mb-0">
                        123 Innovation Drive<br>
                        Tech City, TC 90210
                      </p>
                    </div>
                  </div>
                </div>

                <div class="info-card p-4 rounded-4">
                  <div class="d-flex align-items-center gap-4">
                    <div class="icon-circle text-white">
                      <i class="bi bi-envelope-fill"></i>
                    </div>
                    <div>
                      <h5 class="fw-bold mb-1">Email Us</h5>
                      <p class="text-secondary mb-0">
                        hello@nextgen.com<br>
                        support@nextgen.com
                      </p>
                    </div>
                  </div>
                </div>

                <div class="info-card p-4 rounded-4">
                  <div class="d-flex align-items-center gap-4">
                    <div class="icon-circle light-dark text-white">
                      <i class="bi bi-telephone-fill light-dark"></i>
                    </div>
                    <div>
                      <h5 class="fw-bold mb-1 light-dark">Call Us</h5>
                      <p class="text-secondary mb-0">
                        096 4207 193<br>
                        Mon-Fri from 8am to 5pm
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Socials -->
                <div class="social-links mt-auto pt-4 text-center text-lg-start">
                  <h6 class="fw-bold mb-4 text-uppercase small dark-light">Follow Our Journey</h6>
                  <div class="d-flex gap-3 justify-content-center justify-content-lg-start">
                    <a href="#" class="social-btn"><i class="bi bi-twitter-x"></i></a>
                    <a href="#" class="social-btn"><i class="bi bi-linkedin"></i></a>
                    <a href="#" class="social-btn"><i class="bi bi-facebook"></i></a>
                    <a href="#" class="social-btn"><i class="bi bi-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/ui/base/BaseButton.vue';
import { showSuccess } from '@/utils/toast';
import { ref } from 'vue';

const isSubmitting = ref(false);

const submitForm = () => {
  isSubmitting.value = true;
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false;
    showSuccess('Message sent successfully!');
  }, 1500);
};

defineOptions({
  name: 'ContactView'
});
</script>

<style scoped>
.contact-page {
  color: var(--color-text);
  min-height: 100%;
  padding-bottom: 3rem;
}

.contect-card-title {
  color: var(--color-text);
}

/* Hero Styles */
.contact-hero {
  background-color: #000;
  border-radius: 30px;
  margin: 0 1rem 3rem 1rem;
}

.hero-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.6;
}

.hero-title {
  letter-spacing: -1.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Card Styles */
.contact-card {
  background: var(--color-surface);
  box-shadow: var(--shadow-xl);
  border-radius: 24px;
  border: 1px solid var(--color-border) !important;
}

.card-header-custom {
  position: relative;
}

.header-line {
  width: 50px;
  height: 4px;
  background: var(--color-primary);
  border-radius: 2px;
}

/* Form Styles */
.form-group-custom {
  margin-bottom: 0.5rem;
}

.form-label {
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-muted);
  margin-bottom: 0.5rem;
  display: block;
}

.form-control,
.form-select {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 12px;
  padding: 0.85rem 1.25rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  background-color: var(--color-background);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-text);
}

.send-btn {
  border-radius: 12px;
  padding: 1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(var(--color-primary-rgb), 0.3);
}

.send-btn:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 8px 25px rgba(var(--color-primary-rgb), 0.4);
}

/* Info Cards */
.info-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.info-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.bg-primary-gradient {
  background-color: var(--color-text);
}

.bg-secondary-gradient {
  background-color: var(--color-text);
}

.bg-info-gradient {
  background-color: var(--color-text);
}

/* Social Buttons */
.social-btn {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  font-size: 1.35rem;
}

.social-btn:hover {
  border-color: var(--color-primary);
  transform: translateY(-5px) rotate(8deg);
  box-shadow: 0 5px 15px rgba(var(--color-primary-rgb), 0.3);
}

.letter-spacing-2 {
  letter-spacing: 2px;
}

/* Animations */
.reveal-up {
  animation: revealUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.reveal-left {
  animation: revealLeft 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.reveal-right {
  animation: revealRight 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes revealLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes revealRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 991px) {
  .contact-hero {
    border-radius: 20px;
    margin: 0 0 2rem 0;
  }

  .info-card:hover {
    transform: translateY(-5px);
  }
}
</style>
