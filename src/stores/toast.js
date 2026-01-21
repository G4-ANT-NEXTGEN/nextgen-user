import { defineStore } from 'pinia'

const TOAST_DURATION = 3000

export const useToastStore = defineStore('toast', {
    state: () => ({
        show: false,
        message: '',
        type: 'success',
        duration: TOAST_DURATION,
        timeoutId: null,
    }),

    actions: {
        open(message, type = 'success', duration = TOAST_DURATION) {
            // Clear existing timeout if any
            if (this.timeoutId) {
                clearTimeout(this.timeoutId)
            }

            this.message = message
            this.type = type
            this.duration = duration
            this.show = true

            // Auto-hide after duration
            this.timeoutId = setTimeout(() => {
                this.close()
            }, duration)
        },

        close() {
            this.show = false
            if (this.timeoutId) {
                clearTimeout(this.timeoutId)
                this.timeoutId = null
            }
        },

        success(message, duration = TOAST_DURATION) {
            this.open(message, 'success', duration)
        },

        error(message, duration = TOAST_DURATION) {
            this.open(message, 'error', duration)
        },
    },

})
