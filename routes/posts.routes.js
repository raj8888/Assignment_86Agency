const express=require('express')
const{postModel}=require("../models/posts.models")
const{userModel}=require("../models/user.model")
const {authenticate}=require("../middlewares/authentication.middleware")

const postRouter=express.Router()

postRouter.use(authenticate)

postRouter.post("/",async(req,res)=>{
    try {
        if(req.body.title && req.body.content){
            let userID=req.body.userID
            let title=req.body.title
            let content=req.body.content
            let post=new postModel({userID,title,content})
            await post.save()
            res.status(201).send({"Message":"Post Created Successfully"})
        }else{
            res.status(401).send({"Message":"Please fill all Information"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})

postRouter.get("/",async(req,res)=>{
    try {
        let userID=req.body.userID
    let temp=await userModel.findById({_id:userID})
    let tempArray=temp.followers
    if(!tempArray || tempArray.length==0){
        res.status(201).send({"Message":"For getting post first follow someone"})
    }else{
         let Allposts=[]
         for(let i=0;i<tempArray.length;i++){
            let temp=await postModel.find({userID:tempArray[i]})
            Allposts.push(temp)
         }
         res.status(201).send({"Message":"Here your all posts",posts:Allposts})
    }
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})

postRouter.get("/:id",async(req,res)=>{
    try {
        let id=req.params.id
        let data=await postModel.findById({_id:id})
        res.status(201).send({"Message":"Here your post",post:data})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})

postRouter.post("/like/:id",async(req,res)=>{
    try {
        let userID=req.body.userID
        let postID=req.params.id
        await post.findByIdAndUpdate( {_id:postID},{ $push: { likes: userID } })
        res.status(201).send({"Message":"Post Liked!"})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})

postRouter.post("/comment/:id",async(req,res)=>{
    try {
        let postID=req.params.id
        let userID=req.body.userID
        let comment=req.body.comment
        let obj={
            userID,comment
        }
        await post.findByIdAndUpdate( {_id:postID},{ $push: { comments: obj } })
        res.status(201).send({"Message":"comment done!"})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})

postRouter.put("/:id",async(req,res)=>{
    try {
    let title=req.body.title
    let content=req.body.content
    if(title && content){
        let postID=req.params.id
        let userID=req.body.userID
        let getData=await postModel.findById({_id:postID})
        if(getData.userID==userID){
            await postModel.findByIdAndUpdate({_id:postID},{title,content})
            res.status(201).send({"Message":"Post Update successfully!"})
        }else{
            res.status(401).send({"Message":"You can't update this post!"})
        }
    }else{
        res.status(401).send({"Message":"Please fill all Information"})
    }
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})

postRouter.delete("/:id",async(req,res)=>{
    try {
        let userID=req.body.userID
        let postID=req.params.id
        let getData=await postModel.findById({_id:postID})
        if(getData.userID==userID){
            await postModel.findByIdAndDelete({_id:postID})
            res.status(201).send({"Message":"Post Deleted Successfully!"})
        }else{
            res.status(401).send({"Message":"You can't delete this post!"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})
module.exports={
    postRouter
}