const mongoose =require("mongoose");

const ReviewScheme = mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    product_id:{
        type:String,
        required:true
    },
    review:{
        type:{title:String, description:String},
        required:false
    },
    rating:{
        type:Number,
        required:true
    }


});

const reviews = module.exports = mongoose.model("reviews", ReviewScheme);