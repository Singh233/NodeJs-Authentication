const { response } = require("express");
const User = require('../models/user');
const Token = require('../models/token');
const sendEmail = require('../config/sendEmail');
const crypto = require('crypto');



// Function to create a new user
module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(error, user) {
        if (error) {
            console.log("Error in finding user while signing up");
            return;
        }

        // If user doesn't exist
        if (!user) {
            // Create new user
            User.create(req.body, function(error, user) {
                if (error) {
                    console.log("Error in creating user while signing up");
                    return;
                }
                console.log('User created successfully');
                return res.redirect('/');
            })
        } else {
            // If user already exist
            return res.redirect('back');
        }
    })


}




// Function to sign in user using session 
module.exports.createSession = async function(req, res) {
    return res.redirect('/');
}



// Function to sign out and destroy session
module.exports.destroySession = function(req, res) {
    req.logout(function(error) {
        if (error) {
            console.log("error signing out");
            return;
        }
    });
    return res.redirect('/');
    
}







// forgot / reset password function
module.exports.forgotPassword = async function(req, res) {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
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

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}




