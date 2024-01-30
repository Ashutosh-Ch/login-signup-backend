const express = require("express")
const collection = require("./user.models.js")
const cors = require("cors")
const bcrypt = require('bcryptjs')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const corsOptions ={
    credentials:true
}
app.use(cors(corsOptions))

app.get("/",cors(),(req,res)=>{
    
})

app.post("/login",async(req,res)=>{
    const{email,password} = req.body

    try{
        const user=await collection.findOne({email:email})

        if(!user){
            res.json("notexist")
        }
        else {
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            )
            if(isPasswordValid) res.json("exist")
            else res.json("wrong Password")
        }
    }
    catch(err){
        res.json("fail")
        console.log(err)
    }
})

app.post("/signup",async (req,res)=>{
    const {email,mobile,password}=req.body
    const newPassword = await bcrypt.hash(req.body.password,10)
    const data = {
        email:email,
        mobile:mobile,
        password:newPassword
    }

    try{
        const check=await collection.findOne({email:email})
        
        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }
    }
    catch(err){
        res.json("fail")
        console.log(err)
    }
})

app.listen(3000,()=>{
    console.log("port connected")
})