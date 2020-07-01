var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var default_routes = require('./routes/default');
var user_routes = require('./routes/user');
var follow_routes = require('./routes/follow');
var post_routes = require('./routes/post');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


app.use('/', default_routes);
app.use('/api', user_routes);
app.use('/api', follow_routes);
app.use('/api', post_routes);

module.exports = app;
