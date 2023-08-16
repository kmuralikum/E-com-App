const route=require("express").Router()
const user = require("../models/user")
const order=require("../models/order")
const order_item = require("../models/order_item")

route.get("/",async(req,res)=>{
    const allOrders= await order.find().populate("user","name").sort({"dateOrdered":-1})
    res.json({orders:allOrders})
 })

 .get("/:id",async(req,res)=>{
   const id=req.params.id
   const orderById=await order.findById(id)
   .populate("user","name")
   .populate(
    {path:"orderItems",populate:{path:"product",populate:"category"}})
    .then((order)=>{
        if(order){
            res.send(order)
        }else{
            res.json({msg:"user id not found"})
        }

    })
    .catch((err)=>res.json({error:err}))
//    res.status(200).send(orderById)
 })


 route.post("/",async(req,res)=>{
   const orderItemsIds=Promise.all(req.body.orderItems.map(async order=>{
   let newOrderItem=new order_item({
    quantity:order.quantity,
    product:order.product
  })

  newOrderItem= await newOrderItem.save()
  return newOrderItem._id
   }))
   const resolve= await orderItemsIds

     //console.log(resolve)

     const totalPrices= await Promise.all(resolve.map(async orderId=>{
        const orderItem=await order_item.findById(orderId).populate("product","price")
        const totalPrice =  orderItem.product.price*orderItem.quantity
        return totalPrice
     }))
     const totalPrice=totalPrices.reduce((a,b)=>a+b)
     console.log(totalPrice)

 //------//
    const newOrder=new order({      
        orderItems:resolve,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip:req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice:totalPrice,
        user: req.body.user
    })
    await newOrder.save()

    if(!newOrder){
        res.status(400).json({msg:"Order cannot be Submitted"})
    }
    res.json(newOrder)
})

.put("/:id",async(req,res)=>{
    const id=req.params.id

    const updateOrder= await order.findByIdAndUpdate({_id:id},{
       
        status: req.body.status,
       
    },{new:true})
    .populate("user","name")
    .populate({path:"orderItems",populate:{path:"product",populate:"category"}})

    .then((order)=>{
        if(!order){
            res.status(400).json({msg:"user cannot be updated"})
        }
    res.send(order)
    })
    .catch((err)=>{res.json({error:err})})
})
 

.delete("/:id",async(req,res)=>{
    const id=req.params.id

    order.findByIdAndRemove({_id:id})
    .then(async(order)=>{
        if(order){
            await order.orderItems.map(async order=>{
                await order_item.findByIdAndRemove(order)
            })
            return res.send("deleted Succesfully")
        }else{
            res.json({msg:"id not found"})
        }
        
    })
    .catch((err)=>{res.json({error:err})})
})

module.exports=route