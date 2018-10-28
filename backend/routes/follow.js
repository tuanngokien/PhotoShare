const router = require('express').Router();
const {follow} = require('../models');


router.route('/')
  .post((req, res) => {
    let {follow_by, follow_to} = req.body;
    
    follow.findOrCreate({
      where: {
        follow_by: follow_by,
        follow_to: follow_to
      }
    }).spread((user, create) => {
      if(create) {
        res.status(200).json({name: "SUCCESS", message: "Follow success", data: user});
      }
      else {
        res.status(400).json({name: "FAIL", message: "Can't follow"});
      }
    }).catch(err => {
      res.status(500).json({name: "ERROR", message: err})
    })
  })

router.route('/info')
  .get((req, res, next) => {
    let follow_by = req.query['follow_by'];
    let follow_to = req.query['follow_to'];

    follow.count({
      where: {
        follow_by: follow_by,
        follow_to: follow_to
      }
    }).then(isFollow => {
      if(isFollow) {
        res.status(200).json({name: "FOLLOWED", message: "followed"})
      }
      else {
        res.status(200).json({name: "NOT_FOLLOWED", message: "not followed"})
      }
    }).catch(err => {
      res.status(500).json({name: "ERROR", message: err})
    })
  })

router.route('/unfollow')
  .delete((req, res) => {
    let {follow_by, follow_to} = req.body;

    follow.destroy({
      where: {
        follow_by: follow_by,
        follow_to: follow_to
      }
    }).then(isUnfollw => {
      if(isUnfollw) {
        res.status(200).json({name: "SUCCESS", message: "Unfollow success"})
      }
      else {
        res.status(400).json({name: "ERROR", message: "Something wrong"})
      }
    }).catch(err => {
      res.status(500).json({name: "ERROR", message: err})
    })
  })

  module.exports = router;