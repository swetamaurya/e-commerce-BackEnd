const express = require("express");
const app = express()
const dotenv = require("dotenv");
const MiddleWares = require("./extra");
const connection = require("./dataBase/db");
const userRoute = require("./router/userRoute");
const productRoute = require("./router/productRoute");
dotenv.config()
PORT = process.env.PORT || 2000

MiddleWares(app)

app.use(express.json());
app.use("/user",userRoute)
app.use("/product",productRoute)
 
app.use("/test",async (req,res)=>{
    return res.status(400).send("E - Commerce🙋‍♂️")
})

app.listen(PORT , async (req,res)=>{
    try {
        await connection
        console.log("MongoDB is connected.")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on PORT : ${PORT}`)
})


