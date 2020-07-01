var express = require('express');
var FollowController = require('../controllers/follow');
var api = express.Router();
var auth = require('../middlewares/authenticated');

api.post('/follow', auth.ensureAuth, FollowController.saveFollow);
api.delete('/follow/:id', auth.ensureAuth, FollowController.deleteFollow);
api.get('/following/:id?/:page?', auth.ensureAuth, FollowController.getFollowingUsers);
api.get('/followed/:id?/:page?', auth.ensureAuth, FollowController.getFollowedUser);
api.get('/get-my-follows/:followed?', auth.ensureAuth, FollowController.getMyFollows);

module.exports = api;
