const mongoose = require('mongoose');


// Connect to the Mongodb atlas(cloud) Database
mongoose.connect(`mongodb+srv://sanam:${process.env.MONGODB_CLUSTER_PASSWORD}@cluster0.pxkvrhv.mongodb.net/?retryWrites=true&w=majority`)

// Acquire the connection
const db = mongoose.connection;

// Error handling
db.on('error', console.error.bind(console, "Error connecting to db"));

// On Successfully connected
db.once('open', function() {
    console.log("Successfully connected to the database");
})