const route=require("express").Router()
const product=require("../models/product")
const category=require("../models/category")


route.get(`/`,async(req,res)=>{
let filter={}
   if(req.query.category){
     filter={category:req.query.category.split(',')}
   }

    const allProduct=await product.find(filter).populate("category")   ///select("name price brand -_id")
    res.json({products:allProduct})
    })


route.get("/:id",async(req,res)=>{
        const id=req.params.id

        const productById=await product.findById({_id:id}).populate("category")
        .then((product)=>{
          if(product){
            res.send(product)
          }else{
            res.json({msg:"product Id not found"})
          }
        })
        .catch((err)=>{res.json({error:err})})
    })



route.post(`/`,async(req,res)=>{
    
    const Category=await category.findById(req.body.category)
    if(!Category){
        res.status(400).json({msg:"Invalid Category"})
        return; 
    }
    

    let newProduct= new product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })

    newProduct
    .save()
    .then((product)=>{
        if(product){
            res.send(product)
        }else{
            res.json({msg:"product cannot be posted"})
        }
    })
    .catch((err)=>{res.json({error:err})})
})




.put(`/:id`,async(req,res)=>{
   
    const Category=await category.findById(req.body.category)
    if(!Category) return res.json({msg:"Invalid Category"})


    const id=req.params.id
    await product.findByIdAndUpdate({_id:id},{
    
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured
   },
   {new:true})

    .then((product)=>{
        if(product){
            res.send(product)
        }else{
            res.status(500).json({msg:"product cannot be Updated"})
        }
    })
    .catch(()=>{res.json({error:"Invalid Product ID"})})
})




.delete(`/:id`,async(req,res)=>{
    const id=req.params.id
    await product.findByIdAndRemove({_id:id})
    .then(()=>{
        res.json({msg:"Deleted Successfully"});
    })
    .catch((err)=>console.log(err))
})

.get("/get/count",async(req,res)=>{
    const productCount =await product.countDocuments()
    if(!productCount){
        res.json({success:false})
    }
  res.json({count:productCount})
   
})

.get("/get/featured",async(req,res)=>{
    const featuredProduct= await product.find({isFeatured:true})

    if(!featuredProduct){
        res.json({success:false})
    }
    res.send(featuredProduct)
})


module.exports=route 