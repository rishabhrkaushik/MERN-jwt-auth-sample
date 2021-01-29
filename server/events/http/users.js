const logger = require("./../../configs/logger").https

const httpApp = require("./../../configs/express").httpApp
const verifySignUp = require("./../../actions/authentication/verifysignup");
const controller = require("./../../actions/authentication/auth.controller");

httpApp.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

httpApp.post(
    "/api/auth/signup",
    [
        verifySignUp.checkDuplicateUsername
    ],
    controller.signup
);

httpApp.post("/api/auth/signin", controller.signin);
