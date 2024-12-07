const bunyan = require('bunyan');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = bunyan.createLogger({
    name: 'unisync_logger',
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            stream: new DailyRotateFile({
                filename: 'logs/error-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxSize: '20m',
                maxFiles: '14d'
            })
        }
    ]
});

module.exports = logger;