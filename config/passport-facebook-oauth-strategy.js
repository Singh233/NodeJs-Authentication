const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const crypto = require('crypto');





// Configure passport and google auth strategy

passport.use(new FacebookStrategy({
    clientID: process.env.NODEJS_FACEBOOK_CLIENT_ID,
    clientSecret: process.env.NODEJS_FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/users/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        // find a user
        User.findOne({ facebook_id: profile.id }, function(error, user) {//See if a User already exists with the Facebook ID
            if (error) {
                console.log('Error in google strategy passport', error);
                return;
            }
            console.log('profile----', profile);
            if (user) {
                //if found set this user as req.user
                console.log('User found------', user)
                return done(null, user);
            }
            
            User.create({
                // if not found create the user and set it as req.user
                facebook_id: profile.id, //pass in the id and displayName params from Facebook
                name: profile.displayName,
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