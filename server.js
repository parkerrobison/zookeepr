const fs = require('fs');
const path = require('path');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')
// this line of code instantiates the server
const PORT = process.env.PORT || 3001;
// app represents the single instance of the express.js server
const app = express();
// the following app.use() methods need to be set up everytime if you create
// a server that's looking to accept POST data.
//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// this uses middleware to to make the public file readily available.
app.use(express.static('public'));
const { animals } = require('./data/animals.json');

// this method lets our server listen. 
app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}!`);
});