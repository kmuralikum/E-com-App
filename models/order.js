const mongoose=require("mongoose")


const orderSchema=new mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orderItem",
        required:false
    }],
    shippingAddress1:{
        type:String,
        required:true
    },
    shippingAddress2:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    zip: {
        type: String,
        required: true,
    },
    country:{
        type:String,
        required:true
     },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    },
    totalPrice:{
        type:Number,
        // required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    dateOrdered:{
        type:Date,
        default:Date.now
    }


},{versionKey:false})
// orderSchema.virtual("id").get(()=>{
//     return this._id.toHexString()
// })

orderSchema.set("toJSON",{
    virtuals:true
})


module.exports=new mongoose.model("order",orderSchema)