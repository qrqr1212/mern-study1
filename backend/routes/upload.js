const express = require('express');
const router = express.Router();
const multer = require('multer');

// multer-opitional
const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, "../upload/images");
    },
    filename : (req, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage : storage }).single("profile_img");

//Router
router.post("/", (req,res) => {

    upload(req, res, (err) => {
        if(err) {
            return res.json({ success : false, err });
        }

        return res.json({
            success : true,
            image : res.req.file.path,
            fileName : res.req.file.filename,
        });

    });
});

export default router;