const { response } = require("express");
const User = require('../models/user');




module.exports.signUp = function(req, res) {
    return res.render('user_sign_up.ejs');
}


module.exports.signIn = function(req, res) {
    return res.render('user_sign_in.ejs');
}


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