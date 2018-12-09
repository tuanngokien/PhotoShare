const {getOwnPostDetailRouter} = require("./base");
const router = getOwnPostDetailRouter();

const CHANGE_PRIVACY_ROUTE_PATH = "/:postID/privacy";

router.route(CHANGE_PRIVACY_ROUTE_PATH)
    .patch(function (req, res) {
        let privacy = req.body.type;
        req.post.update({
            privacy
        }).then(() => {
            res.json({success: true});
        }).catch(err => {
            res.json({success: false});
        });
    });

module.exports = router;

