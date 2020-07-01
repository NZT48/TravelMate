var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');
var Post = require('../models/post');
var Follow = require('../models/follow');

function savePost(req, res) {
    var params = req.body;
    if (!params.text)
        return res.status(200).send({ message: "Text field is required." });

    var post = new Post();
    post.text = params.text;
    post.destination = params.destination;
    post.user = req.user.sub;
    post.created_at = moment().unix();
    post.save((err, postStored) => {
        if (err)
            return res.status(500).send({ message: "Saving post error." });
        if (!postStored)
            return res.status(404).send({ message: "Post not saved." });

        return res.status(200).send({ post: postStored });
    });
}

function getPosts(req, res) {
    var page = 1;
    var itemsPerPage = 10;
    if (req.params.page) {
        page = req.params.page;
    }
    Follow.find({ user: req.user.sub }).populate('followed').exec((err, follows) => {
        if (err)
            return res.status(500).send({ message: "Get posts error." });

        var follows_clean = [];
        follows.forEach((follow) => {
            follows_clean.push(follow.followed);
        });
        follows_clean.push(req.user.sub);
        Post.find({ user: { "$in": follows_clean } }).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, posts, total) => {
            if (err)
                return res.status(500).send({ message: "Get posts error..." });
            if (!posts)
                return res.status(404).send({ message: "Posts not found." });

            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total / itemsPerPage),
                page: page,
                item_per_page: itemsPerPage,
                posts
            });
        });
    });
}

function getPostsUser(req, res) {
    var itemsPerPage = 10;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var user = req.user.sub;
    if (req.params.user) {
        user = req.params.user;
    }
    Post.find({ user: user }).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, posts, total) => {
        if (err)
            return res.status(500).send({ message: "Get posts error..." });
        if (!posts)
            return res.status(404).send({ message: "Posts not found." });

        return res.status(200).send({
            total_items: total,
            pages: Math.ceil(total / itemsPerPage),
            page: page,
            item_per_page: itemsPerPage,
            posts
        });
    });
}

function getPost(req, res) {
    var postId = req.params.id;
    Post.findById(postId, (err, post) => {
        if (err)
            return res.status(500).send({ message: "Get post error..." });
        if (!post)
            return res.status(404).send({ message: "Post not found." });

        return res.status(200).send({ post });
    });
}

function deletePost(req, res) {
    var postId = req.params.id;
    Post.find({ 'user': req.user.sub, '_id': postId }).remove((err) => {
        if (err)
            return res.status(500).send({ message: "Delete post error..." });

        return res.status(200).send({ message: 'Post deleted.' });
    });
}


module.exports = {
    savePost,
    getPosts,
    getPost,
    deletePost,
    getPostsUser
};
