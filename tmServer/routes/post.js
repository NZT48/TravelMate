var express = require('express');
var PostController = require('../controllers/post');
var api = express.Router();
var auth = require('../middlewares/authenticated');

api.post('/post', auth.ensureAuth, PostController.savePost);
api.get('/posts/:page?', auth.ensureAuth, PostController.getPosts);
api.get('/posts-user/:user/:page?', auth.ensureAuth, PostController.getPostsUser);
api.get('/post/:id', auth.ensureAuth, PostController.getPost);
api.delete('/post/:id', auth.ensureAuth, PostController.deletePost);

module.exports = api;
