const { default: mongoose } = require('mongoose');
const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});

const User = mongoose.model('user',userSchema);

module.exports = User;