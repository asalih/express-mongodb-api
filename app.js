const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/*  config */
const config = require('./helpers/config');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* routes */
const routes = require('./routes/routes');
app.use('/', routes);
app.use((req, res, next) => {
    res.status(404).send({ error: "not found", url: req.url })
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    next(err);
});

app.listen(config.server.port);

/* connect mongoose */
mongoose.connect(config.mongodb.connectionString, {
    useMongoClient: true
});

module.exports = app;