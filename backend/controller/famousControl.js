const famousModel = require("../Models/famousModel");

// Create famous
const createFamous = async (req, res) => {
  try {
    let { name, address, email, phone, description, fullDescription, category, social } = req.body;

    // Parse social if it's a string
    if (typeof social === "string") {
      social = JSON.parse(social);
    }

    // Check if email already exists
    const existEmail = await famousModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "This email already exists" });
    }

    const newData = new famousModel({
      name,
      address,
      email,
      phone,
      description,
      fullDescription,
      category,
      social,
      photo: req.file ? req.file.filename : null
    });

    await newData.save();
    res.status(201).json(newData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error post control", error });
  }
};

// Read all famous
const readfamous = async (req, res) => {
  try {
    const getData = await famousModel.find();
    res.status(200).json(getData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read single famous
const readSinglefamous = async (req, res) => {
  try {
    const getData = await famousModel.findById(req.params.id);
    if (!getData) return res.status(404).json({ message: "Data not found" });
    res.status(200).json(getData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update famous
const updateFamous = async (req, res) => {
  try {
    let { name, address, email, phone, description, fullDescription, category, social } = req.body;

    if (typeof social === "string") {
      social = JSON.parse(social);
    }

    const updateData = await famousModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name,
          address,
          email,
          phone,
          description,
          fullDescription,
          category,
          social,
          ...(req.file && { photo: req.file.filename })
        }
      }
    );

    if (updateData.modifiedCount === 0) {
      return res.status(404).json({ message: "No document found to update" });
    }

    res.status(200).json({ message: "Successfully updated" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete famous
const deleteFamous = async (req, res) => {
  try {
    const deleteData = await famousModel.deleteOne({ _id: req.params.id });
    if (deleteData.deletedCount === 0) {
      return res.status(404).json({ message: "No document found to delete" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createFamous, readfamous, readSinglefamous, updateFamous, deleteFamous };
