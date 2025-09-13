const mongoose = require("mongoose")

const contactModelSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    address:{
        type: String,
        required :true
    },
    gender:{
        type:String,
        required: true
    },
    message :{
        type : String,
        required : true
    }
})
module.exports = mongoose.model("CONTACTS",contactModelSchema)