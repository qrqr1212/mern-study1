// BoardSchema

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    bno : {type : Number , default : 0},
    title : {type : String, required : true},
    content : {type : String, required : true},
    author : {type : String, required : true},
},{
    timestamps : true
},{collection : 'boards'});

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board }
