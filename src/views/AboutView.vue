<template>
  <div class="about-page p-4">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-gradient"></div>
      <div class="hero-grid"></div>

      <swiper :modules="[Autoplay, EffectFade]" :slides-per-view="1" :effect="'fade'" :loop="true"
        :autoplay="{ delay: 6000, disableOnInteraction: false }" class="hero-swiper">
        <swiper-slide v-for="(img, index) in backgroundImages" :key="index">
          <div class="swiper-bg-image" :style="{ backgroundImage: `url(${img})` }"></div>
        </swiper-slide>
      </swiper>

      <div class="container-fluid px-4 hero-content">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="hero-badge reveal-scroll reveal-up">Since 2026</div>
            <h1 class="hero-title reveal-scroll reveal-up" style="transition-delay: 0.1s">
              Revolutionizing<br />
              <span class="gradient-text">Website</span><br />
              Communication
            </h1>
            <p class="hero-description reveal-scroll reveal-up" style="transition-delay: 0.2s">
              Next Gen brings teams together with powerful, intuitive communication tools
              built for the modern web. Experience innovation like never before.
            </p>
            <!-- <div class="hero-buttons reveal-scroll reveal-up" style="transition-delay: 0.3s">
              <button class="btn btn-primary">
                Start Next Gen
                <i class="bi bi-arrow-right ms-2"></i>
              </button>
              <button class="btn btn-outline">
                <i class="bi bi-play-circle me-2"></i>
                Watch Demo
              </button>
            </div> -->
          </div>
          <div class="col-lg-6">
            <div class="hero-visual reveal-scroll reveal-scale">
              <div ref="lottieContainer" class="lottie-animation"></div>
              <div class="visual-decoration"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>

    <!-- Stats Banner -->
    <section class="stats-section">
      <div class="container-fluid px-4">
        <div class="stats-grid">
          <div v-for="(stat, idx) in stats" :key="stat.id" class="stat-item reveal-scroll reveal-up"
            :style="{ transitionDelay: idx * 0.1 + 's' }">
            <div class="stat-number">
              {{ animatedStats[stat.id] }}{{ animatedStats[stat.id] === stat.target ? stat.suffix : '' }}
            </div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-decoration"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="container-fluid px-4">
        <div class="row align-items-center g-5">
          <div class="col-lg-6 reveal-scroll reveal-up">
            <div class="about-image-wrapper">
              <img src="../../public/AboutVie/Meedilenguajpg.jpg" alt="Community Collaboration" class="about-image" />
              <div class="image-frame"></div>
            </div>
          </div>
          <div class="col-lg-6 reveal-scroll reveal-up" style="transition-delay: 0.2s">
            <div class="section-label">Our Story</div>
            <h2 class="section-title">Building the Future of Communication</h2>
            <div class="about-content">
              <p>
                Founded in 2018, Next Gen emerged from a simple belief: communication should be
                effortless, secure, and accessible to everyone. What started as a small project by a
                team of passionate developers has grown into a platform trusted by millions
                worldwide.
              </p>
              <p>
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

    <!-- Features Section -->
    <section class="features-section">
      <div class="container-fluid px-4">
        <div class="section-header text-center">
          <div class="section-label">Capabilities</div>
          <h2 class="section-title">Powerful Features</h2>
          <p class="section-description">
            Everything you need to communicate effectively, collaborate seamlessly,
            and stay connected with your team.
          </p>
        </div>

        <div class="features-grid">
          <div v-for="(feature, idx) in features" :key="idx" class="feature-card reveal-scroll reveal-up"
            :style="{ transitionDelay: feature.delay }">
            <div class="feature-icon">
              <i :class="['bi', `bi-${feature.icon}`]"></i>
            </div>
            <h4 class="feature-title">{{ feature.title }}</h4>
            <p class="feature-description">{{ feature.description }}</p>
            <div class="feature-decoration"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Section -->
    <section class="tech-section">
      <div class="container-fluid px-4">
        <div class="row align-items-center g-5">
          <div class="col-lg-6 order-lg-2 reveal-scroll reveal-up">
            <div class="section-label">Technology</div>
            <h2 class="section-title">Built on Cutting-Edge Innovation</h2>
            <p class="tech-lead">
              Next Gen leverages the latest advancements in cloud infrastructure, real-time
              protocols, and AI-driven features to deliver an unmatched communication experience.
            </p>
            <ul class="tech-list">
              <li v-for="(item, idx) in techFeatures" :key="idx">
                <div class="tech-bullet"></div>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="col-lg-6 order-lg-1 reveal-scroll reveal-scale">
            <div class="tech-image-wrapper">
              <img src="../../public/AboutVie/diploma.jpg" alt="Technology" class="tech-image" />
              <div class="image-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container-fluid px-4">
        <div class="section-header text-center">
          <div class="section-label">Our Team</div>
          <h2 class="section-title">Meet the People Behind Next Gen</h2>
          <p class="section-description">
            Passionate individuals dedicated to building the future of communication platforms
          </p>
        </div>

        <div class="team-grid">
          <div v-for="(member, idx) in teamMembers" :key="idx" class="team-card reveal-scroll reveal-scale"
            :style="{ transitionDelay: member.delay }">
            <div class="team-image-wrapper">
              <img :src="member.image" :alt="member.name" class="team-image" />
              <div class="team-overlay">
                <div class="team-social">
                  <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                  <a href="#" aria-label="Telegram"><i class="bi bi-telegram"></i></a>
                  <a href="#" aria-label="GitHub"><i class="bi bi-github"></i></a>
                </div>
              </div>
            </div>
            <div class="team-info">
              <h6 class="team-name">{{ member.name }}</h6>
              <p class="team-role">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>



  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import lottie from 'lottie-web'
import 'swiper/css'
import 'swiper/css/effect-fade'

const lottieContainer = ref(null)
const animatedStats = ref({ users: 0, orgs: 0, uptime: 0, countries: 0 })

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
    description: 'Instant communication across your entire organization with lightning-fast message delivery.',
    delay: '0s',
  },
  {
    icon: 'lightning-charge',
    title: 'Lightning Fast',
    description: 'Built on cutting-edge technology to ensure zero-lag communication, no matter the scale.',
    delay: '0.1s',
  },
  {
    icon: 'shield-check',
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
    icon: 'globe2',
    title: 'Global Reach',
    description: 'Connect with teams worldwide with multi-language support and local infrastructure.',
    delay: '0.4s',
  },
  {
    icon: 'headset',
    title: '24/7 Support',
    description: 'Our dedicated support team is always ready to help you succeed.',
    delay: '0.5s',
  },
]

const techFeatures = [
  'WebSocket technology for instant message delivery',
  'End-to-end encryption for maximum security',
  'AI-powered smart notifications and search',
  'Scalable infrastructure supporting millions of users',
]

const teamMembers = [
  { name: 'Chan Ponloeur', role: 'CTO & Co-Founder', image: '/Ponloeur.jpg', delay: '0.1s' },
  { name: 'Ly Kimsun', role: 'CTO & Co-Founder', image: '/AboutVie/Kimsun.jpg', delay: '0.2s' },
  { name: 'Em Sokhai', role: 'CTO & Co-Founder', image: '/AboutVie/Haigg.jpg', delay: '0.3s' },
  { name: 'Sim Vin', role: 'CTO & Co-Founder', image: '/Vin.jpg', delay: '0.4s' },
  { name: 'Chin Damrey', role: 'CTO & Co-Founder', image: '/AboutVie/Damrey.jpg', delay: '0.5s' },
]

const footerLinks = {
  Product: ['Design', 'Prototype', 'Whiteboard', 'Plugins'],
  Resources: ['Learn', 'Community', 'Best Practices', 'Support'],
  Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses'],
}

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
        animatedStats.value[id] = decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current)
      }
    }, 1000 / frameRate)
  })
}

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
          if (entry.target.closest('.stats-section')) animateNumbers()
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.reveal-scroll, .stats-section').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.about-page {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Hero Section */
.hero-section {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 100vh;
  min-height: 700px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: var(--about-hero-bg, linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.6) 100%));
  z-index: 2;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--hero-grid-color, rgba(255, 255, 255, 0.03)) 1px, transparent 1px),
    linear-gradient(90deg, var(--hero-grid-color, rgba(255, 255, 255, 0.03)) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 3;
}

.hero-swiper {
  position: absolute;
  border-radius: 20px;
  inset: 0;
  z-index: 1;
}

.swiper-bg-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  animation: kenburns 20s ease-in-out infinite alternate;
}

@keyframes kenburns {
  0% {
    transform: scale(1) translateX(0);
  }

  100% {
    transform: scale(1.15) translateX(-5%);
  }
}

.hero-content {
  border-radius: 20px;
  /* background: rgba(255, 255, 255, 0.1); */
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.hero-badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  color: var(--hero-badge-text, #ffffff);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
}

.hero-title {

  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--hero-title-color, #ffffff);
  margin-bottom: 2rem;
}

.gradient-text {
  background-color: var(--color-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--hero-description-color, rgba(255, 255, 255, 0.7));
  max-width: 540px;
  margin-bottom: 3rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: var(--btn-primary-bg, #ffffff);
  color: var(--btn-primary-text, #0a0a0a);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(255, 255, 255, 0.2);
}

.btn-outline {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: var(--btn-outline-text, #ffffff);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.hero-visual {
  position: relative;
  max-width: 600px;
  margin-left: auto;
}

.lottie-animation {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 30px 60px rgba(59, 130, 246, 0.3));
}

.visual-decoration {
  position: absolute;
  inset: -20%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  z-index: -1;
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--scroll-indicator-color, rgba(255, 255, 255, 0.5));
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  z-index: 10;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5));
  animation: scroll-down 2s ease-in-out infinite;
}

@keyframes scroll-down {

  0%,
  100% {
    transform: translateY(-10px);
    opacity: 0;
  }

  50% {
    transform: translateY(10px);
    opacity: 1;
  }
}

/* Stats Section */
.stats-section {
  padding: 8rem 0;
  border-radius: 20px;
  background: var(--about-stats-bg);
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.02) 50%, transparent 51%),
    linear-gradient(-45deg, transparent 49%, rgba(255, 255, 255, 0.02) 50%, transparent 51%);
  background-size: 30px 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 4rem;
}

.stat-item {
  text-align: center;
  position: relative;
}

.stat-number {

  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-decoration {
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

/* Section Styles */
section {
  padding: 8rem 0;
}

.section-label {
  display: inline-block;
  padding: 6px 16px;
  background: var(--color-surface);
  border-radius: 50px;
  color: var(--color-accent);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.section-title {

  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.section-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 640px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 5rem;
}

/* About Section */
.about-section {
  background: var(--color-surface);
}

.about-image-wrapper {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
}

.about-image {
  width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;
  transition: transform 0.6s var(--transition);
}

.about-image-wrapper:hover .about-image {
  transform: scale(1.05);
}

.image-frame {
  position: absolute;
  inset: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  pointer-events: none;
}

.about-content p {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.about-content p:last-child {
  margin-bottom: 0;
}

/* Features Section */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 3rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  transition: all 0.4s var(--transition);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-text);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--transition);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
  border-color: var(--color-accent);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background-color: var(--color-text);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-background);
  font-size: 1.75rem;
  margin-bottom: 2rem;
  transition: transform 0.4s var(--transition);
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-title {

  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.feature-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
}

.feature-decoration {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(30%, 30%);
}

/* Technology Section */
.tech-section {
  background: var(--color-surface);
}

.tech-lead {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 2.5rem;
}

.tech-list {
  list-style: none;
  padding: 0;
}

.tech-list li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 1.25rem;
}

.tech-bullet {
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, var(--color-accent), #8b5cf6);
  border-radius: 50%;
  margin-top: 0.6rem;
  flex-shrink: 0;
}

.tech-image-wrapper {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
}

.tech-image {
  width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;
  transition: transform 0.6s var(--transition);
}

.tech-image-wrapper:hover .tech-image {
  transform: scale(1.05);
}

.image-glow {
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s var(--transition);
  pointer-events: none;
}

.tech-image-wrapper:hover .image-glow {
  opacity: 1;
}

/* Team Section */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2.5rem;
}

.team-card {
  text-align: center;
}

.team-image-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  aspect-ratio: 1;
}

.team-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--transition);
}

.team-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.4s var(--transition);
}

.team-card:hover .team-overlay {
  opacity: 1;
}

.team-card:hover .team-image {
  transform: scale(1.1);
}

.team-social {
  display: flex;
  gap: 1rem;
}

.team-social a {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.125rem;
  transition: all 0.3s var(--transition);
}

.team-social a:hover {
  background: var(--team-social-hover, #ffffff);
  color: var(--about-stats-bg);
  transform: translateY(-3px);
}

.team-name {

  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.team-role {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  margin: 0;
}



/* Footer */
.footer-section {
  background: var(--about-stats-bg);
  color: var(--footer-text, #ffffff);
  padding: 5rem 0 2rem;
}

.footer-main {
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.footer-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
}

.footer-brand-name {

  font-size: 1.5rem;
  font-weight: 700;
}

.footer-tagline {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  max-width: 320px;
}

.footer-heading {
  font-weight: 600;
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.3s var(--transition);
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-copyright {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.footer-social a {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  transition: all 0.3s var(--transition);
}

.footer-social a:hover {
  background: var(--footer-social-hover, #ffffff);
  color: var(--about-stats-bg);
  transform: translateY(-3px);
}

/* Scroll Reveal Animations */
.reveal-scroll {
  opacity: 0;
  transition: all 1s var(--transition);
}

.reveal-scroll.reveal-up {
  transform: translateY(60px);
}

.reveal-scroll.reveal-scale {
  transform: scale(0.9);
}

.reveal-scroll.active {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Responsive */
@media (max-width: 991.98px) {
  section {
    padding: 5rem 0;
  }

  .hero-section {
    height: auto;
    min-height: 600px;
    padding: 6rem 0;
  }

  .hero-visual {
    margin-top: 3rem;
  }

  .stats-section {
    padding: 5rem 0;
  }

  .stats-grid {
    gap: 3rem;
  }

  .about-image,
  .tech-image {
    height: 400px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 575.98px) {
  .hero-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .features-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
