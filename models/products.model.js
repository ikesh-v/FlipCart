const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    highlights:{
        type:[String],
        required:false
    },
    full_details:{
        type:String,
        required:false
    },
    sold_by:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

const products = module.exports = mongoose.model("products",ProductSchema);