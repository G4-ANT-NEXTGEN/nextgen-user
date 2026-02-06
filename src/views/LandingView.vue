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
          <div class="">
            <button @click="toggleTheme" class="theme-toggle">
              <i :class="theme === 'light' ? 'bi bi-moon-stars' : 'bi bi-sun'"></i>
            </button>
          </div>
          <RouterLink to="/login" class="btn-login d-none d-sm-block">Sign In</RouterLink>
          <RouterLink to="/register" class="btn-cta-nav">Try Free</RouterLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <GridHeroSection />

    <!-- Marquee / Users Section -->
    <section class="marquee-section py-5">
      <div class="marquee-container">
        <!-- Row 1: Left to Right -->
        <div class="marquee-row marquee-ltr">
          <div class="marquee-content">
            <div class="user-pill" v-for="(user, i) in [...activeUsers, ...activeUsers]" :key="'ltr' + i">
              <img :src="user.avatar" :alt="user.name" class="user-pill-avatar" />
              <div class="user-pill-info">
                <span class="user-pill-name">{{ user.name }}</span>
                <span class="user-pill-role">{{ user.role }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: Right to Left -->
        <div class="marquee-row marquee-rtl mt-3">
          <div class="marquee-content">
            <div class="user-pill" v-for="(user, i) in [...activeUsers, ...activeUsers].reverse()" :key="'rtl' + i">
              <img :src="user.avatar" :alt="user.name" class="user-pill-avatar" />
              <div class="user-pill-info">
                <span class="user-pill-name">{{ user.name }}</span>
                <span class="user-pill-role">{{ user.role }}</span>
              </div>
            </div>
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
            <div class="feature-icon-wrapper">
              <i :class="f.icon"></i>
            </div>
            <h3>{{ f.title }}</h3>
            <ul class="feature-item-list">
              <li v-for="(item, idx) in f.items" :key="idx">
                <i class="bi bi-check2-circle"></i>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Nextgen / How it Works -->
    <section id="how-it-works" class="how-it-works-section py-5">
      <div class="container container-custom">
        <div class="section-header text-center mb-5">
          <div class="badge-outline reveal-up">THE NEXTGEN EXPERIENCE</div>
          <h2 class="section-title reveal-up">Why choose Nextgen?</h2>
        </div>

        <div class="steps-container">
          <!-- Step 1 Indicator -->
          <div class="step-indicator step-1-label reveal-up">
            <span>Step 1</span>
            <svg class="step-arrow" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M5 5 C 15 5, 25 15, 25 35" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" />
              <path d="M20 30 L 25 35 L 30 30" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </div>

          <!-- Step 2 Indicator -->
          <div class="step-indicator step-2-label reveal-up">
            <svg class="step-arrow-up" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 35 C 20 25, 10 15, 10 5" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" />
              <path d="M5 10 L 10 5 L 15 10" stroke="currentColor" stroke-width="1.5" />
            </svg>
            <span>Step 2</span>
          </div>

          <!-- Step 3 Indicator -->
          <div class="step-indicator step-3-label reveal-up">
            <span>Step 3</span>
            <svg class="step-arrow" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M35 5 C 25 5, 15 15, 15 35" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" />
              <path d="M10 30 L 15 35 L 20 30" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </div>

          <div class="row g-4 position-relative z-1">
            <!-- Card 1: Modern Info -->
            <div class="col-lg-4">
              <div class="step-card reveal-up">
                <div class="shimmer-effect"></div>
                <div class="step-card-visual">
                  <div class="ui-mockup mockup-1">
                    <div class="mock-header">
                      <div class="mock-logo"></div>
                      <div class="mock-line"></div>
                    </div>
                    <div class="mock-btn-black">Smart Matching</div>
                    <div class="mock-plan-grid">
                      <div class="plan-circle"><i class="bi bi-person-fill"></i></div>
                      <div class="plan-circle active"><i class="bi bi-lightning-fill"></i></div>
                      <div class="plan-circle"><i class="bi bi-people-fill"></i></div>
                    </div>
                  </div>
                </div>
                <h3>Smart Networking</h3>
                <p>Algorithmically curated connections that match your professional DNA and creative vision.</p>
              </div>
            </div>

            <!-- Card 2: Modern Info -->
            <div class="col-lg-4">
              <div class="step-card reveal-up" style="transition-delay: 0.15s">
                <div class="shimmer-effect"></div>
                <div class="step-card-visual">
                  <div class="ui-mockup mockup-2">
                    <div class="chat-bubble-mock left glass">
                      <div class="mock-avatar-sm"></div>
                      <div class="mock-line-sm"></div>
                    </div>
                    <div class="chat-bubble-mock right mini glass">
                      <div class="mock-line-xs"></div>
                    </div>
                    <div class="mock-btn-blue">Live Interactive Room</div>
                    <div class="avatar-stack">
                      <img src="https://i.pravatar.cc/100?u=11" />
                      <img src="https://i.pravatar.cc/100?u=12" />
                    </div>
                  </div>
                </div>
                <h3>Live Interactions</h3>
                <p>Beyond simple chat. Experience high-fidelity audio and spatial networking environments.</p>
              </div>
            </div>

            <!-- Card 3: Modern Info -->
            <div class="col-lg-4">
              <div class="step-card reveal-up" style="transition-delay: 0.3s">
                <div class="shimmer-effect"></div>
                <div class="step-card-visual">
                  <div class="ui-mockup mockup-3">
                    <div class="doc-stack">
                      <div class="doc doc-1"></div>
                      <div class="doc main-doc">
                        <div class="mock-logo-faded"></div>
                        <div class="mock-lines-group">
                          <div class="l1 glow"></div>
                          <div class="l2"></div>
                        </div>
                      </div>
                    </div>
                    <div class="check-badge pulse">
                      <i class="bi bi-rocket-takeoff-fill"></i>
                    </div>
                  </div>
                </div>
                <h3>Empowered Growth</h3>
                <p>A full localized suite of tools to scale, manage, and monetize your community vision.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section Redesign -->
    <section id="testimonials" class="testimonial-redesign py-5">
      <div class="container container-custom">
        <div class="row align-items-center">
          <!-- Left Column: Heading & CTA -->
          <div class="col-lg-5 mb-5 mb-lg-0">
            <div class="testimonial-header-content reveal-up">
              <div class="squiggle-decoration mb-4">
                <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 30 Q 15 10, 25 30 T 45 30 T 65 30" stroke="#6366f1" stroke-width="3"
                    stroke-linecap="round" fill="none" />
                  <path d="M70 10 L 73 18 L 81 18 L 75 23 L 77 31 L 70 26 L 63 31 L 65 23 L 59 18 L 67 18 Z"
                    fill="#fbbf24" />
                </svg>
              </div>
              <h2 class="redesign-title">What Our <br /><span class="text-gradient">Customers Says</span></h2>
              <p class="redesign-desc">
                Discover how NextGen is empowering creators and communities worldwide.
                Our users share their experiences on how collaboration became seamless and growth became inevitable.
              </p>
              <RouterLink to="/register" class="btn-testimonial-more">
                View More <i class="bi bi-arrow-right-short"></i>
              </RouterLink>
            </div>
          </div>

          <!-- Right Column: Staggered Cards -->
          <div class="col-lg-7">
            <div class="staggered-testimonials">
              <div v-for="(t, i) in testimonials" :key="i"
                :class="['testimonial-stagger-card', `stagger-card-${i + 1}`, 'reveal-right']"
                :style="{ transitionDelay: (i * 0.2) + 's' }">
                <div class="stagger-card-inner">
                  <div class="stagger-user-header">
                    <img :src="t.avatar" alt="User" class="stagger-avatar" />
                    <div class="stagger-user-info">
                      <h6 class="stagger-author">{{ t.author }}</h6>
                    </div>
                    <div class="stagger-quote-icon">
                      <i class="bi bi-quote"></i>
                    </div>
                  </div>
                  <p class="stagger-text">{{ t.text }}</p>
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
              <RouterLink to="/register" class="btn-primary-gradient lg rounded-pill text-decoration-none">Get Started
                Now</RouterLink>
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
import GridHeroSection from '@/components/layout/GridHeroSection.vue'

const { theme, toggleTheme } = useTheme()
const isScrolled = ref(false)

const activeUsers = [
  { name: 'Alex Rivera', role: 'DeFi Architect', avatar: 'https://i.pravatar.cc/150?u=1' },
  { name: 'Sofia Chen', role: 'UI Engineer', avatar: 'https://i.pravatar.cc/150?u=2' },
  { name: 'Jordan Smith', role: 'Product Design', avatar: 'https://i.pravatar.cc/150?u=3' },
  { name: 'Emma Wilson', role: 'Backend Dev', avatar: 'https://i.pravatar.cc/150?u=4' },
  { name: 'Liam Garcia', role: 'Security', avatar: 'https://i.pravatar.cc/150?u=5' },
  { name: 'Mia Wong', role: 'Web3 Specialist', avatar: 'https://i.pravatar.cc/150?u=6' },
  { name: 'Noah Davis', role: 'Frontend Lead', avatar: 'https://i.pravatar.cc/150?u=7' },
  { name: 'Ava Brown', role: 'Community', avatar: 'https://i.pravatar.cc/150?u=8' },
  { name: 'Ethan Hunt', role: 'Growth', avatar: 'https://i.pravatar.cc/150?u=9' },
  { name: 'Luna Love', role: 'Artist', avatar: 'https://i.pravatar.cc/150?u=10' },
]

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
]

const mainFeatures = [
  {
    icon: 'bi-chat-square-text-fill',
    title: 'Community Interaction',
    items: [
      'Create posts (text, images, videos)',
      'Real-time engagement',
      'Community groups & projects',
      'Threaded discussions'
    ]
  },
  {
    icon: 'bi-person-lines-fill',
    title: 'User & Account Features',
    items: [
      'User registration (sign up / login)',
      'Profiles (photo, bio, interests)',
      'Edit profile & verification',
      'Admin, moderator, member roles'
    ]
  },
  {
    icon: 'bi-collection-play-fill',
    title: 'Media & Content',
    items: [
      'Image & Gallery uploads',
      'Professional Video embeds',
      'Secure File attachments',
      'Smart content previews'
    ]
  },
  {
    icon: 'bi-stars',
    title: 'Other Useful Features',
    items: [
      'Automatic Dark / Light mode',
      'Fully Mobile-friendly design',
      'API support (for mobile app)',
      'Forgot / reset password system'
    ]
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
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
}

.nav-links a:hover {
  color: var(--color-primary);
  background: rgba(99, 102, 241, 0.05);
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
  width: 40px;
  height: 40px;
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
/* --- Marquee Section --- */
.marquee-section {
  background: var(--color-background);
  overflow: hidden;
  padding: 40px 0;
}

.marquee-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.marquee-row {
  display: flex;
  overflow: hidden;
  user-select: none;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.marquee-content {
  display: flex;
  gap: 20px;
  flex-shrink: 0;
  padding: 8px 0;
}

.marquee-ltr .marquee-content {
  animation: scroll-ltr 50s linear infinite;
}

.marquee-rtl .marquee-content {
  animation: scroll-rtl 50s linear infinite;
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}

.user-pill:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
  background: var(--color-hover);
}

.user-pill-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-background);
}

.user-pill-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.user-pill-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text);
}

.user-pill-role {
  font-size: 0.75rem;
  color: var(--color-muted);
  font-weight: 500;
}

@keyframes scroll-ltr {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 10px));
  }
}

@keyframes scroll-rtl {
  from {
    transform: translateX(calc(-50% - 10px));
  }

  to {
    transform: translateX(0);
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
  transform: translateY(-15px) scale(1.03);
  border-color: var(--color-primary);
  box-shadow: 0 30px 60px rgba(99, 102, 241, 0.15);
}

.feature-icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(99, 102, 241, 0.1);
  color: var(--color-primary);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  font-size: 1.6rem;
  transition: all 0.3s ease;
}

[data-theme="dark"] .feature-icon-wrapper {
  background: rgba(99, 102, 241, 0.15);
}

.feature-large-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.feature-item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-item-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-muted);
  font-size: 0.95rem;
  font-weight: 500;
}

.feature-item-list li i {
  color: var(--color-primary);
  font-size: 1.1rem;
}

[data-theme="dark"] .feature-item-list li {
  color: rgba(255, 255, 255, 0.7);
}

.feature-link {
  color: #6366f1;
  text-decoration: none;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* --- How It Works Section --- */
.how-it-works-section {
  background-color: #fafafa;
  overflow: hidden;
}

[data-theme="dark"] .how-it-works-section {
  background-color: #0c0c0e;
}

.badge-outline {
  display: inline-block;
  padding: 6px 16px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-muted);
  margin-bottom: 20px;
  background: white;
}

[data-theme="dark"] .badge-outline {
  background: #1a1a1c;
}

.steps-container {
  position: relative;
  padding: 60px 0;
}

.step-card {
  background: var(--color-background);
  border-radius: 32px;
  padding: 40px;
  height: 100%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.02);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.shimmer-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent);
  transform: skewX(-20deg);
  transition: 0.5s;
  pointer-events: none;
}

.step-card:hover .shimmer-effect {
  left: 150%;
  transition: 0.8s;
}

.step-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
  border-color: var(--color-primary);
}

.chat-bubble-mock.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.mock-lines-group .l1.glow {
  background: #6366f1;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

.check-badge.pulse {
  animation: badge-pulse 2s infinite;
}

@keyframes badge-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }

  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.reveal-up {
  opacity: 0.01;
  /* Start slightly above 0 to bypass some initial render issues */
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal-up.active {
  opacity: 1;
  transform: translateY(0);
}

[data-theme="dark"] .step-card {
  background: #1a1a1c;
  border-color: rgba(255, 255, 255, 0.08);
}

.step-card-visual {
  height: 200px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fdfdfd;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

[data-theme="dark"] .step-card-visual {
  background: #111113;
  border-color: rgba(255, 255, 255, 0.05);
}

.step-card h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 16px;
}

.step-card p {
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* UI Mockups Styling */
.ui-mockup {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justify-content: center;
}

.mock-header {
  width: 120px;
  height: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 8px;
  margin-bottom: 10px;
}

[data-theme="dark"] .mock-header {
  background: #1a1a1c;
}

.mock-logo {
  width: 15px;
  height: 15px;
  background: #eee;
  border-radius: 4px;
}

[data-theme="dark"] .mock-logo {
  background: #333;
}

.mock-line {
  width: 60px;
  height: 6px;
  background: #eee;
  border-radius: 3px;
}

[data-theme="dark"] .mock-line {
  background: #333;
}

.mock-btn-black {
  width: 100px;
  padding: 8px;
  background: #111;
  color: white;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 15px;
}

.mock-plan-grid {
  display: flex;
  gap: 15px;
}

.plan-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #999;
  position: relative;
}

[data-theme="dark"] .plan-circle {
  background: #2a2a2d;
  color: #666;
}

.plan-circle.active {
  background: #f43f5e;
  color: white;
}

.plan-tag {
  position: absolute;
  top: 100%;
  background: #111;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 8px;
  margin-top: 5px;
}

.chat-bubble-mock {
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 8px;
  position: absolute;
}

[data-theme="dark"] .chat-bubble-mock {
  background: #1a1a1c;
}

.chat-bubble-mock.left {
  top: 20px;
  left: 30px;
}

.chat-bubble-mock.right {
  bottom: 20px;
  right: 30px;
}

.mock-avatar-sm {
  width: 12px;
  height: 12px;
  background: #fbbf24;
  border-radius: 50%;
}

.mock-line-sm {
  width: 40px;
  height: 4px;
  background: #eee;
  border-radius: 2px;
}

.mock-line-xs {
  width: 20px;
  height: 4px;
  background: #eee;
  border-radius: 2px;
}

.mock-btn-blue {
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.avatar-stack {
  position: absolute;
  top: 40%;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.avatar-stack img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid white;
}

.doc-stack {
  position: relative;
  width: 100px;
  height: 120px;
}

.doc {
  position: absolute;
  width: 70px;
  height: 90px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

[data-theme="dark"] .doc {
  background: #1a1a1c;
  border-color: #333;
}

.doc-1 {
  transform: rotate(-10deg);
  left: -10px;
  top: 10px;
  opacity: 0.5;
}

.doc-2 {
  transform: rotate(5deg);
  right: -10px;
  top: 5px;
  opacity: 0.8;
}

.main-doc {
  z-index: 2;
  padding: 15px;
}

.mock-logo-faded {
  width: 15px;
  height: 15px;
  background: #eee;
  border-radius: 4px;
  margin-bottom: 20px;
}

.mock-lines-group .l1 {
  width: 100%;
  height: 4px;
  background: #f0f0f0;
  margin-bottom: 5px;
  border-radius: 2px;
}

.mock-lines-group .l2 {
  width: 60%;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
}

.check-badge {
  position: absolute;
  bottom: 20px;
  z-index: 5;
  width: 36px;
  height: 36px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  font-size: 1.2rem;
}

/* Step Labels & Arrows */
.step-indicator {
  position: absolute;
  color: #ccc;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 0;
}

.step-1-label {
  top: 0;
  left: 15%;
}

.step-2-label {
  bottom: 0;
  left: 35%;
  flex-direction: column;
}

.step-3-label {
  top: 0;
  right: 15%;
}

.step-arrow {
  color: #ddd;
}

.step-arrow-up {
  color: #ddd;
}

/* --- Testimonial Redesign --- */
.testimonial-redesign {
  background-color: var(--color-background);
  overflow: hidden;
  padding: 100px 0;
}

.redesign-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 24px;
}

.redesign-desc {
  color: var(--color-muted);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 450px;
  margin-bottom: 40px;
}

.btn-testimonial-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--color-text);
  color: var(--color-background);
  text-decoration: none;
  font-weight: 700;
  border-radius: 12px;
  transition: all 0.3s ease;
}


.staggered-testimonials {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px 0;
}

.testimonial-stagger-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.02);
  position: relative;
  transition: all 0.4s ease;
}

[data-theme="dark"] .testimonial-stagger-card {
  background: #030303;
  border-color: rgb(255, 255, 255);
}

.testimonial-stagger-card:hover {
  transform: translateX(12px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.1);
  z-index: 10 !important;
}

.stagger-card-1 {
  align-self: flex-end;
  margin-right: 40px;
}

.stagger-card-2 {
  align-self: flex-start;
  margin-left: 20px;
  border-left: 5px solid #000000;
}

.stagger-card-3 {
  align-self: flex-end;
  margin-right: 10px;
}

.stagger-user-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.stagger-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f8fafc;
}

[data-theme="dark"] .stagger-avatar {
  border-color: #334155;
}

.stagger-user-info {
  flex: 1;
}

.stagger-author {
  font-weight: 800;
  margin: 0;
  font-size: 1.1rem;
}

.stagger-quote-icon {
  font-size: 1.8rem;
  color: var(--color-text);
  opacity: 0.2;
}

.stagger-text {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-muted);
  margin: 0;
}

@media (max-width: 991px) {
  .staggered-testimonials {
    padding: 20px 0;
  }

  .testimonial-stagger-card {
    align-self: center !important;
    margin: 0 !important;
    max-width: 100%;
  }

  .redesign-title {
    font-size: 2.8rem;
  }
}

/* --- Final CTA Section --- */
.cta-banner {
  background: var(--color-text);
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
  align-items: center;
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
