const mongoose=require("mongoose")


const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    icon:{
        type:String
    }
   
},{versionKey:false})


module.exports=new mongoose.model("category",categorySchema)