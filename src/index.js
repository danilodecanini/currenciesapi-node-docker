const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');

/*
* Setting up the database (mongodb) 
*/ 

mongoose.connect('mongodb://db:27017/curriencies', {
    useNewUrlParser: true
});


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongoose: Connection Error: '));
db.once('open', function() {
  console.info("Mongoose: Connected!");
});

/* 
* Starting the server
*/
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('Express: Server activated with port 3333'));