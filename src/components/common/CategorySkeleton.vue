<template>
    <div class="category-skeleton-list">
        <div class="header-skeleton mb-3"></div>
        <div v-for="n in 5" :key="n" class="category-item-skeleton">
            <div class="icon-skeleton"></div>
            <div class="text-skeleton"></div>
        </div>
    </div>
</template>

<style scoped>
.category-skeleton-list {
    padding: 10px 0;
}

.header-skeleton {
    width: 100px;
    height: 20px;
    background: linear-gradient(90deg, var(--color-border) 25%, var(--color-hover) 50%, var(--color-border) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.category-item-skeleton {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 14px;
}

.icon-skeleton {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: linear-gradient(90deg, var(--color-border) 25%, var(--color-hover) 50%, var(--color-border) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
}

.text-skeleton {
    flex: 1;
    height: 16px;
    background: linear-gradient(90deg, var(--color-border) 25%, var(--color-hover) 50%, var(--color-border) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}
</style>
