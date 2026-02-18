import { toast } from "vue3-toastify";

const baseOptions = {
    toastClassName: "my-toast",
    bodyClassName: "my-toast-body",
    progressClassName: "my-progress",
    transition: "slide",
    autoClose: 3000,
    closeButton: true,
    hideProgressBar: true,
};

export const showSuccess = (message) =>
    toast.success(message, {
        ...baseOptions,
    });

export const showError = (message) =>
    toast.error(message, {
        ...baseOptions,
    });

export const showWarning = (message) =>
    toast.warning(message, {
        ...baseOptions,
    });

export const showInfo = (message) =>
    toast.info(message, {
        ...baseOptions,
    });
