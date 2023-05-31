const express=require('express')
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const{userModel}=require("../models/user.model")
const {authenticate}=require("../middlewares/authentication.middleware")

const userRouter=express.Router()

userRouter.post("/auth/signup",async(req,res)=>{
    
   try{
    if(!req.body.name && !req.body.email && !req.body.password){
        res.status(401).send({"Message":"Please Fill All Information"})
    }else{
            let {name,email,password}=req.body
            let findEmail=await userModel.findOne({email})
            if(findEmail){
                res.status(401).send({"Message":"Already registered"})
            }else{
                bcrypt.hash(password,5,async(err,hash)=>{
                    if(err){
                        console.log(err)
                        res.status(401).send({"Message":"Server Error"})
                    }else{
                        let user=new userModel({name,email,password:hash})
                        await user.save()
                        res.status(201).send({"Message":"User Registered"})
                    }
                });
            }
    }

    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})

userRouter.post("/auth/login",async(req,res)=>{
    try {
        if(req.body.email && req.body.password){
            let {email,password}=req.body
            let findEmail=await userModel.findOne({email})
            if(!findEmail){
                res.status(201).send({"Message":"Register First"})
            }else{
                let hashpass=findEmail.password
                bcrypt.compare(password, hashpass, function(err, result) {
                    if(err){
                        console.log(err)
                        res.status(401).send({"Message":"Please login again"})
                    }else if(result){
                        let token=jwt.sign({userID:findEmail._id,userPass:password},"masai")
                        res.status(201).send({"Message":"Login Successfull","token":token})
                    }else{
                        res.status(401).send({"Message":"Please login again"})
                    }
                });
            }
        }else{
            res.status(401).send({"Message":"Please login again"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})

userRouter.use(authenticate)

userRouter.post("/follow/:id",async(req,res)=>{
    try {
        if(req.body.userID==req.params.id){
            res.status(401).send({"Message":"This is your own ID."})
        }else{
        let userID=req.body.userID
        let followID=req.params.id
        let check=await userModel.findOne({ _id: userID, following: followID })
        if(check){
            res.status(201).send({"Message":"Already Followed!"})
        }else{
           await userModel.findByIdAndUpdate( {_id:userID},{ $push: { following: followID } })
           await userModel.findByIdAndUpdate( {_id:followID},{ $push: { followers: userID } })
           res.status(201).send({"Message":"Followed to User!"})
        }
        }
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})

userRouter.post("/unfollow/:id",async(req,res)=>{
    try {
        let userID=req.body.userID
        let unfollowID=req.params.id
        let check=await userModel.findByIdAndUpdate( {_id:userID},{ $pull: { following: unfollowID } })
        await userModel.findByIdAndUpdate( {_id:unfollowID},{ $pull: { followers: userID } })
        if(check){
           res.status(201).send({"Message":"Unfollowed to the User!"})
        }else{
            res.status(201).send({"Message":"You are not follwing this user!"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"Message":"Server Error"})
    }
})

module.exports={
    userRouter
}