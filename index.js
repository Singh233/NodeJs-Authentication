const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');

// For session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// add db
const db = require('./config/mongoose');

app.use(express.urlencoded({extended: true})); // parses urlencoded bodie

// compile scss to css
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));



app.use(express.static('./assets'));

// Tell express to use layouts in all views
app.use(expressLayouts);

// extracct style and scripts from sub pages int the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up express app to use EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// configure express-session
app.use(session({
    name: 'Authentication',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    }
}));

app.use(passport.initialize());
app.use(passport.session());


// use express router
app.use('/', routes);

app.listen(port, (error) => {
    if (error) {
        console.log('Error in starting the server', error);
        return;
    }
    console.log(`Listening on port:${port}...`);
})