const mongoose=require("mongoose")


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    images:[{
        type:String
    }],
    brand:{
        type:String,
        default:""
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:200
    },
    rating:{
        type:Number,
        required:true,
    },
    numReviews:{
        type:Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default:false,
    },
    dateCreated:{
        type:Date,
        default:Date.now,
    }
    

},{versionKey:false})

module.exports= new mongoose.model("product",productSchema)