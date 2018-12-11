const {getNewRouter} = require("./base");
const router = getNewRouter();
const {Op} = require("sequelize");
const {User, Post, Photo, Comment, Tag} = require("../../models");

router.route("/:userID/posts")
    .get(function (req, res) {
        let userId = req.params.userID;
        let sortType = req.body.sort;
        let order = [];
        switch (sortType) {
            case "popular":
                order.push([{model: Post}, 'viewCount', 'DESC']);
            case "recent":
            default:
                order.push([{model: Post}, 'createdAt', 'DESC']);
        }

        User.findOne({
            where: {id: userId},
            include: [
                {
                    model: Post,
                    required: false,
                    where: {
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
                        {
                            model: Comment,
                            include: [{model: User, attributes: ["id", "email", "avatar", "firstName", "lastName"]}]
                        },
                    ],
                },
            ],
            order
        }).then((user) => {
            let posts = user.Posts;
            Promise.all([...posts.map(function (post) {
                return post.countLikes();
            }), user.countFollowTo(), user.countFollowBy()]).then(function (counts) {
                let [followerCount, followingCount] = counts.slice(-2);
                let reactions = counts.slice(0, -2);
                let postsWithLikes = posts.map(function (post, index) {
                    post.dataValues.likes = reactions[index];
                    post.dataValues.photoCount = post.Photos.length;
                    return post;
                });
                let postCount = postsWithLikes.length;
                let photoCount = postsWithLikes.reduce((totalPhoto, post) => {
                    return totalPhoto + post.Photos.length;
                }, 0);
                res.json({
                    user: {...user.toJSON(), photoCount, postCount, followingCount, followerCount},
                    posts: postsWithLikes
                });
            }).catch(error => {
                res.json({error});
                return null;
            });
            return null;
        }).catch(error => {
            res.status(404).json({error});
        });
    });
module.exports = router;
