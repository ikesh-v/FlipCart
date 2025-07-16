const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
//for bcrypt
const saltRounds = 10;

//key for jwt
const SecretKey = "hello world";


//import models
const Passwords = require("../../models/passwords.model");
/*
//post code for adding user Passwords
router.post("/", (req, res) => {
    htmlBody = req.body;
    if ( htmlBody.email && htmlBody.password ){
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if(err) {
                res.status(501).json({message:err});
            }else {
                // Store hash in your password DB.
                let newPassword = new Passwords({
                    email:req.body.email,
                    password:hash 
                });
                newPassword.save((err, result) => {
                    if(err) {
                        res.status(501).json({message:err});
                    }else {
                        res.status(201).json({message:"password addded succesfully"});
                    }
                });
            }    
        });
        
    }else {
        res.status(501).send({message:"Not enough information to add new Password"});
    }
});


//post code for checking user Passwords
router.post("/login", (req, res) => {
    htmlBody = req.body;
    if(htmlBody.email && htmlBody.password){
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

//delete code fonewPassword
router.delete("/delete", (req, res ) => {
    if(req.body.email) {
        Passwords.deleteOne({email:req.body.email}, (err, result) => {
            if(err){
                res.status(501).json({message:err, result:result});
            }else{
                if(result["n"] == 0) {
                    res.status(501).json({ message:"unable to delete passwprd record"});
                }else {
                    res.status(200).json({ message:"password record deleted"});
                }
            }
        });
    }else {
        res.status(501).json({ message:"email not included in html body"});
    }

});


//update code fonewPassword
router.post("/update", (req,res) => {
    htmlBody = req.body;
    if(htmlBody.email && htmlBody.password){
        update = {};
        bcrypt.hash(htmlBody.password, saltRounds, (err, hash) => {
            if(err) {
                res.status(501).json({message:err});
            }else {
                // update hash in your password DB.
                update["password"] = hash;

                Passwords.findOneAndUpdate(
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
    }else {
        res.status(501).send({message:"email or password not included in htmlbody"});
    }
});

router.get('/email', verifyToken, function(req,res,next){
    return res.status(200).json(req.body.decodedToken);
});

function verifyToken(req,res,next){
    let token = req.query.token;
    
    jwt.verify(token, SecretKey, function(err, tokendata){
        if(err){
            return res.status(400).json({message:' Unauthorized request', error:err});
        }
        if(tokendata){
            req.body["decodedToken"] = tokendata;
            next();
        }
    });
  }
*/
module.exports = router;