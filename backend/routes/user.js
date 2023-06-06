const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const path = require("path");
const serveStatic = require("serve-static"); // 특정 폴더를 패스로 접근 가능하게 하는 모듈.
// 스키마
const {User} = require('../model/User');

//미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

app.use("/public", serveStatic(path.join(__dirname,"public")))  //public (실제)폴더의 이름을 써준것
app.use("/upload", serveStatic(path.join(__dirname,"uploads"))) //use앞은 가상주소(upload) / 뒤에는 실제 주소 (uploads)

// 업로드 설정
const storage = multer.diskStorage({
    destination : function (req, file, callback) {
        callback(null, "uploads");
    },
    filename : function(req, file, callback) {
        const extension = path.extname(file.originalname);            // 파일 확장자 추출
        const basename = path.basename(file.originalname, extension); // 파일명 추출
        const uploadPath = basename + extension; // 파일명.확장자
        console.log("파일 업로드 Target -> :: " + uploadPath);

        callback(null, uploadPath)// 파일이름이 abc.txt로 들어간다.
		// callback(null,file.originalname); 위와 동일하다
		// callback(null, basename + Date.now() + extension); // 파일이름 + 현재 날짜를 붙임
		//callback(null,Date.now().toString() + path.extname(file.originalname)); //현재 날짜만 붙임.
    }
});

// 위에서 만든 storage를 기준으로 Upload 수행.
const upload = multer({
    storage : storage,
    limits : {
        files : 10,
        fileSize : 1024 * 1024 * 1024,
    }
});

// 라우터 처리

// 회원가입
router.post('/join', upload.single("profile_img"), (req, res) => {
    console.log(' 회원가입 -> /api/user/join', req.body);

    const {userId, userPassword, email} = req.body; // 회원 정보
    const {filename, originalname , mimetype, size} = req.file; //파일정보

    console.log("원본 파일명 : " + originalname);
    console.log("저장 파일명 : " + filename);
    console.log("MimeType : " + mimetype);
    console.log("파일 크기 : " + size);

    const extension = path.extname(originalname);            // 파일 확장자 추출
    const basename = path.basename(originalname, extension); // 파일명 추출
    const uploadPath = basename + extension; 

    console.log("파일 업로드 위치 및 파일명 : " + uploadPath);

    const user = new User({
         userId : userId,
         userPassword : userPassword,
         email : email,
         fileName : filename,
         filePath : uploadPath,
    });
    
    try { 
        user.save()
        .then(() => {
            res.status(200).json({
                code : 200,
                message : 'success'
            });
        })
        .catch((error) => {
            res.status(400).json({
                code : 400,
                message : 'fail',
                error : error,
            });
        });

    } catch (error) {
        res.json(error);
    }
});


// 유저 리스트
router.get('/list', async (req,res) => {
    console.log(' listAll => /api/users/list');
    try {
        const userList = await User.find();
        return res.status(200).json({userList : userList});     
        
    } catch (error) {
        return res.status(400).json(error)
    }
});


// readOne
router.get('/:userId', async (req,res) => {
    console.log(" readOne => /api/user/:userId")
    try{
        const user = await User.findById(req.params.userId);

    } catch (error) {
        return res.status(400).json(error);
    }
})

// update
router.patch("/update/:userId", async (req,res) => {
    console.log(" update => /api/user/update:userId")
    try {
        await User.findByIdAndUpdate(req.params.userId, req.body)

    } catch(error) {
        return res.status(400).json(error);
    }
});

// delete
router.delete("/delete/:userId", async(req, res) => {
    console.log("delete => /api/user/delete/:userId")
    try {
        await User.findByIdAndDelete(req.params.userId);
        return res.status(200).json();

    } catch(error) {
        return res.status(400).json(error);
    }
});


module.exports = router;
