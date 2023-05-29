// User Schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId : { type : String, required : true, unique : true},
    userPassword : { type : String, required : true},
    email : { type : String, default : false},
    fileName : {type : String },
    filePath : {type : String},
},{
    timestamps : true
},{collection : 'users'});


const User = mongoose.model('User', userSchema)

module.exports = { User }