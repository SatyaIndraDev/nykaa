const express = require("express");
const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
const { blackList } = require("../blacklist");

const userRouter = express.Router();

userRouter.post("/register", async(req,res) => {
  try{
    const {name, email, pass, city, age} = req.body;
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        res.status(200).json({"msg":"Email already register"});
    }else{
      if(pass.length<8){
          res.status(400).json({msg: "Password should have a lenght of minimum 8 character and also contain one uppercase character, one lowerCase character, at least one number and at least one special character"});
      }else{
        bcrypt.hash(pass, 5, async(err, hash) => {
          if(err){
            res.status(400).json({error:err})
          }else{
              const user = new userModel({name,email,pass:hash,city,age});
             await user.save();
            res.status(200).json({msg: "User has been register", "registeredUser": req.body})
          }
         })
      }
    }
  }catch(err){
    res.status(400).json({error: err})
  }
})


userRouter.post("/login", async(req,res) => {
    try{
     const {email, pass} = req.body;
     const user = await userModel.findOne({email});
     bcrypt.compare(pass, user.pass, (err, decode) => {
        if(decode){
          const token = jwt.sign({course: "BE"}, "masai", {expiresIn: "7d"});
          res.status(200).json({msg: "Login successful!", token})
        }else{
            res.status(400).json({error:err});
        }
     })
    }catch(err){
        res.status(400).json({error: err})
    }
})


userRouter.get("/logout", (req,res) => {
    try{
     const token = req.headers.authorization.split(" ")[1];
     blackList.push(token);
     res.status(200).json({msg:"User has been logged out"})
    }catch(err){
        res.status(400).json({error:err})
    }
})


module.exports = {
    userRouter
}