<template>
    <div class="landing-page">
        <!-- Navbar -->
        <nav
            :class="['navbar', 'navbar-expand-lg', 'navbar-light', 'border-bottom', 'py-3', 'custom-navbar', { 'scrolled': isScrolled }]">
            <div class="container px-4">
                <RouterLink to="/" class="navbar-brand d-flex align-items-center">
                    <img src="/logo.jpg" alt="Next Gen Logo" class="logo-img me-2" />
                    <span class="fw-bold fs-4">Next Gen</span>
                </RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
                            <a class="nav-link" href="#pricing">Pricing</a>
                        </li>
                    </ul>
                    <div class="d-flex align-items-center gap-3">
                        <a href="#" class="nav-link fw-semibold">Log In</a>
                        <button class="btn btn-dark px-4 py-2 rounded-3 fw-semibold">Sign Up Free</button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <header class="hero-section py-5 mt-lg-5">
            <div class="container px-4">
                <div class="row align-items-center gy-5">
                    <div class="col-lg-6">
                        <div class="hero-content">
                            <h1 class="display-1 fw-bold mb-4">Join Our Community Today</h1>
                            <p class="lead text-muted mb-5 pe-lg-5">
                                Start connecting with people who matter. Create your free account and discover what
                                makes our platform special.
                            </p>
                            <div class="d-flex flex-wrap gap-3">
                                <button
                                    class="btn btn-dark px-5 py-3 rounded-3 fw-semibold d-flex align-items-center gap-2">
                                    Get Started Free
                                    <i class="bi bi-arrow-right"></i>
                                </button>
                                <button
                                    class="btn btn-outline-secondary px-5 py-3 rounded-3 fw-semibold d-flex align-items-center gap-2">
                                    <i class="bi bi-play-circle fs-5"></i>
                                    Watch Demo
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="hero-image-wrapper">
                            <div class="hero-image-shadow"></div>
                            <!-- Using a high-quality placeholder image for demonstration -->
                            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Community members" class="img-fluid rounded-5 hero-image" />
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Key Features Section -->
        <section id="features" class="features-section py-5 px-3">
            <div class="container text-center">
                <div class="badge-pill mb-3">How It Works</div>
                <h2 class="display-5 fw-bold mb-3">Key Features</h2>
                <p class="text-muted mb-5">Discover what makes our platform stand out from the rest</p>

                <div class="row g-4 text-start">
                    <div class="col-md-4">
                        <div class="feature-card h-100">
                            <div class="feature-icon-box mb-3">
                                <i class="bi bi-people"></i>
                            </div>
                            <h5 class="fw-bold mb-3">Create & Join Communities</h5>
                            <p class="text-muted small">Build and discover communities around your interests.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card h-100">
                            <div class="feature-icon-box mb-3">
                                <i class="bi bi-chat-dots"></i>
                            </div>
                            <h5 class="fw-bold mb-3">Real-time Chat & Comments</h5>
                            <p class="text-muted small">Connect instantly with live messaging and discussions.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card h-100">
                            <div class="feature-icon-box mb-3">
                                <i class="bi bi-image"></i>
                            </div>
                            <h5 class="fw-bold mb-3">Share Photos & Stories</h5>
                            <p class="text-muted small">Capture and share your moments with the world.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card h-100">
                            <div class="feature-icon-box mb-3">
                                <i class="bi bi-bell"></i>
                            </div>
                            <h5 class="fw-bold mb-3">Smart Notifications</h5>
                            <p class="text-muted small">Stay updated with personalized, intelligent alerts.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card h-100">
                            <div class="feature-icon-box mb-3">
                                <i class="bi bi-shield-lock"></i>
                            </div>
                            <h5 class="fw-bold mb-3">Privacy & Control</h5>
                            <p class="text-muted small">Your data, your rules with advanced privacy settings.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card h-100">
                            <div class="feature-icon-box mb-3">
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
                <div class="badge-pill mb-3">How It Works</div>
                <h2 class="display-5 fw-bold mb-3">Trusted by millions worldwide</h2>
                <p class="text-muted mb-5">Join a global community of designers and creators</p>

                <div class="row g-4 pt-4">
                    <div class="col-6 col-md-3">
                        <div class="stat-card">
                            <div class="stat-icon-bg mb-3">
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <h3 class="fw-bold mb-1">5M+</h3>
                            <p class="text-muted small mb-1">Active Users</p>
                            <p class="text-secondary x-small">Designers worldwide</p>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-card">
                            <div class="stat-icon-bg mb-3">
                                <i class="bi bi-star-fill"></i>
                            </div>
                            <h3 class="fw-bold mb-1">4.9/5</h3>
                            <p class="text-muted small mb-1">User Rating</p>
                            <p class="text-secondary x-small">From 50K+ reviews</p>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-card">
                            <div class="stat-icon-bg mb-3">
                                <i class="bi bi-download"></i>
                            </div>
                            <h3 class="fw-bold mb-1">10M+</h3>
                            <p class="text-muted small mb-1">Downloads</p>
                            <p class="text-secondary x-small">Across all platforms</p>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="stat-card">
                            <div class="stat-icon-bg mb-3">
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
                <h2 class="display-5 fw-bold mb-5">Our Customers Love Us</h2>
                <div class="row g-4">
                    <div class="col-md-4">
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
                    <div class="col-md-4">
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
                    <div class="col-md-4">
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

        <!-- Pricing Section -->
        <section id="pricing" class="pricing-section py-5 bg-light-soft">
            <div class="container px-4 text-center">
                <h2 class="display-5 fw-bold mb-3">Simple, transparent pricing</h2>
                <p class="text-muted mb-5">Choose the plan that works best for you and your team.</p>

                <div class="row g-4 justify-content-center">
                    <div class="col-md-4">
                        <div class="pricing-card">
                            <h5 class="fw-bold mb-3">Basic</h5>
                            <h2 class="display-6 fw-bold mb-4">
                                $0 <span class="fs-6 fw-normal text-muted">/mo</span>
                            </h2>
                            <ul class="list-unstyled mb-5 text-start">
                                <li class="mb-3">
                                    <i class="bi bi-check2 text-success me-2"></i> Join 5 Communities
                                </li>
                                <li class="mb-3"><i class="bi bi-check2 text-success me-2"></i> Basic Support</li>
                                <li class="mb-3">
                                    <i class="bi bi-check2 text-success me-2"></i> Standard Features
                                </li>
                            </ul>
                            <button class="btn btn-outline-dark w-100 py-3 rounded-pill fw-bold">
                                Start For Free
                            </button>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="pricing-card">
                            <h5 class="fw-bold mb-3">Pro</h5>
                            <h2 class="display-6 fw-bold mb-4">
                                $30 <span class="fs-6 fw-normal text-muted">/mo</span>
                            </h2>
                            <ul class="list-unstyled mb-5 text-start">
                                <li class="mb-3">
                                    <i class="bi bi-check2 text-success me-2"></i> Unlimited Communities
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-check2 text-success me-2"></i> Priority Support
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-check2 text-success me-2"></i> Advanced Privacy Controls
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-check2 text-success me-2"></i> Early Access Features
                                </li>
                            </ul>
                            <button class="btn btn-outline-dark w-100 py-3 rounded-pill fw-bold">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="pricing-card">
                            <h5 class="fw-bold mb-3">Enterprise</h5>
                            <h2 class="display-6 fw-bold mb-4">Custom</h2>
                            <ul class="list-unstyled mb-5 text-start">
                                <li class="mb-3">
                                    <i class="bi bi-check2 text-success me-2"></i> Everything in Pro
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-check2 text-success me-2"></i> Custom Integrations
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-check2 text-success me-2"></i> Dedicated Manager
                                </li>
                            </ul>
                            <button class="btn btn-outline-dark w-100 py-3 rounded-pill fw-bold">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section py-5 bg-dark text-white text-center">
            <div class="container px-4 py-5">
                <h2 class="display-4 fw-bold mb-4">Start explore with Next Gen today</h2>
                <p class="lead mb-5 opacity-75">
                    Join millions of designers and teams. 100% free, no credit card required.
                </p>
                <div class="d-flex flex-wrap justify-content-center gap-3 mb-4">
                    <button class="btn btn-light px-5 py-3 rounded-pill fw-bold d-flex align-items-center gap-2">
                        Get Started Free <i class="bi bi-arrow-right"></i>
                    </button>
                    <button class="btn btn-outline-light px-5 py-3 rounded-pill fw-bold">Learn More</button>
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

const isScrolled = ref(false)

let scrollHandler

onMounted(() => {
    scrollHandler = () => {
        isScrolled.value = window.scrollY > 50
    }
    window.addEventListener('scroll', scrollHandler)
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

.custom-navbar.scrolled .navbar-brand {
    color: #fff !important;
}

.custom-navbar.scrolled .navbar-brand span {
    color: #fff !important;
}

.nav-link {
    color: #1f2937 !important;
    font-weight: 500;
}

.nav-link:hover {
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
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
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
}

/* Customers & Pricing Additional Styles */
.testimonial-card {
    padding: 3rem 2rem;
    background: white;
    border-radius: 2rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    height: 100%;
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

.pricing-card {
    padding: 3rem 2rem;
    background: white;
    border-radius: 2rem;
    border: 1px solid #f1f3f5;
    height: 100%;
    position: relative;
    transition: transform 0.3s ease;
}

.pricing-card:hover {
    transform: scale(1.02);
}

.pricing-card.popular {
    background: white;
    border: 2px solid #000;
    z-index: 10;
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
</style>
