const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use(passport.authenticate('tokenAuth', {session: false}));

router.get('/me', (req, res) => {
    if (!req.user) {
        res.json({"errors": error});
    } else {
        res.json(req.user);
    }
});

module.exports = router;
