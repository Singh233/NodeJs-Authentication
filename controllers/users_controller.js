const { response } = require("express");
const User = require('../models/user');
const Token = require('../models/token');
const sendEmail = require('../config/sendEmail');
const crypto = require('crypto');



// Function to create a new user
module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('info', 'Password mismatch');
        return res.redirect('/');
    }

    User.findOne({email: req.body.email}, function(error, user) {
        if (error) {
            req.flash('info', 'Something went wrong please try again later');

            console.log("Error in finding user while signing up");
            return res.redirect('/');
        }

        // If user doesn't exist
        if (!user) {
            // Create new user
            User.create(req.body, function(error, user) {
                if (error) {
                    console.log("Error in creating user while signing up");
                    return;
                }
                req.flash('success', 'Account created, please continue to Sign in!');

                console.log('User created successfully');
                return res.redirect('/');
            })
        } else {
            req.flash('info', 'User already exist!');
            // If user already exist
            return res.redirect('back');
        }
    })


}




// Function to sign in user using session 
module.exports.createSession = async function(req, res) {
    
    if (req.user) {
        req.flash('success', 'Logged in Successfully');
    } else {
        req.flash('error', 'Invalid Username/Password!');
    }

    return res.redirect('/');
}



// Function to sign out and destroy session
module.exports.destroySession = function(req, res) {
    
    req.logout(function(error) {
        if (error) {
            console.log("error signing out");
            req.flash('error', 'Something went wrong!');
            return;
        }
    });
    req.flash('success', 'Logged Out');
    return res.redirect('/');
    
}







// forgot / reset password function
module.exports.forgotPassword = async function(req, res) {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.flash('warning', "User with given email doesnt exist");
            console.log('User with given email doesnt exist');
            return res.redirect('back');

        }

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `http://localhost:8000/users/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        req.flash('success', "Password reset link sent to your email account!");
        return res.redirect('/');
    } catch (error) {
        req.flash('warning', "An error occured, try again later!");
        return res.redirect('/');
    }
}




