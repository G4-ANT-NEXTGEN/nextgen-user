<template>
  <div class="contact-page">
    <div class="container-fluid px-4 py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-8">

          <!-- Header -->
          <div class="text-center mb-5">
            <h1 class="display-4 fw-bold mb-3 hero-title">Get in Touch</h1>
            <p class="lead text-secondary">
              We'd love to hear from you. Please fill out this form or shoot us an email.
            </p>
          </div>

          <div class="row g-5">
            <!-- Contact Form -->
            <div class="col-lg-7">
              <div class="card contact-card border-0 p-4 p-md-5 h-100">
                <h3 class="fw-bold mb-4">Send us a Message</h3>
                <form @submit.prevent="submitForm">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">First Name</label>
                      <input type="text" class="form-control form-control-lg" placeholder="Jane" required>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Last Name</label>
                      <input type="text" class="form-control form-control-lg" placeholder="Doe" required>
                    </div>
                    <div class="col-12">
                      <label class="form-label">Email Address</label>
                      <input type="email" class="form-control form-control-lg" placeholder="jane@example.com" required>
                    </div>
                    <div class="col-12">
                      <label class="form-label">Subject</label>
                      <select class="form-select form-select-lg">
                        <option selected>General Inquiry</option>
                        <option>Support</option>
                        <option>Feedback</option>
                        <option>Business Partnership</option>
                      </select>
                    </div>
                    <div class="col-12">
                      <label class="form-label">Message</label>
                      <textarea class="form-control form-control-lg" rows="5" placeholder="How can we help you?"
                        required></textarea>
                    </div>
                    <div class="col-12 pt-2">
                      <button type="submit" class="btn btn-primary btn-lg w-100 send-btn">
                        <span v-if="!isSubmitting">Send Message</span>
                        <div v-else class="spinner-border spinner-border-sm" role="status"></div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="col-lg-5">
              <div class="d-flex flex-column gap-4 h-100">
                <!-- Info Cards -->
                <div class="info-card p-4 rounded-4">
                  <div class="d-flex align-items-center gap-3 mb-2">
                    <div class="icon-circle bg-primary-subtle text-primary">
                      <i class="bi bi-geo-alt-fill"></i>
                    </div>
                    <h5 class="fw-bold mb-0">Visit Us</h5>
                  </div>
                  <p class="text-secondary mb-0 ps-5">
                    123 Innovation Drive<br>
                    Tech City, TC 90210
                  </p>
                </div>

                <div class="info-card p-4 rounded-4">
                  <div class="d-flex align-items-center gap-3 mb-2">
                    <div class="icon-circle bg-success-subtle text-success">
                      <i class="bi bi-envelope-fill"></i>
                    </div>
                    <h5 class="fw-bold mb-0">Email Us</h5>
                  </div>
                  <p class="text-secondary mb-0 ps-5">
                    hello@nextgen.com<br>
                    support@nextgen.com
                  </p>
                </div>

                <div class="info-card p-4 rounded-4">
                  <div class="d-flex align-items-center gap-3 mb-2">
                    <div class="icon-circle bg-info-subtle text-info">
                      <i class="bi bi-telephone-fill"></i>
                    </div>
                    <h5 class="fw-bold mb-0">Call Us</h5>
                  </div>
                  <p class="text-secondary mb-0 ps-5">
                    +1 (555) 123-4567<br>
                    Mon-Fri from 8am to 5pm
                  </p>
                </div>

                <!-- Socials -->
                <div class="social-links mt-auto pt-4 text-center text-lg-start">
                  <h6 class="fw-bold mb-3 text-uppercase small text-muted letter-spacing-1">Follow Us</h6>
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
import { ref } from 'vue';

const isSubmitting = ref(false);

const submitForm = () => {
  isSubmitting.value = true;
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false;
    alert('Message sent successfully!');
  }, 1500);
};

defineOptions({
  name: 'ContactView'
});
</script>

<style scoped>
.contact-page {
  min-height: 100%;
  color: var(--color-text);
  /* background-color: var(--color-background); */
}

.hero-title {
  color: var(--color-text);
  letter-spacing: -1px;
}

.contact-card {
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  border-radius: 24px;
}

.form-label {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.form-control,
.form-select {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 12px;
  padding: 0.75rem 1rem;
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
  font-weight: 600;
  transition: all 0.3s ease;
}

.send-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}

.info-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-primary);
}

.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.text-secondary {
  color: var(--color-muted) !important;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
  font-size: 1.25rem;
}

.social-btn:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: translateY(-3px);
}

.letter-spacing-1 {
  letter-spacing: 1px;
}
</style>
