const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const routes = require('./routes');

// add db
const db = require('./config/mongoose');

// Tell express to use layouts in all views
app.use(expressLayouts);

// extracct style and scripts from sub pages int the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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