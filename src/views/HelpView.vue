<template>
  <div class="help-page p-4">
    <!-- Hero Section -->
    <div class="help-hero py-5 mb-5 position-relative overflow-hidden">
      <div class="hero-bg-overlay"></div>
      <div class="container-fluid px-4 position-relative z-1">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h1 class="display-4 fw-bold mb-3 hero-title text-white">How can we help you?</h1>
            <p class="lead text-white-50 mb-4">Search our knowledge base or browse categories below</p>
            <div class="search-container mx-auto position-relative">
              <i class="bi bi-search search-icon"></i>
              <input type="text" class="form-control form-control-lg search-input"
                placeholder="Search for answers, topics, or articles..." v-model="searchQuery">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Categories -->
    <div class="container-fluid px-4 mb-5">
      <div class="row g-4">
        <div v-for="(category, index) in categories" :key="index" class="col-md-4">
          <div class="card py-5 category-card h-100 border-0">
            <div class="card-body p-4 text-center">
              <div class="icon-box mb-3 mx-auto" :style="{ background: category.gradient }">
                <i :class="['bi', category.icon, 'text-white']"></i>
              </div>
              <h5 class="fw-bold mb-2 light-dark">{{ category.title }}</h5>
              <p class="text-secondary small mb-3">{{ category.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="container-fluid px-4 mb-5">
      <div class="text-center mb-5">
        <h3 class="fw-bold section-title">Frequently Asked Questions</h3>
        <p class="text-secondary">Quick answers to common questions</p>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="accordion custom-accordion" id="helpAccordion">
            <div class="row g-4">
              <div v-for="faq in filteredFaqs" :key="faq.q" class="col-lg-6">
                <div class="accordion-item border-0 rounded-3 overflow-hidden shadow-sm">
                  <h2 class="accordion-header" :id="'heading-' + faq.q.replace(/\s+/g, '-').toLowerCase()">
                    <button class="accordion-button collapsed fw-semibold align-items-center" type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#collapse-' + faq.q.replace(/\s+/g, '-').toLowerCase()" aria-expanded="false"
                      :aria-controls="'collapse-' + faq.q.replace(/\s+/g, '-').toLowerCase()">
                      {{ faq.q }}
                    </button>
                  </h2>
                  <div :id="'collapse-' + faq.q.replace(/\s+/g, '-').toLowerCase()" class="accordion-collapse collapse"
                    :aria-labelledby="'heading-' + faq.q.replace(/\s+/g, '-').toLowerCase()">
                    <div class="accordion-body text-secondary">
                      {{ faq.a }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Support -->
    <div class="container-fluid px-4 mb-5">
      <div class="support-banner rounded-4 p-5 text-center">
        <h3 class="fw-bold mb-3">Still have questions?</h3>
        <p class="mb-4 opacity-75">Can't find the answer you're looking for? Please seek further assistance.</p>
        <div class="d-flex gap-3 justify-content-center flex-wrap">

          <BaseButton type="button" variant="primary" @click="$router.push({ name: 'contact' })">
            <i class="bi bi-chat-dots-fill me-2"></i>Contact Support
          </BaseButton>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/ui/base/BaseButton.vue';
import BaseInput from '@/components/ui/base/BaseInput.vue';
import { ref, computed } from 'vue';

const searchQuery = ref('');

const categories = [
  {
    title: 'Getting Started',
    icon: 'bi-rocket-takeoff',
    desc: 'Everything you need to know to get started with NextGen.',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  },
  {
    title: 'Account & Security',
    icon: 'bi-shield-lock',
    desc: 'Manage your profile, password, and security settings.',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  {
    title: 'Billing & Subscriptions',
    icon: 'bi-credit-card-2-front',
    desc: 'Payment methods, invoices, and subscription plans.',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  }
];

const faqs = [
  {
    q: 'How do I reset my password?',
    a: 'You can reset your password by going to the Login page and clicking on "Forgot Password". Follow the instructions sent to your email.'
  },
  {
    q: 'Can I change my username?',
    a: 'Yes, you can change your username in the Settings > Profile section. Note that you can only change it once every 30 days.'
  },
  {
    q: 'Where can I find my invoices?',
    a: 'Invoices are available in your Account Settings under the "Billing" tab. You can download them as PDF files.'
  },
  {
    q: 'Is my data secure?',
    a: 'We use industry-standard encryption to protect your data. Read our Privacy Policy to learn more about how we handle your information.'
  },
  {
    q: 'How do I delete my account?',
    a: 'If you wish to delete your account, please contact our support team. This action is irreversible.'
  }
];

const filteredFaqs = computed(() => {
  if (!searchQuery.value) return faqs;
  const query = searchQuery.value.toLowerCase();
  return faqs.filter(faq =>
    faq.q.toLowerCase().includes(query) ||
    faq.a.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
.help-page {
  color: var(--color-text);
  min-height: 100%;
  padding-bottom: 2rem;
}

/* Hero Styles */
.help-hero {
  background-color: #000;
  border-radius: 30px;
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
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}

.hero-title {
  color: #fff !important;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.7) !important;
}

.search-container {
  max-width: 600px;
  width: 100%;

}

.search-input {
  padding-left: 70px;
  padding-right: 24px;
  padding-bottom: 14px;
  height: 60px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.search-input:focus {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
  background: var(--color-surface);
  color: var(--color-text);
}

.search-input::placeholder {
  color: var(--color-muted);
  font-size: 16px;
  font-weight: 500;
}

.search-icon {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-muted);
  font-size: 1.25rem;
  pointer-events: none;
}

/* Category Cards */
.category-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border) !important;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.icon-box {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.view-articles-link {
  color: var(--color-primary);
  font-weight: 600;
  transition: color 0.2s;
}

.view-articles-link:hover {
  color: var(--color-info);
  /* Fallback */
  opacity: 0.8;
}

.text-secondary {
  color: var(--color-text) !important;
}

.section-title {
  color: var(--color-text);
}

/* Accordion */
.accordion-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border) !important;
  box-shadow: var(--shadow-sm);
}

.accordion-button {
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: none;
  padding: 1.25rem;
  font-size: 1.05rem;
}

.accordion-button:not(.collapsed) {
  background: var(--bg-hover);
  color: var(--color-text);
  box-shadow: none;
}

.accordion-button::after {
  filter: var(--filter);
  opacity: 0.5;
  background-size: 1rem;
}

.accordion-body {
  background: var(--color-surface);
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-border);
  padding: 1.25rem;
  line-height: 1.6;
}

/* Support Banner */
.support-banner {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.support-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--color-primary);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .search-input {
    height: 50px;
  }
}
</style>
