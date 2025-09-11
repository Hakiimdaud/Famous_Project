const ComplaintsModel = require('../Models/complaintsModel');

// Create a new complaint
const createComplaint = async (req, res) => {
    try {
        const { name, person, body } = req.body;
        const newComplaint = new ComplaintsModel({ name, person, body });
        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// read 
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await ComplaintsModel.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// read single complaint by ID
const getComplaintById = async (req, res) => {
    try {
        const complaint = await ComplaintsModel.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update complaint by ID (optional, not in routes)
const updateComplaintById = async (req, res) => {
    try {
        const updateData = await ComplaintsModel.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.send("Updated Successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};


// delete complaint by ID
const deleteComplaintById = async (req, res) => {
    try {
        const deleteData = await ComplaintsModel.deleteOne({ _id: req.params.id });
        res.send("Deleted Successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintById,
    deleteComplaintById
};
