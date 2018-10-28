const router = require("./user");
const {Post, Photo, Comment, Tag} = require("../models");


router.route("/:userID/posts")
    .get(function (req, res) {
        let userId = req.params.userID;
        Post.findAll({
            where: {userId: userId},
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
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(posts => {
                Promise.all(posts.map(function (post) {
                    return post.countLikes();
                })).then(function (reactions) {
                    let postsWithLikes = posts.map(function (post, index) {
                        post.dataValues.likes = reactions[index];
                        return post;
                    });
                    res.json({userId, posts: postsWithLikes});
                })
            });
    });

module.exports = router;