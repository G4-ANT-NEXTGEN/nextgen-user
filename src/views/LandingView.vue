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
            <li class="nav-item">
              <a class="nav-link" href="#features">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#community">Community</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#customers">Customers</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#questions">Questions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#team">Team</a>
            </li>
          </ul>
          <div class="d-flex align-items-center gap-3">
            <RouterLink to="/login" class="btn px-4 py-2 rounded-3 fw-semibold">Log In</RouterLink>
            <RouterLink to="/register" class="btn px-4 py-2 rounded-3 fw-semibold"
              >Sign Up Free</RouterLink
            >
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
                <RouterLink
                  to="/login"
                  class="btn btn-dark px-5 py-3 rounded-3 fw-semibold d-flex align-items-center gap-2"
                >
                  Get Started Free
                  <i class="bi bi-arrow-right"></i>
                </RouterLink>
                <button
                  class="btn btn-outline-secondary px-5 py-3 rounded-3 fw-semibold d-flex align-items-center gap-2"
                >
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
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Community members"
                class="img-fluid rounded-5 hero-image"
              />
              <!-- MPTC Logo -->
              <img
                src="https://asset.cambodia.gov.kh/mptc/media/MPTC-MRD-2023_Logo-MPTC-MRD-2023.png"
                alt="MPTC Logo"
                class="hero-logo"
              />
              <!-- YouTube Logo -->
              <img
                src="https://yt3.googleusercontent.com/8Zeo5xOHpFFDlYJUSNf_wIVjUmIOb2lHP-SIl3RkpQB5nwHErx2voHbXH_zxEKT-bk00L9aAVgU=s900-c-k-c0x00ffffff-no-rj"
                alt="YouTube Logo"
                class="hero-youtube-logo"
              />
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
          <div class="col-md-4 reveal-scroll reveal-up" style="transition-delay: 0.1s">
            <div class="feature-card h-100">
              <div class="feature-icon-box mb-3 transition-transform">
                <i class="bi bi-people"></i>
              </div>
              <h5 class="fw-bold mb-3">Create & Join Communities</h5>
              <p class="text-muted small">Build and discover communities around your interests.</p>
            </div>
          </div>
          <div class="col-md-4 reveal-scroll reveal-up" style="transition-delay: 0.2s">
            <div class="feature-card h-100">
              <div class="feature-icon-box mb-3 transition-transform">
                <i class="bi bi-chat-dots"></i>
              </div>
              <h5 class="fw-bold mb-3">Real-time Chat & Comments</h5>
              <p class="text-muted small">Connect instantly with live messaging and discussions.</p>
            </div>
          </div>
          <div class="col-md-4 reveal-scroll reveal-up" style="transition-delay: 0.3s">
            <div class="feature-card h-100">
              <div class="feature-icon-box mb-3 transition-transform">
                <i class="bi bi-image"></i>
              </div>
              <h5 class="fw-bold mb-3">Share Photos & Stories</h5>
              <p class="text-muted small">Capture and share your moments with the world.</p>
            </div>
          </div>
          <div class="col-md-4 reveal-scroll reveal-up" style="transition-delay: 0.1s">
            <div class="feature-card h-100">
              <div class="feature-icon-box mb-3 transition-transform">
                <i class="bi bi-bell"></i>
              </div>
              <h5 class="fw-bold mb-3">Smart Notifications</h5>
              <p class="text-muted small">Stay updated with personalized, intelligent alerts.</p>
            </div>
          </div>
          <div class="col-md-4 reveal-scroll reveal-up" style="transition-delay: 0.2s">
            <div class="feature-card h-100">
              <div class="feature-icon-box mb-3 transition-transform">
                <i class="bi bi-shield-lock"></i>
              </div>
              <h5 class="fw-bold mb-3">Privacy & Control</h5>
              <p class="text-muted small">Your data, your rules with advanced privacy settings.</p>
            </div>
          </div>
          <div class="col-md-4 reveal-scroll reveal-up" style="transition-delay: 0.3s">
            <div class="feature-card h-100">
              <div class="feature-icon-box mb-3 transition-transform">
                <i class="bi bi-hand-thumbs-up"></i>
              </div>
              <h5 class="fw-bold mb-3">Like, Follow & React</h5>
              <p class="text-muted small">Engage with content and connect with others easily.</p>
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
          <div class="col-6 col-md-3 reveal-scroll reveal-up" style="transition-delay: 0.1s">
            <div class="stat-card">
              <div class="stat-icon-bg mb-3 transition-transform">
                <i class="bi bi-people-fill"></i>
              </div>
              <h3 class="fw-bold mb-1">5M+</h3>
              <p class="text-muted small mb-1">Active Users</p>
              <p class="text-secondary x-small">Designers worldwide</p>
            </div>
          </div>
          <div class="col-6 col-md-3 reveal-scroll reveal-up" style="transition-delay: 0.2s">
            <div class="stat-card">
              <div class="stat-icon-bg mb-3 transition-transform">
                <i class="bi bi-star-fill"></i>
              </div>
              <h3 class="fw-bold mb-1">4.9/5</h3>
              <p class="text-muted small mb-1">User Rating</p>
              <p class="text-secondary x-small">From 50K+ reviews</p>
            </div>
          </div>
          <div class="col-6 col-md-3 reveal-scroll reveal-up" style="transition-delay: 0.3s">
            <div class="stat-card">
              <div class="stat-icon-bg mb-3 transition-transform">
                <i class="bi bi-download"></i>
              </div>
              <h3 class="fw-bold mb-1">10M+</h3>
              <p class="text-muted small mb-1">Downloads</p>
              <p class="text-secondary x-small">Across all platforms</p>
            </div>
          </div>
          <div class="col-6 col-md-3 reveal-scroll reveal-up" style="transition-delay: 0.4s">
            <div class="stat-card">
              <div class="stat-icon-bg mb-3 transition-transform">
                <i class="bi bi-globe"></i>
              </div>
              <h3 class="fw-bold mb-1">150+</h3>
              <p class="text-muted small mb-1">Countries</p>
              <p class="text-secondary x-small">Global community</p>
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
          <div class="col-md-4 reveal-scroll reveal-up" style="transition-delay: 0.1s">
            <div class="testimonial-card">
              <p class="mb-4">
                "The best platform we've ever used. The community features are game-changing for our
                team's productivity."
              </p>
              <div class="d-flex align-items-center justify-content-center">
                <div class="avatar-sm me-3">JD</div>
                <div class="text-start">
                  <h6 class="mb-0 fw-bold">John Doe</h6>
                  <p class="text-muted small mb-0">CEO at TechFlow</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 reveal-scroll reveal-up" style="transition-delay: 0.2s">
            <div class="testimonial-card">
              <p class="mb-4">
                "I've found so many amazing collaborators here. It's more than just a tool, it's a
                creative ecosystem."
              </p>
              <div class="d-flex align-items-center justify-content-center">
                <div class="avatar-sm me-3">AS</div>
                <div class="text-start">
                  <h6 class="mb-0 fw-bold">Anna Smith</h6>
                  <p class="text-muted small mb-0">Independent Artist</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 reveal-scroll reveal-up" style="transition-delay: 0.3s">
            <div class="testimonial-card">
              <p class="mb-4">
                "Security and privacy were our top concerns, and Next Gen delivered beyond our
                expectations."
              </p>
              <div class="d-flex align-items-center justify-content-center">
                <div class="avatar-sm me-3">MK</div>
                <div class="text-start">
                  <h6 class="mb-0 fw-bold">Mike King</h6>
                  <p class="text-muted small mb-0">CTO at SecureData</p>
                </div>
              </div>
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
          <div class="col-md-4 col-lg-2 reveal-scroll reveal-scale" style="transition-delay: 0.1s">
            <div class="team-card h-100">
              <div class="team-avatar mb-3">
                <img
                  src="../../public/Ponloeur.jpg"
                  alt="Sarah Chen"
                  class="img-fluid rounded-circle"
                />
              </div>
              <h6 class="fw-bold mb-1">Chan Ponloeur</h6>
              <p class="text-muted small mb-0">CTO & Co-Founder</p>
              <div class="team-social mt-3">
                <a href="#" class="text-muted me-2"><i class="bi bi-facebook"></i></a>
                <a href="#" class="text-muted me-2"><i class="bi bi-telegram"></i></a>
                <a href="#" class="text-muted"><i class="bi bi-github"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-lg-2 reveal-scroll reveal-scale" style="transition-delay: 0.2s">
            <div class="team-card h-100">
              <div class="team-avatar mb-3">
                <img
                  src="../../public/Kimsun.jpg"
                  alt="Sarah Chen"
                  class="img-fluid rounded-circle"
                />
              </div>
              <h6 class="fw-bold mb-1">Ly Kimsun</h6>
              <p class="text-muted small mb-0">CTO & Co-Founder</p>
              <div class="team-social mt-3">
                <a href="#" class="text-muted me-2"><i class="bi bi-facebook"></i></a>
                <a href="#" class="text-muted me-2"><i class="bi bi-telegram"></i></a>
                <a href="#" class="text-muted"><i class="bi bi-github"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-lg-2 reveal-scroll reveal-scale" style="transition-delay: 0.2s">
            <div class="team-card h-100">
              <div class="team-avatar mb-3">
                <img
                  src="../../public/Haigg.jpg"
                  alt="Sarah Chen"
                  class="img-fluid rounded-circle"
                />
              </div>
              <h6 class="fw-bold mb-1">Em Sokhai</h6>
              <p class="text-muted small mb-0">CTO & Co-Founder</p>
              <div class="team-social mt-3">
                <a href="#" class="text-muted me-2"><i class="bi bi-facebook"></i></a>
                <a href="#" class="text-muted me-2"><i class="bi bi-telegram"></i></a>
                <a href="#" class="text-muted"><i class="bi bi-github"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-lg-2 reveal-scroll reveal-scale" style="transition-delay: 0.4s">
            <div class="team-card h-100">
              <div class="team-avatar mb-3">
                <img src="../../public/Vin.jpg" alt="Sarah Chen" class="img-fluid rounded-circle" />
              </div>
              <h6 class="fw-bold mb-1">Sim Vin</h6>
              <p class="text-muted small mb-0">CTO & Co-Founder</p>
              <div class="team-social mt-3">
                <a href="#" class="text-muted me-2"><i class="bi bi-facebook"></i></a>
                <a href="#" class="text-muted me-2"><i class="bi bi-telegram"></i></a>
                <a href="#" class="text-muted"><i class="bi bi-github"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-lg-2 reveal-scroll reveal-scale" style="transition-delay: 0.5s">
            <div class="team-card h-100">
              <div class="team-avatar mb-3">
                <img src="../../public/Damrey.jpg" alt="Sarah Chen" class="img-fluid rounded-circle" />
              </div>
              <h6 class="fw-bold mb-1">Chin Damrey</h6>
              <p class="text-muted small mb-0">CTO & Co-Founder</p>
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

    <!-- Recent Questions Section -->
    <section id="questions" class="recent-questions-section py-5 bg-light-soft">
      <div class="container px-4 text-center">
        <h2 class="display-5 fw-bold mb-3 reveal-scroll reveal-up">Recent Questions</h2>
        <p class="text-muted mb-5 reveal-scroll reveal-up" style="transition-delay: 0.1s">
          Frequently asked questions from our community
        </p>

        <div class="row g-4 text-start">
          <div class="col-md-6 reveal-scroll reveal-up" style="transition-delay: 0.1s">
            <div class="question-card h-100">
              <h5 class="fw-bold mb-3">How do I join a community?</h5>
              <p class="text-muted">
                Simply search for communities that interest you and click the join button. You can
                join up to 5 communities on the free plan.
              </p>
            </div>
          </div>
          <div class="col-md-6 reveal-scroll reveal-up" style="transition-delay: 0.2s">
            <div class="question-card h-100">
              <h5 class="fw-bold mb-3">Is my data secure?</h5>
              <p class="text-muted">
                Yes, we use advanced encryption and privacy controls to keep your data safe. Your
                information is never shared without your consent.
              </p>
            </div>
          </div>
          <div class="col-md-6 reveal-scroll reveal-up" style="transition-delay: 0.3s">
            <div class="question-card h-100">
              <h5 class="fw-bold mb-3">Can I create my own community?</h5>
              <p class="text-muted">
                Absolutely! With a Pro or Enterprise plan, you can create and manage your own
                communities with unlimited members.
              </p>
            </div>
          </div>
          <div class="col-md-6 reveal-scroll reveal-up" style="transition-delay: 0.4s">
            <div class="question-card h-100">
              <h5 class="fw-bold mb-3">How does real-time chat work?</h5>
              <p class="text-muted">
                Our chat system connects you instantly with other members. Messages are delivered in
                real-time with support for text, images, and files.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- CTA Section -->
    <section class="cta-section py-5 bg-dark text-white text-center">
      <div class="container px-4 py-5 reveal-scroll reveal-scale">
        <h2 class="display-4 fw-bold mb-4">Start explore with Next Gen today</h2>
        <p class="lead mb-5 opacity-75">
          Join millions of designers and teams. 100% free, no credit card required.
        </p>
        <div class="d-flex flex-wrap justify-content-center gap-3 mb-4">
          <RouterLink
            to="/register"
            class="btn btn-light px-5 py-3 rounded-pill fw-bold d-flex align-items-center gap-2 transition-all"
          >
            Get Started Free <i class="bi bi-arrow-right"></i>
          </RouterLink>
          <RouterLink
            to="/login"
            class="btn btn-outline-light px-5 py-3 rounded-pill fw-bold transition-all"
          >
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
          <div class="col-6 col-md-3 col-lg-2">
            <h6 class="fw-bold mb-4">Product</h6>
            <ul class="list-unstyled opacity-75">
              <li class="mb-2"><a href="#" class="text-white text-decoration-none">Design</a></li>
              <li class="mb-2">
                <a href="#" class="text-white text-decoration-none">Prototype</a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-white text-decoration-none">Whiteboard</a>
              </li>
              <li class="mb-2"><a href="#" class="text-white text-decoration-none">Plugins</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <h6 class="fw-bold mb-4">Resources</h6>
            <ul class="list-unstyled opacity-75">
              <li class="mb-2"><a href="#" class="text-white text-decoration-none">Learn</a></li>
              <li class="mb-2">
                <a href="#" class="text-white text-decoration-none">Community</a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-white text-decoration-none">Best Practices</a>
              </li>
              <li class="mb-2"><a href="#" class="text-white text-decoration-none">Support</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <h6 class="fw-bold mb-4">Legal</h6>
            <ul class="list-unstyled opacity-75">
              <li class="mb-2"><a href="#" class="text-white text-decoration-none">Privacy</a></li>
              <li class="mb-2"><a href="#" class="text-white text-decoration-none">Terms</a></li>
              <li class="mb-2">
                <a href="#" class="text-white text-decoration-none">Cookie Policy</a>
              </li>
              <li class="mb-2"><a href="#" class="text-white text-decoration-none">Licenses</a></li>
            </ul>
          </div>
        </div>
        <div class="d-flex flex-wrap justify-content-between align-items-center py-4">
          <p class="small mb-0 opacity-50">&copy; 2026 Next Gen, Inc. All rights reserved.</p>
          <div class="d-flex gap-4">
            <a href="#" class="text-white opacity-75"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="text-white opacity-75"><i class="bi bi-github"></i></a>
            <a href="#" class="text-white opacity-75"><i class="bi bi-linkedin"></i></a>
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

const isScrolled = ref(false)
const heroAnimation = ref(null)

let scrollHandler

onMounted(() => {
  scrollHandler = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', scrollHandler)

  // Intersection Observer for scroll reveal
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.reveal-scroll').forEach((el) => observer.observe(el))

  // Load Lottie animation
  if (heroAnimation.value) {
    lottie.loadAnimation({
      container: heroAnimation.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets.lottiefiles.com/packages/lf20_1pxqjqps.json',
    })
  }
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<style scoped>
.landing-page {
  background-color: #fff;
  min-height: 100vh;
  padding-top: 80px;
}

.logo-img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
}

.navbar-brand span {
  letter-spacing: -0.5px;
}

.custom-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1030;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.9) !important;
  transition: all 0.3s ease;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.custom-navbar.scrolled {
  background-color: rgba(0, 0, 0, 0.95) !important;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}

.custom-navbar.scrolled .nav-link {
  color: #fff !important;
}

.custom-navbar.scrolled .nav-link:hover {
  border-bottom: 2px solid #fff;
}

.custom-navbar.scrolled .navbar-brand {
  color: #fff !important;
}

.custom-navbar.scrolled .navbar-brand span {
  color: #fff !important;
}

.nav-link {
  color: #1f2937 !important;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s ease;
}

.nav-link:hover {
  color: #000;
  border-bottom: 2px solid #000;
}

.custom-navbar .btn {
  background: transparent;
  border: none;
  color: #1f2937;
  font-weight: 600;
}

.custom-navbar .btn:hover {
  background: #000;
  color: #fff;
}

.custom-navbar.scrolled .btn {
  color: #fff;
}

.custom-navbar.scrolled .btn:hover {
  background: #fff;
  color: #000;
}

.display-1 {
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 1.1;
  letter-spacing: -2px;
}

.lead {
  font-size: 1.25rem;
  line-height: 1.6;
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

.hero-logo {
  position: absolute;
  bottom: 50%;
  left: 99%;
  transform: translateX(-50%);
  width: 80px;
  height: auto;
  z-index: 5;
  animation: float 4s ease-in-out infinite;
}

.hero-youtube-logo {
  position: absolute;
  top: -5%;
  right: 99%;
  width: 60px;
  height: 60px;
  z-index: 6;
  border-radius: 50%;
  object-fit: cover;
  animation: float 5s ease-in-out infinite;
}

.hero-lottie {
  position: relative;
  z-index: 2;
  box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: block;
  margin: 0 auto;
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
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

/* Entrance Animations */
.reveal-entrance {
  opacity: 0;
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--delay, 0s);
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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

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

/* New Section Styles */
.bg-light-soft {
  background-color: #f8f9fa;
}

.badge-pill {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #e7f0ff;
  color: #0d6efd;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
}

.stat-card {
  padding: 2.5rem 1.5rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  height: 100%;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.151);
}

.stat-icon-bg {
  width: 48px;
  height: 48px;
  background: #000;
  color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 1.25rem;
}

.x-small {
  font-size: 0.75rem;
}

.feature-card {
  padding: 2.5rem;
  border: 1px solid #f1f3f5;
  border-radius: 1.5rem;
  background: #fff;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: #dee2e6;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.121);
}

.feature-icon-box {
  width: 48px;
  height: 48px;
  background: #f8f9fa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #212529;
  transition: all 0.3s ease;
}

.transition-transform {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.transition-all {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn.transition-all:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Customers & Pricing Additional Styles */
.testimonial-card {
  padding: 3rem 2rem;
  background: white;
  border-radius: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.testimonial-card:hover {
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
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

.popular-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: #fff;
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 800;
}

.question-card {
  padding: 2.5rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  height: 100%;
  text-align: left;
  transition: transform 0.3s ease;
}

.question-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

html {
  scroll-behavior: smooth;
}

/* CTA & Footer Styles */
.footer-logo {
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 10px;
}

.footer-section {
  background-color: #0d1117;
}

.footer-section a:hover {
  opacity: 1 !important;
  color: #fff !important;
}

.cta-section {
  background-color: #000 !important;
}

.cta-section .display-4 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: -1.5px;
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
  border-color: #0d6efd;
}

.team-social a {
  transition: color 0.3s ease;
}

.team-social a:hover {
  color: #0d6efd !important;
}
</style>
