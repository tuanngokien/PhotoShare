const {getNewRouter} = require("./base");
const router = getNewRouter();
const {Post, Photo, Comment, Tag} = require("../../models");
const {Op} = require("sequelize");

router.get("/", function (req, res) {
    req.user.getFollowBy({
        attributes: [
            'follow_to'
        ],
    }).then(users => {
        let ids = [req.user.id];
        for (user of users) {
            let following_id = user.dataValues.follow_to;
            ids.push(following_id);
        }
        Post.findAll({
            where: {
                [Op.or]: [
                    {privacy: Post.postPrivacy.PUBLIC},
                    {
                        UserId: {
                            [Op.in]: ids,
                        },
                        privacy: Post.postPrivacy.FRIEND
                    }]
            },
            order: [
                ['privacy', 'ASC'],
                ['createdAt', 'DESC']
            ],
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
                {model: Comment}
            ]
        }).then(posts => {
            Promise.all([...posts.map(function (post) {
                return post.countLikes();
            })]).then(function (reactions) {
                let postsWithLikes = posts.map(function (post, index) {
                    post.dataValues.likes = reactions[index];
                    post.dataValues.photoCount = post.Photos.length;
                    return post;
                });
                res.json({success: true, posts: postsWithLikes});
            }).catch(err => {
                throw err;
            });
        });
        return null;
    }).catch(err => {
        res.json({success: false})
    });
});

module.exports = router;

