const { response } = require("express");





module.exports.signUp = function(req, res) {
    return res.render('user_sign_up.ejs');
}


module.exports.signIn = function(req, res) {
    return res.render('user_sign_in.ejs');
}



module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    
}