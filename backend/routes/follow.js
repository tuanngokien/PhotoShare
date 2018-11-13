const router = require("./user");
const {Op} = require("sequelize");
const {follow, User} = require('../models');


router.route('/:userID/follows')
    .get((req, res) => {
        let userTargetId = req.params.userID;
        follow.findAll({
            where: {[Op.or]: [{follow_by: userTargetId}, {follow_to: userTargetId}]},
            include: [
                {model: User, as: "follow_by_user"},
                {model: User, as: "follow_to_user"},
            ]
        }).then(follows => {
            let following = [];
            let followers = [];
            follows.forEach(follow => {
                if (follow.follow_by === parseInt(userTargetId)) {
                    following.push(follow.follow_to_user.toJSON());
                } else {
                    followers.push(follow.follow_by_user.toJSON());
                }
            });
            res.json({success: true, following, followers});
        }).catch(err => {
            console.log(err);
            res.json({success: false});
        })
    })
    .post((req, res) => {
        let follow_to = req.params.userID;
        let userId = req.user.id;
        if (parseInt(follow_to) === userId) {
            res.json({success: false});
        } else {
            follow.findOrCreate({
                where: {
                    follow_by: userId,
                    follow_to: follow_to
                },
            }).spread((follow) => {
                res.json({success: true});
            }).catch(err => {
                res.json({success: false});
            })
        }
    })
    .delete((req, res) => {
        let unfollowId = req.params.userID;

        follow.destroy({
            where: {
                follow_by: req.user.id,
                follow_to: unfollowId
            }
        }).then(isUnfollow => {
            if (isUnfollow) {
                res.json({success: true})
            } else {
                res.json({success: false})
            }
        }).catch(err => {
            console.log(err);
            res.json({success: false});
        })
    });


module.exports = router;