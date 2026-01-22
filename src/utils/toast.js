// utils / toast.js
import { toast } from "vue3-toastify";

const baseOptions = {
    toastClassName: "my-toast",
    bodyClassName: "my-toast-body",
    progressClassName: "my-progress"
};

export const showSuccess = (message) =>
    toast.success(message, {
        ...baseOptions,
        icon: "✅"
    });

export const showError = (message) =>
    toast.error(message, {
        ...baseOptions,
        icon: "❌"
    });

export const showWarning = (message) =>
    toast.warning(message, {
        ...baseOptions,
        icon: "⚠️"
    });

export const showInfo = (message) =>
    toast.info(message, {
        ...baseOptions,
        icon: "ℹ️"
    });
