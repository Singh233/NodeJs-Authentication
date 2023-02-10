const express = require('express');
const app = express();
const port = 8000;


app.get('/', (req, res) => {
    res.send('Hello world!!');
})

app.listen(port, (error) => {
    if (error) {
        console.log('Error in starting the server', error);
        return;
    }
    console.log(`Listening on port:${port}...`);
})