const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.JWT_SECRET;


router.post('/signup', (req, res, next) => {
        passport.authenticate('signup', {session: false}, (error, user) => {
            if(!user){
                res.json({"errors" : error});
            }else{
                res.json(user);
            }
        })(req, res, next);
});

router.post('/login', (req, res, next) => {
        passport.authenticate('login', {session: false}, (error, user) => {
            if(!user){
                res.json({"errors" : error});
            }else{
                let token = jwt.sign({id:user.id}, secretOrKey);
                res.json({success: true, token})
            }
        })(req, res, next);
});

module.exports = router;
