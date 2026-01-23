<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <swiper
        :modules="[Autoplay, EffectFade]"
        :slides-per-view="1"
        :effect="'fade'"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
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
            <h1 class="display-4 fw-bold mb-4 text-white">
              Revolutionizing<br />
              Website<br />
              Communication
            </h1>
            <p class="lead text-white-50 mb-5 pe-lg-5">
              Next Gen brings teams together with powerful, intuitive communication tools built for
              the modern web. Experience innovation like never before.
            </p>
            <div class="d-flex gap-3">
              <button class="btn btn-primary px-4 py-2 fw-semibold">Start Free Trial</button>
              <button class="btn btn-outline-light px-4 py-2 fw-semibold">Watch Demo</button>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-lottie-container ms-lg-4">
              <div ref="lottieContainer" class="lottie-animation"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- About Section -->
    <section class="about-section py-5 my-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 pe-lg-5 mb-5 mb-lg-0">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
              alt="Community Collaboration"
              class="img-fluid rounded-4 shadow-lg"
            />
          </div>
          <div class="col-lg-6">
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
  </div>

  <!-- Stats Banner -->
  <section class="stats-banner py-5">
    <div class="container">
      <div class="row text-center g-4">
        <div class="col-6 col-md-3">
          <div class="stat-item">
            <h2 class="display-5 fw-bold text-white mb-1">10M+</h2>
            <p class="text-white-50 mb-0">Active Users</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat-item">
            <h2 class="display-5 fw-bold text-white mb-1">50K+</h2>
            <p class="text-white-50 mb-0">Organizations</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat-item">
            <h2 class="display-5 fw-bold text-white mb-1">99.99%</h2>
            <p class="text-white-50 mb-0">Uptime</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat-item">
            <h2 class="display-5 fw-bold text-white mb-1">150+</h2>
            <p class="text-white-50 mb-0">Countries</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import lottie from 'lottie-web'
import 'swiper/css'
import 'swiper/css/effect-fade'

const lottieContainer = ref(null)

const backgroundImages = [
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000',
]

onMounted(() => {
  lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets10.lottiefiles.com/packages/lf20_m6cu96.json', // Community/Teamwork animation
  })
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

.swiper-bg-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
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

.lottie-animation {
  width: 100%;
  height: auto;
}

.stats-banner {
  background-color: #05030f;
  position: relative;
  z-index: 20;
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

/* Premium Button Styles */
.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.4);
}

.btn-outline-light {
  border-radius: 8px;
  border-width: 1px;
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  transform: translateY(-2px);
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
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
</style>
