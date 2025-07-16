const mongoose =require("mongoose");

const PasswordScheme = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
        required:false
    },
    // hash:{
    //     type:String,
    //     required:true
    // },
    password:{
        type:String,
        required:true
    }

});

const passwords = module.exports = mongoose.model("passwords", PasswordScheme);