const express = require("express");
const router = express.Router();

//import models
const Reviews = require("../models/reviews.model");

//get code for reviews
router.get("/:id?", (req, res) => {
    if (req.params.id ){
        Reviews.find({_id:req.params.id}, (err, reviews ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(reviews);                    
            }
        });
    }else {
        Reviews.find((err, reviews ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(reviews);                    
            }
        });
    }
});
//to get reviews related to a user
router.get("/users/:id", (req, res) => {
    if (req.params.id ){
        Reviews.find({user_id:req.params.id}, (err, reviews ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(reviews);                    
            }
        });
    }else {
        Reviews.find((err, reviews ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(reviews);                    
            }
        });
    }
});

//to get reviews related to a review
router.get("/products/:id", (req, res) => {
    if (req.params.id ){
        console.log("debug"+req.params.id);
        Reviews.find({product_id:req.params.id}, (err, reviews ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(reviews);                    
            }
        });
    }else {
        Reviews.find((err, reviews ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(reviews);                    
            }
        });
    }
});

//post code for adding reviews
router.post("/", (req, res) => {
    htmlBody = req.body;
    if (htmlBody.user_id && htmlBody.product_id && htmlBody.rating){
        let newReview = new Reviews({
            user_id:req.body.user_id,
            product_id:req.body.product_id,
            rating:req.body.rating,    
        });
        if (req.body.review) {
                newReview.review = req.body.review;
        }
        newReview.save((err, result) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json({message:"Contact addded succesfully"});                    
            }
        });
    }else {
        res.status(501).json({message:"Not enough information to add review"});
    }
});

//delete code for review
router.delete("/delete", (req, res ) => {
    if(req.body.id) {
        Reviews.deleteOne({_id:req.body.id}, (err, result) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                if(result["n"] == 0) {
                    res.status(501).json({message:"Review doesnt exist or wromg id"});
                }else {
                    res.status(201).json({message:"Review deleted succesfully"});      
                }      
            }
        });
    }else {
        res.status(501).json({message:"id not included in htmlbody"});
    }
});

//update code for review
router.post("/update", (req,res) => {
    htmlBody = req.body;
    if(htmlBody.id){
        update = {}
        if (htmlBody.rating) {
            update.delivery_address = htmlBody.delivery_address;
        }
        if (htmlBody.review) {
            update.review = htmlBody.review;
        }
        
        Reviews.updateOne(
            {_id:htmlBody.id},
            update,        
            (err, result) => {
                if(err){
                    res.status(501).json({message:err});
                }else{
                    if(result["n"] == 0) {
                        res.status(501).json({message:"Review doesnt exist or wromg id"});
                    }else {
                        res.status(201).json({message:"Review deleted succesfully"});      
                    }      
                }
        });
    }else {
        res.status(501).json({message:"id not included in htmlbody"});
    }
});


module.exports = router;