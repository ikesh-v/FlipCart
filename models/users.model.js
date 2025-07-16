const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    first:{
        type:String,
        required:true
    },
    last:{
        type:String,
        required:true
    },
    phone_no:{
        type:{country_code:String,number:Number},
        required:false,
        unique:true
    },
    email:{
        type:String,
        required:false,
        unique:true
    },
    cart:{
        type:[String],
        required:false,
        default:[]
    },
    wishlist:{
        type:[String],
        required:false,
        default:[]
    },
    recently_viewed:{
        type:[String],
        required:false,
        default:[]
    },
    addresses:{
        type:[{line_1:String,line_2:String}],
        required:false,
        default:[]
    },
    access:{
        type:String,
        required:false,
        default:"customer"
    }
});

const users = module.exports = mongoose.model("users",UserSchema);