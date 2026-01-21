export function usePasswordValidator() {
    // Password pattern: at least 8 characters, with letters and numbers
    const PASSWORD_PATTERN = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/

    const validatePassword = (password) => {
        if (!password) {
            return { isValid: false, message: 'Password is required' }
        }
        if (password.length < 8) {
            return { isValid: false, message: 'Password must be at least 8 characters' }
        }
        if (!/[a-zA-Z]/.test(password)) {
            return { isValid: false, message: 'Password must contain at least one letter' }
        }
        if (!/[0-9]/.test(password)) {
            return { isValid: false, message: 'Password must contain at least one number' }
        }
        return { isValid: true, message: '' }
    }

    const validatePasswordMatch = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return { isValid: false, message: 'Passwords do not match' }
        }
        return { isValid: true, message: '' }
    }

    const matchPattern = (password) => {
        return PASSWORD_PATTERN.test(password)
    }

    return {
        validatePassword,
        validatePasswordMatch,
        matchPattern,
        PASSWORD_PATTERN
    }
}
