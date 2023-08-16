const route= require("express").Router()
const user = require("../models/user")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")

route.get("/",async(req,res)=>{
   const allUsers= await user.find().select("-passwordHash")
   res.json({users:allUsers})
})

route.get("/:id",async(req,res)=>{
  const id=req.params.id
 
  const userid=await user.findById({_id:id}).select("-passwordHash")
  .then((user)=>{
    if(user){
      res.send(user)
    }else{
      res.json({msg:"user not found"})
    }
  })
  .catch((err)=>{res.json({error:err})})
})

route.post("/",async(req,res)=>{

    const newUser=new user({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password,10),
      phone: req.body.phone,
      isAdmin: req.body.admin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city:req.body.city,
      country:req.body.country
    })

   await newUser
    .save()
    .then((user)=>{
      if(user){
         res.send(user)
      }else{
         res.json({msg:"User cannot be created"})
    }
    })
    .catch((err)=>{
      res.json({error:err})
    })

})



.put("/:id",(req,res)=>{

  const id=req.params.id
   user.findByIdAndUpdate({_id:id},{

      name: req.body.name,
      email: req.body.email,  
      passwordHash: bcrypt.hashSync(req.body.password,10),
      phone: req.body.phone,
      isAdmin: req.body.admin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city:req.body.city,
      country:req.body.country
   },{new:true})

   .then((user)=>{
       if(user){
        res.send(user)
       }else{
        res.json({msg:"user Id cannot be Found"})
       }
   })
   .catch((err)=>{
    res.json({error:err})
   })
})

.delete("/:id",async(req,res)=>{
  const id=req.params.id
  
  await user.findByIdAndRemove({_id:id})
  .then((user)=>{
    if(user){
      res.json({msg:"deleted successfully"})
    }else{
      res.json({msg:"user not found"})
    }
   
  })
  .catch((err)=>{
     res.json({error:err})
  })
})

.get("/get/count",async(req,res)=>{
  const userCount=await user.countDocuments()
  .then((count)=>{
    if(!userCount){
      res.json({Success:false})
    }else{
      res.json({usersCount:userCount})
    }
  })
})





  .post("/login",async(req,res)=>{
  const User=await user.findOne({email:req.body.email})
   

  try{
  if(!User){
      res.status(400).send("user not found")
     }

  if(User&&bcrypt.compareSync(req.body.password,User.passwordHash)){
     
      const secret=process.env.secret
      const token=jwt.sign(
          {
          userId:User.id,
          isAdmin:User.isAdmin
          },
          secret ,//"secret"
          {expiresIn:"1d"}
        )
  
    res.send({user:User.email,token:token})

  }else{
    res.status(400).send("invalid Password")
  }


 }catch(err){
    res.json({error:err})
  }

})

.post("/register",async(req,res)=>{
  const newUser= new user({
   
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password,10),
      phone: req.body.phone,
      isAdmin: req.body.admin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city:req.body.city,
      country:req.body.country
  })
  await newUser
  .save()
  .then((user)=>{
    if(user){
     res.send(user)
    }else{
      res.status(400).json({msg:"user cannot be registered"})
    }
  })
  .catch((err)=>{
    res.json({error:err})
  })
})



module.exports=route


