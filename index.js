const express = require('express');
const app = express();
const port = 8000;

// set up express app to use EJS as the template engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('layout', {name: 'world!!'});
});

app.listen(port, (error) => {
    if (error) {
        console.log('Error in starting the server', error);
        return;
    }
    console.log(`Listening on port:${port}...`);
})