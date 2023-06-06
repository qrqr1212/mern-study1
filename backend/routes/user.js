const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

// 스키마
const {User} = require('../model/User');

//미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

// 업로드 설정
const uploadPath =  __dirname + "../../uploads/user";
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, uploadPath) // 파일 업로드 경로
    },
    filename : (req, file, cb) => {
        cb(null, file.fieldname + "." + file.mimetype.split("/")[1]);
    }
})
const upload = multer({storage : storage});

// 라우터

// listAll
router.get('/list', async (req,res) => {
    console.log(' listAll => /api/users/list');
    try {
        const userList = await User.find();
        return res.status(200).json({userList : userList});     
        
    } catch (error) {
        return res.status(400).json(error)
    }
});

// user join
router.post('/join', upload.single("profile_img"), (req, res) => {
    console.log('/api/user/join', req.body);

    const {userId, userPassword, email} = req.body;
    const {fieldname, originalname , mimetype, destination, filename, path, size} = req.file;

    const fileType  = mimetype.split("/")[1];
    const file_name = fieldname + "." + fileType;
    const file_path = uploadPath + "/" + filename;

    const user = new User({
         userId : userId,
         userPassword : userPassword,
         email : email,
         fileName : file_name,
         filePath : file_path,
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
