let jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1]
    if(!token){
        res.status(401).send({"Message":"Please login again"})
    }else{
        var decoded = jwt.verify(token, "masai");
        if(decoded){
            let userID=decoded.userID
            req.body.userID=userID
            next()
        }else if(!decoded){
            res.status(401).send({"Message":"Please login again"})
        }else{
            res.status(401).send({"Message":"Please login again"})
        }
    }

}

module.exports={
    authenticate
}