const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

const mongoose = require('mongoose');

require('dotenv').config();
const PORT = 5000;
const MONGO_URL = 'mongodb://localhost:27017/testDB';

//middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

// router
app.use('/api', require('./routes/index.js'));
app.use('/api/user', require('./routes/user.js'));

//Db connection
mongoose.connect(MONGO_URL);
var db = mongoose.connection;

db.on('error', () => {
    console.log('mongodb err')
})

db.once('open', () => {
    console.log('moongoose connection :: mongodb://localhost:27017/testDB');
})

// server start
app.listen(PORT ,() => {
    console.log("SERVER START PORT : 5000 , https://localhost:5000");
});

