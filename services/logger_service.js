const { createLogger, format, transports } = require('winston');


var logger = createLogger({
    
    transports: [
        new transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            format: format.combine(
            format.colorize(),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
           ),
        }),
        new transports.File({ 
            level: 'info',
            timestamp : true,
            filename: './logs/alllogs.log' ,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.json()
            )

        })
    ],
    exitOnError: false
});

module.exports = logger;