const {getPostDetailRouter} = require("./base");
const router = getPostDetailRouter();
const {Comment} = require("../../models");

const LIKE_ROUTE_PATH = "/:postID/likes";
const COMMENT_ROUTE_PATH = "/:postID/comments";

router.route(LIKE_ROUTE_PATH)
    .get(function (req, res) {
        req.post.getLikes({
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(function (likes) {
            res.json({postId: req.post.id, likes})
        })
    })
    .post(function (req, res) {
        req.post.addLike(req.user).then(function (result) {
            res.json({success: result.length === 1})
        })
    })
    .delete(function (req, res) {
        req.post.removeLike(req.user).then(function (result) {
            res.json({success: Boolean(result)})
        })
    });


router.route(COMMENT_ROUTE_PATH)
    .post(function (req, res) {
        req.post.createComment({
            UserId: req.user.id,
            text: req.body.text,
        }).then(result => {
            res.json({id: result.id});
        });
    });

router.route(`${COMMENT_ROUTE_PATH}/:commentID`)
    .patch(function (req, res) {
        Comment.update(
            {text: req.body.text},
            {where: {id: req.params.commentID, userId: req.user.id, postId: req.post.id}}
        ).then(result => {
            res.json({success: Boolean(result)});
        })
    })
    .delete(function (req, res) {
        Comment.destroy({
            where: {id: req.params.commentID, userId: req.user.id, postId: req.post.id}
        }).then(result => {
            res.json({success: Boolean(result)});
        });
    });

module.exports = router;