const express = require("express");
const router = express.Router();

//import models
const Orders = require("../models/orders");

//get code for orders
router.get("/:id?", (req, res) => {
    if (req.params.id ){
        Orders.find({_id:req.params.id}, (err, orders ) => {
            res.json(orders);
        });
    }else {
        Orders.find((err, orders ) => {
            res.json(orders);
        });
    }
});
//get orders placed by an user
router.get("/users/:id", (req, res) => {
    if (req.params.id ){
        Orders.find({user_id:req.params.id}, (err, orders ) => {
            res.json(orders);
        });
    }else {
        Orders.find((err, orders ) => {
            res.json(orders);
        });
    }
});

//post code for orders to database
router.post("/", (req, res) => {
    htmlBody = req.body;
    if (htmlBody.name && htmlBody.category && htmlBody.sold_by){
        newOrder = new Orders({
            items:htmlBody.items,
            user_id:htmlBody.user_id,
            delivery_address:htmlBody.delivery_address
        });
        newOrder.save((err) => {
            if(err) {
                res.send("Error saving Product:"+err);
            }else {
                res.send("Product saved succesfully");
            }
        });
    }else {
        res.send("Not enough data to add Product");
    }
});

//delete order code
router.delete("/delete", (req, res) => {
    if(req.body.id) {
        Orders.deleteOne({_id:req.body.id}, (err, result) => {
            if(err){
                res.send("Error deleting order:"+err);
            }else{
                if(result["n"] == 0) {
                    res.send("order doesnt exist or wromg id");
                }else {
                    res.send("order deleted succesfully");
                }
            }
        });
    }else {
        res.send("id not included in htmlbody");
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

        Products.findOneAndUpdate(
            {_id:htmlBody.id},
            update,        
            (err, result) => {
            if(err) res.send(err);
            else{
                if(result["n"] == 0) {
                    res.send("Update unsuccesfull");
                }else {
                    res.send("order updated");
                }
            }
        });
    }else {
        res.send("id not included in htmlbody");
    }
});


module.exports = router;