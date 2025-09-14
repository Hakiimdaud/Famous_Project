const adminModel = require("../Models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// CREATE ADMIN
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existEmail = await adminModel.findOne({ email });
    if (existEmail) return res.status(400).json({ error: "Email already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({
      name,
      email,
      password: hashPassword,
      image: req.file ? req.file.filename : null,
    });

    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existEmail = await adminModel.findOne({ email });
    if (!existEmail) return res.status(400).json({ error: "Invalid email" });

    const checkPassword = await bcrypt.compare(password, existEmail.password);
    if (!checkPassword) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: existEmail._id, name: existEmail.name, email: existEmail.email, role: existEmail.role },
      process.env.JWT_Secret,
      { expiresIn: "1d" }
    );

    // Include _id and image in response
    res.send({
      message: "Success login",
      admin: {
        _id: existEmail._id,
        name: existEmail.name,
        email: existEmail.email,
        role: existEmail.role,
        image: existEmail.image,
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// READ ALL ADMINS
const getAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// READ SINGLE ADMIN
const getSingleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminModel.findById(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE ADMIN
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;
    if (updateData.password) updateData.password = await bcrypt.hash(updateData.password, 10);

    const updatedAdmin = await adminModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedAdmin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE ADMIN
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await adminModel.findByIdAndDelete(id);
    if (!deletedAdmin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createAdmin,
  adminLogin,
  getAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
