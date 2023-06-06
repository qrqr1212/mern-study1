const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload");

const app = express();
const router = express.Router();

require('dotenv').config(); // 환경 변수 모듈 불러오기
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

//middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

// router
app.use('/api', require('./routes/index.js'));
app.use('/api/user', require('./routes/user.js'));
app.use('/api/process', require('./routes/login.js'));
app.use('/api/board', require('./routes/board.js'));

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

