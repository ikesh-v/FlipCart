const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    items:{
        type:[String],
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    delivery_address:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    },
    order_date:{
        type:Date,
        required:false,
        default:Date.now()
    },
    delivery_date:{
        type:Date,
        required:false
    },
    items_price:{
        type:[Number],
        required:true
    }
});

const products = module.exports = mongoose.model("orders",OrderSchema);