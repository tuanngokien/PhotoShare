const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {User} = require('../models/');

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, email, password, done) => {
    User.findOne({where: {email}})
        .then(user => {
            if (user) {
                return done({email: "User Already Exists"}, false);
            } else {
                User.create({...req.body, email, password})
                    .then(user => {
                        return done(null, user);
                    }).catch(validationErrors => {
                        let errors = {};
                        for (let e of validationErrors["errors"]) {
                            errors[e.path] = e.message;
                        }
                        return done(errors, false);
                    }
                );
            }
            return null;
        }).catch(err => {
            console.log(err);
            return done({signup: "Error in signup"}, false);
        }
    );
}));
