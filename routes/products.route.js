const express = require("express");
const router = express.Router();

//import models
const Products = require("../models/products.model");

//get code for retriving one product with matching id or all products
router.get("/:id?", (req, res) => {
    if (req.params.id ){
        Products.find({_id:req.params.id},(err, Products ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(Products);                    
            }
        });
    }else {
        Products.find((err, Products ) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json(Products);                    
            }
        });
    }
});

//get code for retriving products from a category
router.get("/category/:category", (req, res) => {
    Products.find( { category:req.params.category }, ( err, Products ) => {
        if(err){
            res.status(501).json({message:err});
        }else{
            res.status(201).json(Products);                    
        }
    });
});


//post code for adding  products to database
router.post("/", (req, res) => {
    htmlBody = req.body;
    if (htmlBody.name && htmlBody.category && htmlBody.sold_by){
        newProduct = new Products({
            name:htmlBody.name,
            category:htmlBody.category,
            sold_by:htmlBody.sold_by
        });
        newProduct.save((err) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                res.status(201).json({message:"Product saved succesfully"});                    
            }
        });
    }else {
        res.status(501).json({message:"Not enough data to add Product"});
    }
});

//delete product code
router.delete("/delete", (req, res) => {
    if(req.body.id) {
        Products.deleteOne({_id:req.body.id}, (err, result) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                if(result["n"] == 0) {
                    res.status(501).json({message:"Product doesnt exist or wromg id"});
                }else {
                    res.status(201).json({message:"Product deleted succesfully"});      
                }      
            }
        });
    }else {
        res.status(501).json({message:"id not included in htmlbody"});
    }
})


//update Product data
router.post("/update", (req,res) => {
    htmlBody = req.body;
    if(htmlBody.id){
        update = {}
        if (htmlBody.name) {
            update.name = htmlBody.name;
        }
        if (htmlBody.category) {
            update.category = htmlBody.category;
        }
        // if (htmlBody.sold_by) {
        //     update.sold_by = htmlBody.sold_by;
        // }//you shouldn't be able to update sold_by
        if (htmlBody.hightlights) {
            update.hightlights = htmlBody.hightlights;
        }
        if (htmlBody.full_details) {
            update.full_details = htmlBody.full_details;
        }
        if (htmlBody.price) {
            update.price = htmlBody.price;
        }

        Products.updateOne(
            {_id:htmlBody.id},
            update,        
            (err, result) => {
                if(err){
                    res.status(501).json({message:err});
                }else{
                    if(result["n"] == 0) {
                        res.status(501).json({message:"Update unsuccesfull, Product doesnt exist or wromg id"});
                    }else {
                        res.status(201).json({message:"Product updated succesfully"});      
                    }      
                }
        });
    }else {
        res.status(501).json({message:"id not included in htmlbody"});
    }
});
module.exports = router;