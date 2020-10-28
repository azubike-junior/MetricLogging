const responseHandler = (res, options) => {
    let {
        statusCode,
        success,
        message,
        value
    } = options

    statusCode = statusCode || 200;
    return res.status(statusCode).json({
        success: success || statusCode < 400,
        message,
        value
    })
}

module.exports = responseHandler