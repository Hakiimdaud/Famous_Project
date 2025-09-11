
const famousModel = require("../Models/famousModel")

// Create famous
const createFamous = async (req, res) => {
  try {
    const { name, address, email, phone, description,fullDescriptin ,category ,social } = req.body
    const existemaIL = await famousModel.findOne({email})
    if (existemaIL) {
        res.status(400).json({message : "this email is already exit"})
    }
    const newData = new famousModel({
      name: name,
      address: address,
      email: email,
      phone: phone,
      description: description,
      fullDescriptin: fullDescriptin,
      category: category,
      social: social,
      photo: req.file.filename 
    })
    await newData.save()
    if (newData) {
      res.send(newData)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error post control" })
  }
}

const readfamous = async (req, res) => {
  const getData = await famousModel.find()
  if (getData) {
    res.send(getData)
  }
}

const readSinglefamous = async (req, res) => {
  try {
    const getData = await famousModel.find({ _id: req.params.id })
    if (getData) {
      res.send(getData)
    }
  } catch (error) {
    res.status(400).json({ message: error.message })

  }
}

//update

const updateFamous = async(req,res) => {
    try{
        const { name, address, email, phone, description,fullDescriptin , category , social} = req.body
        const updateData = await famousModel.updateOne(
            {_id: req.params.id},
            {$set: {
                name: name,
                address: address,
                email: email,
                phone: phone,
                description: description,
                fullDescriptin: fullDescriptin,
                category: category,
                social: social,
                photo: req.file ? req.file.filename : undefined

            }}
        )
        if(updateData){
            res.send("succes update")
        }
    } catch(error){
        res.status(400).json({message: error.message})
    }
}


const deleteFamous = async(req,res) => {
    try{
        const deleteData = await famousModel.deleteOne({_id:req.params.id})
        if(deleteData){
            res.send("succes delete")
        }
    } catch(error){
        res.status(400).json({message: error.message})
    }
}



module.exports = {createFamous , readfamous , readSinglefamous , updateFamous ,deleteFamous}