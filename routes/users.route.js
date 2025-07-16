const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();


//for bcrypt
const saltRounds = 10;

//key for jwt
const SecretKey = "hello world";

//import models
const Users = require("../models/users.model");
const Passwords = require("../models/passwords.model");

/*Disabled
//get code for retriving one user with matching id or all users
router.get("/:id?", (req, res) => {
    if (req.params.id ){
        Users.findOne({_id:req.params.id},(err, users ) => {
            if(err){
                res.status(501).send({message:err});
            }else{
                res.status(201).json(users);
            }
        });
    }else {
        Users.find((err, users ) => {
            if(err){
                res.status(501).send({message:err});
            }else{
                res.status(201).json(users);
            }
        });
    }
});
*/

//get code for retriving one user with matching id or all users
router.get("/email/", verifyToken, (req, res) => {
    if ( req.body.decodedToken.email ){
        Users.findOne({email:req.body.decodedToken.email},(err, users ) => {
            if(err){
                res.status(501).send({message:err});
            }else{
                res.status(201).json(users);
            }
        });
    }else {
        res.status(501).json({ message:"email not included in html body"});
    }
});

//get code to get user email from jwt
router.get("/getemail", verifyToken, (req, res, next) => {
    return res.status(200).json(req.body.decodedToken);
});


//post code for adding users
router.post("/", (req, res) => {
    htmlBody = req.body;
    if (htmlBody.first && htmlBody.last && htmlBody.email && htmlBody.password){
        newUser = new Users({
            first:htmlBody.first,
            last:htmlBody.last,
            email:htmlBody.email
            //phone_no:htmlBody.phone_no
        });
        newUser.save((err, result) => {
            if(err) {
                res.status(501).json({message:err});
            }else {
                //code for saving password
                bcrypt.hash(htmlBody.password, saltRounds, (err, hash) => {
                    if(err) {
                        res.status(501).json({message:err});
                    }else {
                        // Store hash in your password DB.
                        let newPassword = new Passwords({
                            email:htmlBody.email,
                            password:hash 
                        });
                        newPassword.save((err, result) => {
                            if(err) {
                                res.status(501).json({message:err});
                            }else {
                                res.status(201).json({message:"user addded succesfully, password addded succesfully"});
                            }
                        });
                    }    
                });  
            }
        });
    } else {
        return res.status(501).json({message: 'Error registering user, not enough data'});
    }
});

//post code for give jwt to users
router.post("/login", (req, res) => {
    htmlBody = req.body;
    if (htmlBody.email && htmlBody.password){
        let checkDocument ={"email":htmlBody.email};
    
        Passwords.findOne(checkDocument, (err, result) => {
            if(err) {
                res.status(501).json({message:err});
            }else {
                //res.send(result);
                bcrypt.compare(htmlBody.password, result.password, function(err, compareResult) {
                    // result == true
                    if(err) {
                        res.status(501).json({message:err});
                    }else {
                        if(compareResult == true){
                            let token = jwt.sign({ email:result.email }, SecretKey, {expiresIn : '3h'});
                            res.status(200).json({ "token":token });
                            //res.status(201).json({ message:"login successful"});
                        }else{
                            res.status(501).json({message:"invalid password"});
                        }
                    }
                });
            }
        });
    }else {
        res.status(501).send({message:"Not enough information to check Password"});
    }
});

//code for deleting a user
router.delete("/delete", verifyToken, (req, res) => {
    if ( req.body.decodedToken.email ){
        Users.deleteOne({email:req.body.email}, (err, result) => {
            if(err){
                res.status(501).json({message:err});
            }else{
                if(result["n"] == 0) {
                    res.status(501).json({ message:"Users doesnt exist or wromg id"});
                }else {
                    Passwords.deleteOne({email:req.body.email}, (err, result) => {
                        if(err){
                            res.status(501).json({message:err, result:result});
                        }else{
                            if(result["n"] == 0) {
                                res.status(501).json({ message:"unable to delete passwprd record"});
                            }else {
                                res.status(200).json({ message:"Users and password deleted succesfully"}); 
                            }
                        }
                    });                    
                }
            }
        });
    }else {
        res.status(501).json({ message:"email not included in html body"});
    }
});

//code to update user data
router.post("/update", verifyToken, (req,res) => {
    htmlBody = req.body;
    if ( htmlBody.email ){
        update = {}
        if (htmlBody.name) {
            update.name = htmlBody.name;
        }
        if (htmlBody.phone_no) {
            update.phone_no = htmlBody.phone_no;
        }
        if (htmlBody.cart) {
            update.cart = htmlBody.cart;
        }
        if (htmlBody.wishlist) {
            update.wishlist = htmlBody.wishlist;
        }
        if (htmlBody.addresses) {
            update.addresses = htmlBody.addresses;
        }
        if (htmlBody.recently_viewed) {
            update.recently_viewed = htmlBody.recently_viewed;
        }
        /*
        if (htmlBody.email) {
            update.email = htmlBody.email
        }
        */
        Users.updateOne(
            {email:htmlBody.email},
            update,        
            (err, result) => {
                if(err){
                    res.status(501).json({message:err});
                }else{
                    if(result["n"] == 0) {
                        res.status(501).json({ message:"Users doesnt exist or wromg id or nothing to update"});
                    }else {
                        res.status(201).json({ message:"Users updated"});                    
                    }
                }
        });

        if( htmlBody.password ){
            update = {};
            bcrypt.hash(htmlBody.password, saltRounds, (err, hash) => {
                if(err) {
                    res.status(501).json({message:err});
                }else {
                    // update hash in your password DB.
                    update["password"] = hash;

                    Passwords.updateOne(
                        {email:htmlBody.email},
                        update,        
                        (err, result) => {
                            if(err) res.status(501).json({message:err});
                            else{
                                // res.json(result);
                                if(result["n"] == 0) {
                                    res.status(501).send({message:"Update unsuccesfull"});
                                }else {
                                    res.status(200).send({message:"Password updated"});
                                }
                            }
                    });
                }
            });
        }        
    }else {
        res.status(501).send({message:"email not included in htmlbody"});
    }
});



function verifyToken(req,res,next){
    let token = req.query.token;
    if( typeof(token) != 'undefined' ) {
        jwt.verify(token, SecretKey, function(err, tokendata){
            if(err){
                return res.status(400).json({message:' Unauthorized request'});
            }
            if(tokendata){
                req.body["decodedToken"] = tokendata;
                req.body["email"] = tokendata.email;               
            }else {
                return res.status(400).json({message:'can fetch data from Token'});
            }
        });
        next();
    }else {
        return res.status(403).json({message:'Forbidden:Token required'});
    }   
}

module.exports = router;