const logger = require("./../../configs/logger").https

const httpApp = require("./../../configs/express").httpApp;
const httpPort = require("./../../configs/express").httpPort;

// console.log(httpPort);
//
httpApp.listen(httpPort,'0.0.0.0', () => {
    logger.info('Listening now for http on port ', httpPort);
});
