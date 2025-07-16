const express = require("express");
const router = express.Router();

//import models
const Orders = require("../models/orders.model");

//get code for orders
router.get("/:id?", (req, res) => {
    if (req.params.id ){
        Orders.find({_id:req.params.id}, (err, orders ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(orders);                    
            }
        });
    }else {
        Orders.find((err, orders ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(orders);                    
            }
        });
    }
});
//get orders placed by an user
router.get("/users/:id", (req, res) => {
    if (req.params.id ){
        Orders.find({user_id:req.params.id}, (err, orders ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(orders);                    
            }
        });
    }else {
        Orders.find((err, orders ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(orders);                    
            }
        });
    }
});

//post code for adding orders to database
router.post("/", (req, res) => {
    htmlBody = req.body;
    if (htmlBody.name && htmlBody.category && htmlBody.sold_by){
        newOrder = new Orders({
            items:htmlBody.items,
            user_id:htmlBody.user_id,
            delivery_address:htmlBody.delivery_address
        });
        newOrder.save((err) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json({message:"order saved succesfully"});                    
            }
        });
    }else {
        res.status(501).send({message:"Not enough data to add Product"});
    }
});

//delete order code
router.delete("/delete", (req, res) => {
    if(req.body.id) {
        Orders.deleteOne({_id:req.body.id}, (err, result) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                if(result["n"] == 0) {
                    res.status(501).json({message:"Order doesnt exist or wromg id"});
                }else {
                    res.status(201).json({message:"Order deleted succesfully"});      
                }      
            }
        });
    }else {
        res.status(501).json({message:"id not included in htmlbody"});
    }
})


//code to update an order
router.post("/update", (req,res) => {
    htmlBody = req.body;
    if(htmlBody.id){
        update = {}
        if (htmlBody.delivery_address) {
            update.delivery_address = htmlBody.delivery_address;
        }
        if (htmlBody.delivery_date) {
            update.delivery_date = htmlBody.delivery_date;
        }

        Products.updateOne(
            {_id:htmlBody.id},
            update,        
            (err, result) => {
                if(err){
                    res.status(501).json({message:err});
                }else{
                    if(result["n"] == 0) {
                        res.status(501).json({message:"Review doesnt exist or wromg id"});
                    }else {
                        res.status(201).json({message:"Review updated succesfully"});      
                    }      
                }
            });
        }else {
            res.status(501).json({message:"id not included in htmlbody"});
        }
});


module.exports = router;