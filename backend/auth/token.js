const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const {User, follow} = require('../models/');

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;
jwtOptions.passReqToCallback = true;

passport.use("tokenAuth", new JwtStrategy(jwtOptions, function (req, jwtPayload, done) {
    let userId = jwtPayload.id;
    User.findOne({
        where: {id: userId},
        include: [
            {model: follow, as: "FollowBy", attributes: ["follow_to"]}
        ]
    }).then(user => {
        if (user) {
            req.user = user;
            done(null, user);
        } else {
            done({"token": "Invalid token"}, false);
        }
        return null;
    }).catch(err => {
            console.log(err);
            done({"auth": "Error when authorizing"}, false);
        });

}));