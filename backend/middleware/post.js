const {Post} = require("../models");

const postDetailMiddleware = (req, res, next) => {
    Post.findByPk(req.params.postID).then(function (post) {
        if (post) {
            req.post = post;
            next();
            return null;
        } else {
            res.status(404).send("Not found");
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong");
    });
};

const PostDetailOwnerCheckerMiddleware = (req, res, next) => {
    if (req.user.id === req.post.UserId) {
        next();
    } else {
        res.status(403).send();
    }
};

module.exports = {postDetailMiddleware, PostDetailOwnerCheckerMiddleware};