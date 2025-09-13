
const model_Contact = require("../Models/ContactModel")


const create_Post_Contact = async(req,res)=>{
    const newData = model_Contact({
        name :req.body.name,
        email:req.body.email,
        address:req.body.address,
        gender:req.body.gender,
        message:req.body.message
    })
    const saveData = await newData.save()
    if (saveData) {
        res.send(saveData)
    }
}

const read_post_Contact = async(req, res)=>{
    const getData = await model_Contact.find()
    if (getData) {
        res.send(getData)
    }
}

const readSingle_Contact = async(req,res)=>{
    const readSingleData = await model_Contact.find(
        {_id:req.params.id}
    )
    if (readSingleData) {
        res.send(readSingleData)
    }
}

const update_Post_Contact = async(req,res)=>{
    const putData = await model_Contact.updateOne(
        {_id:req.params.id},
        {$set : req.body.id}
    )
    if (putData) {
        res.send("Sucess update your already Updated")
    }
}

const delede_Post_Contact = async(req,res)=>{
    const deleteData = await model_Contact.deleteOne(
        {_id : req.params.id}
    )
    if (deleteData) {
        res.send("Sucess to delete your already deleted")
    }
}

module.exports = {create_Post_Contact , read_post_Contact , readSingle_Contact , update_Post_Contact , delede_Post_Contact}