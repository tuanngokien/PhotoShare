const {getNewRouter} = require("./base");
const router = getNewRouter();
const {Op, fn, literal} = require("sequelize");
const {User, Post, Photo, Comment, Tag, PhotoTag, follow} = require("../../models");

router.get("/", function (req, res) {
    let trendingSearchesFetcher = PhotoTag.findAll({
        group: ['TagId'],
        attributes: [[fn('COUNT', 'TagId'), 'tagCount']],
        order: [
            [literal("tagCount"), "DESC"]
        ],
        include: [
            {model: Tag, attributes: ["name"]}
        ],
        limit: 6
    }).then(tagsWithCount => {
        let tags = tagsWithCount.map(e => {
            return e.dataValues.Tag.dataValues.name;
        });
        return tags;
    });
    let followsFetcher = follow.findAll({
        where: {
            follow_to: {
                [Op.notIn]: req.user.getAllRelationalIds()
            },
        },
        attributes: [[fn('COUNT', 'follow_to'), 'followerCount']],
        group: ['follow_to'],
        order: [
            [literal("followerCount"), "DESC"]
        ],
        include: [
            {model: User, as: "follow_to_user"}
        ],
        limit: 5
    }).then(rows => {
        let follows = rows.map(row => {
            let {followerCount, follow_to_user: user} = row.dataValues;
            return {...user.toJSON(), followerCount};
        });
        return follows
    });
    let postFetcher = Post.findAll({
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
        order: [
            ['createdAt', 'DESC'],
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
            {model: Comment, include: [{model: User, attributes: ["id", "email", "avatar", "firstName", "lastName"]}]},
            {model: User, attributes: ["id", "email", "avatar", "firstName", "lastName"]}
        ]
    }).then(posts => {
        return Promise.all(posts.map(function (post) {
            return Promise.all([post.countLikes(), post.countLikes({where: {id: req.user.id}})]);
        })).then(function (reactions) {
            let postsWithLikes = posts.map(function (post, index) {
                let currentPostReactions = reactions[index];
                post.dataValues.likes = currentPostReactions[0];
                post.dataValues.liked = currentPostReactions[1] > 0;
                post.dataValues.photoCount = post.Photos.length;
                return post;
            });
            return postsWithLikes
        });
    });
    Promise.all([postFetcher, followsFetcher, trendingSearchesFetcher]).then(results => {
        let [posts, follows, searches] = results;
        res.send({posts, follows, searches});
    });
});

module.exports = router;

