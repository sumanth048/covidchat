const {

    createLogger,
    format,
    transports
} = require("winston");

const logger = createLogger({

    //info_1302202017.log
    //info_1302202018.log
    transports: [
        new transports.File({
            filename: "./logs/info_" + new Date().getDate() + "_" + (new Date().getMonth() + 1) + "_" + new Date().getFullYear() + "_" + new Date().getHours() + ".log",
            level: "info",
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: "./logs/error_" + new Date().getDate() + "_" + (new Date().getMonth() + 1) + "_" + new Date().getFullYear() + "_" + new Date().getHours() + ".log",
            level: "error",
            format: format.combine(format.timestamp(), format.simple())
        })
    ]
});

module.exports = logger;