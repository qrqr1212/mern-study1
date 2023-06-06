const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SERVICE_KEY = process.env.JWT_SERVICE_KEY;

//미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

// 스키마
const {User} = require('../model/User');

//login
router.post("/login",  async (req,res, next) => {
    console.log("Login => /api/process/login");

    const {userId, userPassword} = req.body;
    try {
        const userInfo =  await User.findOne({ "userId" : userId , "userPassword" : userPassword });
        // 토큰 발급
        token = jwt.sign({
            type : 'JWT',
            userId : userInfo.userId,
            profile : userInfo.filePath,
        }
        , JWT_SERVICE_KEY
        , {
            expiresIn : '30m', // 만료시간 30분
            issuer : 'leeyongbin', // 토큰 발급자
        })
        console.log("token is created -> " + token);

        return res.status(200).json({
            code : 200,
            message : 'token is created',
            token : token,
            userInfo : userInfo,
        })
    
       //return res.status(200).json({userInfo});

    } catch (error) {
        return res.status(400).json(error);
    }
});


module.exports = router;