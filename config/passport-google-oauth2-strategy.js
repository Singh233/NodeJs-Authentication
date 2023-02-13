const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user');
const crypto = require('crypto');





// Configure passport and google auth strategy

passport.use(new GoogleStrategy({
        clientID: process.env.NODEJS_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NODEJS_GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.NODEJS_GOOGLE_CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, done) {

        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(error, user) {
            if (error) {
                console.log('Error in google strategy passport', error);
                return;
            }
            console.log(profile);
            if (user) {
                //if found set this user as req.user
                return done(null, user);
            }
            
            User.create({
                // if not found create the user and set it as req.user
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(error, user) {
                if (error) {
                    console.log("Error in creating user google auth", error);
                    return;
                }

                return done(null, user);
            })
        })
    }
));


module.exports = passport;