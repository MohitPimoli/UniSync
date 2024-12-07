const logger = require('../utils/logger.js');
const errorHandler = (err, req, res, next) => {
    logger.error('Error: %s\nStack Trace: %s', err.message, err.stack || err);

    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Send stack trace in dev mode for easier debugging
    });
};

module.exports = errorHandler;
