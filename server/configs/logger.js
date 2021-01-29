const winston = require('winston');
const expressWinston = require('express-winston');

const util = require('util');
var path = require('path')
var PROJECT_ROOT = path.join(__dirname, '..')

// takes several arguments and convert it into a single string like console.log in js
const mergeArguments = (loggerName, logLevel) => {
    return function () {
        const args = Array.from(arguments);
        loggerName[logLevel](util.format(...args));
    };
};


function formatLogArguments (args) {
    args = Array.prototype.slice.call(args)

    var stackInfo = getStackInfo(1)

    if (stackInfo) {
        // get file path relative to project root
        var calleeStr = '[' + stackInfo.relativePath + ':' + stackInfo.line + ']'
        args.unshift(calleeStr)
    }
    return args
}

/**
* Parses and returns info about the call stack at the given index.
*/
function getStackInfo (stackIndex) {
    // get call stack, and analyze it
    // get all file, method, and line numbers
    var stacklist = (new Error()).stack.split('\n').slice(3)
    // stack trace format:
    // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
    var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
    var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi

    var s = stacklist[stackIndex] || stacklist[0]
    var sp = stackReg.exec(s) || stackReg2.exec(s)

    if (sp && sp.length === 5) {
        return {
            method: sp[1],
            relativePath: path.relative(PROJECT_ROOT, sp[2]),
            line: sp[3],
            pos: sp[4],
            file: path.basename(sp[2]),
            stack: stacklist.join('\n')
        }
    }
}

const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.printf(
            info => `${info.timestamp} ${(info.level + "    ").slice(0, 7)} ${(info.logger+ "    ").slice(0, 7)}: ${info.message}`,
        ),
        winston.format.colorize({all: true}),
        winston.format.align(),
    )
});

const fileTransport = new winston.transports.File({
    filename: './../../logs/' + 'custom.log',
    datePattern: 'YYYY-MM-DD',
    level: 'silly',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            info => `${info.timestamp} ${(info.level + "    ").slice(0, 7)} ${(info.logger+ "    ").slice(0, 7)}: ${info.message}`,
        ),
        // winston.format.json(),
    ),
})

var logger = winston.createLogger({
    defaultMeta: { logger: 'logger' },
    level: 'silly',
    colorize: true,
    transports: [
        consoleTransport,
        fileTransport
    ]
});

const finalLogger = {
    silly: function () {
        mergeArguments(logger, 'silly').apply(null, formatLogArguments(arguments))
    },
    debug: function () {
        mergeArguments(logger, 'debug').apply(null, formatLogArguments(arguments))
    },
    verbose: function () {
        mergeArguments(logger, 'verbose').apply(null, formatLogArguments(arguments))
    },
    info: function () {
        mergeArguments(logger, 'info').apply(null, formatLogArguments(arguments))
    },
    warn: function () {
        mergeArguments(logger, 'warn').apply(null, formatLogArguments(arguments))
    },
    error: function () {
        mergeArguments(logger, 'error').apply(null, formatLogArguments(arguments))
    },
};

var db = winston.createLogger({
    defaultMeta: { logger: 'db' },
    level: 'silly',
    colorize: true,
    transports: [
        consoleTransport,
        fileTransport
    ]
});

const finalDB = {
    silly: function () {
        mergeArguments(db, 'silly').apply(null, formatLogArguments(arguments))
    },
    debug: function () {
        mergeArguments(db, 'debug').apply(null, formatLogArguments(arguments))
    },
    verbose: function () {
        mergeArguments(db, 'verbose').apply(null, formatLogArguments(arguments))
    },
    info: function () {
        mergeArguments(db, 'info').apply(null, formatLogArguments(arguments))
    },
    warn: function () {
        mergeArguments(db, 'warn').apply(null, formatLogArguments(arguments))
    },
    error: function () {
        mergeArguments(db, 'error').apply(null, formatLogArguments(arguments))
    },
};


var https = winston.createLogger({
    defaultMeta: { logger: 'https' },
    level: 'silly',
    colorize: true,
    transports: [
        consoleTransport,
        fileTransport
    ],
    // meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    // msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    // expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    // colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
});

const finalHTTPS = {
    silly: function () {
        mergeArguments(https, 'silly').apply(null, formatLogArguments(arguments))
    },
    debug: function () {
        mergeArguments(https, 'debug').apply(null, formatLogArguments(arguments))
    },
    verbose: function () {
        mergeArguments(https, 'verbose').apply(null, formatLogArguments(arguments))
    },
    info: function () {
        mergeArguments(https, 'info').apply(null, formatLogArguments(arguments))
    },
    warn: function () {
        mergeArguments(https, 'warn').apply(null, formatLogArguments(arguments))
    },
    error: function () {
        mergeArguments(https, 'error').apply(null, formatLogArguments(arguments))
    },
};

expressWinston.requestWhitelist.push('body');

var httpsMiddleware = expressWinston.logger({
    defaultMeta: { logger: 'httpsMiddleware' },
    level: 'silly',
    transports: [
        consoleTransport,
        fileTransport
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}} {{JSON.stringify(req.body, null, '\t')}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
});

const finalHTTPSMiddleware =function (req, res, next) {
        // httpsMiddleware.info(req.body)
        mergeArguments(httpsMiddleware, 'silly').apply(null, formatLogArguments(arguments))
        next()
};

var app = winston.createLogger({
    defaultMeta: { logger: 'app' },
    level: 'silly',
    colorize: true,
    transports: [
        consoleTransport,
        fileTransport
    ]
});

const finalApp = {
    silly: function () {
        mergeArguments(app, 'silly').apply(null, formatLogArguments(arguments))
    },
    debug: function () {
        mergeArguments(app, 'debug').apply(null, formatLogArguments(arguments))
    },
    verbose: function () {
        mergeArguments(app, 'verbose').apply(null, formatLogArguments(arguments))
    },
    info: function () {
        mergeArguments(app, 'info').apply(null, formatLogArguments(arguments))
    },
    warn: function () {
        mergeArguments(app, 'warn').apply(null, formatLogArguments(arguments))
    },
    error: function () {
        mergeArguments(app, 'error').apply(null, formatLogArguments(arguments))
    },
};

module.exports.logger = finalLogger
module.exports.db = finalDB
module.exports.https = finalHTTPS
module.exports.httpsMiddleware = httpsMiddleware
module.exports.app = finalApp
