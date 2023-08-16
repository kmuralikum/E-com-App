const mongoose=require("mongoose")


const orderItemSchema=new mongoose.Schema({
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    }
},{versionKey:false})

module.exports=new mongoose.model("orderItem",orderItemSchema) 