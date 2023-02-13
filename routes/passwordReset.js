const User = require('../models/user');
const Token = require('../models/token');
const sendEmail = require('../config/sendEmail');
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

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");

        
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});


module.exports = router;