const router = require('express').Router();
const { follow } = require('../models');


router.route('/')
  .post((req, res) => {
    let { follow_to } = req.body;
    let userId = req.user.id

    follow.findOrCreate({
      where: {
        follow_by: userId,
        follow_to: follow_to
      }
    }).spread((user, create) => {
      if (create) {
        res.status(200).json({ name: "SUCCESS", message: "Follow success", data: user });
      }
      else {
        res.status(400).json({ name: "FAIL", message: "Can't follow" });
      }
    }).catch(err => {
      res.status(500).json({ name: "ERROR", message: err })
    })
  })

router.route('/info/:userId')
  .get((req, res, next) => {
    let friendId = req.param.userId;
    let userId = req.user.id;

    follow.count({
      where: {
        follow_by: userId,
        follow_to: friendId
      }
    }).then(isFollow => {
      if (isFollow) {
        res.status(200).json({ name: "FOLLOWED", message: "followed" })
      }
      else {
        res.status(200).json({ name: "NOT_FOLLOWED", message: "not followed" })
      }
    }).catch(err => {
      res.status(500).json({ name: "ERROR", message: err })
    })
  })

router.route('/:userId/unfollow')
  .delete((req, res) => {
    let unfollowId = req.param.userId;

    follow.destroy({
      where: {
        follow_by: req.user.id,
        follow_to: unfollowId
      }
    }).then(isUnfollw => {
      if (isUnfollw) {
        res.status(200).json({ name: "SUCCESS", message: "Unfollow success" })
      }
      else {
        res.status(400).json({ name: "ERROR", message: "Something wrong" })
      }
    }).catch(err => {
      res.status(500).json({ name: "ERROR", message: err })
    })
  })

router.route('/followed')
  .get((req, res) => {
    let userId = req.user.id;

    follow.findAll({
      where: {
        follow_by: userId
      }
    }).then(follows => {
      if(follows) {
        follows = follows.map(follow => follow.toJSON());
      }
      res.status(200).json({name: "SUCCESS", follows: follows})
    })
    .catch(err => {
      res.status(500).json({name: "ERROR", message: "Server error"})
    })
  })

module.exports = router;