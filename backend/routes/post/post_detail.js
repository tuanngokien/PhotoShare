const {getPostDetailRouter} = require("./base");
const router = getPostDetailRouter();
const {Op, literal} = require("sequelize");
const {User, Post, Photo, Tag, Comment, follow} = require("../../models");


router.route("/:postID")
    .get(function (req, res) {
        Post.findOne({
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
                    model: User,
                    include: [
                        {model: follow, as: "FollowTo", attributes: ["follow_by"]}
                    ]
                },
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
                {
                    model: Comment,
                    include: [{model: User, attributes: ["id", "email", "avatar", "firstName", "lastName"]}]
                },
            ]
        }).then((post) => {
            post.getLikes().then(function (likes) {
                post.dataValues.likes = likes;
                post.dataValues.photoCount = post.Photos.length;
                let user = post.dataValues.User;
                let followers = user.dataValues.FollowTo;
                user.dataValues.isFollowing = user.id !== req.user.id ? followers.findIndex(user => user.dataValues.follow_by === req.user.id) > -1 : null;
                res.json({user, post});
                //increment post view
                req.post.update({viewCount: literal('viewCount + 1')});
                return null;
            }).catch(error => {
                throw error
            });
            return null;
        }).catch(error => {
            res.status(404).json({error});
        });
    });
module.exports = router;