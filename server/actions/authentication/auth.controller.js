const logger = require("./../../configs/logger").app

const config = require("./../../configs/auth");
const User = require("./../../models/user.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    logger.info("Sign Up")
    logger.info(req)

    var user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        else {
            res.send({
                message: "User was registered successfully!"
            });
        }
    });
};

exports.signin = (req, res) => {
    logger.info(req.body)
    User.findOne({
            username: req.body.username
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err
                });
                return;
            }

            if (!user) {
                return res.status(404).send({
                    accessToken: null,
                    message: "User Not found."
                });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                accessToken: token
            });
        });
};
