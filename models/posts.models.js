const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    userID:String,
    title:String,
    content:String,
    likes:[],
    comments:[]
})

const postModel=mongoose.model("posts",postSchema)
module.exports={
    postModel
}