const logger = require("./logger").https
const loggerMiddleware = require("./logger").httpsMiddleware

const express = require('express')
const httpApp = express()
const port = process.env.PORT || 5001;

const cors = require('cors')
const router = express.Router();
const bodyParser = require('body-parser');

const corsOptions = {
  origin: "http://localhost:3000"
};
httpApp.use(cors(corsOptions));

httpApp.use(bodyParser.urlencoded({ extended: true }));
httpApp.use(bodyParser.json());

httpApp.use(loggerMiddleware);
// logger.info("Express Configured");

exports.httpApp = httpApp;
exports.httpPort = port;
exports.httpRouter = router;
