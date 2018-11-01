const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const {User} = require('../models/');

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;
jwtOptions.passReqToCallback = true;

passport.use("tokenAuth", new JwtStrategy(jwtOptions, function (req, jwtPayload, done) {
    User.findByPk(jwtPayload.id)
        .then(user => {
            if (user) {
                req.user = user;
                done(null, user);
            } else {
                done({"token": "Invalid token"}, false);
            }
            return null;
        })
        .catch(err => {
            console.log(err);
            done({"auth": "Error when authorizing"}, false);
        });

}));