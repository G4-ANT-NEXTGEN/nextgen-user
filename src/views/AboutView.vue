<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <swiper
        :modules="[Autoplay, EffectFade]"
        :slides-per-view="1"
        :effect="'fade'"
        :loop="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        class="hero-swiper"
      >
        <swiper-slide v-for="(img, index) in backgroundImages" :key="index">
          <div class="swiper-bg-image" :style="{ backgroundImage: `url(${img})` }"></div>
          <div class="swiper-overlay"></div>
        </swiper-slide>
      </swiper>

      <div class="container hero-content-container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="display-4 fw-bold mb-4 text-white reveal-scroll reveal-up">
              Revolutionizing<br />Website<br />Communication
            </h1>
            <p
              class="lead text-white-50 mb-5 pe-lg-5 reveal-scroll reveal-up"
              style="transition-delay: 0.1s"
            >
              Next Gen brings teams together with powerful, intuitive communication tools built for
              the modern web. Experience innovation like never before.
            </p>
            <div class="d-flex gap-3 reveal-scroll reveal-up" style="transition-delay: 0.2s">
              <button class="btn btn-light px-4 py-2 fw-semibold">Start Next Gen</button>
              <button class="btn btn-outline-light px-4 py-2 fw-semibold">Watch Demo</button>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-lottie-container ms-lg-4 reveal-scroll reveal-scale">
              <div ref="lottieContainer" class="lottie-animation floating-anim"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section py-5 my-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 pe-lg-5 mb-5 mb-lg-0 reveal-scroll reveal-up">
            <img
              src="../..//public/AboutVie/Meedilenguajpg.jpg"
              alt="Community Collaboration"
              class="img-fluid rounded-4 shadow-lg scale-hover-anim"
            />
          </div>
          <div class="col-lg-6 reveal-scroll reveal-up" style="transition-delay: 0.2s">
            <h2 class="display-6 fw-bold mb-4">About Next Gen</h2>
            <div class="about-content">
              <p class="mb-4">
                Founded in 2018, Next Gen emerged from a simple belief: communication should be
                effortless, secure, and accessible to everyone. What started as a small project by a
                team of passionate developers has grown into a platform trusted by millions
                worldwide.
              </p>
              <p class="mb-4">
                Our mission is to break down communication barriers and empower organizations to
                collaborate without limits. We're committed to building tools that not only meet
                today's needs but anticipate tomorrow's challenges.
              </p>
              <p>
                With offices across the globe and a diverse team of innovators, we're constantly
                pushing the boundaries of what's possible in web communication technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Banner -->
    <section class="stats-banner py-5">
      <div class="tech-faq-bg-overlay"></div>
      <div class="container position-relative" style="z-index: 2">
        <div class="row text-center g-4">
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="col-6 col-md-3 reveal-scroll reveal-up"
            :style="{ transitionDelay: stats.indexOf(stat) * 0.1 + 's' }"
          >
            <div class="stat-item">
              <h2 class="display-5 fw-bold text-white mb-1">
                {{ animatedStats[stat.id]
                }}{{ animatedStats[stat.id] === stat.target ? stat.suffix : '' }}
              </h2>
              <p class="text-white-50 mb-0">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5 my-5">
      <div class="container text-center mb-5">
        <h2 class="display-6 fw-bold mb-3">Powerful Features</h2>
        <p class="text-muted mx-auto" style="max-width: 600px">
          Everything you need to communicate effectively, collaborate seamlessly, and stay connected
          with your team.
        </p>
      </div>
      <div class="container">
        <div class="row g-4">
          <div
            v-for="(feature, idx) in features"
            :key="idx"
            class="col-md-4 reveal-scroll reveal-up"
            :style="{ transitionDelay: feature.delay }"
          >
            <div class="feature-card h-100 p-4 rounded-4 border">
              <div class="feature-icon mb-4">
                <i :class="['bi', `bi-${feature.icon}`, 'fs-2']"></i>
              </div>
              <h4 class="fw-bold mb-3">{{ feature.title }}</h4>
              <p class="text-muted mb-0">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Feature Section -->
    <section class="tech-feature-section py-5 my-5 bg-light-soft">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6 reveal-scroll reveal-up">
            <h2 class="display-5 fw-bold mb-4">Built on Cutting-Edge Technology</h2>
            <p class="lead text-muted mb-4">
              Next Gen leverages the latest advancements in cloud infrastructure, real-time
              protocols, and AI-driven features to deliver an unmatched communication experience.
            </p>
            <ul class="tech-feature-list list-unstyled mb-0">
              <li
                v-for="(item, idx) in [
                  'WebSocket technology for instant message delivery',
                  'End-to-end encryption for maximum security',
                  'AI-powered smart notifications and search',
                  'Scalable infrastructure supporting millions of users',
                ]"
                :key="idx"
                class="mb-3 d-flex align-items-center"
              >
                <span class="tech-dot mr-3 text-primary">●</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="col-lg-6 reveal-scroll reveal-scale">
            <div class="tech-image-wrapper">
              <img
                src="../../public/AboutVie/diploma.jpg "
                alt="Technology background"
                class="img-fluid rounded-4 shadow-lg tech-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section id="team" class="team-section py-5">
      <div class="container px-4 text-center">
        <div class="badge-pill mb-3 reveal-scroll reveal-up">Our Team</div>
        <h2 class="display-5 fw-bold mb-3 reveal-scroll reveal-up" style="transition-delay: 0.1s">
          Meet the People Behind Next Gen
        </h2>
        <p class="text-muted mb-5 reveal-scroll reveal-up" style="transition-delay: 0.2s">
          Passionate individuals dedicated to building the future of community platforms
        </p>

        <div class="row g-4 justify-content-center">
          <div
            v-for="(member, idx) in teamMembers"
            :key="idx"
            class="col-md-4 col-lg-2 reveal-scroll reveal-scale"
            :style="{ transitionDelay: member.delay }"
          >
            <div class="team-card h-100">
              <div class="team-avatar mb-3">
                <img :src="member.image" :alt="member.name" class="img-fluid rounded-circle" />
              </div>
              <h6 class="fw-bold mb-1">{{ member.name }}</h6>
              <p class="text-muted small mb-0">{{ member.role }}</p>
              <div class="team-social mt-3">
                <a href="#" class="text-muted me-2"><i class="bi bi-facebook"></i></a>
                <a href="#" class="text-muted me-2"><i class="bi bi-telegram"></i></a>
                <a href="#" class="text-muted"><i class="bi bi-github"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section py-5 my-5">
      <div class="container px-4">
        <div class="text-center mb-5">
          <div class="badge-pill mb-3 reveal-scroll reveal-up">Contact Us</div>
          <h2 class="display-5 fw-bold reveal-scroll reveal-up">Get in Touch</h2>
        </div>
        <div class="row g-5">
          <div class="col-lg-6 reveal-scroll reveal-up">
            <div class="contact-info-card p-5 rounded-4 border h-100 d-flex flex-column">
              <h4 class="fw-bold mb-4">Contact Information</h4>
              <p class="text-muted mb-5">
                Have questions or need assistance? Our team is here to help you get the most out of
                Next Gen.
              </p>

              <div
                v-for="(info, idx) in contactInfo"
                :key="idx"
                class="d-flex align-items-center mb-4"
              >
                <div class="contact-icon-box me-3">
                  <i :class="['bi', `bi-${info.icon}`]"></i>
                </div>
                <div>
                  <h6 class="mb-0 fw-bold">{{ info.title }}</h6>
                  <p class="text-muted mb-0 small">{{ info.detail }}</p>
                </div>
              </div>

              <div class="mt-auto pt-4 border-top">
                <h6 class="fw-bold mb-3">Connect With Us</h6>
                <div class="d-flex gap-3">
                  <a
                    v-for="social in socialLinks"
                    :key="social"
                    href="#"
                    class="btn btn-outline-dark rounded-circle p-0 contact-social-btn"
                  >
                    <i :class="['bi', `bi-${social}`]"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 reveal-scroll reveal-scale">
            <div class="map-container rounded-4 overflow-hidden border h-100 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31271.187661578433!2d104.8814725!3d11.5583626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095105b4d7f8a1%3A0xe54955b4105470d9!2z4Z6Y4Z6S4Z-S4Z6B4Z-S4Z6A4Z6A4Z-S4Z6f4Z-S4Z6T!5e0!3m2!1skm!2skh!4v1706024321234!5m2!1skm!2skh"
                width="100%"
                height="100%"
                style="border: 0; min-height: 450px"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
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
          <div v-for="(links, title) in footerLinks" :key="title" class="col-6 col-md-3 col-lg-2">
            <h6 class="fw-bold mb-4">{{ title }}</h6>
            <ul class="list-unstyled opacity-75">
              <li v-for="link in links" :key="link" class="mb-2">
                <a href="#" class="text-white text-decoration-none">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flex flex-wrap justify-content-between align-items-center py-4">
          <p class="small mb-0 opacity-50">&copy; 2026 Next Gen, Inc. All rights reserved.</p>
          <div class="d-flex gap-4">
            <a
              v-for="social in ['twitter-x', 'github', 'linkedin']"
              :key="social"
              href="#"
              class="text-white opacity-75"
            >
              <i :class="['bi', `bi-${social}`]"></i>
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import lottie from 'lottie-web'
import 'swiper/css'
import 'swiper/css/effect-fade'

// Refs
const lottieContainer = ref(null)
const animatedStats = ref({ users: 0, orgs: 0, uptime: 0, countries: 0 })

// Data
const backgroundImages = [
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000',
]

const stats = [
  { id: 'users', label: 'Active Users', target: 10, suffix: 'M+', decimals: 0 },
  { id: 'orgs', label: 'Organizations', target: 50, suffix: 'K+', decimals: 0 },
  { id: 'uptime', label: 'Uptime', target: 99.99, suffix: '%', decimals: 2 },
  { id: 'countries', label: 'Countries', target: 150, suffix: '+', decimals: 0 },
]

const features = [
  {
    icon: 'chat-dots',
    title: 'Real-Time Messaging',
    description:
      'Instant communication across your entire organization with lightning-fast message delivery.',
    delay: '0s',
  },
  {
    icon: 'lightning-charge',
    title: 'Lightning Fast',
    description:
      'Built on cutting-edge technology to ensure zero-lag communication, no matter the scale.',
    delay: '0.1s',
  },
  {
    icon: 'shield',
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with international security standards.',
    delay: '0.2s',
  },
  {
    icon: 'people',
    title: 'Team Collaboration',
    description: 'Channels, groups, and direct messages designed for seamless teamwork.',
    delay: '0.3s',
  },
  {
    icon: 'globe',
    title: 'Global Reach',
    description:
      'Connect with teams worldwide with multi-language support and local infrastructure.',
    delay: '0.4s',
  },
  {
    icon: 'headphones',
    title: '24/7 Support',
    description: 'Our dedicated support team is always ready to help you succeed.',
    delay: '0.5s',
  },
]

const teamMembers = [
  { name: 'Chan Ponloeur', role: 'CTO & Co-Founder', image: '/Ponloeur.jpg', delay: '0.1s' },
  { name: 'Ly Kimsun', role: 'CTO & Co-Founder', image: '/AboutVie/Kimsun.jpg', delay: '0.2s' },
  { name: 'Em Sokhai', role: 'CTO & Co-Founder', image: '/AboutVie/Haigg.jpg', delay: '0.3s' },
  { name: 'Sim Vin', role: 'CTO & Co-Founder', image: '/Vin.jpg', delay: '0.4s' },
  { name: 'Chin Damrey', role: 'CTO & Co-Founder', image: '/AboutVie/Damrey.jpg', delay: '0.5s' },
]

const contactInfo = [
  { icon: 'geo-alt', title: 'Our Location', detail: 'Phnom Penh, Cambodia' },
  { icon: 'envelope', title: 'Email Us', detail: 'support@nextgen.com' },
  { icon: 'telephone', title: 'Call Us', detail: '+855 12 345 678' },
]

const footerLinks = {
  Product: ['Design', 'Prototype', 'Whiteboard', 'Plugins'],
  Resources: ['Learn', 'Community', 'Best Practices', 'Support'],
  Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses'],
}

const socialLinks = ['facebook', 'twitter-x', 'instagram', 'linkedin']

// Methods
let hasAnimated = false
const animateNumbers = () => {
  if (hasAnimated) return
  hasAnimated = true

  const duration = 2000
  const frameRate = 60
  const totalFrames = (duration / 1000) * frameRate

  stats.forEach(({ id, target, decimals }) => {
    let frame = 0
    const counter = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = target * easedProgress

      if (frame >= totalFrames) {
        animatedStats.value[id] = target
        clearInterval(counter)
      } else {
        animatedStats.value[id] =
          decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current)
      }
    }, 1000 / frameRate)
  })
}

// Lifecycle
onMounted(() => {
  lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets10.lottiefiles.com/packages/lf20_m6cu96.json',
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          if (entry.target.classList.contains('stats-banner')) animateNumbers()
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
  )

  document.querySelectorAll('.reveal-scroll, .stats-banner').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.about-page {
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  color: #1a1a1a;
  overflow-x: hidden;
}

.hero-section {
  position: relative;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-swiper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.swiper-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 2;
}

.hero-content-container {
  position: relative;
  z-index: 10;
}

h1.display-4 {
  line-height: 1.1;
  letter-spacing: -1px;
}

.hero-lottie-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.floating-anim {
  animation: floating 6s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.scale-hover-anim {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.scale-hover-anim:hover {
  transform: scale(1.02);
}

.swiper-bg-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  animation: hero-zoom 20s linear infinite alternate;
}

@keyframes hero-zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

.lottie-animation {
  width: 100%;
  height: auto;
}

.stat-item h2 {
  font-size: 2.5rem;
}

.about-section h2 {
  letter-spacing: -0.5px;
}

.about-content p {
  color: #555;
  line-height: 1.7;
}

.about-section img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.feature-card {
  transition: all 0.3s ease;
  background: #fff;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-color: #000 !important;
}

.feature-icon {
  color: #1a1a1a;
}

/* Premium Button Styles */
.btn {
  padding: 0.625rem 1.5rem;
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

.btn-primary {
  background-color: #000;
  color: #fff;
  border-color: #000;
}

.btn-primary:hover {
  background-color: #222;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.btn-outline-light {
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}

.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #fff;
}

.bg-dark {
  background-color: #05030f !important;
}

.stats-banner,
.tech-faq-section {
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.stats-banner {
  z-index: 20;
}

.tech-faq-section {
  padding: 100px 0;
}

.tech-faq-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(5, 3, 15, 0.85);
  z-index: 1;
}

.tech-bullet-white {
  color: #fff;
  font-size: 0.8rem;
  margin-right: 15px;
}

@media (max-width: 991.98px) {
  .hero-section {
    height: auto;
    padding: 100px 0;
  }

  .about-section img {
    height: 300px;
  }

  .hero-lottie-container {
    margin-top: 50px;
  }
}

/* Scroll Reveal Animations */
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

.footer-section {
  background-color: #0d1117;
}

.footer-section a:hover {
  opacity: 1 !important;
  color: #fff !important;
}

.logo-img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
}

.transition-all {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn.transition-all:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
/* Team Section Styles */
.team-card {
  padding: 2rem 1rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  height: 100%;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  text-align: center;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.team-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #f8f9fa;
  transition: border-color 0.3s ease;
}

.team-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-card:hover .team-avatar {
  border-color: #000;
}

.team-social a {
  transition: color 0.3s ease;
}

.team-social a:hover {
  color: #000 !important;
}

.badge-pill {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #f1f3f5;
  color: #000;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
}
.tech-feature-section h2 {
  letter-spacing: -1.5px;
}

.tech-dot {
  color: #000;
  font-size: 0.8rem;
  margin-right: 15px;
}

.tech-image-wrapper {
  overflow: hidden;
  border-radius: 2rem;
}

.tech-image {
  transition: transform 0.5s ease;
}

.tech-image:hover {
  transform: scale(1.05);
}

/* Contact Section Styles */
.contact-info-card {
  background: #fff;
  transition: all 0.3s ease;
}

.contact-icon-box {
  width: 50px;
  height: 50px;
  background: #000;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.contact-info-card:hover .contact-icon-box {
  background: #000;
  color: #fff;
}

.contact-social-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.map-container {
  min-height: 450px;
  background: #f1f3f5;
}

.bg-light-soft {
  background-color: #f8f9fa;
}
</style>
