const logger = require("./../../configs/logger").db

const mongoose = require("./../../configs/mongoose")

mongoose.db.on('error', function (err){
    logger.error(err);
});

mongoose.db.once('open', function() {
    logger.info("DB initiated");
});
