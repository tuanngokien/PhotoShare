const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {User} = require('../models/');

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({where: {email}}).then(user => {
        if (!user) {
            return done({email: "User not found"}, false);
        }
        user.validatePassword(password).then(result => {
            if(result === true){
                return done(null, user);
            }else{
                return done({password: "Wrong Password"}, false);
            }
        });
    }).catch(err => {
        console.log(err);
        done({login: "Error in signin"}, false);
    });
}));