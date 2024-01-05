const express = require("express");
const { auth } = require("../MiddleWare/authmiddleware");
const { BlogModel } = require("../Model/Blog.model");


const BlogRouter = express.Router();
BlogRouter.use(auth);


BlogRouter.get("/", async(req,res) => {
    try{
        const products=await BlogModel.find()
        if(products){
            res.status(200).json({products})
        }else{
            res.status(400).json({msg:"Post not Found"})
        }
    }catch(err){
        res.status(400).json({error:err})
    }
})


BlogRouter.post("/", async(req,res) => {
   try{
    console.log(req.body);
    const post = new BlogModel(req.body);
    await post.save();
    res.json({msg: "Post create successfully"});     
   }catch(err){
    res.json(err);
   }
})


BlogRouter.patch("/update/:id", async (req,res) => {
    try{
       const postID = req.params.id;
        await BlogModel.findByIdAndUpdate({_id:postID}, req.body);
        res.status(200).json({"msg": "updated"})
    }catch(err){
        res.status(400).send(err);
    }
})


BlogRouter.delete("/delete/:id", async(req,res) => {
    try{
        const postID = req.params.id;
         await BlogModel.findByIdAndDelete({_id:postID}, req.body);
         res.status(200).json({"msg": "title has been deleted"})
     }catch(err){
         res.status(400).send(err);
     }
})


module.exports = {
    BlogRouter
}