




module.exports.home = async function(req, res) {
    return res.render('layout.ejs', {
        title: 'NodeJs Authentication',
        name: 'World!',
    })
}