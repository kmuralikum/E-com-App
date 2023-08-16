const route=require("express").Router()
const category=require("../models/category")


route.get("/",async(req,res)=>{
    const allCategories= await category.find()

    if(!allCategories){
        res.status(500).json({success:false})
    }
    res.json({category:allCategories})
 })

 
 
.get("/:id",async(req,res)=>{
   const id = req.params.id
   const categoryId= await category.findById({_id:id})
   .then((category)=>{
      if(category){
         res.send(category)
      }else{
         res.json({msg:"category ID not found"})
      }
   })
   .catch((err)=>{res.json({error:err})})
 })

 
 
.post("/",async(req,res)=>{
    const newCategory=new category({
            name:req.body.name,
            color:req.body.color,
            icon:req.body.icon
         })

    await newCategory
    .save()
    .then(()=>{
    res.send(newCategory)
    })
    .catch((err)=>console.log(err))
 })

 
 
.put("/:id",async(req,res)=>{
   const id=req.params.id
   const updateCat= await category.findByIdAndUpdate({_id:id},{
      name:req.body.name,
      color:req.body.color,
      icon:req.body.icon
   },{new:true})

   .then((category)=>{
      if(category){
         res.send(category)
      }else{
         res.json({msg:"category not found"})
      }
   })
   .catch((err)=>{res.json({error:err})})
 })



 .delete("/:id",(req,res)=>{
     const id=req.params.id
     
     category.findByIdAndRemove({_id:id})
     .then((category)=>{
     if(category){
      res.json({msg:"deleted Succesfully"})
     }else{
      res.json({msg:"category not found"})
     }
   })
     .catch((err)=>{res.json({error:err})})
})





module.exports=route