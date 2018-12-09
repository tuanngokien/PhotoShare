const passport = require('passport');

authMiddleware = passport.authenticate('tokenAuth', {session: false});

module.exports = authMiddleware;
