const {Post} = require("../models");
const {Op} = require("sequelize");

const postDetailMiddleware = (req, res, next) => {
    Post.findOne({
        where: {
            [Op.and]: [{id: req.params.postID}, {
                [Op.or]: [
                    {privacy: Post.postPrivacy.PUBLIC},
                    {
                        [Op.and]: [
                            {privacy: Post.postPrivacy.FRIEND},
                            {
                                UserId: {
                                    [Op.in]: req.user.getAllRelationalIds()
                                }
                            }
                        ]
                    },
                    {UserId: req.user.id}
                ]
            }]
        }
    }).then(function (post) {
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