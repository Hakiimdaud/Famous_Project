const mongoose = require("mongoose")

const famousSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    address:{
        type: String,
        required : true,
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    phone:{
        type:Number,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    fullDescriptin:{
        type: String,
        required : true
    },
    category:{
        type : String,
        required: true
    },
    social:[
        {
            platform:{type:String, required: true,},
            url:{type: String, required: true}
        }
    ],
    photo:{
        type: String,
        required: true
    }

},
{timestamps: true}
)

module.exports = mongoose.model("Famous", famousSchema)