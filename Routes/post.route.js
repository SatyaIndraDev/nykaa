const express = require("express");
const { auth } = require("../Middleware/auth.middleware");
const { postModel } = require("../Model/post.model");

const postRouter = express.Router();
postRouter.use(auth);


//add
postRouter.post("/", async(req,res) => {
   try{
      const {name,picture,description,gender,category,price,created_at,updated_at} = req.body;
      const post = new postModel({name,picture,description,gender,category,price,created_at,updated_at});
      await post.save();
      res.status(200).json({msg:"Post added", post: req.body});
   }catch(err){
    res.status(400).json({error:err});
   }
});

//get product
postRouter.get("/", async(req,res) => {
   try{
    const name = req.query.title;
    if(name){
        const products = await postModel.find({name:name});
        res.status(200).json({products});
    }else{
        const products = await postModel.find();
        res.status(200).json({products});
    }
   }catch(err){
    res.status(400).json({error:err})
   }
})


postRouter.patch("/update/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        await postModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).json("Updated")
    } catch (err) {
        res.status(400).json({error:err})
    }
})


postRouter.delete("/delete/:id", async(req,res) => {
    try{
     const id  = req.params.id;
    //   const post = await postModel.find({_id:id});
      await postModel.findByIdAndDelete({_id:id});
      res.status(200).json({msg: "post deleted"})
    }catch(err){
        res.status(400).json({error: err});
    }
})




module.exports = {
    postRouter
}