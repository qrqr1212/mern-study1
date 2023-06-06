/*
    jwt가 유효한지 체크하는 미들웨어

*/
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const SECRET_KEY = process.env.SERVICE_KEY

exports.auth = (req,res,next) => {
    // 인증 완료
    try {
        //요청 헤더에 저장된 토큰(req.headers.authorization) + 비밀키를 사용하여 토큰을 req.decoded에 반환
        req.decoded = jwt.verify(req.headers.authorization, SECRET_KEY);
        return next();

    } catch (error) {
        // 토큰의 유효시간이 초과한 경우
        if(error.name === 'TokenExpiredError') {
            return res.status(419).json({
                code : 419,
                message : 'Jwt 토큰이 만료되었습니다.'
            });
        }
        
        // 토큰의 비밀키가 일치하지 않는 경우
        if(error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                code : 401,
                message : '유효하지 않은 토큰입니다.',
            });
        }

    }
}