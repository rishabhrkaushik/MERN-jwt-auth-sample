const authJwt = require("./../../actions/authentication/authJWT");
const httpApp = require("./../../configs/express").httpApp

const controller = require("./../../actions/http/api");

httpApp.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

httpApp.get("/api/test/all", controller.allAccess);

httpApp.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
httpApp.get("/api/test/cities", [authJwt.verifyToken], controller.cities);
