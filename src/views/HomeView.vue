<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container-fluid px-4">
            <div class="d-flex align-items-center gap-4">
                <div class="d-flex align-items-center gap-2">
                    <div class="logo-box">
                        <div class="logo-inner"></div>
                    </div>
                    <span class="fs-5 fw-bold">WeShare</span>
                </div>
                <div class="position-relative ms-4">
                    <i class="bi bi-search search-icon"></i>
                    <input type="text" class="form-control search-box" placeholder="Search" style="width: 420px;">
                </div>
            </div>
            <div class="d-flex align-items-center gap-3">
                <i class="bi bi-bell fs-5 icon-btn" style="color: var(--color-muted);"></i>
                <i class="bi bi-bookmark fs-5 icon-btn" style="color: var(--color-muted);"></i>
                <div class="d-flex align-items-center gap-2" style="cursor: pointer;">
                    <div class="small-avatar"></div>
                    <span class="fw-semibold">Jakob Botosh</span>
                </div>
            </div>
        </div>
    </nav>

    <div class="container-fluid px-4 py-4 container-wrapper">
        <div class="row g-4">
            <!-- Left Sidebar -->
            <div class="sidebar-left">
                <div class="sidebar-content">
                    <!-- Profile Card -->
                    <div class="card-custom mb-3">
                        <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="avatar"></div>
                            <div>
                                <h6 class="mb-0 fw-bold">
                                    Jakob Botosh
                                    <i class="bi bi-check-circle-fill text-primary-custom"></i>
                                </h6>
                                <small style="color: var(--color-muted);">@jakobotosh</small>
                            </div>
                        </div>
                        <div class="row text-center profile-stats">
                            <div class="col-4">
                                <div class="fw-bold fs-5">2.3k</div>
                                <small style="color: var(--color-muted);">Follower</small>
                            </div>
                            <div class="col-4">
                                <div class="fw-bold fs-5">235</div>
                                <small style="color: var(--color-muted);">Following</small>
                            </div>
                            <div class="col-4">
                                <div class="fw-bold fs-5">80</div>
                                <small style="color: var(--color-muted);">Post</small>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Menu -->
                    <div class="nav-menu mb-3">
                        <a href="#" class="nav-item active">
                            <i class="bi bi-house-door-fill"></i>
                            <span>Feed</span>
                        </a>
                        <a href="#" class="nav-item">
                            <i class="bi bi-people-fill"></i>
                            <span>Friends</span>
                        </a>
                        <a href="#" class="nav-item position-relative">
                            <i class="bi bi-calendar-event"></i>
                            <span>Event</span>
                            <span class="badge bg-danger badge-custom">1</span>
                        </a>
                        <a href="#" class="nav-item">
                            <i class="bi bi-play-circle-fill"></i>
                            <span>Watch Videos</span>
                        </a>
                        <a href="#" class="nav-item">
                            <i class="bi bi-image-fill"></i>
                            <span>Photos</span>
                        </a>
                        <a href="#" class="nav-item">
                            <i class="bi bi-shop"></i>
                            <span>Marketplace</span>
                        </a>
                        <a href="#" class="nav-item position-relative">
                            <i class="bi bi-file-earmark-text"></i>
                            <span>Files</span>
                            <span class="badge badge-custom" style="background-color: #8b5cf6;">7</span>
                        </a>
                    </div>

                    <!-- Pages You Like -->
                    <div class="card-custom">
                        <h6 class="fw-bold mb-3" style="color: var(--color-muted); letter-spacing: 0.5px;">PAGES YOU
                            LIKE</h6>
                        <div class="page-item-custom">
                            <div class="page-icon"
                                style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">UI</div>
                            <span class="fw-medium">UI/UX Community</span>
                        </div>
                        <div class="page-item-custom">
                            <div class="page-icon"
                                style="background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%);">WD</div>
                            <span class="fw-medium">Web Designer</span>
                        </div>
                        <div class="page-item-custom">
                            <div class="page-icon"
                                style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);">D</div>
                            <span class="fw-medium">Dribbble Community</span>
                        </div>
                        <div class="page-item-custom">
                            <div class="page-icon"
                                style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);">B</div>
                            <span class="fw-medium">Behance <i class="bi bi-patch-check-fill text-primary-custom"
                                    style="font-size: 12px;"></i></span>
                        </div>
                        <a href="#" class="link-custom small mt-2 d-inline-block">View All</a>
                    </div>
                </div>
            </div>

            <!-- Main Feed -->
            <div class="col-lg-6 main-feed">
                <!-- Stories -->
                <div class="post-card mb-3">
                    <div class="d-flex gap-4 overflow-auto pb-2">
                        <div class="story-item">
                            <div class="story-avatar active">👤</div>
                            <small class="fw-medium">Your Story</small>
                        </div>
                        <div class="story-item">
                            <div class="story-avatar">👨</div>
                            <small class="fw-medium">Justin</small>
                        </div>
                        <div class="story-item">
                            <div class="story-avatar">👱</div>
                            <small class="fw-medium">Davis</small>
                        </div>
                        <div class="story-item">
                            <div class="story-avatar">👨‍💼</div>
                            <small class="fw-medium">Randy</small>
                        </div>
                        <div class="story-item">
                            <div class="story-avatar">👔</div>
                            <small class="fw-medium">Charles</small>
                        </div>
                        <div class="story-item">
                            <div class="story-avatar">👩</div>
                            <small class="fw-medium">Zana</small>
                        </div>
                        <div class="story-item">
                            <div class="story-avatar">🧑</div>
                            <small class="fw-medium">Talan</small>
                        </div>
                    </div>
                </div>

                <!-- Create Post -->
                <div class="post-card mb-3">
                    <div class="d-flex gap-3 mb-3">
                        <div class="small-avatar"></div>
                        <input type="text" class="form-control create-post-input" placeholder="What's on your mind?">
                    </div>
                    <div class="d-flex flex-wrap gap-2">
                        <button class="btn btn-sm btn-light-custom d-flex align-items-center gap-2">
                            <i class="bi bi-image text-primary-custom"></i>
                            <span>Image/Video</span>
                        </button>
                        <button class="btn btn-sm btn-light-custom d-flex align-items-center gap-2">
                            <i class="bi bi-paperclip" style="color: #8b5cf6;"></i>
                            <span>Attachment</span>
                        </button>
                        <button class="btn btn-sm btn-light-custom d-flex align-items-center gap-2">
                            <i class="bi bi-camera-video text-danger"></i>
                            <span>Live</span>
                        </button>
                        <button class="btn btn-sm btn-light-custom d-flex align-items-center gap-2">
                            <span class="text-success fw-bold">#</span>
                            <span>Hashtag</span>
                        </button>
                        <button class="btn btn-sm btn-light-custom d-flex align-items-center gap-2">
                            <span class="fw-bold" style="color: #ec4899;">@</span>
                            <span>Mention</span>
                        </button>
                    </div>
                </div>

                <!-- Post -->
                <div class="post-card">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="small-avatar"></div>
                            <div>
                                <h6 class="mb-0 fw-bold">Cameron Williamson</h6>
                                <small style="color: var(--color-muted);">14 Aug at 4:21 PM</small>
                            </div>
                        </div>
                        <i class="bi bi-three-dots icon-btn" style="color: var(--color-muted);"></i>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-6">
                            <div class="post-image bg-yellow">🎧</div>
                        </div>
                        <div class="col-6">
                            <div class="post-image bg-gray">🎸</div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center pt-3 divider">
                        <button class="btn-post-action d-flex align-items-center gap-2">
                            <i class="bi bi-heart"></i>
                            <span>30 Like</span>
                        </button>
                        <button class="btn-post-action d-flex align-items-center gap-2">
                            <i class="bi bi-chat"></i>
                            <span>12 Comment</span>
                        </button>
                        <button class="btn-post-action d-flex align-items-center gap-2">
                            <i class="bi bi-share"></i>
                            <span>3 Share</span>
                        </button>
                        <i class="bi bi-bookmark icon-btn" style="color: var(--color-muted);"></i>
                    </div>
                </div>
            </div>

            <!-- Right Sidebar -->
            <div class="col-lg-3 sidebar-right">
                <div class="sidebar-content">
                    <!-- Messages -->
                    <div class="card-custom mb-3">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fw-bold mb-0">Messages</h6>
                            <i class="bi bi-plus-lg icon-btn"></i>
                        </div>
                        <div class="position-relative mb-3">
                            <i class="bi bi-search position-absolute"
                                style="left: 12px; top: 50%; transform: translateY(-50%); color: var(--color-muted);"></i>
                            <input type="text" class="form-control"
                                style="padding-left: 38px; background-color: var(--color-secondary); border: 1px solid var(--color-border); border-radius: 10px;"
                                placeholder="Search">
                            <i class="bi bi-funnel position-absolute icon-btn"
                                style="right: 8px; top: 50%; transform: translateY(-50%); color: var(--color-muted);"></i>
                        </div>
                        <div class="d-flex gap-2 mb-3">
                            <button class="tab-filter active">Primary</button>
                            <button class="tab-filter">General</button>
                            <button class="tab-filter">Requests(4)</button>
                        </div>

                        <div class="message-item mb-2">
                            <div class="position-relative">
                                <div class="small-avatar"></div>
                                <div class="online-indicator"></div>
                            </div>
                            <small class="fw-medium">Roger Korsgaard</small>
                        </div>
                        <div class="message-item mb-2">
                            <div class="position-relative">
                                <div class="small-avatar"></div>
                            </div>
                            <small class="fw-medium">Terry Torff</small>
                        </div>
                        <div class="message-item mb-2">
                            <div class="position-relative">
                                <div class="small-avatar"></div>
                                <div class="online-indicator"></div>
                            </div>
                            <small class="fw-medium">Angel Bergson</small>
                        </div>
                        <div class="message-item mb-2">
                            <div class="position-relative">
                                <div class="small-avatar"></div>
                            </div>
                            <small class="fw-medium">Emerson Gouse</small>
                        </div>
                        <div class="message-item mb-2">
                            <div class="position-relative">
                                <div class="small-avatar"></div>
                                <div class="online-indicator"></div>
                            </div>
                            <small class="fw-medium">Corey Baptista</small>
                        </div>
                        <div class="message-item mb-2">
                            <div class="position-relative">
                                <div class="small-avatar"></div>
                            </div>
                            <small class="fw-medium">Zain Culhane</small>
                        </div>
                        <div class="message-item mb-2">
                            <div class="position-relative">
                                <div class="small-avatar"></div>
                                <div class="online-indicator"></div>
                            </div>
                            <small class="fw-medium">Randy Lipshulz</small>
                        </div>
                        <a href="#" class="link-custom small d-block text-center mt-3">View All</a>
                    </div>

                    <!-- Events -->
                    <div class="card-custom">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fw-bold mb-0">Events</h6>
                            <i class="bi bi-three-dots icon-btn"></i>
                        </div>
                        <div class="event-item">
                            <i class="bi bi-calendar3 fs-2" style="color: var(--color-muted);"></i>
                            <div>
                                <small class="fw-semibold d-block">10 Events Invites</small>
                            </div>
                        </div>
                        <div class="event-item">
                            <i class="bi bi-calendar3 fs-2" style="color: var(--color-muted);"></i>
                            <div>
                                <small class="fw-semibold d-block">Design System Collaboration</small>
                                <small style="color: var(--color-muted);">Thu - Harpoon Mall, YK</small>
                            </div>
                        </div>
                        <div class="event-item">
                            <i class="bi bi-calendar3 fs-2" style="color: var(--color-muted);"></i>
                            <div>
                                <small class="fw-semibold d-block">Web Dev 2.0 Meetup</small>
                                <small style="color: var(--color-muted);">Yoshkar-Ola, Russia</small>
                            </div>
                        </div>
                        <div class="event-item">
                            <i class="bi bi-calendar3 fs-2" style="color: var(--color-muted);"></i>
                            <div>
                                <small class="fw-semibold d-block">Prada's Invitation Birthday</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { usePostStore } from '@/stores/post';
import moment from 'moment-timezone';

const authStore = useAuthStore();
const postStore = usePostStore();

const formatDate = (date) => {
    return moment.utc(date).local().fromNow();
}

authStore.fetchProfile();
postStore.fetchPosts();

</script>

<style scoped>
:root {
    --color-text: #030307;
    --color-background: #f5f5f5;
    --color-primary: #0a0a0a;
    --color-secondary: #f1f4f8;
    --color-accent: #fdfaff;
    --color-border: #e0e0e0;
    --color-hover: #eaeaea;
    --color-muted: #6b6b6b;
    --color-blue: #2563eb;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--color-background);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    color: var(--color-text);
    line-height: 1.6;
}

.navbar {
    background-color: var(--color-accent);
    border-bottom: 1px solid var(--color-border);
    padding: 16px 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.logo-box {
    width: 40px;
    height: 40px;
    background-color: var(--color-primary);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(10, 10, 10, 0.15);
}

.logo-inner {
    width: 24px;
    height: 24px;
    background-color: white;
    transform: rotate(45deg);
    border-radius: 2px;
}

.search-box {
    background-color: var(--color-secondary);
    border: 1px solid var(--color-border);
    border-radius: 10px;
    padding: 10px 16px 10px 42px;
    transition: all 0.3s ease;
}

.search-box:focus {
    outline: none;
    border-color: var(--color-primary);
    background-color: white;
    box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.05);
}

.search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-muted);
}

.card-custom {
    background: var(--color-accent);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.3s ease;
}

.card-custom:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-menu {
    background: var(--color-accent);
    border-radius: 16px;
    padding: 16px;
    border: 1px solid var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 6px;
    text-decoration: none;
    color: var(--color-text);
    font-weight: 500;
}

.nav-item:hover {
    background-color: var(--color-hover);
    transform: translateX(4px);
}

.nav-item.active {
    background-color: var(--color-primary);
    color: white;
    box-shadow: 0 2px 8px rgba(10, 10, 10, 0.2);
}

.badge-custom {
    position: absolute;
    right: 16px;
    width: 22px;
    height: 22px;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.story-item {
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.story-item:hover {
    transform: translateY(-4px);
}

.story-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 3px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
    margin: 0 auto 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
}

.story-avatar.active {
    border-color: var(--color-blue);
    border-width: 3px;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.post-card {
    background: var(--color-accent);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
    border: 1px solid var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.3s ease;
}

.post-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.post-image {
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.post-image:hover {
    transform: scale(1.02);
}

.bg-yellow {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.bg-gray {
    background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
}

.message-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.message-item:hover {
    background-color: var(--color-hover);
    transform: translateX(4px);
}

.online-indicator {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    background-color: #10b981;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.page-item-custom {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 8px;
    transition: all 0.2s ease;
}

.page-item-custom:hover {
    background-color: var(--color-hover);
    transform: translateX(4px);
}

.page-icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.event-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.2s ease;
    border: 1px solid transparent;
}

.event-item:hover {
    background-color: var(--color-hover);
    border-color: var(--color-border);
}

.btn-post-action {
    border: none;
    background: none;
    color: var(--color-muted);
    transition: all 0.2s ease;
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: 500;
}

.btn-post-action:hover {
    color: var(--color-primary);
    background-color: var(--color-hover);
}

.create-post-input {
    background-color: var(--color-secondary);
    border: 1px solid var(--color-border);
    border-radius: 24px;
    padding: 10px 20px;
    transition: all 0.3s ease;
}

.create-post-input:focus {
    outline: none;
    border-color: var(--color-primary);
    background-color: white;
    box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.05);
}

.tab-filter {
    border: none;
    background: none;
    padding: 10px 16px;
    color: var(--color-muted);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    border-radius: 8px;
}

.tab-filter:hover {
    background-color: var(--color-hover);
}

.tab-filter.active {
    color: var(--color-primary);
    background-color: var(--color-hover);
    font-weight: 600;
}

.small-avatar {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #a8a8a8 0%, #c0c0c0 100%);
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.icon-btn {
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 8px;
    border-radius: 8px;
}

.icon-btn:hover {
    background-color: var(--color-hover);
    transform: scale(1.1);
}

.btn-light-custom {
    background-color: var(--color-secondary);
    border: 1px solid var(--color-border);
    transition: all 0.2s ease;
    font-weight: 500;
}

.btn-light-custom:hover {
    background-color: var(--color-hover);
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.profile-stats {
    border-top: 1px solid var(--color-border);
    padding-top: 16px;
    margin-top: 16px;
}

.text-primary-custom {
    color: var(--color-blue) !important;
}

.link-custom {
    color: var(--color-blue);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
}

.link-custom:hover {
    color: var(--color-primary);
}

.divider {
    border-top: 1px solid var(--color-border);
}

/* Facebook-style Scrolling */
.container-wrapper {
    position: relative;
}

.sidebar-left,
.sidebar-right {
    position: fixed;
    top: 88px;

    height: calc(100vh - 88px);
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 20px;
}

.sidebar-left {
    width: 350px;
    left: 0;
}

.sidebar-right {
    width: 350px;
    right: 0;

}

@media (max-width: 1399px) {
    .sidebar-left {
        width: calc((100% - 960px) / 2 + 240px);
        padding-left: calc((100% - 960px) / 2);
    }

    .sidebar-right {
        width: calc((100% - 960px) / 2 + 240px);
        padding-right: calc((100% - 960px) / 2);
    }
}

@media (max-width: 1199px) {

    .sidebar-left,
    .sidebar-right {
        position: relative;
        top: 0;
        height: auto;
        width: 100%;
        padding-left: 0;
        padding-right: 0;
    }
}

/* Sidebar base */
.sidebar-left,
.sidebar-right {
    overflow-y: auto;

    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
}

/* Firefox – show on hover */
.sidebar-left:hover,
.sidebar-right:hover {
    scrollbar-color: rgba(0, 0, 0, 0.35) transparent;
}

/* ===== Chrome / Edge / Safari ===== */
.sidebar-left::-webkit-scrollbar,
.sidebar-right::-webkit-scrollbar {
    width: 8px;
}

.sidebar-left::-webkit-scrollbar-track,
.sidebar-right::-webkit-scrollbar-track {
    background: transparent;
}

.sidebar-left::-webkit-scrollbar-thumb,
.sidebar-right::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* hidden by default */
    border-radius: 10px;
    transition: background-color 0.25s ease;
}

/* Show scrollbar when hovering sidebar */
.sidebar-left:hover::-webkit-scrollbar-thumb,
.sidebar-right:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.25);
}

/* Darker when hovering thumb */
.sidebar-left::-webkit-scrollbar-thumb:hover,
.sidebar-right::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
}

/* Darkest when dragging */
.sidebar-left::-webkit-scrollbar-thumb:active,
.sidebar-right::-webkit-scrollbar-thumb:active {
    background-color: rgba(0, 0, 0, 0.6);
}


.main-feed {
    margin-bottom: 40px;
    margin-top: 80px;
    margin-inline: auto;
}

.sidebar-content {
    padding-right: 12px;
    width: 100%;
}
</style>
