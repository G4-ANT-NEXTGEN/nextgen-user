<template>
  <div class="grid-hero-wrapper">
    <!-- Grid Background -->
    <div class="grid-pattern"></div>

    <!-- Large Background Glows -->
    <div class="glow-blob glow-1"></div>
    <div class="glow-blob glow-2"></div>

    <!-- SVG Connections -->
    <svg class="connections-svg" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <!-- Left side connections -->
      <path d="M 12 50 Q 10 60 12 68" class="dash-line line-1" />
      <path d="M 12 68 Q 15 80 20 78" class="dash-line line-2" />

      <!-- Right side connections -->
      <path d="M 88 48 Q 92 60 88 70" class="dash-line line-3" />
      <path d="M 88 70 Q 84 85 78 82" class="dash-line line-4" />

      <!-- Center connections -->
      <path d="M 50 15 L 50 25" class="dash-line line-center" stroke-opacity="0.2" />
    </svg>

    <!-- Floating Content Elements -->
    <div class="floating-container">
      <!-- Left side -->
      <div class="float-item item-x" style="left: 12%; top: 48%;">
        <div class="message-bubble top reveal-up">We mentioned your business on X</div>
        <div class="icon-circle twitter reveal-scale">
          <Twitter :size="20" />
        </div>
      </div>

      <div class="float-item item-logo" style="left: 10%; top: 68%;">
        <div class="logo-hexagon reveal-scale">
          <img src="/logo.jpg" alt="Logo" />
        </div>
      </div>

      <div class="float-item item-percent" style="left: 20%; top: 78%;">
        <div class="icon-circle percent reveal-scale">
          <div class="percent-sign">%</div>
        </div>
      </div>

      <!-- Right side -->
      <div class="float-item item-fb" style="right: 12%; top: 45%;">
        <div class="message-bubble top reveal-up">Success on Facebook</div>
        <div class="icon-circle facebook reveal-scale">
          <Facebook :size="20" />
        </div>
      </div>

      <div class="float-item item-insta" style="right: 15%; top: 70%;">
        <div class="icon-circle instagram reveal-scale">
          <Instagram :size="20" />
        </div>
      </div>

      <div class="float-item item-chat-dots" style="right: 25%; top: 62%;">
        <div class="icon-circle chat reveal-scale">
          <div class="chat-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Hero Content -->
    <div class="hero-main-content">
      <div class="badge-premium reveal-up">
        <div class="badge-icon">⭐</div>
        <span>No.1 Community Platform for Developer</span>
      </div>

      <h1 class="hero-title reveal-up">
        The only <span class="text-highlight">community space</span><br />
        you'll ever need
      </h1>

      <p class="hero-subtitle reveal-up">
        Connect with your audience, share your passion, and grow your community with
        our all-in-one platform designed for the next generation.
      </p>

      <div class="hero-actions reveal-up">
        <RouterLink to="/register" class="btn-get-started">Get started</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { Twitter, Facebook, Instagram } from 'lucide-vue-next';
</script>

<style scoped>
.grid-hero-wrapper {
  position: relative;
  width: 100%;
  min-height: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #fafafa;
}

[data-theme="dark"] .grid-hero-wrapper {
  background-color: #0c0c0e;
}

/* Grid Pattern */
.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 80px 80px;
  background-position: center center;
  mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
  z-index: 1;
}

[data-theme="dark"] .grid-pattern {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}

/* Glow Blobs */
.glow-blob {
  position: absolute;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.2;
  z-index: 0;
}

.glow-1 {
  background: radial-gradient(circle, #818cf8, transparent 70%);
  top: -200px;
  left: -200px;
}

.glow-2 {
  background: radial-gradient(circle, #f472b6, transparent 70%);
  bottom: -200px;
  right: -200px;
}

/* SVG Connections */
.connections-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.dash-line {
  stroke: rgba(0, 0, 0, 0.1);
  stroke-width: 1.5;
  stroke-dasharray: 5 5;
  fill: none;
  animation: dashMove 20s linear infinite;
}

[data-theme="dark"] .dash-line {
  stroke: rgba(255, 255, 255, 0.08);
}

@keyframes dashMove {
  from {
    stroke-dashoffset: 200;
  }

  to {
    stroke-dashoffset: 0;
  }
}

/* Floating Container */
.floating-container {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.float-item {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: float 8s ease-in-out infinite;
  pointer-events: auto;
}

.item-x {
  animation-delay: 0s;
}

.item-logo {
  animation-delay: 1s;
}

.item-percent {
  animation-delay: 2s;
}

.item-fb {
  animation-delay: 0.5s;
}

.item-insta {
  animation-delay: 1.5s;
}

.item-chat-dots {
  animation-delay: 2.5s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) translateX(0);
  }

  50% {
    transform: translateY(-20px) translateX(8px);
  }
}

/* Icon Circles & Bubbles */
.icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}

[data-theme="dark"] .icon-circle {
  background: #1a1a1c;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.icon-circle:hover {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.twitter {
  color: #1DA1F2;
}

.facebook {
  color: #1877F2;
}

.instagram {
  color: #E4405F;
}

.chat {
  color: #94a3b8;
}

.percent {
  color: #64748b;
  font-weight: 800;
}

.percent-sign {
  font-size: 1.2rem;
}

.chat-dots {
  display: flex;
  gap: 3px;
}

.chat-dots span {
  width: 4px;
  height: 4px;
  background: currentColor;
  border-radius: 50%;
}

.logo-hexagon {
  width: 85px;
  height: 85px;
  background: white;
  border-radius: 22px;
  padding: 14px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

[data-theme="dark"] .logo-hexagon {
  background: #1a1a1c;
}

.logo-hexagon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.message-bubble {
  position: absolute;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.4);
  z-index: 10;
  color: #1f2937;
  transition: transform 0.3s ease;
}

[data-theme="dark"] .message-bubble {
  background: rgba(26, 26, 28, 0.8);
  border-color: rgba(255, 255, 255, 0.08);
  color: #f3f4f6;
}

.float-item:hover .message-bubble {
  transform: translateY(-5px) scale(1.05);
}

.message-bubble.top {
  bottom: calc(100% + 15px);
}

/* Main Content */
.hero-main-content {
  position: relative;
  z-index: 10;
  max-width: 850px;
  text-align: center;
  padding: 0 24px;
}

.badge-premium {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: white;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.02);
  margin-bottom: 35px;
  font-size: 15px;
  font-weight: 700;
  color: #4b5563;
}

[data-theme="dark"] .badge-premium {
  background: #1a1a1c;
  color: #d1d5db;
}

.hero-title {
  font-size: 5rem;
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -3px;
  color: #111827;
  margin-bottom: 30px;
}

[data-theme="dark"] .hero-title {
  color: #f9fafb;
}

.text-highlight {
  background: linear-gradient(135deg, #f43f5e, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.35rem;
  color: #4b5563;
  line-height: 1.6;
  max-width: 640px;
  margin: 0 auto 45px;
}

[data-theme="dark"] .hero-subtitle {
  color: #9ca3af;
}

.btn-get-started {
  display: inline-block;
  background: var(--color-text);
  color: var(--color-background);
  padding: 18px 42px;
  border-radius: 14px;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 12px 25px rgba(99, 102, 241, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

/* Animation utilities - these should be inherited if available,
   but adding them here ensures the component is self-contained */
.reveal-up {
  opacity: 1;
  /* In desktop, we let the parent observer handle it */
}

.reveal-scale {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
    letter-spacing: -2px;
  }

  .floating-container,
  .connections-svg {
    display: none;
  }

  .grid-hero-wrapper {
    min-height: 650px;
    padding-top: 80px;
  }
}
</style>
