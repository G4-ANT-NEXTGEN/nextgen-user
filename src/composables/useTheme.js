import { ref, watch } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

export function useTheme() {
    const setTheme = (value) => {
        theme.value = value
        document.documentElement.setAttribute('data-theme', value)
        localStorage.setItem('theme', value)
    }

    const toggleTheme = () => {
        setTheme(theme.value === 'light' ? 'dark' : 'light')
    }

    // apply on load
    watch(
        theme,
        (value) => setTheme(value),
        { immediate: true }
    )

    return {
        theme,
        toggleTheme,
        setTheme
    }
}
