const express = require("express")
const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const Product = require("../model/productModel")

const route = express.Router()
dotenv.config()

// register user (create user)
route.post("/register", async (req,res)=>{
    try {
        const {  email } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists with same email.');
        }
       const hashPassword = await bcrypt.hash(req.body.password, 10)
       console.log("hash Password", hashPassword)

        const createUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : hashPassword,
            profile :req.body.profile,
            mobile : req.body.mobile,
            
        })
        console.log("create user", createUser)
        await createUser.save()
        return res.send({msg : "Create User successfully.",createUser:createUser})
    } catch (error) {
        res.send(`Internal server error : ${error.message}`)
    }
})

// login user
route.post("/login", async (req, res) => {
    try {
        // console.log("login api calling")
        const { email, password } = req.body;
        // console.log("login req.body : ",req.body)

        const foundUser = await User.findOne({ email });
        // console.log("login foundUser : ",foundUser)
        if (!foundUser) {
            return res.status(400).send("User not found");
        }

        const hashPassword = foundUser.password;
        let passwordMatch = await bcrypt.compare(password, hashPassword);
        if (!passwordMatch) {
            return res.status(400).send("Password is incorrect");
        }

        // Create token using foundUser object
        var token = jwt.sign({ user: foundUser }, process.env.SECRET_KEY, { expiresIn: '8h' });
        return res.status(200).send({ message: "Login Successfully", token: token });

    } catch (error) {
        return res.status(500).send(`Internal server error: ${error.message}`);
    }
});

// get all user
route.get("/get",async (req,res)=>{
    try {
        const getAllUser = await User.find()
        return res.status(200).send(getAllUser)
    } catch (error) {
        return res.status(500).send(`Internal server error : ${error.message}`)
    }
})


// update user By Id 
route.post("/update",async (req,res)=>{
    try {
        const {_id , name , email , password , profile , mobile} = req.body

        const updateUser = await User.findByIdAndUpdate({_id},{name , email , password , profile , mobile})
        console.log("update",updateUser)
        return res.status(400).send({msg:"User updated successfully",updateUser:updateUser})
    } catch (error) {
        return res.status(500).send(`Internal server error : ${error.message}`)
    }
})

// delete user by Id
route.post("/delete",async (req,res)=>{
    try {
        // console.log("api calling delete")
        // console.log("frotEnd",req.body)
        const {_id} = req.body
        const deleteUser = await User.findByIdAndDelete({_id})
        // console.log("deleteUser",deleteUser)

        if(!deleteUser){
            return res.status(400).send("User not found")
        }
        return res.status(200).send({msg:"User deleted successfully",deleteUser:deleteUser})
    } catch (error) {
        return res.status(500).send(`Internal server error : ${error.message}`)
    }
})

// find user profile 
route.post("/profile",async (req,res)=>{
 
        try {
            const {profile} =req.body
    
            const findprofile = await User.find({ profile: { $regex: new RegExp(profile, 'i') } });
    
            console.log("findprofile", findprofile);
    
            return res.status(200).send(findprofile);
        } catch (error) {
            return res.status(500).send(`Internal server error: ${error.message}`);
        }
    });

module.exports = route
