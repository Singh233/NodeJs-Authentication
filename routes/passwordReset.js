const User = require('../models/user');
const Token = require('../models/token');
const sendEmail = require('../mailers/reset-password-mailer');
const crypto = require('crypto');
const express = require("express");
const router = express.Router();

// Router to direct user to reset password page
router.get("/:userId/:token", async (req, res) => {
    try {

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("User --> invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        return res.render('password_reset.ejs', {
            userId: req.params.userId,
            token: req.params.token,
        });
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});


// Router to update password and destroy token
router.post("/:userId/:token", async (req, res) => {
    try {

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("User post -->invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        if (req.body.password != req.body.confirm_password) {
            req.flash('info', 'Password mismatch');
            return res.redirect('back');
        }

        user.password = req.body.password;
        await user.save();
        await token.delete();

        req.logout(function(error) {
            if (error) {
                console.log("error signing out");
                req.flash('error', 'Something went wrong!');
                return;
            }
        });
        req.flash('success', "Password updated! Continue to Sign in");

        return res.redirect('/');

        
    } catch (error) {
        res.send("An error occured");
        console.log(error);
        req.flash('warning', "An error occured, try again later!");

        return res.redirect('/');

    }
});


module.exports = router;