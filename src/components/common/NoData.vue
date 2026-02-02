<template>
    <article class="no-data-card">
        <!-- Icon Section -->
        <div class="no-data-icon">
            <div class="icon-background">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
            </div>
        </div>

        <!-- Content Section -->
        <div class="no-data-content">
            <h2 class="no-data-title">No Posts Found</h2>
            <p class="no-data-description">
                We couldn't find any posts matching your search criteria.
                Try adjusting your filters or search terms.
            </p>
        </div>


    </article>
</template>

<style scoped>
.no-data-card {
    background: var(--color-background);
    border-radius: 12px;
    padding: 48px 32px;
    margin-bottom: 16px;
    border: 1px solid var(--color-border);
    text-align: center;
}


/* Icon Section */
.no-data-icon {
    margin-bottom: 32px;
}

.icon-background {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background: var(--color-background);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}



.search-icon {
    width: 48px;
    height: 48px;
    color: var(--color-text);
    stroke-width: 2.5;
}

/* Content Section */
.no-data-content {
    margin-bottom: 32px;
}

.no-data-title {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 12px;
    letter-spacing: -0.3px;
}

.no-data-description {
    font-size: 15px;
    color: #6b7280;
    line-height: 1.6;
    max-width: 400px;
    margin: 0 auto;
}

/* Action Buttons */
.no-data-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
}

.action-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    outline: none;
}

.action-btn i {
    font-size: 16px;
}

.action-btn--primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.action-btn--primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.action-btn--primary:active {
    transform: translateY(0);
}

.action-btn--secondary {
    background: #f3f4f6;
    color: #4b5563;
    border: 1px solid #e5e7eb;
}

.action-btn--secondary:hover {
    background: #e5e7eb;
    border-color: #d1d5db;
}

</style>
