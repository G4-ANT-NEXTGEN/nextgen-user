<template>
  <div class="landing-page">
    <!-- Navbar -->
    <nav
      :class="[
        'navbar',
        'navbar-expand-lg',
        'navbar-light',
        'border-bottom',
        'py-3',
        'custom-navbar',
        { scrolled: isScrolled },
      ]"
    >
      <div class="container px-4">
        <RouterLink to="/" class="navbar-brand d-flex align-items-center">
          <img src="/logo.jpg" alt="Next Gen Logo" class="logo-img me-2" />
          <span class="fw-bold fs-4">Next Gen</span>
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4">
            <li v-for="link in navLinks" :key="link.href" class="nav-item">
              <a class="nav-link" :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
          <div class="d-flex align-items-center gap-3">
            <button @click="toggleTheme" class="theme-btn">
              <i v-if="theme === 'light'" class="bi bi-moon-fill icon-btn"></i>
              <i v-else class="bi bi-brightness-high-fill icon-btn"></i>
            </button>
            <RouterLink to="/login" class="btn btn-primary-custom">Log In</RouterLink>
            <RouterLink to="/register" class="btn btn-primary-custom">Sign Up Free</RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero-section vh-100 bg-light-soft">
      <div class="container px-4">
        <div class="row align-items-center gy-5">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="display-1 fw-bold mb-4 reveal-entrance" style="--delay: 0.1s">
                Join Our Community Today
              </h1>
              <p class="lead text-muted mb-5 pe-lg-5 reveal-entrance" style="--delay: 0.2s">
                Start connecting with people who matter. Create your free account and discover what
                makes our platform special.
              </p>
              <div class="d-flex flex-wrap gap-3 reveal-entrance" style="--delay: 0.3s">
                <RouterLink to="/login" class="btn btn-dark-custom btn-lg-custom">
                  Get Started Free
                  <i class="bi bi-arrow-right"></i>
                </RouterLink>
                <button class="btn btn-dark-custom btn-lg-custom opacity-75">
                  <i class="bi bi-play-circle fs-5"></i>
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image-wrapper">
              <div class="hero-image-shadow"></div>
              <!-- Original Image -->
              <img
                src="/AboutVie/hero-section.jpg"
                alt="Community members"
                class="img-fluid rounded-5 hero-image"
              />
              <!-- MPTC Logo -->
              <img src="/AboutVie/p.t.c.jpg" alt="MPTC Logo" class="hero-logo" />
              <!-- YouTube Logo -->
              <img src="/AboutVie/AntLogo.jpg" alt="YouTube Logo" class="hero-youtube-logo" />
              <!-- Lottie Animation Overlay -->
              <div ref="heroAnimation" class="hero-lottie-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Key Features Section -->
    <section id="features" class="features-section py-5 px-3">
      <div class="container text-center">
        <div class="badge-pill mb-3 reveal-scroll reveal-up">How It Works</div>
        <h2 class="display-5 fw-bold mb-3 reveal-scroll reveal-up" style="transition-delay: 0.1s">
          Key Features
        </h2>
        <p class="text-muted mb-5 reveal-scroll reveal-up" style="transition-delay: 0.2s">
          Discover what makes our platform stand out from the rest
        </p>

        <div class="row g-4 text-start">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="col-md-4 reveal-scroll reveal-up"
            :style="{ transitionDelay: ((index % 3) + 1) * 0.1 + 's' }"
          >
            <div class="feature-card h-100">
              <div class="feature-icon-box mb-3 transition-transform">
                <i :class="['bi', feature.icon]"></i>
              </div>
              <h5 class="fw-bold mb-3">{{ feature.title }}</h5>
              <p class="text-muted small">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Section -->
    <section id="community" class="community-section py-5 bg-light-soft">
      <div class="container px-4 text-center">
        <div class="badge-pill mb-3 reveal-scroll reveal-up">How It Works</div>
        <h2 class="display-5 fw-bold mb-3 reveal-scroll reveal-up" style="transition-delay: 0.1s">
          Trusted by millions worldwide
        </h2>
        <p class="text-muted mb-5 reveal-scroll reveal-up" style="transition-delay: 0.2s">
          Join a global community of designers and creators
        </p>

        <div class="row g-4 pt-4">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="col-6 col-md-3 reveal-scroll reveal-up"
            :style="{ transitionDelay: (index + 1) * 0.1 + 's' }"
          >
            <div class="stat-card">
              <div class="stat-icon-bg mb-3 transition-transform">
                <i :class="['bi', stat.icon]"></i>
              </div>
              <h3 class="fw-bold mb-1">{{ stat.value }}</h3>
              <p class="text-muted small mb-1">{{ stat.label }}</p>
              <p class="text-secondary x-small">{{ stat.sub }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Customers Section -->
    <section id="customers" class="customers-section py-5">
      <div class="container px-4 text-center">
        <h2 class="display-5 fw-bold mb-5 reveal-scroll reveal-up">Our Customers Love Us</h2>
        <div class="row g-4">
          <div
            v-for="(t, index) in testimonials"
            :key="index"
            class="col-md-4 reveal-scroll reveal-up"
            :style="{ transitionDelay: (index + 1) * 0.1 + 's' }"
          >
            <div class="testimonial-card">
              <p class="mb-4">{{ t.text }}</p>
              <div class="d-flex align-items-center justify-content-center">
                <div class="avatar-sm me-3">{{ t.initials }}</div>
                <div class="text-start">
                  <h6 class="mb-0 fw-bold">{{ t.author }}</h6>
                  <p class="text-muted small mb-0">{{ t.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Questions Section -->
    <section id="questions" class="recent-questions-section py-5 bg-light-soft">
      <div class="container px-4 text-center">
        <h2 class="display-5 fw-bold mb-3 reveal-scroll reveal-up">Recent Questions</h2>
        <p class="text-muted mb-5 reveal-scroll reveal-up" style="transition-delay: 0.1s">
          Frequently asked questions from our community
        </p>

        <div class="row g-4 text-start">
          <div
            v-for="(item, index) in questions"
            :key="index"
            class="col-md-6 reveal-scroll reveal-up"
            :style="{ transitionDelay: (index + 1) * 0.1 + 's' }"
          >
            <div class="question-card h-100">
              <h5 class="fw-bold mb-3">{{ item.q }}</h5>
              <p class="text-muted">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- CTA Section -->
    <section class="cta-section py-5 bg-dark text-white text-center">
      <div class="tech-faq-bg-overlay"></div>
      <div
        class="container px-4 py-5 reveal-scroll reveal-scale position-relative"
        style="z-index: 2"
      >
        <h2 class="display-4 fw-bold mb-4">Start explore with Next Gen today</h2>
        <p class="lead mb-5 opacity-75">
          Join millions of designers and teams. 100% free, no credit card required.
        </p>
        <div class="d-flex flex-wrap justify-content-center gap-3 mb-4">
          <RouterLink to="/register" class="btn btn-light-custom btn-lg-custom">
            Get Started Free <i class="bi bi-arrow-right"></i>
          </RouterLink>
          <RouterLink to="/login" class="btn btn-outline-light-custom btn-lg-custom">
            Learn More
          </RouterLink>
        </div>
        <p class="small opacity-50">Free forever • Unlimited access • No hidden fees</p>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="footer-section py-5 text-white">
      <div class="container px-4">
        <div class="row g-5 py-5 border-bottom border-secondary border-opacity-25">
          <div class="col-lg-4">
            <div class="d-flex align-items-center mb-4">
              <img src="/logo.jpg" alt="Next Gen Logo" class="logo-img me-2" />
              <span class="fw-bold fs-4">Next Gen</span>
            </div>
            <p class="opacity-75 pe-lg-5">The collaborative interface design tool for teams.</p>
          </div>
          <div v-for="group in footerLinkGroups" :key="group.title" class="col-6 col-md-3 col-lg-2">
            <h6 class="fw-bold mb-4">{{ group.title }}</h6>
            <ul class="list-unstyled opacity-75">
              <li v-for="link in group.links" :key="link.label" class="mb-2">
                <a :href="link.href" class="text-white text-decoration-none">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flex flex-wrap justify-content-between align-items-center py-4">
          <p class="small mb-0 opacity-50">&copy; 2026 Next Gen, Inc. All rights reserved.</p>
          <div class="d-flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.icon"
              :href="social.href"
              class="text-white opacity-75"
            >
              <i :class="['bi', social.icon]"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import lottie from 'lottie-web'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()

// --- State ---
const isScrolled = ref(false)
const heroAnimation = ref(null)
let scrollHandler
let intersectionObserver

// --- Constants ---
const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#community', label: 'Community' },
  { href: '#customers', label: 'Customers' },
  { href: '#questions', label: 'Questions' },
]

const features = [
  {
    icon: 'bi-people',
    title: 'Create & Join Communities',
    desc: 'Build and discover communities around your interests.',
  },
  {
    icon: 'bi-chat-dots',
    title: 'Real-time Chat & Comments',
    desc: 'Connect instantly with live messaging and discussions.',
  },
  {
    icon: 'bi-image',
    title: 'Share Photos & Stories',
    desc: 'Capture and share your moments with the world.',
  },
  {
    icon: 'bi-bell',
    title: 'Smart Notifications',
    desc: 'Stay updated with personalized, intelligent alerts.',
  },
  {
    icon: 'bi-shield-lock',
    title: 'Privacy & Control',
    desc: 'Your data, your rules with advanced privacy settings.',
  },
  {
    icon: 'bi-hand-thumbs-up',
    title: 'Like, Follow & React',
    desc: 'Engage with content and connect with others easily.',
  },
]

const stats = [
  { icon: 'bi-people-fill', value: '5M+', label: 'Active Users', sub: 'Designers worldwide' },
  { icon: 'bi-star-fill', value: '4.9/5', label: 'User Rating', sub: 'From 50K+ reviews' },
  { icon: 'bi-download', value: '10M+', label: 'Downloads', sub: 'Across all platforms' },
  { icon: 'bi-globe', value: '150+', label: 'Countries', sub: 'Global community' },
]

const testimonials = [
  {
    text: '"The best platform we\'ve ever used. The community features are game-changing for our team\'s productivity."',
    author: 'John Doe',
    role: 'CEO at TechFlow',
    initials: 'JD',
  },
  {
    text: "\"I've found so many amazing collaborators here. It's more than just a tool, it's a creative ecosystem.\"",
    author: 'Anna Smith',
    role: 'Independent Artist',
    initials: 'AS',
  },
  {
    text: '"Security and privacy were our top concerns, and Next Gen delivered beyond our expectations."',
    author: 'Mike King',
    role: 'CTO at SecureData',
    initials: 'MK',
  },
]

const questions = [
  {
    q: 'How do I join a community?',
    a: 'Simply search for communities that interest you and click the join button. You can join up to 5 communities on the free plan.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes, we use advanced encryption and privacy controls to keep your data safe. Your information is never shared without your consent.',
  },
  {
    q: 'Can I create my own community?',
    a: 'Absolutely! With a Pro or Enterprise plan, you can create and manage your own communities with unlimited members.',
  },
  {
    q: 'How does real-time chat work?',
    a: 'Our chat system connects you instantly with other members. Messages are delivered in real-time with support for text, images, and files.',
  },
]

const footerLinkGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Design', href: '#' },
      { label: 'Prototype', href: '#' },
      { label: 'Whiteboard', href: '#' },
      { label: 'Plugins', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Learn', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Best Practices', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Licenses', href: '#' },
    ],
  },
]

const socialLinks = [
  { icon: 'bi-twitter-x', href: '#' },
  { icon: 'bi-github', href: '#' },
  { icon: 'bi-linkedin', href: '#' },
]

// --- Initialization ---
const initScrollHandler = () => {
  scrollHandler = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', scrollHandler)
}

const initIntersectionObserver = () => {
  const options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('active')
    })
  }, options)

  document.querySelectorAll('.reveal-scroll').forEach((el) => intersectionObserver.observe(el))
}

const initLottie = () => {
  if (heroAnimation.value) {
    lottie.loadAnimation({
      container: heroAnimation.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets.lottiefiles.com/packages/lf20_1pxqjqps.json',
    })
  }
}

onMounted(() => {
  initScrollHandler()
  initIntersectionObserver()
  initLottie()
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  if (intersectionObserver) intersectionObserver.disconnect()
})
</script>

<style scoped>
/* --- Base Styles --- */
.landing-page {
  background-color: var(--color-background);
  color: var(--color-text);
  min-height: 100vh;
  padding-top: 80px;
}

html {
  scroll-behavior: smooth;
}

/* --- Utilities --- */
.bg-light-soft {
  background-color: var(--color-secondary);
}
.transition-all {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.transition-transform {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.x-small {
  font-size: 0.75rem;
}

.badge-pill {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: var(--bg-tag);
  color: var(--color-text);
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
}

/* --- Navbar --- */
.custom-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1030;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: var(--color-background) !important;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--color-border);
}

.custom-navbar.scrolled {
  background-color: var(--color-background) !important;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.2);
}

.logo-img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
}

.nav-link {
  color: var(--color-text) !important;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--color-primary) !important;
  border-bottom-color: var(--color-primary);
}

.custom-navbar.scrolled .nav-link {
  color: var(--color-text) !important;
}
.custom-navbar.scrolled .nav-link:hover {
  border-bottom-color: var(--color-primary);
}
.navbar-brand,
.navbar-brand span {
  color: var(--color-text) !important;
}

.custom-navbar.scrolled .navbar-brand,
.custom-navbar.scrolled .navbar-brand span {
  color: var(--color-text) !important;
}

/* --- Buttons --- */
.theme-btn {
  background: var(--color-secondary);
  color: var(--color-text);
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-btn:hover {
  background-color: var(--color-hover);
}

.btn {
  padding: 0.325rem 1.2rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid transparent;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-lg-custom {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
}

.btn-primary-custom,
.btn-dark-custom {
  background-color: #000;
  color: #fff !important;
}

.btn-primary-custom:hover,
.btn-dark-custom:hover {
  background-color: #222;
}

.btn-outline-custom {
  background-color: transparent;
  border-color: #e5e7eb;
  color: #374151 !important;
}

.btn-outline-custom:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.btn-ghost-custom {
  background-color: transparent;
  color: #374151 !important;
}

.btn-ghost-custom:hover {
  background-color: #f3f4f6;
  color: #000 !important;
}

.btn-light-custom {
  background-color: #fff;
  color: #000 !important;
}

.btn-light-custom:hover {
  background-color: #f8f9fa;
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
}

.btn-outline-light-custom {
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff !important;
}

.btn-outline-light-custom:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #fff;
}

/* Navbar Scrolled States */
.custom-navbar.scrolled .btn-primary-custom {
  background-color: #fff;
  color: #000 !important;
}

.custom-navbar.scrolled .btn-primary-custom:hover {
  background-color: #f0f0f0;
}

.custom-navbar.scrolled .btn-ghost-custom {
  color: #fff !important;
}

.custom-navbar.scrolled .btn-ghost-custom:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* --- Hero Section --- */
.display-1 {
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 1.1;
  letter-spacing: -2px;
}

.hero-image-wrapper {
  position: relative;
  border-radius: 3rem;
  padding: 1rem;
}

.hero-image-shadow {
  position: absolute;
  top: 10%;
  left: -5%;
  width: 100%;
  height: 100%;
  background-color: #f3f4f6;
  border-radius: 3rem;
  z-index: 1;
}

.hero-image {
  position: relative;
  z-index: 2;
  box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: block;
  margin: 0 auto;
  animation:
    fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) both,
    float 3s ease-in-out infinite;
}

.hero-logo,
.hero-youtube-logo {
  position: absolute;
  z-index: 5;
  animation: float 4s ease-in-out infinite;
}

.hero-logo {
  bottom: 50%;
  left: 99%;
  transform: translateX(-50%);
  width: 80px;
}

.hero-youtube-logo {
  top: -5%;
  right: 99%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  animation-duration: 5s;
}

.hero-lottie-overlay {
  position: absolute;
  top: 70%;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* --- Cards --- */
.feature-card,
.stat-card,
.testimonial-card,
.question-card {
  height: 100%;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 1.5rem;
}

.feature-card {
  padding: 2.5rem;
  border: 1px solid #f1f3f5;
  background: rgba(213, 217, 247, 0.17);
}

.feature-card:hover {
  border-color: #dee2e6;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.stat-card {
  padding: 2.5rem 1.5rem;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.testimonial-card {
  padding: 3rem 2rem;
  background: rgba(213, 217, 247, 0.17);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
}

.testimonial-card:hover {
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.question-card {
  padding: 2.5rem;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.question-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

/* --- Icons & Avatars --- */
.feature-icon-box,
.stat-icon-bg {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.feature-icon-box {
  background: #f8f9fa;
  font-size: 1.5rem;
  color: #212529;
}

.stat-icon-bg {
  background: #000;
  color: #fff;
  margin: 0 auto;
  font-size: 1.25rem;
}

.avatar-sm {
  width: 48px;
  height: 48px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
  color: #4b5563;
}

/* --- CTA Section --- */
.cta-section {
  position: relative;
  background: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')
    center/cover fixed no-repeat;
}

.tech-faq-bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5, 3, 15, 0.85);
  z-index: 1;
}

.cta-section .display-4 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: -1.5px;
}

/* --- Footer --- */
.footer-section {
  background-color: #0d1117;
}

.footer-section a {
  transition: opacity 0.3s ease;
}
.footer-section a:hover {
  opacity: 1 !important;
  color: #fff !important;
}

/* --- Animations --- */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.reveal-entrance {
  opacity: 0;
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--delay, 0s);
}

.reveal-scroll {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-scroll.reveal-up {
  transform: translateY(30px);
}
.reveal-scroll.reveal-scale {
  transform: scale(0.95);
}
.reveal-scroll.active {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* --- Responsive --- */
@media (max-width: 991.98px) {
  .hero-content {
    text-align: center;
  }
  .display-1 {
    font-size: 3.5rem;
  }
  .hero-content .d-flex {
    justify-content: center;
  }
  .hero-image-shadow {
    display: none;
  }
}
</style>
