const express=require("express")
const{connection}=require("./config/db")
const{userRouter}=require('./routes/users.routes')
const{postRouter}=require('./routes/posts.routes')
require('dotenv').config()

let app=express()

app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on port 4500`)
})