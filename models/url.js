const { timeStamp } = require("console");
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHIstory:[{timeStamps:{type:Number}}]
},{timestamps:true});

const URL = mongoose.model('url',urlSchema);


module.exports = URL;