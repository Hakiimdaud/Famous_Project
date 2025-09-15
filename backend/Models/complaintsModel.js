const mongoose = require("mongoose");

const ComplaintsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    person:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
})

module.exports =
  mongoose.models.Complaints || mongoose.model("Complaints", ComplaintsSchema);