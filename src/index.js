const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();


/*
 * Setting up the database (mongodb)
 */

if (process.env.ENVIRONMENT == "production") {
    console.info("Mongoose: Mongo starting on production mode");

    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_COLLETION}?retryWrites=true&w=majority`, {
        useNewUrlParser: true
    });
} else {
    console.info("Mongoose: Mongo starting on development mode");

    mongoose.connect("mongodb://db:27017/curriencies", {
        useNewUrlParser: true
    });
}

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongoose: Connection Error: "));
db.once("open", function() {
  console.info("Mongoose: Connected!");
});

/*
 * Starting the server
 */
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("Express: Server activated with port 3333"));
