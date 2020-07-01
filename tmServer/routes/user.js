var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();
var auth = require('../middlewares/authenticated');

api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id', auth.ensureAuth, UserController.getUser);
api.get('/users/:page?', auth.ensureAuth, UserController.getUsers);
api.get('/counters/:id?', auth.ensureAuth, UserController.getCounters);

module.exports = api;
