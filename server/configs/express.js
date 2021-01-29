const logger = require("./logger").https
const loggerMiddleware = require("./logger").httpsMiddleware

const express = require('express')
const httpApp = express()
const port = process.env.PORT || 5001;

const cors = require('cors')
const router = express.Router();
const bodyParser = require('body-parser');

httpApp.use(bodyParser.urlencoded({ extended: true }));
httpApp.use(bodyParser.json());

httpApp.use(loggerMiddleware);
// logger.info("Express Configured");

exports.httpApp = httpApp;
exports.httpPort = port;
exports.httpRouter = router;
