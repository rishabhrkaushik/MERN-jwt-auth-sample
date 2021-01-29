const logger = require("./../../configs/logger").app

const User = require("./../../models/user.model");


checkDuplicateUsername = (req, res, next) => {
    // Username
    logger.info("Check Duplicate Username");
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateUsername
};

module.exports = verifySignUp;
