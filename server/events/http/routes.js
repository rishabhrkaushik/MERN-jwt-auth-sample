const logger = require("./../../configs/logger").https

const httpApp = require("./../../configs/express").httpApp

// const usersRoutes = require("./users");

httpApp.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

httpApp.post('/api/world', (req, res) => {
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});
