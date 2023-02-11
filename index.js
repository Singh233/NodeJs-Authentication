const express = require('express');
const app = express();
const port = 8000;

const routes = require('./routes');


// set up express app to use EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');


// use express router
app.use('/', routes);

app.listen(port, (error) => {
    if (error) {
        console.log('Error in starting the server', error);
        return;
    }
    console.log(`Listening on port:${port}...`);
})