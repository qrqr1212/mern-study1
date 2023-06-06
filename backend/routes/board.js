const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

// 스키마
const {Board} = require('../model/Board');

//미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

// 게시글 리스트
router.get("/list", async (req,res) => {
    console.log("게시글 리스트 -> /api/board/list");
    try {
        const boardList = await Board.find();
        return res.status(200).json({boardList : boardList});    

    } catch (error) {
        res.status(400).json(error);
    }
});

// 특정글 읽기
router.get("/:bno", (req,res) => {

});



// 게시글 등록 페이지 이동
router.get("/new", (req,res) => {
    console.log("게시글 등록 페이지 이동 -> /api/board/new");

});


// 게시글 등록
router.post("/insert",  async (req,res)=> {
    console.log("게시글 등록 -> /api/board/insert");
    const {title, content, author} = req.body;
    console.log(`title : ${title}, content : ${content}, author : ${author}`);

    const board = new Board({
        title : title,
        content : content,
        author : author,
   });
   
   try { 
        await board.save()
       .then(() => {
            res.status(200).json({
                code : 200,
                message : "게시글 등록 성공",
          });
       })
       .catch((error) => {
           res.status(400).json({
               code : 400,
               message : "게시글 등록 실패",
               error : error,
           });
       });

   } catch (error) {
       res.json(error);
   }

});


// 게시글 수정
router.patch("/:bno", (req,res) => {
    
});

// 게시글 삭제
router.delete("/:bno", (req,res) => {

});






module.exports = router;