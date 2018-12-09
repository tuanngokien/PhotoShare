const passport = require('passport');


authMiddleware = (req, res, next) => {
    passport.authenticate('tokenAuth', {session: false}, (errors, user) => {
        if (!user) {
            res.status(401).json({errors});
        } else {
            next();
        }
    })(req, res, next);
};

module.exports = authMiddleware;
