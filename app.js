const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors=require("cors")
const authJwt=require("./helper/jwt")
const errorHandler=require("./helper/error-handler")
//const path = require ("path")

app.use(cors())
app.options("*",cors())


// engine setup
app.set("view engine","ejs")
//app.set("views",path.resolve("view/ejs"))


//env 
dotenv.config({path:"config.env"})
PORT=process.env.PORT||6060
dotenv.config({path:".env"})
const api=process.env.API_URL 



//middlewares
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(authJwt())
app.use(errorHandler)



//routes
const productRoute=require("./routes/productR")
const userRoute=require("./routes/userR")
const orderRoute=require("./routes/orderR")
const categoryRoute=require("./routes/categoryR")



app.use(`${api}/products`,productRoute)
app.use(`${api}/users`,userRoute)
app.use(`${api}/orders`,orderRoute)
app.use(`${api}/categories`,categoryRoute)


  
//mongoose connection
mongoose.connect("mongodb://127.0.0.1/E-comApp")
.then(()=>{
console.log("Db connected Succesfully");
})
.catch((err)=>console.log(err))

//listening Port
app.listen(PORT,()=>{
    
    console.log(`Your server is running on http://localhost:${PORT}${api}`);
})


