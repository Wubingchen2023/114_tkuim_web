const formatSuccess = (data, message = 'Success') => {
    return {
        success: true,
        data,
        message,
    };
};

const formatError = (code, message, details = null) => {
    return {
        success: false,
        error: {
            code,
            message,
            ...(details && { details }),
        },
    };
};

module.exports = { formatSuccess, formatError };
