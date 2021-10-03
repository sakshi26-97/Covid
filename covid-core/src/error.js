function generateError(errorData) {
    if (errorData.response) {
        const message = `${errorData.message}. ${JSON.stringify(errorData.response.data) || ''}.`;
        return {
            message,
            code: errorData.response.status
        }
    }

    // Server is unavailable (no any response)
    const message = `${errorData.message}.`; // usually is "Error Network"
    return {
        message,
        code: 0
    }
}

module.exports = {
    generateError
}