const express = require('express');
const router = express.Router();
const {User} = require('../model/User');

// insert
router.post('/insert', async (req,res) => {
    console.log('/api/user/insert');

    const {userId, userPassword, email} = req.body;
    const user = new User({
         userId : userId,
         userPassword : userPassword,
         email : email
    });
    try { 
    
        await user.save()
        .then(() => {
            res.status(200).json();
        })
        .catch((error) => {
            res.status(400).json(error);
        });

    } catch (error) {
        res.json(error);
    }
});

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
