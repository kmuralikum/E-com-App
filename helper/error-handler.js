let errorHandler=(err,req,res,next)=>{
    if(err.name==="UnauthorizedError"){
       return res.status(400).json({msg:"user is not Authorized"})
    }

    if(err.name==="validationError"){
        res.status(400).json({msg:"Validation Error"})
    }

    res.status(500).send(err)
}

module.exports=errorHandler