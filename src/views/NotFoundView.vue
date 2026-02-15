<template>
    <div class="not-found-container">
        <div class="content-wrapper">
            <div class="glitch-wrapper">
                <h1 class="error-code">404</h1>
                <div class="error-shadow">404</div>
            </div>

            <div class="text-group">
                <h2 class="error-title">Page Not Found</h2>
                <p class="error-description">
                    Oops! The page you're looking for seems to have vanished into the digital void.
                </p>
            </div>

            <div class="action-group">
                <button class="btn-premium" @click="$router.push({ name: 'home' })">
                    <i class="bi bi-house-door-fill me-2"></i>
                    Back to Home
                </button>
                <button class="btn-outline-premium" @click="$router.go(-1)">
                    <i class="bi bi-arrow-left me-2"></i>
                    Go Back
                </button>
            </div>

            <div class="decor-circle circle-1"></div>
            <div class="decor-circle circle-2"></div>
            <div class="decor-circle circle-3"></div>
        </div>
    </div>
</template>

<script setup>
// No logic needed for static 404 page
</script>

<style scoped>
.not-found-container {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-background);
    position: relative;
    overflow: hidden;
}

.content-wrapper {
    text-align: center;
    z-index: 10;
    padding: 2rem;
    max-width: 600px;
}

.glitch-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 2rem;
}

.error-code {
    font-size: 10rem;
    font-weight: 900;
    color: var(--color-primary);
    margin: 0;
    line-height: 1;
    letter-spacing: -5px;
    position: relative;
    z-index: 2;
    text-shadow: 4px 4px 0px rgba(var(--color-primary-rgb), 0.1);
}

.error-shadow {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 10rem;
    font-weight: 900;
    color: var(--color-danger);
    opacity: 0.1;
    z-index: 1;
}

.text-group {
    margin-bottom: 3rem;
}

.error-title {
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 1rem;
}

.error-description {
    font-size: 1.1rem;
    color: var(--color-muted);
    line-height: 1.6;
}

.action-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.btn-premium {
    padding: 14px 28px;
    background: var(--btn-primary-bg);
    color: var(--btn-primary-text);
    border: none;
    border-radius: 14px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
}

.btn-premium:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
    background: var(--btn-primary-hover);
}

.btn-outline-premium {
    padding: 14px 28px;
    background: transparent;
    color: var(--color-text);
    border: 2px solid var(--color-border);
    border-radius: 14px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
}

.btn-outline-premium:hover {
    background: var(--color-surface);
    border-color: var(--color-primary);
    transform: translateY(-3px);
}

/* Decorative elements */
.decor-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    z-index: -1;
    opacity: 0.4;
}

.circle-1 {
    width: 300px;
    height: 300px;
    background: var(--color-primary);
    top: -100px;
    left: -100px;
}

.circle-2 {
    width: 400px;
    height: 400px;
    background: var(--color-danger);
    bottom: -150px;
    right: -100px;
}

.circle-3 {
    width: 200px;
    height: 200px;
    background: var(--color-primary);
    top: 50%;
    right: 10%;
    filter: blur(100px);
}

@media (max-width: 768px) {
    .error-code {
        font-size: 6rem;
    }

    .error-shadow {
        font-size: 6rem;
    }

    .action-group {
        flex-direction: column;
    }
}
</style>
