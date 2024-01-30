const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://ashutoshchaubeymail:ashutoshchaubey@cluster0.op6bhfw.mongodb.net/")
.then(()=>{
    console.log("mongoDB connected")
})
.catch((err)=>{
    console.log("failed")
    console.log(err)
})

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
},{timestamps:true}
)

const collection = mongoose.model("collection",userSchema)

module.exports = collection