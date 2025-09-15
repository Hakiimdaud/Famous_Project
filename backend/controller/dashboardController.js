const Customer = require("../Models/customerModel");
const Admin = require("../Models/adminModel");
const Complaint = require("../Models/complaintsModel");
const Contact = require("../Models/ContactModel");
const Influencer = require("../Models/famousModel");

const getDashboardStats = async (req, res) => {
  try {
    const customers = await Customer.countDocuments();
    const admins = await Admin.countDocuments();
    const complaints = await Complaint.countDocuments();
    const contacts = await Contact.countDocuments();
    const influencers = await Influencer.countDocuments();

    res.json({
      customers,
      admins,
      complaints,
      contacts,
      influencers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboardStats };
