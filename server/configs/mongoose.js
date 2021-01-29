const logger = require("./logger").db

logger.info("DB Connection initiation");

const uri = "mongodb+srv://attainu:mu7H6nrkVCj5T1zu@cluster0.e5hpr.mongodb.net/assement?retryWrites=true&w=majority"

const mongoose = require('mongoose');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

logger.info("DB Connection initiated using uri", uri);

const db = mongoose.connection;

exports.db = db;
