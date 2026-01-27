<template>
    <MainLayout>
        <div class="help-page">
            <div class="help-hero-small rounded-4 mb-4">
                <div class="text-center py-4">
                    <h3 class="fw-bold text-white mb-3">How can we help?</h3>
                    <div class="search-box mx-auto px-3">
                        <i class="bi bi-search"></i>
                        <input type="text" placeholder="Search for help...">
                    </div>
                </div>
            </div>

            <div class="row g-3 mb-4">
                <div v-for="category in categories" :key="category.title" class="col-md-4">
                    <div class="card-custom h-100 p-3 text-center help-card">
                        <div class="help-icon-wrapper mb-3" :style="{ background: category.gradient }">
                            <i :class="['bi', category.icon]"></i>
                        </div>
                        <h6 class="fw-bold mb-2">{{ category.title }}</h6>
                        <p class="text-muted extra-small mb-3">{{ category.desc }}</p>
                        <button class="btn btn-outline-primary btn-sm rounded-pill px-3">Articles</button>
                    </div>
                </div>
            </div>

            <div class="help-faq section">
                <h5 class="fw-bold mb-3">Common Questions</h5>
                <div class="accordion" id="faqAccordion">
                    <div v-for="(faq, index) in faqs" :key="index"
                        class="accordion-item border-0 mb-2 card-custom overflow-hidden">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed fw-bold small" type="button"
                                data-bs-toggle="collapse" :data-bs-target="'#faq' + index">
                                {{ faq.q }}
                            </button>
                        </h2>
                        <div :id="'faq' + index" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted small">
                                {{ faq.a }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/layout/MainLayout.vue';

const categories = [
    {
        title: 'Getting Started',
        icon: 'bi-rocket-takeoff',
        desc: 'Learn the basics and set up your account.',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    {
        title: 'Security',
        icon: 'bi-shield-check',
        desc: 'Manage your privacy and data.',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
        title: 'Billing',
        icon: 'bi-credit-card',
        desc: 'Plans and payment information.',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    }
];

const faqs = [
    { q: 'How do I change my password?', a: 'Go to Settings > Security tab.' },
    { q: 'Is Next Gen free?', a: 'Yes, we have a free tier for everyone.' },
    { q: 'How to report a problem?', a: 'Use the flag icon on any post.' }
];
</script>

<style scoped>
.help-hero-small {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.search-box {
    max-width: 400px;
    position: relative;
}

.search-box i {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
}

.search-box input {
    width: 100%;
    padding: 10px 15px 10px 45px;
    border-radius: 50px;
    border: 1px solid var(--color-border);
    background: var(--color-secondary);
    color: var(--color-text);
    font-size: 0.9rem;
}

.help-card {
    transition: all 0.3s ease;
}

.help-icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.help-icon-wrapper i {
    font-size: 1.5rem;
    color: white;
}

.extra-small {
    font-size: 0.75rem;
}

.accordion-button:not(.collapsed) {
    background-color: transparent;
    color: var(--color-primary);
    box-shadow: none;
}

.accordion-button:focus {
    box-shadow: none;
}
</style>
