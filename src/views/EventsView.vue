<template>
    <MainLayout>
        <div class="events-page">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 class="fw-bold mb-1">Upcoming Events</h2>
                    <p class="text-muted small">Stay connected with your community through live events.</p>
                </div>
                <button class="btn btn-primary rounded-pill px-4 btn-sm">
                    <i class="bi bi-plus-lg me-2"></i>Create Event
                </button>
            </div>

            <div class="row g-3">
                <div v-for="n in 6" :key="n" class="col-md-12 col-xl-6">
                    <div class="card-custom h-100 event-card">
                        <div class="event-image-wrapper">
                            <img :src="`https://picsum.photos/seed/${n + 10}/800/450`" alt="Event cover"
                                class="event-image">
                            <div class="event-date-badge">
                                <span class="day">{{ 10 + n }}</span>
                                <span class="month">JAN</span>
                            </div>
                        </div>
                        <div class="p-3">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <span class="badge bg-primary-soft text-primary">Workshop</span>
                                <span class="text-muted small"><i class="bi bi-clock me-1"></i>10:00 AM</span>
                            </div>
                            <h6 class="fw-bold mb-2">Modern UI Design Trends 2026</h6>
                            <div class="d-flex align-items-center justify-content-between pt-2 border-top mt-3">
                                <div class="avatar-group">
                                    <img v-for="i in 3" :key="i" :src="`https://i.pravatar.cc/150?u=${i + n}`"
                                        alt="Attendee">
                                    <div class="avatar-more">+{{ 12 + n }}</div>
                                </div>
                                <button class="btn btn-outline-dark btn-sm rounded-pill px-3">Interested</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/layout/MainLayout.vue';
</script>

<style scoped>
.events-page {
    padding: 0;
}

.event-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    border: 1px solid var(--color-border);
}

.event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.event-image-wrapper {
    position: relative;
    height: 180px;
    overflow: hidden;
}

.event-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.event-date-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    background: var(--color-accent);
    padding: 6px 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: var(--shadow-sm);
}

.event-date-badge .day {
    font-weight: 800;
    font-size: 1.1rem;
    line-height: 1;
}

.event-date-badge .month {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--color-primary);
}

.bg-primary-soft {
    background-color: rgba(37, 99, 235, 0.1);
}

.avatar-group {
    display: flex;
    align-items: center;
}

.avatar-group img,
.avatar-more {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid var(--color-accent);
    margin-left: -10px;
}

.avatar-group img:first-child {
    margin-left: 0;
}

.avatar-more {
    background: var(--color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--color-muted);
}

.btn-primary {
    background-color: var(--color-primary);
    border: none;
}
</style>
