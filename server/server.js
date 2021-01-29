'use strict';

console.log("Cities List Initialized");

const logger = require("./configs/logger");

// db setup
const db = require("./configs/mongoose");
const dbConnection = require("./events/mongoose/connection");

// express setup
const httpApp = require("./configs/express");
const httpConnection = require("./events/http/connection");
const httpRoutes = require("./events/http/routes");
