<template>
  <div class="landing-page" :data-theme="theme">
    <!-- Navbar -->
    <nav :class="['navbar-custom', { 'scrolled': isScrolled }]">
      <div class="container container-custom">
        <RouterLink to="/" class="brand">
          <div class="logo-circle">
            <img src="/logo.jpg" alt="Logo" />
          </div>
          <span class="brand-text">NextGen</span>
        </RouterLink>

        <ul class="nav-links d-none d-lg-flex">
          <li v-for="link in navLinks" :key="link.href">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>

        <div class="nav-actions">
          <button @click="toggleTheme" class="theme-toggle">
            <i :class="theme === 'light' ? 'bi bi-moon-stars' : 'bi bi-sun'"></i>
          </button>
          <RouterLink to="/login" class="btn-login d-none d-sm-block">Sign In</RouterLink>
          <RouterLink to="/register" class="btn-cta-nav">Try Free</RouterLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container container-custom">
        <div class="hero-grid">
          <div class="hero-text-content">
            <div class="badge-new reveal-up">
              <span class="badge-dot"></span>
              New: Community Groups & Projects
            </div>
            <h1 class="hero-title reveal-up" style="transition-delay: 0.1s">
              Connect. Collaborate. <br />
              <span class="text-gradient">Empower Your Vision.</span>
            </h1>
            <p class="hero-subtitle reveal-up" style="transition-delay: 0.2s">
              NextGen is the ultimate community platform designed for creators, developers, and visionaries.
              Join a global network where your ideas take flight.
            </p>
            <div class="hero-btns reveal-up" style="transition-delay: 0.3s">
              <RouterLink to="/register" class="btn-primary-gradient">
                Get Started Free
                <i class="bi bi-arrow-right-short"></i>
              </RouterLink>
              <button class="btn-outline-custom" @click="scrollHandler('#features')">
                Explore Features
              </button>
            </div>
            <div class="social-proof reveal-up" style="transition-delay: 0.4s">
              <div class="avatar-group">
                <img v-for="i in 4" :key="i" :src="`https://i.pravatar.cc/100?u=${i}`" alt="User" />
                <div class="avatar-more">+2k</div>
              </div>
              <p class="proof-text">Joined by 10,000+ creators this month</p>
            </div>
          </div>
          <div class="hero-visual reveal-right">
            <div class="main-visual-container">
              <div class="floating-card card-1">
                <i class="bi bi-chat-heart-fill"></i>
                <span>Active <strong>Discussion</strong></span>
              </div>
              <div class="floating-card card-2">
                <i class="bi bi-person-check-fill"></i>
                <span>Verified <strong>Expert</strong></span>
              </div>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                alt="Hero Illustration" class="hero-main-img" />
              <div class="img-overlay-gradient"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Marquee / Logos Section -->
    <section class="marquee-section py-4 border-y">
      <div class="container overflow-hidden">
        <div class="marquee-content">
          <div class="brand-item" v-for="n in 10" :key="'a' + n">
            <i class="bi bi-hexagon-fill"></i>
            <span>COMMUNITY-{{ n }}</span>
          </div>
          <div class="brand-item" v-for="n in 10" :key="'b' + n">
            <i class="bi bi-hexagon-fill"></i>
            <span>COMMUNITY-{{ n }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section id="features" class="features-section-modern">
      <div class="container container-custom">
        <div class="section-header text-center">
          <span class="section-tag reveal-up">Capabilities</span>
          <h2 class="section-title reveal-up" style="transition-delay: 0.1s">
            Everything you need to <span class="text-gradient">build together.</span>
          </h2>
        </div>

        <div class="features-custom-grid">
          <div class="feature-large-card reveal-up" v-for="(f, i) in mainFeatures" :key="i"
            :style="{ transitionDelay: (i * 0.1) + 's' }">
            <div class="feature-icon-wrapper" :style="{ background: f.bg }">
              <i :class="f.icon"></i>
            </div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
            <RouterLink :to="f.link" class="feature-link">
              Learn more <i class="bi bi-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats & Highlight -->
    <section class="highlight-section py-5">
      <div class="container container-custom">
        <div class="highlight-card reveal-scale">
          <div class="row align-items-center gy-5">
            <div class="col-lg-7">
              <h2 class="highlight-title">
                Comprehensive <span>Feature Set</span> for a Modern Community App
              </h2>
              <div class="highlight-list">
                <div class="h-item border-bottom pb-4 mb-4">
                  <div class="h-icon"><i class="bi bi-cloud-check"></i></div>
                  <div class="h-text">
                    <h4>Seamless Data Sync</h4>
                    <p>Your connections and conversations stay in sync across all your devices, instantly.</p>
                  </div>
                </div>
                <div class="h-item">
                  <div class="h-icon"><i class="bi bi-shield-lock"></i></div>
                  <div class="h-text">
                    <h4>Advanced Security</h4>
                    <p>End-to-end encryption for your messages and private community spaces.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="stats-box">
                <div class="stat-item mb-4">
                  <span class="stat-value">29M+</span>
                  <span class="stat-label">Active Users</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">100M+</span>
                  <span class="stat-label">Messages Monthly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="customers" class="testimonial-section py-5">
      <div class="container container-custom">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">What our users <span class="text-gradient">say.</span></h2>
        </div>
        <div class="row g-4">
          <div class="col-md-4" v-for="(t, i) in testimonials" :key="i">
            <div class="testimonial-modern-card reveal-up" :style="{ transitionDelay: (i * 0.1) + 's' }">
              <div class="quote-icon"><i class="bi bi-quote"></i></div>
              <p class="testimonial-text">{{ t.text }}</p>
              <div class="testimonial-user">
                <img :src="t.avatar" alt="User" class="user-avatar" />
                <div class="user-info">
                  <h6 class="user-name">{{ t.author }}</h6>
                  <span class="user-role">{{ t.role }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta py-5">
      <div class="container container-custom">
        <div class="cta-banner reveal-up">
          <div class="cta-content">
            <h2>Ready to join the <span>NextGen?</span></h2>
            <p>Experience the community platform that adapts to your needs. Join today for free.</p>
            <div class="cta-btns">
              <RouterLink to="/register" class="btn-primary-gradient lg">Get Started Now</RouterLink>
              <RouterLink to="/about" class="btn-secondary-link">Read our story</RouterLink>
            </div>
          </div>
          <div class="cta-shapes">
            <div class="shape circle-1"></div>
            <div class="shape circle-2"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mini Footer -->
    <footer class="mini-footer border-top">
      <div class="container container-custom py-5">
        <div class="row gy-4">
          <div class="col-lg-4">
            <RouterLink to="/" class="brand mb-4 d-inline-flex">
              <div class="logo-circle">
                <img src="/logo.jpg" alt="Logo" />
              </div>
              <span class="brand-text">NextGen</span>
            </RouterLink>
            <p class="footer-desc">Building the future of community collaboration. Connect, share, and grow with the
              next generation of social platforms.</p>
          </div>
          <div class="col-6 col-md-3 col-lg-2 offset-lg-2">
            <h6>Platform</h6>
            <ul class="list-unstyled">
              <li><router-link to="/home">Feed</router-link></li>
              <li><router-link to="/chat">Chat</router-link></li>
              <li><router-link to="/profile">Profile</router-link></li>
            </ul>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <h6>About</h6>
            <ul class="list-unstyled">
              <li><router-link to="/about">Our Story</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
              <li><router-link to="/help">Help Center</router-link></li>
            </ul>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <h6>Social</h6>
            <div class="footer-socials">
              <a href="#"><i class="bi bi-twitter"></i></a>
              <a href="#"><i class="bi bi-linkedin"></i></a>
              <a href="#"><i class="bi bi-github"></i></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom mt-5 pt-4 border-top d-flex flex-wrap justify-content-between">
          <p class="copyright">&copy; 2026 NextGen. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
const isScrolled = ref(false)

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#community', label: 'Impact' },
  { href: '#customers', label: 'Testimonials' },
]

const mainFeatures = [
  {
    icon: 'bi-lightning-charge-fill',
    bg: 'linear-gradient(135deg, #f0abfc 0%, #a855f7 100%)',
    title: 'Zero Latency',
    desc: 'Real-time interactions powered by our cutting-edge architecture. No more waiting.',
    link: '/help'
  },
  {
    icon: 'bi-grid-1x2-fill',
    bg: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    title: 'Custom Layouts',
    desc: 'Personalize your community view with modular components and flexible styling.',
    link: '/help'
  },
  {
    icon: 'bi-shield-fill-check',
    bg: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    title: 'Total Control',
    desc: 'Manage permissions, content moderation, and privacy with enterprise-grade tools.',
    link: '/help'
  }
]

const testimonials = [
  {
    text: "NextGen has transformed how my team communicates. It's the most polished community tool I've ever used.",
    author: 'Sarah Chen',
    role: 'Product Lead at Design Systems',
    avatar: 'https://i.pravatar.cc/100?u=sarah'
  },
  {
    text: 'Building a community used to be hard. With NextGen, I had my space up and running in minutes.',
    author: 'James Wilson',
    role: 'Community Manager',
    avatar: 'https://i.pravatar.cc/100?u=james'
  },
  {
    text: 'The best developer community I have been part of. The collaboration features are simply unmatched.',
    author: 'Elena Rodriguez',
    role: 'Full-stack Developer',
    avatar: 'https://i.pravatar.cc/100?u=elena'
  }
]

const scrollHandler = (id) => {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const onScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const initIntersectionObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.reveal-up, .reveal-right, .reveal-scale').forEach(el => observer.observe(el))
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  initIntersectionObserver()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* --- Design System Foundations --- */
:root {
  --primary-gradient: linear-gradient(135deg, var(--color-primary) 0%, #444 100%);
  --surface-gradient: linear-gradient(180deg, rgba(var(--color-primary-rgb), 0.05) 0%, rgba(var(--color-primary-rgb), 0) 100%);
  --border-glow: 0 0 20px rgba(var(--color-primary-rgb), 0.15);
}

[data-theme="dark"] :root {
  --primary-gradient: linear-gradient(135deg, var(--color-primary) 0%, #ccc 100%);
}

.landing-page {
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  background-color: var(--color-background);
  color: var(--color-text);
}

.navbar-custom .container-custom {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-wrap: nowrap;
}

.container-custom {
  max-width: 1300px;
}

/* --- Navbar Upgrade --- */
.navbar-custom {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  z-index: 1000;
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
}

.navbar-custom.scrolled {
  background: rgba(var(--color-background-rgb), 0.85);
  backdrop-filter: blur(20px);
  height: 64px;
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex-shrink: 0;
  white-space: nowrap;
}

.logo-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--color-primary);
}

.logo-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-text {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.5px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 32px;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
}

.nav-links a {
  text-decoration: none;
  font-weight: 600;
  color: var(--color-muted);
  font-size: 0.95rem;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--color-text);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.2rem;
  padding: 8px;
  cursor: pointer;
  border-radius: 12px;
  transition: background 0.3s;
}

.theme-toggle:hover {
  background: var(--color-hover);
}

.btn-login {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 16px;
}

.btn-cta-nav {
  background: var(--color-text);
  color: var(--color-background);
  text-decoration: none;
  padding: 8px 20px;
  border-radius: 12px;
  font-weight: 700;
  white-space: nowrap;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
}

.btn-cta-nav:hover {
  transform: scale(1.05);
}

/* --- Hero Section Style --- */
.hero-section {
  padding-top: 140px;
  padding-bottom: 80px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -10%;
  right: -10%;
  width: 50%;
  height: 60%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  filter: blur(80px);
  z-index: -1;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 60px;
  align-items: center;
}

.badge-new {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--color-hover);
  border: 1px solid var(--color-border);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 24px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.hero-title {
  font-size: 4.5rem;
  line-height: 1.1;
  font-weight: 900;
  letter-spacing: -2.5px;
  margin-bottom: 24px;
}

.text-gradient {
  background: var(--color-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-muted);
  line-height: 1.6;
  max-width: 540px;
  margin-bottom: 40px;
}

.hero-btns {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.btn-primary-gradient {
  background: var(--color-primary);
  color: var(--color-background);
  padding: 16px 32px;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-primary-gradient:hover {
  transform: translateY(-5px);
  opacity: 0.9;
}

.btn-outline-custom {
  background: transparent;
  border: 2px solid var(--color-border);
  padding: 16px 32px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.btn-outline-custom:hover {
  background: var(--color-hover);
  border-color: var(--color-text);
}

.social-proof {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar-group {
  display: flex;
  margin-left: 10px;
}

.avatar-group img,
.avatar-more {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid var(--color-background);
  margin-left: -12px;
  object-fit: cover;
}

.avatar-more {
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  color: #666;
}

.proof-text {
  font-size: 0.9rem;
  color: var(--color-muted);
  font-weight: 500;
  margin: 0;
}

/* --- Hero Visual --- */
.hero-visual {
  position: relative;
}

.main-visual-container {
  position: relative;
  background: var(--color-hover);
  border-radius: 40px;
  padding: 20px;
  box-shadow: var(--shadow-lg);
  transform: rotate(2deg);
}

.hero-main-img {
  width: 100%;
  border-radius: 30px;
  display: block;
}

.floating-card {
  position: absolute;
  background: white;
  padding: 12px 20px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 10;
  animation: float 4s ease-in-out infinite;
}

.card-1 {
  top: 10%;
  left: -15%;
  animation-delay: 0.5s;
}

.card-2 {
  bottom: 20%;
  right: -10%;
  animation-delay: 1s;
}

.floating-card i {
  width: 36px;
  height: 36px;
  background: #f3f4f6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(2deg);
  }

}

/* --- Marquee Section --- */
.marquee-section {
  background: var(--color-background);
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.marquee-content {
  display: flex !important;
  gap: 60px;
  width: max-content;
  animation: scroll 30s linear infinite;
  padding: 10px 0;
}

.brand-item {
  display: flex !important;
  align-items: center;
  gap: 12px;
  color: var(--color-muted);
  font-weight: 700;
  font-size: 1.1rem;
  opacity: 0.6;
  white-space: nowrap;
}

.brand-item i {
  font-size: 1.5rem;
  color: var(--color-primary);
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 30px));
  }
}

/* --- Features Section --- */
.features-section-modern {
  padding: 100px 0;
  background: var(--color-background);
}

.section-tag {
  color: var(--color-primary);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  margin-bottom: 16px;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -1.5px;
  margin-bottom: 60px;
}

.features-custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.feature-large-card {
  background: var(--color-surface);
  padding: 40px;
  border-radius: 32px;
  border: 1px solid var(--color-border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-large-card:hover {
  transform: translateY(-10px);
  border-color: #6366f1;
  box-shadow: 0 20px 50px rgba(99, 102, 241, 0.1);
}

.feature-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  color: white;
  font-size: 1.5rem;
}

.feature-large-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 16px;
}

.feature-large-card p {
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.feature-link {
  color: #6366f1;
  text-decoration: none;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* --- Highlight Section --- */
.highlight-card {
  background: #0f172a;
  border-radius: 48px;
  padding: 80px;
  color: white;
  position: relative;
  overflow: hidden;
}

.highlight-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 48px;
}

.highlight-title span {
  color: #818cf8;
}

.highlight-list {
  max-width: 500px;
}

.h-item {
  display: flex;
  gap: 24px;
}

.h-icon {
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #fff;
  flex-shrink: 0;
}

.h-text h4 {
  font-weight: 700;
  margin-bottom: 8px;
}

.h-text p {
  color: rgba(255, 255, 255, 0.6);
}

.stats-box {
  padding: 32px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 4rem;
  font-weight: 900;
  color: #fff;
}

.stat-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

/* --- Testimonials Modern --- */
.testimonial-modern-card {
  background: var(--color-surface);
  padding: 48px;
  border-radius: 32px;
  border: 1px solid var(--color-border);
  position: relative;
  height: 100%;
}

.quote-icon {
  font-size: 2.5rem;
  color: var(--color-primary);
  opacity: 0.2;
  margin-bottom: -20px;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 500;
  font-style: italic;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}

.testimonial-user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-weight: 800;
  margin: 0;
}

.user-role {
  font-size: 0.85rem;
  color: var(--color-muted);
}

/* --- Final CTA Section --- */
.cta-banner {
  background: var(--color-primary);
  border-radius: 48px;
  padding: 100px 40px;
  text-align: center;
  color: var(--color-background);
  position: relative;
  overflow: hidden;
}

.cta-content {
  position: relative;
  z-index: 5;
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 24px;
}

.cta-content h2 span {
  text-decoration: underline;
}

.cta-content p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 40px;
}

.cta-btns {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-primary-gradient.lg {
  padding: 20px 48px;
  font-size: 1.2rem;
  background: var(--color-background);
  color: var(--color-text);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.btn-secondary-link {
  color: white;
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 20px;
}

.cta-shapes .shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.circle-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
}

.circle-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  right: -50px;
}

/* --- Footer --- */
.mini-footer {
  background: var(--color-background);
}

.mini-footer h6 {
  font-weight: 800;
  margin-bottom: 24px;
}

.mini-footer ul li {
  margin-bottom: 12px;
}

.mini-footer ul li a {
  text-decoration: none;
  color: var(--color-muted);
  font-weight: 500;
  transition: color 0.3s;
}

.mini-footer ul li a:hover {
  color: var(--color-text);
}

.footer-socials {
  display: flex;
  gap: 16px;
}

.footer-socials a {
  width: 40px;
  height: 40px;
  background: var(--color-hover);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.3s;
}

.footer-socials a:hover {
  background: var(--color-primary);
  color: var(--color-background);
  transform: translateY(-3px);
}

.footer-bottom {
  font-size: 0.9rem;
  color: var(--color-muted);
}

.footer-links a {
  margin-left: 24px;
  color: inherit;
  text-decoration: none;
}

/* --- Reveal Animations --- */
.reveal-up {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal-right {
  opacity: 0;
  transform: translateX(60px);
  transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal-up.active,
.reveal-right.active,
.reveal-scale.active {
  opacity: 1;
  transform: none;
}

/* --- Responsive Adaptations --- */
@media (max-width: 991px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-title {
    font-size: 3rem;
  }

  .hero-btns {
    justify-content: center;
  }

  .highlight-card {
    padding: 40px 24px;
    border-radius: 32px;
  }

  .highlight-title {
    font-size: 2.2rem;
  }

  .cta-content h2 {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .hero-btns {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary-gradient,
  .btn-outline-custom {
    width: 100%;
    justify-content: center;
  }
}

/* Dark Mode Overrides */
[data-theme="dark"] .floating-card {
  background: #1e293b;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .btn-cta-nav {
  background: white;
  color: black;
}
</style>
