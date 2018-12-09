const {getPostDetailRouter} = require("./base");
const router = getPostDetailRouter();
const {Op, literal} = require("sequelize");
const {User, Post, Photo, Tag, Comment} = require("../../models");

router.route("/:postID")
    .get(function (req, res) {
        User.findOne({
            where: {id: req.post.UserId},
            include: [
                {
                    model: Post,
                    where: {
                        [Op.and]: {
                            id: req.post.id,
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
                        }
                    },
                    include: [
                        {
                            model: Photo,
                            include: [{
                                model: Tag,
                                attributes: ["name"],
                                through: {
                                    attributes: []
                                }
                            }]
                        },
                        {model: Comment},
                    ],
                },
            ],
            order: [
                [{model: Post}, 'createdAt', 'DESC']
            ]
        }).then((user) => {
            let posts = user.Posts;
            Promise.all([...posts.map(function (post) {
                return post.countLikes();
            }), user.getFollowTo()]).then(function (result) {
                let reactions = result.slice(0, -1);
                let postsWithLikes = posts.map(function (post, index) {
                    post.dataValues.likes = reactions[index];
                    post.dataValues.photoCount = post.Photos.length;
                    return post;
                });
                let followers = result.slice(-1)[0];
                let isFollowing = user.id !== req.user.id ? followers.findIndex(user => user.dataValues.follow_by === req.user.id) > -1 : null;
                res.json({
                    user: {...user.toJSON(), following: isFollowing},
                    posts: postsWithLikes
                });
                //increment post view
                req.post.update({viewCount: literal('viewCount + 1')});
            }).catch(error => {
                throw error
            });
            return null;
        }).catch(error => {
            res.status(404).json({error});
        });
    });
module.exports = router;